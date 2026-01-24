A.  Summarize one real-world written business report that can be created from the DVD Dataset from the “Labs on Demand Assessment Environment and DVD Database” attachment. 

'There is four months of usable rental data. Since it is less than a year, an annual report will not be possible. A month to month report is possible. Our monthly report will focus on total payments by month and inventory. This will guage monthly profit and indicate what inventory items are more popular.'

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

These reports need to be compiled monthly within the first buisness day of the new month. This guarrantees the information is current and accessible in time to predict the current month trends.

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
 

E.  Provide original SQL code in a text format that creates a trigger on the detailed table of the report that will continually update the summary table as data is added to the detailed table.
 

F.  Provide an original stored procedure in a text format that can be used to refresh the data in both the detailed table and summary table. The procedure should clear the contents of the detailed table and summary table and perform the raw data extraction from part D.

1.  Identify a relevant job scheduling tool that can be used to automate the stored procedure.
 

G.  Provide a Panopto video recording that includes the presenter and a vocalized demonstration of the functionality of the code used for the analysis.
 

Note: For instructions on how to access and use Panopto, use the "Panopto How-To Videos" web link provided below. To access Panopto's website, navigate to the web link titled "Panopto Access," and then choose to log in using the “WGU” option. If prompted, log in using your WGU student portal credentials, and then it will forward you to Panopto’s website.


To submit your recording, upload it to the Panopto drop box titled “Advanced Data Management D191 | D326 (Student Creators) [assignments].” Once the recording has been uploaded and processed in Panopto's system, retrieve the URL of the recording from Panopto and copy and paste it into the Links option. Upload the remaining task requirements using the Attachments option.
 

H.  Acknowledge all utilized sources, including any sources of third-party code, using in-text citations and references. If no sources are used, clearly declare that no sources were used to support your submission.
 

I.  Demonstrate professional communication in the content and presentation of your submission.