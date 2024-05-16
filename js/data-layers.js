// All map layer sources, layer stylings, and labels

// add a zoom threshold that won't show labels at too far a scale
const zoomThreshold = 13;

// add data on load
map.on('style.load', () => {

    // adding in geojson sources
    map.addSource('city-boundary', {
        type: 'geojson',
        data: 'data/city-boundary.geojson'
    })
    map.addSource('bopc-parks', {
        type: 'geojson',
        data: 'data/bopc-parks.geojson'
    })
    map.addSource('inverted-parks', {
        type: 'geojson',
        data: 'data/inverted.geojson'
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

    // adding city boundary
    map.addLayer({
        'id': 'city-boundary-outline',
        'type': 'line',
        'source': 'city-boundary',
        'layout': {
            'visibility': 'visible',
        },
        'paint': {
            'line-width': 2,
            'line-color': '#f3f3f3',
        }
    })
    // adding in base fill and line layers of parks by type
    map.addLayer({
        'id': 'bopc-parks-outline',
        'type': 'line',
        'source': 'bopc-parks',
        'layout': {
            'visibility': 'visible',
        },
        'paint': {
            'line-width': {
                stops: [[12, 3], [14, 4], [16, 5]]
            },
            'line-color': [
                'match',
                ['get', 'class'],
                'Major Park', '#38761D',
                'Parkway', '#8de084',
                'Pocket Park', '#0197A6',
                'Circle', '#B1621E',
                '#ccc' // other
            ]
        }
    })
    map.addLayer({
        'id': 'bopc-parks-fill',
        'type': 'fill',
        'source': 'bopc-parks',
        'layout': {
            'visibility': 'visible',
        },
        'paint': {
            'fill-opacity': {
                stops: [[11, 0.9], [12, 0.5], [14, 0.0]]
            },
            'fill-color': [
                'match',
                ['get', 'class'],
                'Major Park', '#38761D',
                'Parkway', '#8de084',
                'Pocket Park', '#0197A6',
                'Circle', '#B1621E',
                '#ccc' // other
            ]
        }
    })
    map.addLayer({
        'id': 'inverted-parks-fill',
        'type': 'fill',
        'source': 'inverted-parks',
        'layout': {
            'visibility': 'visible',
        },
        'paint': {
            'fill-opacity': 0.7,
            'fill-color': '#292828'
        }
    })
    map.addLayer({
        'id': 'bopc-park-labels',
        'type': 'symbol',
        'source': 'bopc-parks',
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

    // adding custom markers for entry points
    const markers = {
        'pedestrian count': 'assets/ped-icon.png',
        'car count': 'assets/car-icon.png',
        'all count': 'assets/all-icon.png'
    };

    // Load custom marker images
    Object.entries(markers).forEach(([category, marker]) => {
        map.loadImage(`${marker}`, (error, image) => {
            if (error) throw error;
            map.addImage(marker.replace('.png', ''), image); // Remove extension for image id
        });
    });

    // adding in layers of custom study points
    const studylayers = [
        {
            'id': 'zones-outline',
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
        {
            'id': 'routes-lines',
            'type': 'line',
            'source': 'scan-routes',
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'line-color': '#a84aba',
                'line-width': {
                    stops: [[12, 1], [13, 1], [14, 2.5], [15, 3]]
                },
                'line-dasharray': [0, 2, 4]
            }
        },
        {
            'id': 'zone-labels',
            'type': 'symbol',
            'source': 'zones',
            'minzoom': zoomThreshold,
            'layout': {
                'text-field': ['get', 'zone-id'],
                'text-justify': 'auto',
                'text-size': {
                    stops: [[12, 0], [13, 0], [14, 16], [16, 24]]
                },
                'visibility': 'none',
            },
            'paint': {
                'text-color': '#F3F3F3',
                'text-halo-color': '#292828',
                'text-halo-width': 2
            }
        },
        {
            'id': 'entry-points-icons',
            'type': 'symbol',
            'source': 'entry-points',
            // 'minzoom': zoomThreshold,
            'layout': {
                'visibility': 'none',
                'icon-image':
                    ['match',
                        ['get', 'category'],
                        'Pedestrian Count', 'assets/ped-icon',
                        'Car Count', 'assets/car-icon',
                        'All Count', 'assets/all-icon',
                        'assets/ped-icon'],
                'icon-size': {
                    stops: [[11, 0], [13, .4], [14, .6], [16, 1]]
                },
                'text-field': ['get', 'id'],
                'text-justify': 'auto',
                'text-size': {
                    stops: [[12, 0], [13, 0], [14, 12], [16, 16]]
                },
                'text-offset': [0, -2.5],
                'text-anchor': 'top',
                'text-allow-overlap': true, // Allow text to overlap
                'text-ignore-placement': true, // Ignore placement rules    
                'visibility': 'none',
            },
            'paint': {
                'text-color': '#F3F3F3',
                'text-halo-color': '#292828',
                'text-halo-width': 2,
            }
        },
    ]

    // adding all the study layers at once
    studylayers.forEach(layer => {
        map.addLayer(layer);
    })
});

// adding popups on park shapes with info
map.on('click', 'bopc-parks-fill', (e) => {
    new mapboxgl.Popup({
        closeButton: false,
        offset: 24,
        anchor: 'bottom-left'
    })
        .setLngLat(e.lngLat)
        .setHTML(`<strong>${e.features[0].properties.name_label}</strong>, est. ${e.features[0].properties.year}`)
        .addTo(map);
});

// make the mouse become a pointer on top of park shapes
map.on('mouseenter', 'bopc-parks-fill', () => {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'bopc-parks-fill', () => {
    map.getCanvas().style.cursor = '';
});
