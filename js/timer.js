class Timer {
    constructor(id, minutes, displayId, timeTextId) {
        this.id = id;
        this.display = displayId;
        this.timeT = timeTextId;
        this.container = document.getElementById(this.id);
        this.valider = document.getElementById(valider);
        this.time = minutes;
        this.currentTime = Date.parse(new Date());
        this.endDate = new Date(this.currentTime + this.time * 60 * 1000);
        this.timer = setInterval(this.show.bind(this), 1000); 
    }    

    show() {
            
            this.t = Date.parse(this.endDate) - Date.parse(new Date());
            if (this.t >= 0) {
                let days = Math.floor(this.t / (1000 * 60 * 60 * 24));
                let hours = Math.floor((this.t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((this.t % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((this.t % (1000 * 60)) / 1000);
                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                this.timeText = document.getElementById(this.timeT);
                this.displayContainer = document.getElementById(this.display);
                sessionStorage.minutes = minutes;
                sessionStorage.seconds = seconds;
                this.displayContainer.innerHTML = minutes + ":" + seconds;

                
                if (minutes <= 1) {
                    this.timeText.innerHTML = " minute";
                } else {
                    this.timeText.innerHTML = " minutes"; 
                }
            
            } else {
                this.stop();
            }
            
    }
    
    stop() {
        clearInterval(this.timer);
        this.container.innerHTML = "Votre réservation a expirée";
    }
}

/*
class Timer {
    constructor(time) {
        // time is in seconds
        this.time = time;
        this.started = false;
        this.startedAt = null;

        setInterval(this.update.bind(this), 1000);
    }    

    start() {
        this.started = true;  
        this.startedAt = Date.now();
    }
    
    stop() {
       this.started = false;
    }

    showTimer() {
                let minutes = Math.floor(this.time / 60);
                let seconds = Math.floor(this.time % 60);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                return minutes + ':' + seconds;
    }

    update() {
        if(this.started){
            let currentTime = Date.now();
            let elapsedTime = (currentTime - this.startedAt) / 1000;
            this.time -= elapsedTime;
            this.showTimer();
        }
    }
}
*/









