COPY public."Density" FROM 'C:/Bootcamp/Project 3/API_EN.POP.DNST_DS2_en_csv_v2_6546680.csv'
DELIMITER ',' CSV HEADER QUOTE '"';

COPY public."GDP" FROM 'C:/Bootcamp/Project 3/API_NY.GDP.MKTP.CD_DS2_en_csv_v2_6547064.csv'
DELIMITER ',' CSV HEADER QUOTE '"';

COPY public."Population" FROM 'C:/Bootcamp/Project 3/API_SP.POP.TOTL_DS2_en_csv_v2_6546909.csv'
DELIMITER ',' CSV HEADER QUOTE '"';

COPY public."Olympics" FROM 'C:/Bootcamp/Project 3/Olympics Dataset.csv'
DELIMITER ',' CSV HEADER QUOTE '"';