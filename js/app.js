const key = 'ee42e3917542c4134f5e09065278a79d645eea39';
const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=' + key;
const request = new XMLHttpRequest();
var data;
request.onload = function() {
    data = JSON.parse(this.responseText);
};
request.onerror = function(stations) {
    console.log('stations');
};
request.open('GET', url, false);
request.send();


const slider = new Slideshow("#diap", 5000); // Création de l'objet slider
const map = new Map('map', -6.257, 53.348, 12.5, 'mapbox://styles/hpm/ck0u3ztpb19h61ckfv331406o', 'pk.eyJ1IjoiaHBtIiwiYSI6ImNqeDRrZmlwMTA5b2QzeW50eHZqM3MweTIifQ.N87k4WgfOf0x0e9Jn2Yv5g'); // Création de l'objet map
const sign = new Signature('sign'); // Création de l'objet signature

const close = document.querySelector('#close');
const reservation = document.querySelector('#reservation');
const stationName = document.querySelector('#station-name');
const stationStatus = document.querySelector('#station-status');
const stationInfo = document.querySelector('#station-info');
const boutonReserver = document.querySelector('#bouton-reserver');
const formulaire = document.querySelector('#form');
const signature = document.querySelector('#sign');
const messageValidation = document.querySelector('#message-validation');
const overlay = document.querySelector('#overlay');

let stations = [];
data.forEach((dublinStation) => {
    stations.push(new Station(dublinStation.name, dublinStation.position, dublinStation.status, dublinStation.available_bike_stands, dublinStation.available_bikes))

    // Ajout des marqueurs à la carte

    const markerStation = document.createElement('div')
    markerStation.className = 'marker-green';


    if (dublinStation.available_bikes > 0) {
        markerStation.className = 'marker-green';
    } else {
        markerStation.className = 'marker-orange';
    }

    if (dublinStation.status === 'CLOSED') {
        dublinStation.status = 'fermée';
        markerStation.className = 'marker-red';
    } else {
        dublinStation.status = 'ouverte';
    }

    // Création d'un marqueur pour chaque station

    new mapboxgl.Marker(markerStation)
        .setLngLat(dublinStation.position)
        .setPopup(new mapboxgl.Popup({
                offset: 25
        })
            // Ajout popup

        .setHTML('<h3>' + dublinStation.name + '</h3><p>' + '<i class="icon-velocity"></i> : <strong>' + dublinStation.available_bikes + '</strong><br/><i class="fas fa-parking"></i> : <strong>' + dublinStation.available_bike_stands + '</strong></p>'))
        .addTo(map.map);

    markerStation.addEventListener("click", function(e) {
        messageValidation.classList.remove('display');
        formulaire.classList.remove('display');
        signature.classList.remove('display');
        reservation.classList.add('display');
        stationName.style.display = "block";
        stationName.classList.remove('display');
        stationStatus.style.display = "block";
        stationInfo.style.display = "block";
        boutonReserver.style.display = "block";
        sessionStorage.setItem('station', dublinStation.name);
        stationName.innerHTML = '<h3>' + dublinStation.name + '</h3>';
        stationStatus.innerHTML = 'Station ' + dublinStation.status;
        stationInfo.innerHTML = '<p><br/> <i class="icon-velocity"></i> : <strong>' + dublinStation.available_bikes + '</strong> disponibles <br/><i class="fas fa-parking"></i> : <strong>' + dublinStation.available_bike_stands + '</strong> disponibles</p>';

        if (dublinStation.available_bikes === 0) {
            boutonReserver.style.opacity = 0;
        } else {
            boutonReserver.style.opacity = 1;
        }

    });

    close.addEventListener("click", function() {
        const reservation = document.querySelector('#reservation');
        reservation.classList.remove('display');
    })

    boutonReserver.addEventListener("click", function() {

        stationName.classList.add('display');
        stationInfo.style.display = "none";
        stationStatus.style.display = "none";
        formulaire.classList.add('display');
        formulaire.style.display = "block";
        signature.classList.add('display');
        signature.style.display = "block";
        boutonReserver.style.display = "none";
    });

    const newReservation = new Reservation();

});