CREATE OR REPLACE FUNCTION month_string(payment_date TIMESTAMP) 
RETURNS VARCHAR(9) 
LANGUAGE plpgsql AS $$
DECLARE month_return VARCHAR(9); 
BEGIN 
SELECT to_char(payment_date, 'Month') INTO month_return; 
RETURN month_return; 
END; 
$$

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