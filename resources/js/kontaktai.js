"use strict";

// Initialize and add the map
let map;

async function initMap() {
  const position = { lat: 54.69672097745938, lng: 25.254729268293094 };
  //@ts-ignore
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: position,
    mapId: "CHIC_BEAUTY_HOUSE_MAP_ID",
  });

  // Create an info window to share between markers.
  const infoWindow = new InfoWindow();

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "CHIC Beauty House"
  });

  marker.addListener("click", function() {
    infoWindow.close();
    infoWindow.setContent(marker.title);
    infoWindow.open(marker.map, marker);
  });

}

initMap();