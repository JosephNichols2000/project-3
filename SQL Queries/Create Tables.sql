CREATE TABLE "Density" (
    "Country Name" VARCHAR(255),
    "Country Code" VARCHAR(255),
    "D-Indicator Name" VARCHAR(255),
    "D-Indicator Code" VARCHAR(255),
    "Year" NUMERIC,
    "Value" DECIMAL
);

CREATE TABLE "GDP" (
    "Country Name" VARCHAR(255),
    "Country Code" VARCHAR(255),
    "G-Indicator Name" VARCHAR(255),
    "G-Indicator Code" VARCHAR(255),
    "Year" NUMERIC,
    "Value" DECIMAL
);

CREATE TABLE "Population" (
    "Country Name" VARCHAR(255),
    "Country Code" VARCHAR(255),
    "P-Indicator Name" VARCHAR(255),
    "P-Indicator Code" VARCHAR(255),
    "Year" NUMERIC,
    "Value" DECIMAL
);

CREATE TABLE "Olympics" (
    "ID" INT,
    "Name" VARCHAR(255),
    "Sex" VARCHAR(255),
    "Age" DECIMAL,
    "Height" DECIMAL,
    "Weight" DECIMAL,
    "Team" VARCHAR(255),
    "NOC" VARCHAR(255),
    "Games" VARCHAR(255),
    "Year" NUMERIC,
    "Season" VARCHAR(255),
    "City" VARCHAR(255),
    "Sport" VARCHAR(255),
    "Event" VARCHAR(255),
    "Medal" VARCHAR(255)
);