class Reservation {
    constructor(id, seconds){
    this.id = id;
    this.time = seconds;
    this.reservation = document.getElementById(this.id);
    this.reservation.addEventListener("click", this.valider.bind(this));
    this.myTimer();
    }
    



    
    
    
};     


        
        
        
        




