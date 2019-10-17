document.addEventListener("DOMContentLoaded", function() {
  var scrollLinks = document.querySelectorAll('[href^="#"]');
  for (var i = 0; i < scrollLinks.length; i++) {
    scrollLinks[i].addEventListener("click", scrollHandler);
  }

  function scrollHandler(event) {
    event.preventDefault();

    var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    var targetElementId = this.getAttribute("href").split("#")[1];
    var goToPosition = document.getElementById(targetElementId).offsetTop;
    var distance = goToPosition - currentPosition;

    var totalStep = 40;
    var currentStep = 0;
    var intervalTime = 5;

    var scrollby = distance / totalStep;

    var isScrollElementBody = document.scrollingElement && document.scrollingElement.tagName == "BODY";

    var interval = setInterval(function() {
      if (currentStep < totalStep) {
        isScrollElementBody ? (document.body.scrollTop += scrollby) : (document.documentElement.scrollTop += scrollby);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, intervalTime);
  }
});
