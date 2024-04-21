mapboxgl.accessToken = 'pk.eyJ1IjoiamxzYWFiIiwiYSI6ImNsdWx2MWw0ajBuODgybG13NGJwdm1yYTYifQ.wYroyDZcY8OYGXc-qzEmdA';

// setting a bounding box to limit scrolling away from Buffalo
const bounds = [
    [-79.11576, 42.81147], 
    [-78.65267, 42.97024]
];

// creating the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-78.88421, 42.89091],
    zoom: 10.92,
    maxBounds: bounds
});

// adding zoom buttons
map.addControl(new mapboxgl.NavigationControl());