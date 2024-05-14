// Adding click actions that zoom the view to all the park assets

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
