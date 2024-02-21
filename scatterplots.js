function createScatterPlot(containerId, data, selectedYear, selectedMetric, color) {
  // Set up the chart dimensions
  var width = 600;
  var height = 400;
  var margin = { top: 50, right: 50, bottom: 30, left: 100 };

  // Filter data based on selected year and metric
  var filteredData;
  if (selectedMetric.endsWith('PerBronze')) {
    filteredData = data.filter(d => d.Year == selectedYear && d.BronzeCount);
  } else if (selectedMetric.endsWith('PerSilver')) {
    filteredData = data.filter(d => d.Year == selectedYear && d.SilverCount);
  } else if (selectedMetric.endsWith('PerGold')) {
    filteredData = data.filter(d => d.Year == selectedYear && d.GoldCount);
  } else if (selectedMetric.endsWith('PerTotal')) {
    filteredData = data.filter(d => d.Year == selectedYear && d.TotalMedalCount);
  } else {
    // Handle other metrics if necessary
    filteredData = data.filter(d => d.Year == selectedYear);
  }

  // Create an SVG element
  var svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Set up scales for X and Y axes
  var xScale;
  if (selectedMetric.endsWith('PerBronze')) {
    xScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.BronzeCount)])
      .range([0, width]);
  } else if (selectedMetric.endsWith('PerSilver')) {
    xScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.SilverCount)])
      .range([0, width]);
  } else if (selectedMetric.endsWith('PerGold')) {
    xScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.GoldCount)])
      .range([0, width]);
  } else if (selectedMetric.endsWith('PerTotal')) {
    xScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.TotalMedalCount)])
      .range([0, width]);
  } else {
    // Handle other metrics if necessary
    xScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.TotalMedalCount)])
      .range([0, width]);
  }

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d[selectedMetric])])
    .range([height, 0]);

  // Create X and Y axes
  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);

  // Append X and Y axes to the SVG
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .call(yAxis);

  // Create circles for each data point with tooltips
  var circles = svg.selectAll("circle")
    .data(filteredData)
    .enter().append("circle")
    .attr("cx", function (d) {
      // Dynamically set the x-coordinate based on the selected metric
      if (selectedMetric.endsWith('PerBronze')) {
        return xScale(d.BronzeCount);
      } else if (selectedMetric.endsWith('PerSilver')) {
        return xScale(d.SilverCount);
      } else if (selectedMetric.endsWith('PerGold')) {
        return xScale(d.GoldCount);
      } else if (selectedMetric.endsWith('PerTotal')) {
        return xScale(d.TotalMedalCount);
      } else {
        // Handle other metrics if necessary
        return xScale(d.TotalMedalCount);
      }
    })
    .attr("cy", d => yScale(d[selectedMetric]))
    .attr("r", 5) // Adjust the radius as needed
    .style("fill", color)
    .style("stroke", "black")
    .on("mouseover", function (event, d) {
      // Show tooltip on mouseover
      var tooltip = d3.select(`#${containerId}`)
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("padding", "5px")
        .style("border", "1px solid #ccc");

      tooltip.html(getTooltipContent(selectedMetric, d));

      tooltip.style("left", event.pageX + "px");
      tooltip.style("top", event.pageY + "px");
    })
    .on("mouseout", function (d) {
      // Remove tooltip on mouseout
      d3.selectAll(".tooltip").remove();
    });

  // Add chart title based on the selected filters
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text(`Olympics: ${selectedYear}, Metric: ${selectedMetric.replace(/([A-Z])/g, ' $1').trim()}`);
}

