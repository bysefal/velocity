class Reservation {
    constructor(){

        this.formName = document.getElementById('name');
        this.formFirstname = document.getElementById('firstname');
        this.formFirstnameText = document.getElementById('firstname-text');
        this.validReservation = document.querySelector('#reservation-valid');
        this.messageValidation = document.querySelector('#message-validation');
        //this.inputValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
        this.valider = document.querySelector('#valider');
        this.annuler = document.querySelector('#annuler');
        this.timer = document.querySelector('#timer');
        
        
        this.valider.addEventListener("click", this.validation.bind(this));
        this.annuler.addEventListener("click", this.cancel.bind(this));
    }
    
    validation(event) {
        //Si le champ est vide
        if (this.formFirstname.validity.valueMissing || this.formName.validity.valueMissing || sign.canvas.toDataURL() == document.getElementById('blank').toDataURL()) {
            event.preventDefault();
            this.formFirstnameText.textContent = 'Veuillez remplir tous les champs !';
            this.formFirstnameText.style.color = '#ce3636';
        } else {
    
            formulaire.style.display = "none";
            stationInfo.style.display = "none";
            stationName.style.display = "none";
            signature.style.display = "none";
            this.messageValidation.classList.add('display');
            this.validReservation.style.display = "flex";
    
            localStorage.setItem('nom', this.formName.value);
            localStorage.setItem('prénom', this.formFirstname.value);
    
            const name = localStorage.getItem("nom");
            const firstName = localStorage.getItem("prénom");
            const station = sessionStorage.getItem("station");
            let count = new Timer('timer', 20, 'time', 'timetext');
            
            this.timer.style.display = "block";
            this.timer.innerHTML = "Vélo réservé par <span id='full-name'>" + firstName + "&nbsp;" + name + "</span> à la station " + "<span id='timer-station'>" + station + "</span>" + ", <br />votre réservation prendra fin dans " + "<span id='time'>20:00</span>" + " <span id='timetext'> minutes</span>";
            
            overlay.classList.add('display');
    
        }
    }

        
    cancel() {
        overlay.classList.remove('display');
        reservation.classList.remove('display');
        sessionStorage.clear();
        //count.stop();
        this.timer.style.display = "none";
    }    
    
    
    
    /*getStationByName(name) {
        for (let i = 0 ; i < stations.length; i++) {
            if (stations[i].name === name){
                return stations[i];
            } 
        } 
    }*/
}