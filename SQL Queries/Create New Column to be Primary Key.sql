SELECT
    Country_Name,
    Year,
    CONCAT(Country_Name, ' ', Year) AS Country_Year
FROM
    your_table;