// Modify the tooltip content dynamically
function getTooltipContent(metric, d) {
  let medalType = "";
  let additionalContent = "";

  switch (metric) {
    case "DensityPerBronze":
      medalType = "bronzeCount";
      additionalContent = `<b>Bronze Medal Count:</b> ${d.BronzeCount}<br>`;
      additionalContent += `<b>Density Per Bronze:</b> ${d.DensityPerBronze || 'N/A'}<br>`;
      break;
    case "DensityPerSilver":
      medalType = "silverCount";
      additionalContent = `<b>Silver Medal Count:</b> ${d.SilverCount}<br>`;
      additionalContent += `<b>Density Per Silver:</b> ${d.DensityPerSilver || 'N/A'}<br>`;
      break;
    case "DensityPerGold":
      medalType = "goldCount";
      additionalContent = `<b>Gold Medal Count:</b> ${d.GoldCount}<br>`;
      additionalContent += `<b>Density Per Gold:</b> ${d.DensityPerGold || 'N/A'}<br>`;
      break;
    case "DensityPerTotal":
      medalType = "TotalMedalCount"; // Corrected typo
      additionalContent = `<b>Total Medal Count:</b> ${d.TotalMedalCount}<br>`;
      additionalContent += `<b>Density Per Medal:</b> ${d.DensityPerTotal || 'N/A'}<br>`;
      break;
    case "GDPPerBronze":
      medalType = "bronzeCount";
      additionalContent = `<b>Bronze Medal Count:</b> ${d.BronzeCount}<br>`;
      additionalContent += `<b>GDP Per Bronze:</b> $${d.GDPPerBronze.toFixed(2) || 'N/A'}<br>`;
      break;
    case "GDPPerSilver":
      medalType = "silverCount";
      additionalContent = `<b>Silver Medal Count:</b> ${d.SilverCount}<br>`;
      additionalContent += `<b>GDP Per Bronze:</b> $${d.GDPPerSilver.toFixed(2) || 'N/A'}<br>`;
      break;
    case "GDPPerGold":
      medalType = "goldCount";
      additionalContent = `<b>Gold Medal Count:</b> ${d.GoldCount}<br>`;
      additionalContent += `<b>GDP Per Bronze:</b> $${d.GDPPerGold.toFixed(2) || 'N/A'}<br>`;
      break;
      case "GDPPerTotal":
        medalType = "TotalMedalCount";
        additionalContent = `<b>Total Medal Count:</b> ${d.TotalMedalCount}<br>`;
        additionalContent += `<b>GDP Per Medal:</b> $${d.GDPPerTotal.toFixed(2) || 'N/A'}<br>`;
        break;
    case "PopulationPerBronze":
      medalType = "bronzeCount";
      additionalContent = `<b>Bronze Medal Count:</b> ${d.BronzeCount}<br>`;
      additionalContent += `<b>Population Per Bronze:</b> ${Math.round(d.PopulationPerBronze) || 'N/A'}<br>`;
      break;
    case "PopulationPerSilver":
      medalType = "silverCount";
      additionalContent = `<b>Silver Medal Count:</b> ${d.SilverCount}<br>`;
      additionalContent += `<b>Population Per Bronze:</b> ${Math.round(d.PopulationPerSilver) || 'N/A'}<br>`;
      break;
    case "PopulationPerGold":
      medalType = "goldCount";
      additionalContent = `<b>Gold Medal Count:</b> ${d.GoldCount}<br>`;
      additionalContent += `<b>Population Per Bronze:</b> ${Math.round(d.PopulationPerGold) || 'N/A'}<br>`;
      break;
    case "PopulationPerTotal":
      medalType = "TotalMedalCount"; // Corrected typo
      additionalContent = `<b>Total Medal Count:</b> ${d.TotalMedalCount}<br>`;
      additionalContent += `<b>Population Per Medal:</b> ${Math.round(d.PopulationPerTotal) || 'N/A'}<br>`;
      break;
    // Add other cases if needed
    default:
      medalType = "TotalMedalCount"; // Default to TotalMedalCount
  }

  return `
    <b>Country:</b> ${d.Country_Year}<br>
    ${additionalContent}
  `;
}

// Function to populate the density metric dropdown filter
function createDensityFilter(uniqueDensityMetrics) {
  var densityDropdown = d3.select("#densityFilter");
  densityDropdown.selectAll("option")
    .data(uniqueDensityMetrics)
    .enter().append("option")
    .attr("value", d => d)
    .text(d => d.replace(/([A-Z])/g, ' $1').trim());
}

// Function to populate the GDP metric dropdown filter
function createGDPFilter(uniqueGDPMetrics) {
  var GDPDropdown = d3.select("#GDPFilter");
  GDPDropdown.selectAll("option")
    .data(uniqueGDPMetrics)
    .enter().append("option")
    .attr("value", d => d)
    .text(d => d.replace(/([A-Z])/g, ' $1').trim());
}

// Function to populate the population metric dropdown filter
function createPopulationFilter(uniquePopMetrics) {
  var popDropdown = d3.select("#popFilter");
  popDropdown.selectAll("option")
    .data(uniquePopMetrics)
    .enter().append("option")
    .attr("value", d => d)
    .text(d => d.replace(/([A-Z])/g, ' $1').trim());
}

