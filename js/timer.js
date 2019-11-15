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
