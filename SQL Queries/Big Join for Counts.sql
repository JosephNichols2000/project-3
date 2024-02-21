WITH MedalCounts AS (
    SELECT
        "Country_Year",
        SUM(CASE WHEN "Medal" = 'Bronze' THEN 1 ELSE 0 END) AS "BronzeCount",
        SUM(CASE WHEN "Medal" = 'Silver' THEN 1 ELSE 0 END) AS "SilverCount",
        SUM(CASE WHEN "Medal" = 'Gold' THEN 1 ELSE 0 END) AS "GoldCount",
        COUNT("Medal") AS "TotalMedalCount"
    FROM "Olympics"
    WHERE "Medal" <> 'NA'
    GROUP BY "Country_Year"
)

SELECT
    M."Country_Year",
    M."BronzeCount",
    M."SilverCount",
    M."GoldCount",
    M."TotalMedalCount",
    D."Density Value",
    G."GDP Value",
    P."Pop Value",
	CASE WHEN M."BronzeCount" <> 0 THEN D."Density Value" / M."BronzeCount" END AS "DensityPerBronze",
    CASE WHEN M."SilverCount" <> 0 THEN D."Density Value" / M."SilverCount" END AS "DensityPerSilver",
    CASE WHEN M."GoldCount" <> 0 THEN D."Density Value" / M."GoldCount" END AS "DensityPerGold",
    CASE WHEN M."TotalMedalCount" <> 0 THEN D."Density Value" / M."TotalMedalCount" END AS "DensityPerTotal",
    CASE WHEN M."BronzeCount" <> 0 THEN G."GDP Value" / M."BronzeCount" END AS "GDPPerBronze",
    CASE WHEN M."SilverCount" <> 0 THEN G."GDP Value" / M."SilverCount" END AS "GDPPerSilver",
    CASE WHEN M."GoldCount" <> 0 THEN G."GDP Value" / M."GoldCount" END AS "GDPPerGold",
    CASE WHEN M."TotalMedalCount" <> 0 THEN G."GDP Value" / M."TotalMedalCount" END AS "GDPPerTotal",
    CASE WHEN M."BronzeCount" <> 0 THEN P."Pop Value" / M."BronzeCount" END AS "PopulationPerBronze",
    CASE WHEN M."SilverCount" <> 0 THEN P."Pop Value" / M."SilverCount" END AS "PopulationPerSilver",
    CASE WHEN M."GoldCount" <> 0 THEN P."Pop Value" / M."GoldCount" END AS "PopulationPerGold",
    CASE WHEN M."TotalMedalCount" <> 0 THEN P."Pop Value" / M."TotalMedalCount" END AS "PopulationPerTotal"
FROM MedalCounts M
JOIN "Density" D ON D."Country_Year" = M."Country_Year"
JOIN "GDP" G ON G."Country_Year" = M."Country_Year"
JOIN "Population" P ON P."Country_Year" = M."Country_Year"
ORDER BY M."Country_Year";