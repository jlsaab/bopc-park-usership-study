// Initializing map

mapboxgl.accessToken = 'pk.eyJ1IjoiamxzYWFiIiwiYSI6ImNsdWx2MWw0ajBuODgybG13NGJwdm1yYTYifQ.wYroyDZcY8OYGXc-qzEmdA';

// set a bounding box to limit scrolling away from Buffalo
const bounds = [
    [-79.11576, 42.81147],
    [-78.65267, 42.97024]
];

const satellite = 'mapbox://styles/mapbox/satellite-v9'
const streets = 'mapbox://styles/mapbox/streets-v12'

// create the map
const map = new mapboxgl.Map({
    container: 'map',
    style: satellite,
    center: [-78.88421, 42.89091],
    zoom: 10.92,
    maxBounds: bounds,
    hash: true
});

// styles for reference
// streets style: 'mapbox://styles/mapbox/streets-v12'
// light style: 'mapbox://styles/mapbox/light-v11',
// satellite style: 'mapbox://styles/mapbox/satellite-v9',


// add zoom buttons
map.addControl(new mapboxgl.NavigationControl());

// add full screen control
map.addControl(new mapboxgl.FullscreenControl());

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

// function to animate legend adapted from classmate Henry Kanengiser's work at https://github.com/henry-kanengiser/fcny-community-solar
function openNav() {
    $('#legend').css('transform', 'translate(0px)');
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNav() {
    $('#legend').css('transform', 'translate(-95%)');
  }
  