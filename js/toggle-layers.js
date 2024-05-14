// Add toggle-able buttons for zones, entry points, and scan routes with this code from class

// create a function to toggle visibility for multiple layers
function toggleLayerVisibility(layerIds) {
    layerIds.forEach(layerId => {
        const visibility = map.getLayoutProperty(layerId, 'visibility');
        if (visibility === 'visible') { map.setLayoutProperty(layerId, 'visibility', 'none'); }
        else { map.setLayoutProperty(layerId, 'visibility', 'visible'); }
    })
}

// configure activity scan routes and zones button
$('#scan-routes-zones-toggle').on('click', function () {
    // toggle visibility for each layer
    toggleLayerVisibility(['zones-outline', 'zone-labels', 'routes-lines']);
});

// configure entry point counts button
$('#entry-points-toggle').on('click', function () {
    toggleLayerVisibility(['entry-points-labels', 'entry-points-circles']);
});


// create a function to toggle background from light to satellite
let currentStyle = 'light';

function toggleMapStyle() {
    currentStyle = (currentStyle === 'light') ? 'satellite' : 'light';
    const nextStyle = (currentStyle === 'light') ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/satellite-v9';
    map.setStyle(nextStyle);
}

// configure background toggle button
$('#toggle-style').on('click', function() {
    toggleMapStyle();
});