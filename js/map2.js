class Map {
    constructor(container, lat, long, zoom, style, token) {
        this.container = container;
        this.lat = lat;
        this.long = long;
        this.zoom = zoom;
        this.style = style;
        this.token = token;
        this.map = new mapboxgl.Map({
        	container: this.container,
        	center: [this.lat, this.long],
        	zoom: this.zoom,
        	style: this.style,
        	accessToken: this.token,

        });
        
       this.map.addControl(new mapboxgl.NavigationControl()); // Ajout navigation à la carte
       this.map.scrollZoom.disable(); // Désactive le scroll zoom  

    }; // fin du constructor
    
}; // fin de la classe

const velocityMap = new Map('map', -6.257, 53.348, 12.5, 'mapbox://styles/hpm/ck0u3ztpb19h61ckfv331406o', 'pk.eyJ1IjoiaHBtIiwiYSI6ImNqeDRrZmlwMTA5b2QzeW50eHZqM3MweTIifQ.N87k4WgfOf0x0e9Jn2Yv5g');  