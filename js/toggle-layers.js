// Add toggle-able buttons for zones, entry points, and scan routes with this code from class

// SCAN ROUTES and ZONES toggle
let zonesVisible = true
// when the toggle button is clicked, check zonesVisible to get the current visibility state, update the layer visibility to reflect the opposite of the current state.
$('#scan-routes-zones-toggle').on('click', function () {

    // by default we will set the layers to visible
    let value = 'visible'

    // if the layers are already visible, set their visibility to 'none'
    if (zonesVisible === true) {
        value = 'none'
    }

    // use setLayoutProperty to apply the visibility (either 'visible' or 'none' depending on the logic above)
    map.setLayoutProperty('zones-outline', 'visibility', value)
    map.setLayoutProperty('zone-labels', 'visibility', value)
    map.setLayoutProperty('routes-lines', 'visibility', value)
    map.setLayoutProperty('routes-labels', 'visibility', value)

    // flip the value in zonesVisible to reflect the new state. (if true, it becomes false, if false it becomes true)
    zonesVisible = !zonesVisible
})

// ENTRY POINTS toggle
let entrypointsVisible = true
$('#entry-points-toggle').on('click', function () {
    let value = 'visible'
    if (entrypointsVisible === true) { value = 'none' }
    map.setLayoutProperty('entry-points-circles', 'visibility', value)
    map.setLayoutProperty('entry-points-labels', 'visibility', value)
    entrypointsVisible = !entrypointsVisible
})