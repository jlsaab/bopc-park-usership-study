// All map layer sources, layer stylings, and labels

// add a zoom threshold that won't show labels at too far a scale
const zoomThreshold = 13;

// add data on load
map.on('style.load', () => {

    // adding in geojson sources
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

    // adding in base fill and line layers of parks by type
    map.addLayer({'id': 'bopc-parks-outline',
        'type': 'line',
        'source': 'bopc-parks',
        // 'maxzoom': zoomThreshold,
        'layout': {
            'visibility': 'visible',
        },
        'paint': {
            'line-width': {
                stops: [[12, 3], [14, 2], [16, 1]]
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
    })
    map.addLayer({'id': 'bopc-parks-fill',
        'type': 'fill',
        'source': 'bopc-parks',
        // 'maxzoom': zoomThreshold,
        'layout': {
            'visibility': 'visible',
        },
        'paint': {
            'fill-opacity': {
                stops: [[10, 0.9], [12, 0.5], [14, 0.2]]
            },
            'fill-color': [
                'match',
                ['get', 'class'],
                'Major Park', '#38761D',
                'Parkway', '#4EAE43',
                'Pocket Park', '#0197A6',
                'Circle', '#B1621E',
                '#ccc' // other
            ]
        }
    })
    map.addLayer({'id': 'bopc-park-labels',
            'type': 'symbol',
            'source': 'bopc-parks',
            // 'minzoom': zoomThreshold,
            'layout': {
                'text-field': ['get', 'name_label'],
                'text-justify': 'auto',
                'text-size': {
                    stops: [[12, 14], [13, 16], [14, 18], [15, 20], [16, 24]]
                },
                'visibility': 'visible',
                'text-padding': 100,
                'symbol-spacing': 400,
            },
            'paint': {
                'text-color': '#F3F3F3',
                'text-halo-color': '#565656',
                'text-halo-width': 2
            }
    })
    

    // adding in layers of custom study points
    const studylayers = [
        {
            'id': 'zones-outline',
            'type': 'line',
            'source': 'zones',
            // 'minzoom': zoomThreshold,
            'layout': {
                'visibility': 'visible',
            },
            'paint': {
                'line-color': '#000000',
                'line-width': {
                    stops: [[12, 1], [13, 2], [16, 4]]
                },
            }
        },
        {
            'id': 'routes-lines',
            'type': 'line',
            'source': 'scan-routes',
            // 'minzoom': zoomThreshold,
            'layout': {
                'visibility': 'visible',
            },
            'paint': {
                'line-color': '#eeff41',
                'line-width': {
                    stops: [[12, 1], [13, 1], [14, 2.5], [15, 3]]
                },
                'line-dasharray': [0, 2, 4]
            }
        },
        {
            'id': 'entry-points-circles',
            'type': 'circle',
            'source': 'entry-points',
            // 'minzoom': zoomThreshold,
            'layout': {
                'visibility': 'visible',
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
        // {
        //     'id': 'entry-points-circles',
        //     'type': 'symbol',
        //     'source': 'entry-points',
        //     'minzoom': zoomThreshold,
        //     'layout': {
        //         'icon-image': [
        //             'match', 
        //             ['get', 'category'],
        //             'Pedestrian Count', 'assets/ped-icon.svg',
        //             'All Count', 'assets/all-icon.svg',
        //             'Car Count', 'assets/car-icon.svg',
        //             'assets/ped-icon.svg'],
        //         'icon-size': 10,
        //         'icon-allow-overlap': true
        //     },
        //     'paint': {}
        // },
        {   'id': 'zone-labels',
            'type': 'symbol',
            'source': 'zones',
            'minzoom': zoomThreshold,
            'layout': {
                'text-field': ['get', 'zone-id'],
                'text-justify': 'auto',
                'text-size': 16,
                'visibility': 'visible',
            },
            'paint': {
                'text-color': '#F3F3F3',
                'text-halo-color': '#565656',
                'text-halo-width': 2
            }
        },
        {
            'id': 'entry-points-labels',
            'type': 'symbol',
            'source': 'entry-points',
            'minzoom': zoomThreshold,
            'layout': {
                'text-field': ['get', 'id'],
                'text-justify': 'auto',
                'text-size': 16,
                'text-offset': [0, -1.5],
                'visibility': 'visible'
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

// adding text in the side bar that shows park name
map.on('click', 'bopc-parks-fill', (e) => {
    var name_label = e.features[0].properties.name_label
    var year = e.features[0].properties.year
    $('#park-name').text(`${name_label}, est. ${year}.`)
});


