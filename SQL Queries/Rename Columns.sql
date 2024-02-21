ALTER TABLE public."GDP"
RENAME COLUMN "Value" to "GDP Value";

ALTER TABLE public."Population"
RENAME COLUMN "Value" to "Pop Value";

ALTER TABLE public."Density"
RENAME COLUMN "Value" to "Density Value";

UPDATE public."Olympics"
SET "Country_Year" = CONCAT("Team", ' ', "Year");