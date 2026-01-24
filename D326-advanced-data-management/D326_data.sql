/* Function to extract month from payment date */

CREATE OR REPLACE FUNCTION month_string(payment_date TIMESTAMP) 
RETURNS VARCHAR(9) 
LANGUAGE plpgsql AS $$
DECLARE month_return VARCHAR(9); 
BEGIN 
SELECT to_char(payment_date, 'Month') INTO month_return; 
RETURN month_return; 
END; 
$$

/* Table to store summary of payments by month and film */

CREATE TABLE SUMMARY (
    payment_id INT PRIMARY KEY Foreign Key REFERENCES payment(payment_id),
    film_id INT Foreign Key REFERENCES inventory(film_id),
    month_return VARCHAR(9),
    amount DECIMAL(5,2)
)

CREATE TABLE DETAILED (
    payment_id INT PRIMARY KEY Foreign Key REFERENCES payment(payment_id),
    film_id INT Foreign Key REFERENCES inventory(film_id),
    staff_id INT,
    customer_id INT,
    amount DECIMAL(5,2),
    month_return VARCHAR(9)
)

/* Insert data into DETAILED table for payments made between July 1, 2005 and August 31, 2005 */

INSERT INTO DETAILED(payment_id, staff_id, customer_id, amount, month_return)
SELECT p.payment_id, p.staff_id, p.customer_id, p.amount, month_string(p.payment_date)
FROM payment AS p 
INSERT INTO DETAILED(film_id)
SELECT i.film_id
FROM inventory as i
WHERE p.payment_date BETWEEN '07/01/2005 00:00:00' AND '08/31/2005 23:59:59'
GROUP BY i.film_id
ORDER BY month_string(p.payment_date) DESC;

/* Trigger function to update SUMMARY table after insert on DETAILED table */

CREATE OR REPLACE FUNCTION insert_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$ 
BEGIN 
DELETE FROM SUMMARY;
INSERT INTO SUMMARY(payment_id, film_id, month_return, amount)
SELECT payment_id, film_id, month_return, amount
FROM DETAILED 
GROUP BY month_return, payment_id, film_id, amount
ORDER BY month_return, payment_id; 
RETURN NEW; 
END; 
$$
/* Trigger to call the insert_trigger_function after insert on DETAILED table */
CREATE TRIGGER new_summary 
AFTER INSERT 
ON DETAILED
FOR EACH STATEMENT 
EXECUTE PROCEDURE insert_trigger_function(); 

/* Procedure to refresh DETAILED table */

CREATE OR REPLACE PROCEDURE refresh_tables() 
LANGUAGE plpgsql 
AS $$ 
BEGIN
DELETE FROM DETAILED;
INSERT INTO DETAILED(payment_id, staff_id, customer_id, amount, month_return)
SELECT p.payment_id, p.staff_id, p.customer_id, p.amount, month_string(p.payment_date)
FROM payment AS p 
INSERT INTO DETAILED(film_id)
SELECT i.film_id
FROM inventory as i
WHERE p.payment_date BETWEEN '07/01/2005 00:00:00' AND '08/31/2005 23:59:59'
GROUP BY i.film_id
ORDER BY month_string(p.payment_date) DESC;
RETURN; 
END; 
$$ 
/* Call the procedure to refresh tables and display contents of SUMMARY and DETAILED tables */
CALL refresh_tables(); 
SELECT * FROM SUMMARY; 
SELECT * FROM DETAILED; 


