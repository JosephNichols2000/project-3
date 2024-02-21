SELECT A.*, B."Density Value", C."GDP Value", D."Pop Value"
FROM public."Olympics" AS A
JOIN public."Density" AS B ON A."Country_Year" = B."Country_Year"
JOIN public."GDP" AS C ON A."Country_Year" = C."Country_Year"
JOIN public."Population" AS D ON A."Country_Year" = D."Country_Year"
GROUP BY A."Country_Year", A."ID", A."Name", A."Sex", A."Age", A."Height", A."Weight", A."Team", A."NOC", A."Games", A."Year", A."Season", A."City", A."Sport", A."Event", A."Medal",
         B."Density Value", C."GDP Value", D."Pop Value"
LIMIT 10;