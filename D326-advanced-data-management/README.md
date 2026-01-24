A.  Summarize one real-world written business report that can be created from the DVD Dataset from the “Labs on Demand Assessment Environment and DVD Database” attachment. 

'There is four months of usable rental data. Since it is less than a year, an annual report will not be possible. A month to month report is possible. Our monthly report will focus on total payments by month and inventory. This will gauge monthly profit and indicate what inventory items are more popular.'

1.  Identify the specific fields that will be included in the detailed table and the summary table of the report.

The summary table will include:
amount (numeric 5,2)
payment_id (primary key / foreign key / int)
film_id (foreign key / int)
month (primary key / varchar(9))

The detailed summary will include:
amount (numeric 5,2)
payment_id (primary key / foreign key / int)
film_id (foreign key / int)
month (varchar(9))
staff_id (int)
customer_id (int)

2.  Describe the types of data fields used for the report.

varchar
integer (int)
decimal (numeric 5,2)

3.  Identify at least two specific tables from the given dataset that will provide the data necessary for the detailed table section and the summary table section of the report.

The necessary data is coming from the payment table and the inventory table.

4.  Identify at least one field in the detailed table section that will require a custom transformation with a user-defined function and explain why it should be transformed (e.g., you might translate a field with a value of N to No and Y to Yes).

payment_date will need to be transformed from a datetime stamp to just a month value. This is for readability.

5.  Explain the different business uses of the detailed table section and the summary table section of the report. 

The summary table shows monthly income and which films are producing that income. The detailed table provides the same information as the summary table, however, it also provides insight on the productivity of the staff, the number of unique customers, the number of repeat customers, how much the repeat customers are spending, and what films customers are drawn to renting.

6.  Explain how frequently your report should be refreshed to remain relevant to stakeholders.

These reports need to be compiled monthly within the first business day of the new month. This guarantees the information is current and accessible in time to predict the current month trends.

B.  Provide original code for function(s) in text format that perform the transformation(s) you identified in part A4.
 
CREATE OR REPLACE FUNCTION month_string(payment_date TIMESTAMP) 
RETURNS VARCHAR(9) 
LANGUAGE plpgsql AS $$
DECLARE month_return VARCHAR(9); 
BEGIN 
SELECT to_char(payment_date, 'Month') INTO month_return; 
RETURN month_return; 
END; 
$$

C.  Provide original SQL code in a text format that creates the detailed and summary tables to hold your report table sections.
 
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

D.  Provide an original SQL query in a text format that will extract the raw data needed for the detailed section of your report from the source database.
 
INSERT INTO DETAILED(payment_id, staff_id, customer_id, amount, month_return)
SELECT p.payment_id, p.staff_id, p.customer_id, p.amount, month_string(p.payment_date)
FROM payment AS p 
INSERT INTO DETAILED(film_id)
SELECT i.film_id
FROM inventory as i
WHERE p.payment_date BETWEEN '07/01/2005 00:00:00' AND '08/31/2005 23:59:59'
GROUP BY i.film_id
ORDER BY month_string(p.payment_date) DESC;

E.  Provide original SQL code in a text format that creates a trigger on the detailed table of the report that will continually update the summary table as data is added to the detailed table.
 
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

CREATE TRIGGER new_summary 
AFTER INSERT 
ON DETAILED
FOR EACH STATEMENT 
EXECUTE PROCEDURE insert_trigger_function(); 

F.  Provide an original stored procedure in a text format that can be used to refresh the data in both the detailed table and summary table. The procedure should clear the contents of the detailed table and summary table and perform the raw data extraction from part D.

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

CALL refresh_tables(); 
SELECT * FROM SUMMARY; 
SELECT * FROM DETAILED; 

1.  Identify a relevant job scheduling tool that can be used to automate the stored procedure.
 
 I would install pgAgent to handle automated job scheduling and management on postgresSQL databases. I would schedule the jobs off hours at 0100 on the first of each month. This time prevents interference in daily activities while compiling necessary information as soon as possible.

H.  Acknowledge all utilized sources, including any sources of third-party code, using in-text citations and references. If no sources are used, clearly declare that no sources were used to support your submission.
 
No sources were used for this submission.
