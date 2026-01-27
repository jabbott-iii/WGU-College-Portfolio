/* Function to extract month from payment date */
CREATE OR REPLACE FUNCTION month_string(payment_date TIMESTAMP) 
RETURNS VARCHAR(9) 
LANGUAGE plpgsql AS $$
DECLARE month_return VARCHAR(9); 
BEGIN 
SELECT to_char(payment_date, 'Month') INTO month_return; 
RETURN month_return; 
END; 
$$;

/* Table to store summary of payments */
CREATE TABLE detailed (
    payment_id INT PRIMARY KEY,
    film_id INT,
    staff_id INT,
    customer_id INT,
    amount DECIMAL(5,2),
    month_return VARCHAR(9)
);

CREATE TABLE summary (
    payment_id INT,
    film_id INT,
    amount DECIMAL(5,2),
    month_return VARCHAR(9),
    CONSTRAINT fk_summary_payment
      FOREIGN KEY (payment_id) REFERENCES detailed(payment_id)
);

/* Insert data into DETAILED table for payments between February 1, 2007 and May 31, 2007 */
INSERT INTO detailed (payment_id, film_id, staff_id, customer_id, amount, month_return)
SELECT
  p.payment_id,
  i.film_id,
  p.staff_id,
  p.customer_id,
  p.amount,
  to_char(p.payment_date, 'YYYY-MM') AS month_return
FROM payment p
JOIN rental r
  ON r.rental_id = p.rental_id
JOIN inventory i
  ON i.inventory_id = r.inventory_id
WHERE p.payment_date >= timestamp '2007-02-01 00:00:00'
  AND p.payment_date <= timestamp '2007-05-31 23:59:59';

/* Trigger function to update SUMMARY table after insert on DETAILED table */
CREATE OR REPLACE FUNCTION insert_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$ 
BEGIN 
TRUNCATE summary;
INSERT INTO summary(payment_id, film_id, amount, month_return)
SELECT payment_id, film_id, amount, month_return
FROM detailed;
RETURN NEW; 
END; 
$$;
/* Trigger to call the insert_trigger_function after insert on DETAILED table */
CREATE TRIGGER new_summary 
AFTER INSERT 
ON detailed
FOR EACH STATEMENT 
EXECUTE FUNCTION insert_trigger_function(); 

/* Procedure to refresh DETAILED table */
CREATE OR REPLACE PROCEDURE refresh_tables() 
LANGUAGE plpgsql 
AS $$ 
BEGIN
TRUNCATE detailed;
INSERT INTO detailed (payment_id, film_id, staff_id, customer_id, amount, month_return)
SELECT
  p.payment_id,
  i.film_id,
  p.staff_id,
  p.customer_id,
  p.amount,
  to_char(p.payment_date, 'YYYY-MM') AS month_return
FROM payment p
JOIN rental r
  ON r.rental_id = p.rental_id
JOIN inventory i
  ON i.inventory_id = r.inventory_id
WHERE p.payment_date >= timestamp '2007-02-01 00:00:00'
  AND p.payment_date <= timestamp '2007-05-31 23:59:59';
TRUNCATE summary;
INSERT INTO summary(payment_id, film_id, amount, month_return)
SELECT payment_id, film_id, amount, month_return
FROM detailed;
END; 
$$;
/* Call the procedure to refresh tables and display contents of SUMMARY and DETAILED tables */
CALL refresh_tables(); 
SELECT * FROM SUMMARY; 
SELECT * FROM DETAILED; 


