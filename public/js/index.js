window.onload = function () {
    // Initialization operations
    window.onbeforeunload = function(){ window.scrollTo(0,0); }
    resizeAdjust();
    window.onresize = function () { resizeAdjust(); }

    // Ensures that page spacing is maintained when the window is resized
    function resizeAdjust() {
        var pages = document.getElementsByClassName('page');
        for(var i=0; i<pages.length; i++) {
            pages[i].style.height = window.innerHeight;
        }
    }

    // Scroll event handler: footer fade, layout manipulation
    var lastScroll = 0;         // Used to determine if scrolling up or down
    var fadeTimer = null;       // Used to determine if footer should fade in
    window.onscroll = function () {
        /* Fades out the footer on scroll and sets a timer to fade it back in
         * after 150 ms of not scrolling*/
        $('#footer').fadeOut();
        if(fadeTimer !== null) { clearTimeout(fadeTimer); }
        fadeTimer = setTimeout(function() { $('#footer').fadeIn(); }, 300);
        scroll =window.scrollY;

        // Object passed into scroll functions
        scrollVariables = {
            // Used to fade the nav in or out depending on if scrolling up or down
            spacer:document.getElementById('home-spacer').getBoundingClientRect().bottom,
            nav:document.getElementById('home-nav').getBoundingClientRect().top,

            // Used to swap displaying the landing page and the final page
            portfolioTop:document.getElementById('portfolio').getBoundingClientRect().top,

            // Used to slide in packages and questionnaire elements from the side
            spacer1Top:document.getElementById('spacer1').getBoundingClientRect().top,
            spacer2Top:document.getElementById('spacer2').getBoundingClientRect().top,
            spacer3Top:document.getElementById('spacer3').getBoundingClientRect().top,
            spacerEnd:document.getElementById('spacer3').getBoundingClientRect().bottom
        };

        if (scroll > lastScroll) { scrollDown(scrollVariables); }
        else { scrollUp(scrollVariables); }
        lastScroll = window.scrollY;
    }

    // Layout manipulation effect on scroll down events
    function scrollDown(obj) {
        if (obj.spacer < obj.nav) { $('#nav').fadeIn(); }
        if (obj.portfolioTop < 0) {
            document.getElementById('pricing').style.display = 'inline';
            document.getElementById('home').style.display = 'none';
        }
        if (obj.spacer1Top < 0 && obj.spacer3Top > window.innerHeight) {
            document.getElementById('packages').style.left =
                "-" + (((window.innerHeight + obj.spacer1Top)/window.innerHeight) * 100) + "%";
        } else if (obj.spacer2Top < 0 && obj.spacer3Top < window.innerHeight) {
            document.getElementById('survey').style.left =
                (((window.innerHeight + obj.spacer2Top)/window.innerHeight) * 100) + "%";
        }
    }

    // Layout manipulation effect on scroll up events
    function scrollUp(obj) {
        if (obj.spacer > obj.nav) { $('#nav').fadeOut(); }
        if (obj.portfolioTop > 0) {
            document.getElementById('pricing').style.display = 'none';
            document.getElementById('home').style.display = 'inline';
        }
        if (obj.spacer2Top > 0 && (obj.spacer3Top - window.innerHeight) > 0) {
            document.getElementById('survey').style.left = 100+"%";
            document.getElementById('packages').style.left =
                "-" + (((window.innerHeight + obj.spacer1Top)/window.innerHeight) * 100) + "%";
        } else if (obj.spacer2Top < 0 && (obj.spacer3Top - window.innerHeight) < 0) {
            document.getElementById('survey').style.left =
                (((window.innerHeight + obj.spacer2Top)/window.innerHeight) * 100) + "%";
        }
    }

    // Adds scroll handlers for click events to the portfolio display's arrows
    var arrows = document.getElementsByClassName('arrow');
    var display = document.getElementById('display');
    var sampleCount = display.getElementsByTagName('img').length;
    var sample = 1;
    for (var i=0; i<arrows.length; i++) {
        arrows[i].onclick = function() {
            width = parseInt((window.getComputedStyle(display, null)).width, 10);
            if (this.id == 'arrowR') {
                if (sample == sampleCount) {
                    $('#display').animate({scrollLeft: '-='+width}); sample = 1;
                } else {
                    $('#display').animate({scrollLeft: '+='+width}); sample++;
                }
            } else {
                if (sample == 1) {
                    $('#display').animate({scrollLeft: '+='+width}); sample = sampleCount;
                } else {
                    $('#display').animate({scrollLeft: '-='+width}); sample--;
                }
            }
        }
    }

    var pricingButtons = document.getElementsByClassName('pricing');
    for (var i=0; i<pricingButtons.length; i++) {
        pricingButtons[i].onclick = function() {
            document.getElementById('packages').style.left = -100+"%";
            document.getElementById('survey').style.left = 100+"%";
        }
    }

}
