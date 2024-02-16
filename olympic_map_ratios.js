//creating map object
let myMapRatio = L.map("map2").setView([30,0],2)

//creating tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMapRatio);

//setting boundries for the map
myMapRatio.setMaxBounds([
    [-90, -180], 
    [90, 180]    
]);

//setting minimum zoom level
myMapRatio.setMinZoom(2);

//disabling drag at minimum zoom level
myMapRatio.on('drag', function() {
    if (myMapRatio.getZoom() === myMapRatio.getMinZoom() && myMapRatio.getBounds().contains(myMapRatio.getCenter())) {
        myMapRatio.dragging.disable();
    }
});

//allowing zoom at levels above the minimum zoom
myMapRatio.on('zoomend', function() {
    if (myMapRatio.getZoom() > myMapRatio.getMinZoom()) {
        myMapRatio.dragging.enable();
    }
});

let url1 = 'https://raw.githubusercontent.com/JosephNichols2000/project-3/main/merged_medal_counts_latlong.json'

// Initialize markersLayer
let markersLayer2 = L.layerGroup();

d3.json(url1).then(function (data2) {
    console.log(data2);

    if (data2 && data2.length > 0) {
        // Extract unique years
        let uniqueYears2 = Array.from(new Set(data2.map(item => item.Year))).sort((a, b) => a - b);

        // Populate the dropdown menu with unique years
        let yearSelector2 = document.getElementById('yearSelector2');
        uniqueYears2.forEach(function (year) {
            let option2 = document.createElement('option');
            option2.value = year;
            option2.text = year;
            yearSelector2.add(option2);
        });

        // Add event listener to respond to changes in the year selector
        yearSelector2.addEventListener('change', function () {
            let selectedYear2 = this.value;
            updateMarkers2(selectedYear2, data2);
        });

        // Initially, load markers for the first year in the dataset
        updateMarkers2(uniqueYears2[0], data2, markersLayer2);
    } else {
        console.error('Data is undefined or empty.');
    }
});

function updateMarkers2(selectedYear2, data2) {
    // Clear existing markers
    markersLayer2.clearLayers();

    // Filter data based on the selected year
    let filteredData2 = data2.filter(item2 => item2.Year == selectedYear2);

    // Add new markers for the filtered data
    filteredData2.forEach(item2 => {
        let latitude2 = item2.latitude;
        let longitude2 = item2.longitude;
        let countryYear2 = item2.Country_Year;
        let totalMedalsPerPop = item2.PopulationPerTotal;
        let totalMedalsPerDensity = item2.DensityPerTotal;
        let totalMedalsPerGDP = item2.GDPPerTotal;

        if (latitude2 !== undefined && longitude2 !== undefined) {
            L.marker([latitude2, longitude2])
                .bindPopup(`<h1>${countryYear2}</h1> <hr> <h3>Total Medals/GDP $${Math.round(totalMedalsPerGDP).toLocaleString()}</h3>
                <hr> <h3>Total Medals/Population; ${totalMedalsPerPop.toLocaleString()}</h3> 
                <hr> <h3>Total Medals/Population Density;  ${totalMedalsPerDensity.toLocaleString()}</h3>`)
                .addTo(markersLayer2);
        }
    });

    // Add the markersLayer to the map
    myMapRatio.addLayer(markersLayer2);
}