// Function to populate the year dropdown filter
function createYearFilter(uniqueYears, dropdownId) {
  var yearDropdown = d3.select(`#${dropdownId}`);
  yearDropdown.selectAll("option")
    .data(uniqueYears)
    .enter().append("option")
    .attr("value", d => d)
    .text(d => d);
}

var jsonDataUrl = "./merged_medal_counts_latlong.json";

var data;

// Use fetch to get the JSON data
fetch(jsonDataUrl)
  .then(response => response.json())
  .then(fetchedData => {
    // Assign fetchedData to the outer data variable
    data = fetchedData;

    // Extract unique years from the data and sort them chronologically
    var uniqueYears = Array.from(new Set(data.map(d => d.Year))).sort((a, b) => a - b);

    // Extract unique metrics for density from the data
    var uniqueDensityMetrics = ["DensityPerBronze", "DensityPerSilver", "DensityPerGold", "DensityPerTotal"];
    createDensityFilter(uniqueDensityMetrics);

    // Create Year dropdowns
    createYearFilter(uniqueYears, "yearFilter");
    createYearFilter(uniqueYears, "secondYearFilter");
    createYearFilter(uniqueYears, "thirdYearFilter");

    // Initial scatter plot with the first year and density metric as defaults
    var initialYear = uniqueYears[0];
    var initialDensityMetric = uniqueDensityMetrics[0];
    createScatterPlot("chart-container", data, initialYear, initialDensityMetric, "red");

    // Extract unique metrics for GDP from the data
    var uniqueGDPMetrics = ["GDPPerBronze", "GDPPerSilver", "GDPPerGold", "GDPPerTotal"];
    createGDPFilter(uniqueGDPMetrics);

    // Initial scatter plot with the first year and GDP metric as defaults
    var secondInitialYear = uniqueYears[0];
    var initialGDPMetric = uniqueGDPMetrics[0];
    createScatterPlot("second-chart-container", data, secondInitialYear, initialGDPMetric, "yellow");

    // Extract unique metrics for population from the data
    var uniquePopMetrics = ["PopulationPerBronze", "PopulationPerSilver", "PopulationPerGold", "PopulationPerTotal"];
    createPopulationFilter(uniquePopMetrics);

    // Initial scatter plot with the first year and population metric as defaults
    var thirdInitialYear = uniqueYears[0];
    var initialPopMetric = uniquePopMetrics[0];
    createScatterPlot("third-chart-container", data, thirdInitialYear, initialPopMetric, "blue");
  })
  .catch(function (error) {
    console.error('Error loading JSON data:', error);
  });

// Function to update the scatter plot based on selected filters
function updateScatterPlot(containerId, data, selectedYear, selectedMetric, color) {
  // Remove existing chart
  d3.select(`#${containerId} svg`).remove();

  // Call createScatterPlot with updated data
  createScatterPlot(containerId, data, selectedYear, selectedMetric, color);
}

 // Event listener for the Year dropdowns
 d3.select("#yearFilter").on("change", function() {
  var selectedYear = this.value;
  var selectedMetric = d3.select("#densityFilter").property("value");
  updateScatterPlot("chart-container", data, selectedYear, selectedMetric, "red");
});

d3.select("#secondYearFilter").on("change", function() {
  var selectedYear = this.value;
  var selectedMetric = d3.select("#GDPFilter").property("value");
  updateScatterPlot("second-chart-container", data, selectedYear, selectedMetric, "yellow");
});

d3.select("#thirdYearFilter").on("change", function() {
  var selectedYear = this.value;
  var selectedMetric = d3.select("#popFilter").property("value");
  updateScatterPlot("third-chart-container", data, selectedYear, selectedMetric, "blue");
});

// Event listener for the Density dropdown
d3.select("#densityFilter").on("change", function() {
  var selectedYear = d3.select("#yearFilter").property("value");
  var selectedMetric = this.value;
  updateScatterPlot("chart-container", data, selectedYear, selectedMetric, "red");
});

// Event listener for the GDP dropdown
d3.select("#GDPFilter").on("change", function() {
  var selectedYear = d3.select("#secondYearFilter").property("value");
  var selectedMetric = this.value;
  updateScatterPlot("second-chart-container", data, selectedYear, selectedMetric, "yellow");
});

// Event listener for the Population dropdown
d3.select("#popFilter").on("change", function() {
  var selectedYear = d3.select("#thirdYearFilter").property("value");
  var selectedMetric = this.value;
  updateScatterPlot("third-chart-container", data, selectedYear, selectedMetric, "blue");
});