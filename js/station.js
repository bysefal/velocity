class Station {
	constructor(name, position, status, available_bike_stands, available_bikes){
	this.name = name;
    this.position = position;
    this.status = status;
    this.available_bike_stands = available_bike_stands;
    this.available_bikes = available_bikes;
    
    }
    
    /*decrementeStock() {
        this.available_bikes -= 1;
        if (this.available_bikes === 0) {
            this.available_bikes = 0;
        }
    }*/
}   