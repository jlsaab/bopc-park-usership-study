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
    map.addSource('zones', {
        type: 'geojson',
        data: 'data/zones.geojson',
    })
    map.addSource('scan-routes', {
        type: 'geojson',
        data: 'data/scan-routes.geojson',
    })
    map.addSource('entry-points', {
        type: 'geojson',
        data: 'data/entry-points.geojson',
    })
    map.addLayer({'id': 'bopc-parks-outline',
        'type': 'line',
        'source': 'bopc-parks',
        'layout': {},
        'paint': {
            'line-width': {
                stops: [[12, 4], [14, 3], [16, 2]]
            },
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
    },)

    const studylayers = [
    {        'id': 'zones-outline',
        'type': 'line',
        'source': 'zones',
        'layout': {
            'visibility': 'none',
        },
        'paint': {
            'line-color': '#000000',
            'line-width': {
                stops: [[12, 1], [13, 2], [16, 4]]
            },
        }
    },
    {        'id': 'routes-lines',
        'type': 'line',
        'source': 'scan-routes',
        'layout': {
            'visibility': 'none',
        },
        'paint': {
            'line-color': '#eeff41',
            'line-width': {
                stops: [[12, 1], [13, 1], [14, 2.5], [15, 3]]
            },
            'line-dasharray': [0, 2, 4]
        }
    },
    {        'id': 'entry-points-circles',
        'type': 'circle',
        'source': 'entry-points',
        'layout': {
            'visibility': 'none',
        },
        'paint': {
            'circle-radius': {
                stops: [[12, 1], [13, 2], [14, 6], [15, 8], [16, 12]]
            },
            'circle-color': '#0197A6',
            'circle-opacity': 0.7,
            'circle-stroke-color': '#000000',
            'circle-stroke-width': 1
        }
    },
    {        'id': 'zone-labels',
        'type': 'symbol',
        'source': 'zones',
        'minzoom': zoomThreshold,
        'layout': {
            'text-field': ['get', 'zone-id'],
            'text-justify': 'auto',
            'text-size': 24,
            'visibility': 'none',
        },
        'paint': {
            'text-color': '#F3F3F3',
            'text-halo-color': '#565656',
            'text-halo-width': 2
        }
    },
    {        'id': 'entry-points-labels',
        'type': 'symbol',
        'source': 'entry-points',
        'minzoom': zoomThreshold,
        'layout': {
            'text-field': ['get', 'id'],
            'text-justify': 'auto',
            'text-size': 16,
            'text-offset': [0, -1.5],
            'visibility': 'none'
        },
        'paint': {
            'text-color': '#F3F3F3',
            'text-halo-color': '#565656',
            'text-halo-width': 2
        }
    }
]

studylayers.forEach(layer => {
    map.addLayer(layer);
})
});
