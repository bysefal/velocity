class HighlightMenu{
    constructor(element, element2){
        this.element = element;
        this.element2 = element2;
        this.links = document.querySelectorAll(this.element);
        this.sections = document.querySelectorAll(this.element2);

        this.changeLinkState();
        window.addEventListener('scroll', this.changeLinkState.bind(this));
    }

    changeLinkState() {
                let index = this.sections.length;
    			while(--index && window.scrollY + 50 < this.sections[index].offsetTop) {}
                this.links.forEach((link) => link.classList.remove('active'));
                this.links[index].classList.add('active');
    }
};

    const menu = new HighlightMenu('nav li', '.menu');
    const mobileMenu = new HighlightMenu('nav li i', '.menu');
