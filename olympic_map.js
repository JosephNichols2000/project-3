//creating map object
let myMap = L.map("map1").setView([30,0],2)

//creating tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//setting boundries for the map
myMap.setMaxBounds([
    [-90, -180], 
    [90, 180]    
]);

//setting minimum zoom level
myMap.setMinZoom(2);

//disabling drag at minimum zoom level
myMap.on('drag', function() {
    if (myMap.getZoom() === myMap.getMinZoom() && myMap.getBounds().contains(myMap.getCenter())) {
        myMap.dragging.disable();
    }
});

//allowing zoom at levels above the minimum zoom
myMap.on('zoomend', function() {
    if (myMap.getZoom() > myMap.getMinZoom()) {
        myMap.dragging.enable();
    }
});

let url = 'https://raw.githubusercontent.com/JosephNichols2000/project-3/main/modified_data/merged_medal_counts_latlong.json'

// Initialize markersLayer
let markersLayer1 = L.layerGroup();

d3.json(url).then(function (data1) {
    console.log(data1);

    if (data1 && data1.length > 0) {
        // Extract unique years
        let uniqueYears1 = Array.from(new Set(data1.map(item => item.Year))).sort((a, b) => a - b);

        // Populate the dropdown menu with unique years
        let yearSelector1 = document.getElementById('yearSelector1');
        uniqueYears1.forEach(function (year) {
            let option1 = document.createElement('option');
            option1.value = year;
            option1.text = year;
            yearSelector1.add(option1);
        });

        // Add event listener to respond to changes in the year selector
        yearSelector1.addEventListener('change', function () {
            let selectedYear1 = this.value;
            updateMarkers1(selectedYear1, data1);
        });

        // Initially, load markers for the first year in the dataset
        updateMarkers1(uniqueYears1[0], data1, markersLayer1);
    } else {
        console.error('Data is undefined or empty.');
    }
});

function updateMarkers1(selectedYear1, data1) {
    // Clear existing markers
    markersLayer1.clearLayers();

    // Filter data based on the selected year
    let filteredData1 = data1.filter(item1 => item1.Year == selectedYear1);

     // Add new markers for the filtered data
     filteredData1.forEach(item1 => {
        let latitude1 = item1.latitude;
        let longitude1 = item1.longitude;
        let countryYear1 = item1.Country_Year;
        let totalMedalCount = item1.TotalMedalCount;
        let gdp = item1['GDP Value'];
        let population = item1['Pop Value']
        let density = item1['Density Value']

        if (latitude1 !== undefined && longitude1 !== undefined) {
            const popupContent = `<h1>${countryYear1}</h1> <hr> <h3>Total Medal Count; ${totalMedalCount.toLocaleString()}</h3> 
            <hr> <h3>GDP inflation adjusted;  $${gdp.toLocaleString()}</h3> 
            <hr> <h3>Population; ${population.toLocaleString()}</h3> 
            <hr> <h3>Population Density per sq. km; ${density.toLocaleString()}</h3>`;
            console.log(popupContent); // Log popup content to the console
            L.marker([latitude1, longitude1])
                .bindPopup(popupContent)
                .addTo(markersLayer1);
        }
    });

    // Add the markersLayer to the map
    myMap.addLayer(markersLayer1);
}
