class Signature {
    constructor(id) {
        this.id = id;
        this.canvas = document.querySelector(this.id);
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = 300;
        this.canvas.height = 170;
        this.rect = this.canvas.getBoundingClientRect();

        this.drawing = false;


        this.canvas.addEventListener('mousedown', this.positionDepart.bind(this));
        this.canvas.addEventListener('mouseup', this.positionFinal.bind(this));
        this.canvas.addEventListener('mousemove', this.dessiner.bind(this));
    }

    positionDepart(e) {
        this.drawing = true;
        this.dessiner(e);
    }

    positionFinal() {
        this.drawing = false;
        this.ctx.beginPath();
    }

    dessiner(e) {
        if (!this.drawing) return;
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';

		

        this.ctx.lineTo(e.clientX - this.rect.left  + 80, e.clientY - this.rect.top);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX - this.rect.left  + 80, e.clientY - this.rect.top);
        this.ctx.closePath();
    }
    
    
}

const sign = new Signature('#sign');