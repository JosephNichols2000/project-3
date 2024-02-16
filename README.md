# Project 3 Assignment

# Overview
The purpose of this analysis was to obtain greater understanding of whether a country/nation's GDP, Population or Population Density could be predictor of Olympic success. To achieve this we sought to graph the following information:
  *  Highest and lowest medal count by GDP
  *  Highest and lowest medal count by Population
  *  Highest and lowest medal count by Population Density
  *  Total Medal Counts by Country

### Datasets Analyzed
   #### In this analysis we reviewed four different datasets. 
   
   * The first dataset we have referred to as the Olympic Dataset. This dataset consists of about 270,000 rows each representing Olympic information for each event going back to 1896. The information included in the dataset includes the Olympians name, country represented, event and the medal achieved. This was the main dataset we used in our analysis. We chose this dataset because it provided a lot of records and countries to aggregate.

   * The other three datasets we used we gathered from the World Bank Group to find data on countries and nations GDP, Population and Population Density. The good thing about these datasets was the uniformity of the structure of the data going back into the 1960's.

# Using and interacting with the project


# Ethical considerations made in the project
Even though the Olympic data public, we strove to avoid using names in the analysis.


# References for the data source(s)
*Country Coordinates - https://github.com/cristiroma/countries/tree/main/data

*Density - https://data.worldbank.org/indicator/EN.POP.DNST?view=map

*GDP - https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?view=map

*Olympic Data - https://www.kaggle.com/datasets/ishivamkedia/olympics-data?resource=download

*Population - https://data.worldbank.org/indicator/SP.POP.TOTL?view=map

# References for any code used that is not your own

#Scatter Plots came from:
#Scatter Plot
https://stackoverflow.com/questions/62466207/how-to-make-a-scatter-plot-with-d3-using-a-json-file-as-input
#Dynamic Tooltip
https://stackoverflow.com/questions/33476143/loading-tooltip-message-dynamically-from-javascript
#Switch Cases
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
#X axis adjusts
https://d3-graph-gallery.com/graph/scatter_buttonXlim.html
#Basic Filter Code
https://plotly.com/javascript/filter/

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Olympic Data</title>
  <!-- Our CSS -->
  <link rel="stylesheet" type="text/css" href="static/css/style.css">
</head>

<body>

  <!-- The container for the dropdowns and chart -->
  <div class="container">
    <!-- The container for the chart -->
    <div id="chart-container" class="chart-container">
    <!-- The dropdowns for selecting the year and density metric -->
    <div class="dropdown-container">
      <label for="yearFilter">Select Year:</label>
      <select id="yearFilter"></select>
      <label for="densityFilter">Select Density Metric:</label>
      <select id="densityFilter"></select>
    </div>
  </div>
</div>

  <!-- Duplicate the container for the second chart -->
<div class="container">
  <!-- The container for the second chart and dropdowns -->
  <div id="second-chart-container" class="chart-container">
      <!-- The dropdowns for selecting the year and GDP metric for the second scatter plot -->
      <div class="dropdown-container">
          <label for="secondYearFilter">Select Year:</label>
          <select id="secondYearFilter"></select>
          <label for="GDPFilter">Select GDP Metric:</label>
          <select id="GDPFilter"></select>
      </div>
      <!-- The second chart will be appended here -->
  </div>
</div>

<!-- Duplicate the container for the third chart -->
<div class="container">
  <!-- The container for the second chart and dropdowns -->
  <div id="third-chart-container" class="chart-container">
      <!-- The dropdowns for selecting the year and Pop metric for the second scatter plot -->
      <div class="dropdown-container">
          <label for="thirdYearFilter">Select Year:</label>
          <select id="thirdYearFilter"></select>
          <label for="popFilter">Select Population Metric:</label>
          <select id="popFilter"></select>
      </div>
      <!-- The third chart will be appended here -->
  </div>
</div>

  <!-- D3 JavaScript -->
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <!-- Your JavaScript -->
  <script src="./static/js/app.js"></script>
</body>

</html>
