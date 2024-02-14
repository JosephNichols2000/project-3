let myMap = L.map("map").setView([0,0],2)

myMap.setMaxBounds([
    [-90, -180], 
    [90, 180]    
]);

myMap.on('drag', function() {
    if (map.getZoom() === map.getMinZoom() && map.getBounds().contains(map.getCenter())) {
        map.dragging.disable();
    }
});

myMap.on('zoomend', function() {
    if (map.getZoom() > map.getMinZoom()) {
        map.dragging.enable();
    }
});

myMap.setMinZoom(2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
