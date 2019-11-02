class Station {
	constructor(name, latitude, longitude, status, availableBikeStands, availableBikes){
	this.name = name;
    this.position = {
        lat: latitude,
        long: longitude
    };
                
    this.status = status;
    this.available_bike_stands = availableBikeStands;
    this.available_bikes = availableBikes;
    
    }
};    