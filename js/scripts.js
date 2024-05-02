mapboxgl.accessToken = 'pk.eyJ1IjoiamxzYWFiIiwiYSI6ImNsdWx2MWw0ajBuODgybG13NGJwdm1yYTYifQ.wYroyDZcY8OYGXc-qzEmdA';

// set a bounding box to limit scrolling away from Buffalo
const bounds = [
    [-79.11576, 42.81147],
    [-78.65267, 42.97024]
];

// create the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-78.88421, 42.89091],
    zoom: 10.92,
    maxBounds: bounds,
    hash: true
});
// streets style: 'mapbox://styles/mapbox/streets-v12'
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

// add a zoom threshold that won't show labels at too far a scale
const zoomThreshold = 13;

// add data on load
map.on('load', () => {

    // PARKS
        // add geojson source
        map.addSource('bopc-parks', {
            type: 'geojson',
            data: 'data/bopc-parks.geojson'
        })
        // add line layer
        map.addLayer({
            'id': 'bopc-parks-outline',
            'type': 'line',
            'source': 'bopc-parks',
            'layout': {},
            'paint': {
                // 'line-color': '#626262',
                'line-width': 2,
                'line-color': [
                    'match',
                    ['get', 'class'],
                    'Major Park', '#38761D',
                    'Parkway', '#4EAE43',
                    'Pocket Park', '#0197A6',
                    'Circle', '#B1621E',
                    '#ccc' // other
                ]
            }
        });

    // ZONES
        // add geojson source
        map.addSource('zones', {
            type: 'geojson',
            data: 'data/zones.geojson',
        })
        // add line layer
        map.addLayer({
            'id': 'zones-outline',
            'type': 'line',
            'source': 'zones',
            'layout': {
                // Make the layer invisible by default.
                'visibility': 'none'
            },
            'paint': {
                'line-color': '#000000',
                'line-width': 4
            }
        });
        // add labels
        map.addLayer({
            'id': 'zone-labels',
            'type': 'symbol',
            'source': 'zones',
            'minzoom': zoomThreshold,
            'layout': {
                'text-field': ['get', 'zone-id'],
                'visibility': 'none',
                'text-justify': 'auto',
                'text-size': 24,
            },
            'paint': {
                'text-color': '#F3F3F3',
                'text-halo-color': '#565656',
                'text-halo-width': 2
            }
        });

    // ENTRY POINTS
        // add geojson source
        map.addSource('entry-points', {
            type: 'geojson',
            data: 'data/entry-points.geojson',
        })
        // add circle layer
        map.addLayer({
            'id': 'entry-points-circles',
            'type': 'circle',
            'source': 'entry-points',
            'layout': { 'visibility': 'none' },
            'paint': { 
                'circle-radius': 8, 
                'circle-color': 'rgba(255,200,255,0.8)' 
            }
        });
        // add labels
        map.addLayer({
            'id': 'entry-points-labels',
            'type': 'symbol',
            'source': 'entry-points',
            'minzoom': zoomThreshold,
            'layout': {
                'text-field': ['get', 'entry-point-id'],
                'visibility': 'none',
                'text-justify': 'auto',
                'text-size': 16
            },
            'paint': {
                'text-color': '#F3F3F3',
                'text-halo-color': '#565656',
                'text-halo-width': 2
            }
        });

    // SCAN ROUTES
        // add geojson source
        map.addSource('scan-routes', {
            type: 'geojson',
            data: 'data/scan-routes.geojson',
        })
        // add line layer
        map.addLayer({
            'id': 'routes-lines',
            'type': 'line',
            'source': 'scan-routes',
            'layout': {'visibility': 'none'},
            'paint': {
                'line-color': '#eeff41',
                'line-width': 3,
                'line-dasharray': [0, 2, 4]
            }
        });
        // add labels
        map.addLayer({
            'id': 'routes-labels',
            'type': 'symbol',
            'source': 'scan-routes',
            'minzoom': zoomThreshold,
            'layout': {
                'text-field': ['get', 'route-id'],
                'visibility': 'none',
                'text-justify': 'auto',
                'text-size': 16
            },
            'paint': {
                'text-color': '#F3F3F3',
                'text-halo-color': '#565656',
                'text-halo-width': 2
            }
        });
});


// Add toggle-able buttons for zones, entry points, and scan routes with this code from class

// ZONES toggle
let zonesVisible = false
// when the toggle button is clicked, check zonesVisible to get the current visibility state, update the layer visibility to reflect the opposite of the current state.
$('#zones-toggle').on('click', function () {

    // by default we will set the layers to visible
    let value = 'visible'

    // if the layers are already visible, set their visibility to 'none'
    if (zonesVisible === true) {
        value = 'none'
    }

    // use setLayoutProperty to apply the visibility (either 'visible' or 'none' depending on the logic above)
    map.setLayoutProperty('zones-outline', 'visibility', value)
    map.setLayoutProperty('zone-labels', 'visibility', value)

    // flip the value in zonesVisible to reflect the new state. (if true, it becomes false, if false it becomes true)
    zonesVisible = !zonesVisible
})

// ENTRY POINTS toggle
let entrypointsVisible = false
$('#entry-points-toggle').on('click', function () {
    let value = 'visible'
    if (entrypointsVisible === true) {value = 'none'}
    map.setLayoutProperty('entry-points-circles', 'visibility', value)
    map.setLayoutProperty('entry-points-labels', 'visibility', value)
    entrypointsVisible = !entrypointsVisible
})

// SCAN ROUTES toggle
let scanroutesVisible = false
$('#scan-routes-toggle').on('click', function () {
    let value = 'visible'
    if (scanroutesVisible === true) { value = 'none' }
    map.setLayoutProperty('routes-lines', 'visibility', value)
    map.setLayoutProperty('routes-labels', 'visibility', value)
    scanroutesVisible = !scanroutesVisible
})

// FLY TO PARKS 
// listen for clicks on specific parks to flyTo close-up view
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
    $('#home').on('click', function () {
        map.flyTo({
            center: [-78.88421, 42.89091],
            zoom: 10.92,
            duration: 1500
        })
    });


