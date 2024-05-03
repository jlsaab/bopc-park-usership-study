// All map layer sources, layer stylings, and labels

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
        'layout': {},
        'paint': {
            'line-color': '#000000',
            'line-width': {
                stops: [[12, 1], [13, 2], [16, 4]]
            },
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
            'text-justify': 'auto',
            'text-size': 24,
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
        'layout': {},
        'paint': {
            'line-color': '#eeff41',
            'line-width': {
                stops: [[12, 1], [13, 2], [14, 4], [16, 6]]
            },
            'line-dasharray': [0, 2, 4]
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
        'layout': {},
        'paint': {
            'circle-radius': {
                stops: [[12, 1], [13, 2], [14, 6], [15, 8], [16, 12]]
            },
            'circle-color': '#ffffff',
            'circle-opacity': 0.6,
            'circle-stroke-color': '#565656',
            'circle-stroke-width': 1
        }
    });
    // add labels
    map.addLayer({
        'id': 'entry-points-labels',
        'type': 'symbol',
        'source': 'entry-points',
        'minzoom': zoomThreshold,
        'layout': {
            'text-field': ['get', 'id'],
            'text-justify': 'auto',
            'text-size': 16,
            'text-offset': [0, -1.5]
        },
        'paint': {
            'text-color': '#F3F3F3',
            'text-halo-color': '#565656',
            'text-halo-width': 2
        }
    });
    
});
