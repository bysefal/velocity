class Map {
    constructor(container, lat, long, zoom, style, token, ajaxURL) {
        this.container = container;
        this.lat = lat;
        this.long = long;
        this.zoom = zoom;
        this.style = style;
        this.token = token;
        this.ajaxURL = ajaxURL;
        this.map = new mapboxgl.Map({
        	container: this.container,
        	center: [this.lat, this.long],
        	zoom: this.zoom,
        	style: this.style,
        	accessToken: this.token,

        });
        
       this.map.addControl(new mapboxgl.NavigationControl()); // Ajout navigation à la carte
       this.map.scrollZoom.disable(); // Désactive le scroll zoom  

        this.station = { // création de l'objet station
            init: function (name, latitude, longitude, banking, status, availableBikeStands, availableBikes) {
                this.name = name;
                this.position = {
                    lat: latitude,
                    lng: longitude
                };
                this.banking = banking;
                this.status = status;
                this.available_bike_stands = availableBikeStands;
                this.available_bikes = availableBikes;
            }
        }
    }; // fin du constructor
    
}; // fin de la classe

const velocityMap = new Map('map', -6.257, 53.348, 12.5, 'mapbox://styles/hpm/ck0u3ztpb19h61ckfv331406o', 'pk.eyJ1IjoiaHBtIiwiYSI6ImNqeDRrZmlwMTA5b2QzeW50eHZqM3MweTIifQ.N87k4WgfOf0x0e9Jn2Yv5g', 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=ee42e3917542c4134f5e09065278a79d645eea39');  