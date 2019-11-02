 class Timer {
    constructor(seconds){
        this.time = seconds;
        this.myTimer();
    }
    
    myTimer(){
       this.mTimer = setInterval(this.myClock.bind(this), 1000); 
    }

    myClock(){
        this.time--
        
        
        

        if (this.time === 0) {
            clearInterval(this.mTimer);
        }
    }
    
    show(){
        let seconds = this.time % 60;
        let minutes = (this.time - seconds) / 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return(String(minutes) + ":" + String(seconds));
    }
};           
   
