class Signature {
    constructor(id) {
        this.id = id;
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.rect = this.canvas.getBoundingClientRect();

        this.drawing = false;


        this.canvas.addEventListener('mousedown', this.positionDepart.bind(this));
        this.canvas.addEventListener('mouseup', this.positionFinal.bind(this));
        this.canvas.addEventListener('mousemove', this.dessiner.bind(this));
        this.canvas.addEventListener('mouseout', this.positionFinal.bind(this));
        
}

    positionDepart(e) {
        this.drawing = true;
        this.dessiner(e);
        this.ctx.beginPath();
    }

    positionFinal() {
        this.drawing = false;
        this.prev = undefined;
        this.ctx.closePath();
    }

    dessiner(e) {
        if (!this.drawing) return;
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';

		
        this.coord = { 'x': e.offsetX, 'y': e.offsetY };
        if (this.prev !== undefined) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.prev.x, this.prev.y);
            this.ctx.lineTo(this.coord.x, this.coord.y);
            this.ctx.stroke();
            this.ctx.closePath();
            
        }
        this.prev = this.coord;
    }
    
    
}
<<<<<<< HEAD

=======
const sign = new Signature('sign');
>>>>>>> 0713761ef1b266cdd23ebee4ebf6addf4eb040ab
