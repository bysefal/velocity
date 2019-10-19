const key = 'ee42e3917542c4134f5e09065278a79d645eea39'
const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=' + key;
const request = new XMLHttpRequest();
request.onload = function () {
const data = JSON.parse(this.responseText);

mapboxgl.accessToken = 'pk.eyJ1IjoiaHBtIiwiYSI6ImNqeDRrZmlwMTA5b2QzeW50eHZqM3MweTIifQ.N87k4WgfOf0x0e9Jn2Yv5g';
const map = new mapboxgl.Map({
  container: 'map',
  center: [-6.257, 53.348],
  zoom: 12.5,
  style: 'mapbox://styles/hpm/ck0u3ztpb19h61ckfv331406o'
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

map.scrollZoom.disable();

// add markers to map
data.forEach(function(station) {
  // create a HTML element for each feature
  const markerStation = document.createElement('div');
  const close = document.querySelector('#close');
  markerStation.className = 'marker-green';

   close.addEventListener( "click", function(){
       const reservation = document.querySelector('#reservation')
	   reservation.classList.remove('display');
   })

   markerStation.addEventListener( "click", function() {
       const reservation = document.querySelector('#reservation')
        const stationInfo = document.querySelector('#station-info')
	   reservation.classList.add('display');
     stationInfo.innerHTML = '<h3>' + station.name + '</h3><p>' + 'Station ' + station.status  + '<br/><i class="icon-velocity"></i> : <strong>' + station.available_bikes +'</strong> <br/><i class="fas fa-parking"></i> : <strong>' + station.available_bike_stands  +'</strong></p>';

     })
  
    if (station.status === 'OPEN'){
        station.status = 'Ouverte';
    } 
    
    if (station.available_bikes > 0 ){
         markerStation.className = 'marker-green';
    } else {   
         markerStation.className ='marker-orange'
    }
    
    if (station.status === 'CLOSED'){
        station.status = 'Fermée';
        markerStation.className ='marker-red';
    } 
    
  // make a marker for each feature and add to the map
  new mapboxgl.Marker(markerStation)
    .setLngLat(station.position)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + station.name + '</h3><p>' + '<i class="icon-velocity"></i> : <strong>' + station.available_bikes +'</strong> <br/><i class="fas fa-parking"></i> : <strong>' + station.available_bike_stands  +'</strong></p>'))
    .addTo(map);
});
};

request.onerror = function (data) {
  console.log('data');
};
request.open('GET', url, true);
request.send(null);


