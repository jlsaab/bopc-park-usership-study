// loop over the entry points array to make a marker for each record
entrypoints.forEach(function (entrypointRecord) {

    // create a popup to attach to the marker
    const popup = new mapboxgl.Popup({
        // removed the "x" from the popups as it crowded the small space
        // https://stackoverflow.com/questions/66254088/how-to-remove-the-x-close-symbol-from-mapbox-pop-up
        closeButton: false, 
        offset: 15,
        anchor: 'bottom'
    // display the text in the popup
    }).setText(
        `${entrypointRecord.entryPointId}`
    );

    // placing an image depending on if the type of entry point it is
    let imageUrl;
      // Define image URL based on attributes
      switch (entrypointRecord.category) {
        // is one of three categories
        case "Pedestrian Count":
          imageUrl = 'assets/ped-icon.svg';
          break;
        
        case "All Count":
            imageUrl = 'assets/all-icon.svg';
            break;
        
        case "Car Count":
          imageUrl = 'assets/car-icon.svg';
          break;

        default:
          imageUrl = 'assets/ped-icon.svg'; // Default image
      }

    // creating a div to contain the image
    let markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.backgroundImage = `url(${imageUrl})`;
    markerElement.style.width = '30px';
    markerElement.style.height = '30px';

    // create a marker, set the coordinates, add the popup, add it to the map
    new mapboxgl.Marker(markerElement)
        .setLngLat([entrypointRecord.longitude, entrypointRecord.latitude])
        .setPopup(popup)
        .addTo(map);
})