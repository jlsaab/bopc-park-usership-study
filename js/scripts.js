mapboxgl.accessToken = 'pk.eyJ1IjoiamxzYWFiIiwiYSI6ImNsdWx2MWw0ajBuODgybG13NGJwdm1yYTYifQ.wYroyDZcY8OYGXc-qzEmdA';

// set a bounding box to limit scrolling away from Buffalo
const bounds = [
    [-79.11576, 42.81147],
    [-78.65267, 42.97024]
];

// create the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-78.88421, 42.89091],
    zoom: 10.92,
    maxBounds: bounds
});

// add zoom buttons
map.addControl(new mapboxgl.NavigationControl());

// add geolocate control
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    })
);

// add data on load
map.on('load', () => {

    // add a geojson source for the park boundaries
    map.addSource('bopc-parks', {
        type: 'geojson',
        data: 'data/bopc-parks.geojson'
    });

    // add basic park layer
    map.addLayer({
        id: 'bopc-parks-fill',
        type: 'fill',
        slot: 'middle',
        source: 'bopc-parks',
        layout: {},
        paint: {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
        }
    });

});


// from example in class:

// 'fill-color': [
//     'match',
//     ['get', 'class'],
//     'Major Park', '#b3e2cd',
//     'Parkway', '#fdcdac',
//     'Pocket Park', '#cbd5e8',
//     'Circle', '#f4cae4',
//     '#ccc'
// ]