const key = 'ee42e3917542c4134f5e09065278a79d645eea39';
const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=' + key;
const request = new XMLHttpRequest();
request.onload = function() {

    const stations = JSON.parse(this.responseText);
    mapboxgl.accessToken = 'pk.eyJ1IjoiaHBtIiwiYSI6ImNqeDRrZmlwMTA5b2QzeW50eHZqM3MweTIifQ.N87k4WgfOf0x0e9Jn2Yv5g';
    const map = new mapboxgl.Map({
        container: 'map',
        center: [-6.257, 53.348],
        zoom: 12.5,
        style: 'mapbox://styles/hpm/ck0u3ztpb19h61ckfv331406o'
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    map.scrollZoom.disable();

    // add markers to map

    for (let station of stations) {   
        // create a HTML element for each feature
        const markerStation = document.createElement('div');
        const close = document.querySelector('#close');
        const reservation = document.querySelector('#reservation');
        const stationName = document.querySelector('#station-name');
        const stationInfo = document.querySelector('#station-info');
        const boutonReserver = document.querySelector('#bouton-reserver');
        const formulaire = document.querySelector('#form');
        const signature = document.querySelector('#sign');
        const valider = document.querySelector('#valider');
        const formName = document.getElementById('name');
        const formFirstname = document.getElementById('firstname');
        const validReservation = document.querySelector('#reservation-valid');
        const timer = document.querySelector('#timer');
        const messageValidation = document.querySelector('#message-validation');
        var countdown = null;
        markerStation.className = 'marker-green';

        close.addEventListener("click", function() {
            const reservation = document.querySelector('#reservation');
            reservation.classList.remove('display');
        })
        
        if (station.status === 'OPEN') {
            station.status = 'Ouverte';
        }

        if (station.available_bikes > 0) {
            markerStation.className = 'marker-green';
        } else {
            markerStation.className = 'marker-orange';
        }

        if (station.status === 'CLOSED') {
            station.status = 'Fermée';
            markerStation.className = 'marker-red';
        }

        markerStation.addEventListener("click", function(stations) {
            
            messageValidation.classList.remove('display');
            formulaire.classList.remove('display');
            signature.classList.remove('display');
            reservation.classList.add('display');
            stationName.style.display="block";
            stationName.classList.remove('display');
            stationInfo.style.display="block";
            boutonReserver.style.display="block";
            stationName.innerHTML = '<h3>' + station.name + '</h3>';
            stationInfo.innerHTML = '<p>' + 'Station ' + station.status + '<br/> <i class="icon-velocity"></i> : <strong>' + station.available_bikes + '</strong> <br/><i class="fas fa-parking"></i> : <strong>' + station.available_bike_stands + '</strong></p>';

        });

        boutonReserver.addEventListener("click", function() {
            
            stationName.classList.add('display');
            stationInfo.style.display="none";
            formulaire.classList.add('display');
            formulaire.style.display="block";
            signature.classList.add('display');
            signature.style.display="block";
            boutonReserver.style.display = "none";
            
                                    
            if (formName.value.length < 1 && formFirstname.value.length < 1 ) {
            valider.style.opacity= 0;
            alert("Veuillez remplir correctement tous les champs");
            return true;
            }
            else {
            valider.style.opacity= 1;
            }
        });


        valider.addEventListener("click", function(){

            formulaire.style.display ="none";
            stationInfo.style.display ="none";
            stationName.style.display="none";
            signature.style.display = "none";
            messageValidation.classList.add('display');
            validReservation.style.display = "flex";
            
    
            localStorage.setItem('Nom',formName.value);
            localStorage.setItem('Prénom',formFirstname.value);
            
            localStorage.setItem('data', '{"nom":"Fred", "datetime":"25/10/2019 20:15:00"}');
    
            
            const  name = localStorage.getItem("Nom");
            const firstName = localStorage.getItem("Prénom");
            
           
            
                      
            document.getElementById('timer').innerHTML= "Vélo réservé par " + firstName + "&nbsp;" + name + " à la station " + station.name + ", <br />votre réservation prendra fin dans " + countdown.show() +" minutes" ;
                
    
        });
        
        var countdown = new Timer(1201);

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(markerStation)
            .setLngLat(station.position)
            .setPopup(new mapboxgl.Popup({
                    offset: 25
                }) // add popups
                .setHTML('<h3>' + station.name + '</h3><p>' + '<i class="icon-velocity"></i> : <strong>' + station.available_bikes + '</strong> <br/><i class="fas fa-parking"></i> : <strong>' +station.available_bike_stands + '</strong></p>'))
            .addTo(map);
    };
};
request.onerror = function(stations) {
    console.log('stations');
};
request.open('GET', url, true);
request.send(null);