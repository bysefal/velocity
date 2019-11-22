const key = 'ee42e3917542c4134f5e09065278a79d645eea39';
const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=' + key;
const request = new XMLHttpRequest();
request.onload = function() {

const slider = new Slideshow("#diap", 5000); // Création de l'objet slider

const map = new Map('map', -6.257, 53.348, 12.5, 'mapbox://styles/hpm/ck0u3ztpb19h61ckfv331406o', 'pk.eyJ1IjoiaHBtIiwiYSI6ImNqeDRrZmlwMTA5b2QzeW50eHZqM3MweTIifQ.N87k4WgfOf0x0e9Jn2Yv5g');  // Création de l'objet map


        const close = document.querySelector('#close');
        const reservation = document.querySelector('#reservation');
        const stationName = document.querySelector('#station-name');
        const stationStatus = document.querySelector('#station-status'); 
        const stationInfo = document.querySelector('#station-info');
        const boutonReserver = document.querySelector('#bouton-reserver');
        const formulaire = document.querySelector('#form');
        const signature = document.querySelector('#sign');
        const valider = document.querySelector('#valider');
        const formName = document.getElementById('name');
        const formNameText = document.getElementById('name-text');
        const formFirstname = document.getElementById('firstname');
        const formFirstnameText = document.getElementById('firstname-text');
        const validReservation = document.querySelector('#reservation-valid');
        const timer = document.querySelector('#timer');
        const messageValidation = document.querySelector('#message-validation');
        const inputValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;


    const data = JSON.parse(this.responseText);
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
                
                .setHTML('<h3>' + dublinStation.name + '</h3><p>' + '<i class="icon-velocity"></i> : <strong>' + dublinStation.available_bikes + '</strong> <br/><i class="fas fa-parking"></i> : <strong>' +dublinStation.available_bike_stands + '</strong></p>'))
            .addTo(map.map);        


        markerStation.addEventListener("click", function() {
            messageValidation.classList.remove('display');
            formulaire.classList.remove('display');
            signature.classList.remove('display');
            reservation.classList.add('display');
            stationName.style.display="block";
            stationName.classList.remove('display');
            stationStatus.style.display="block";
            stationInfo.style.display="block";
            boutonReserver.style.display="block";
            stationName.innerHTML = '<h3>' + dublinStation.name + '</h3>';
            stationStatus.innerHTML = 'Station ' + dublinStation.status;
            stationInfo.innerHTML = '<p><br/> <i class="icon-velocity"></i> : <strong>' + dublinStation.available_bikes + '</strong> <br/><i class="fas fa-parking"></i> : <strong>' + dublinStation.available_bike_stands + '</strong></p>';

        });
        
        close.addEventListener("click", function() {
            const reservation = document.querySelector('#reservation');
            reservation.classList.remove('display');
        })
        
        
        boutonReserver.addEventListener("click", function() {
            
            stationName.classList.add('display');
            stationInfo.style.display="none";
            stationStatus.style.display = "none";
            formulaire.classList.add('display');
            formulaire.style.display="block";
            signature.classList.add('display');
            signature.style.display="block";
            boutonReserver.style.display = "none";
        });
        
        const sign = new Signature('sign');

        
        valider.addEventListener('click', validation);  
                  
            function validation(event){
                //Si le champ est vide
                if (formFirstname.validity.valueMissing || formName.validity.valueMissing || sign.canvas.toDataURL() == document.getElementById('blank').toDataURL()){
                    event.preventDefault();
                    formFirstnameText.textContent = 'Veuillez remplir tous les champs !';
                    formFirstnameText.style.color = '#ce3636';
                } 
                else{ 
                    
                    formulaire.style.display ="none";
                    stationInfo.style.display ="none";
                    stationName.style.display="none";
                    signature.style.display = "none";
                    messageValidation.classList.add('display');
                    validReservation.style.display = "flex";
            
            
                    localStorage.setItem('nom',formName.value);
                    localStorage.setItem('prénom',formFirstname.value);
                    sessionStorage.setItem('station', dublinStation.name);
                    
                    //localStorage.setItem('data', '{"prénom":"formFirstname.value", "nom":"formName.value", "station":"dublinStation.name"}');
            
                    const  name = localStorage.getItem("nom");
                    const firstName = localStorage.getItem("prénom");
                    const count = new Timer('timer', 20, 'time', 'timetext');
        
                   
                    timer.innerHTML= "Vélo réservé par " + firstName + "&nbsp;" + name + " à la station " + "<span>" + dublinStation.name + "</span>" + ", <br />votre réservation prendra fin dans " + "<span id='time'>20:00</span>" + " <span id='timetext'> minutes</span>";
                }
            }
            
           function getStationByName(name) {
                let station = [];
                for (let i = 0 ; i < 0; i++) {
                    stations[i] = station;
                }
           }
    });    
};
request.onerror = function(dublinStation) {
    console.log('dublinStation');
};
request.open('GET', url, true);
request.send();