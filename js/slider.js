(function() {
	
	function Slideshow(element) {
		this.el = document.querySelector(element);
		this.init();
	}
	
	Slideshow.prototype = {
		init: function() {
			this.wrapper = this.el.querySelector( "#slider" );
			this.slides = this.el.querySelectorAll( ".slide" );
			this.previous = this.el.querySelector( "#prev" );
			this.next = this.el.querySelector( "#next" );
			this.index = 0;
			this.timer = null;

			
			this.action();
			this.nextSlide();
			this.prevSlide();
			this.stopStart();	
		},
		
	    slideTo: function( slide ) {
			var currentSlide = this.slides[slide];
			currentSlide.style.opacity = 1;
			
			for( var i = 0; i < this.slides.length; i++ ) {
				var slide = this.slides[i];
				if( slide !== currentSlide ) {
					slide.style.opacity = 0;
				}
			}
		},
		
		action: function() {
			var self = this;
			self.timer = setInterval(function() {
				self.index++;
				if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self.slideTo( self.index );
				
			}, 5000);
		},
		
		/* Pause/Play */
		stopStart: function() {
			var self = this;
			self.el.addEventListener( "mouseover", function() {
				clearInterval( self.timer );
				self.timer = null;
				
			}, false);
			self.el.addEventListener( "mouseout", function() {
				self.action();
				
			}, false);
		},
		
		/* Aller au slide suivant */
		nextSlide: function() {
		    var self = this;
		    self.next.addEventListener( "click", function() {
		           self.index++;
		           	if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self.slideTo( self.index );
		    })
		},
		
	    /* Aller au slide précédent */		
		prevSlide: function() {
		    var self = this;
		    self.previous.addEventListener( "click", function() {
		            self.index--;
		           	if (self.index < 0){
                    self.index = (self.slides.length - 1);
				}
				self.slideTo( self.index );
		    })	
		}
	};

	
	document.addEventListener( "DOMContentLoaded", function() {
		
		var slider = new Slideshow( "#diap" );
		
	});
})();