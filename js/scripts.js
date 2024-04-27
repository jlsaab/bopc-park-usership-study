mapboxgl.accessToken = 'pk.eyJ1IjoiamxzYWFiIiwiYSI6ImNsdWx2MWw0ajBuODgybG13NGJwdm1yYTYifQ.wYroyDZcY8OYGXc-qzEmdA';

// set a bounding box to limit scrolling away from Buffalo
const bounds = [
    [-79.11576, 42.81147],
    [-78.65267, 42.97024]
];

// create the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-78.88421, 42.89091],
    zoom: 10.92,
    maxBounds: bounds,
    hash: true
});
// light style: 'mapbox://styles/mapbox/light-v11',
// satellite style: 'mapbox://styles/mapbox/satellite-v9',

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

    // add geojson layer for park boundaries
    map.addSource('bopc-parks', {
        type: 'geojson',
        data: 'data/bopc-parks.geojson'
    })

    // add park fill layer
    map.addLayer({
        id: 'bopc-parks-fill',
        type: 'fill',
        slot: 'middle',
        source: 'bopc-parks',
        layout: {},
        paint: {
            'fill-color': [
                'match',
                ['get', 'class'],
                'Major Park', '#38761D',
                'Parkway', '#4EAE43',
                'Pocket Park', '#0197A6',
                'Circle', '#B1621E',
                '#ccc' // other
            ],
            'fill-opacity': 0.3
        }
    })

    // add park outline layer
    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'bopc-parks',
        'layout': {},
        'paint': {
            'line-color': '#626262',
            'line-width': 1
        }
    });

});

// listen for clicks on specific parks to flyTo close view
$('#delaware').on('click', function () {
    map.flyTo({
        center: [-78.86591, 42.93397],
        zoom: 13.97,
        duration: 1500
    })
});
$('#mlk').on('click', function () {
    map.flyTo({
        center: [-78.84039, 42.90503],
        zoom: 15.43,
        duration: 1500
    })
});
$('#cazenovia').on('click', function () {
    map.flyTo({
        center: [-78.80561, 42.84574],
        zoom: 14.36,
        duration: 1500
    })
});
$('#south').on('click', function () {
    map.flyTo({
        center: [-78.82975, 42.82986],
        zoom: 14.55,
        duration: 1500
    })
});
$('#riverside').on('click', function () {
    map.flyTo({
        center: [-78.90889, 42.95553],
        zoom: 15.24,
        duration: 1500
    })
});
$('#front').on('click', function () {
    map.flyTo({
        center: [-78.89751, 42.90111],
        zoom: 15.94,
        duration: 1500
    })
});
$('#days').on('click', function () {
    map.flyTo({
        center: [-78.881104, 42.89878],
        zoom: 16.94,
        duration: 1500
    })
});
$('#heacock').on('click', function () {
    map.flyTo({
        center: [-78.822823, 42.855157],
        zoom: 16.56,
        duration: 1500
    })
});
$('#prospect').on('click', function () {
    map.flyTo({
        center: [-78.893033, 42.902109],
        zoom: 16.13,
        duration: 1500
    })
});
$('#bidwell').on('click', function () {
    map.flyTo({
        center: [-78.877639, 42.922888],
        zoom: 15.24,
        duration: 1500
    })
});
$('#chapin').on('click', function () {
    map.flyTo({
        center: [-78.870472, 42.922926],
        zoom: 15.24,
        duration: 1500
    })
});
$('#lincoln').on('click', function () {
    map.flyTo({
        center: [-78.873794, 42.928819],
        zoom: 15.24,
        duration: 1500
    })
});
$('#colonial').on('click', function () {
    map.flyTo({
        center: [-78.88217, 42.92039],
        zoom: 17.17,
        duration: 1500
    })
});
$('#ferry').on('click', function () {
    map.flyTo({
        center: [-78.882129, 42.915496],
        zoom: 17.27,
        duration: 1500
    })
});
$('#gates').on('click', function () {
    map.flyTo({
        center: [-78.86781, 42.92054],
        zoom: 17.17,
        duration: 1500
    })
});
$('#mcclellan').on('click', function () {
    map.flyTo({
        center: [-78.81500, 42.84438],
        zoom: 17.17,
        duration: 1500
    })
});
$('#mckinley').on('click', function () {
    map.flyTo({
        center: [-78.81523, 42.83201],
        zoom: 17.17,
        duration: 1500
    })
});
$('#soldiers').on('click', function () {
    map.flyTo({
        center: [-78.87376, 42.92569],
        zoom: 16.79,
        duration: 1500
    })
});
$('#symphony').on('click', function () {
    map.flyTo({
        center: [-78.88183, 42.90239],
        zoom: 17.24,
        duration: 1500
    })
});