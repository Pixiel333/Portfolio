/**
* Template Name: DevFolio - v2.4.1
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function($) {
  "use strict";

  var nav = $('nav');
  var navHeight = nav.outerHeight();

  // Initiate functions
  $(document).ready(function() {
    $('.venobox').venobox({
      'share': false
    });

    function getAge(date) { 
      var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    
    //kali egg
    var egg = new Egg("k,a,l,i,l,i,n,u,x", function() {
      jQuery('#kali-linux').fadeIn(500, function() {
        window.setTimeout(function() { jQuery('#kali-linux').hide("slow"); }, 10000);
      });
    }).listen();

    //Scroll reveal
    ScrollReveal().reveal('.animate-right',{ distance: '800px', duration: 900, origin: 'right', reset: true, mobile: false});
    ScrollReveal().reveal('.animate-left',{ distance: '800px', duration: 900, origin: 'left', reset: true, mobile: false});
    ScrollReveal().reveal('.animate-top',{ distance: '300px', duration: 900, origin: 'top', reset: true, mobile: false});
    ScrollReveal().reveal('.animate-bottom',{ distance: '200px', duration: 1200, origin: 'bottom', reset: true, mobile: false});
    ScrollReveal().reveal('.animate-center-left',{ distance: '378px', duration: 1000, origin: 'left', reset: true, mobile: false, delay: 800});
    ScrollReveal().reveal('.animate-center-right',{ distance: '378px', duration: 1000, origin: 'right', reset: true, mobile: false, delay: 800});
    ScrollReveal().reveal('.animate-center-top',{ distance: '100px', duration: 800, origin: 'top', reset: true, mobile: false});
    function myCallback (el) {
      el.classList.add('card-after-animation');
    }
    ScrollReveal().reveal('.animate-center-top', { afterReveal: myCallback });
    ScrollReveal().reveal('.animate-center-right', { afterReveal: myCallback });
    ScrollReveal().reveal('.animate-center-left', { afterReveal: myCallback });

    function afterReset (el) {
      el.classList.remove('card-after-animation');
    }
    ScrollReveal().reveal('.animate-center-top', { afterReset: afterReset });
    ScrollReveal().reveal('.animate-center-right', { afterReset: afterReset });
    ScrollReveal().reveal('.animate-center-left', { afterReset: afterReset });
    //age
    var annee = document.getElementById('age');
    if (annee !== null) {
      annee.textContent = getAge(new Date("2001/03/17")).toString();
    }
    
    //annees veille home
    var annee2 = document.getElementById('anneesVeille');
    if (annee2 !== null) {
      annee2.textContent = getAge(new Date("2017/01/01")).toString();
    }

    //annees veille page de veille
    var annee3 = document.getElementById('anneesVeille2');
    if (annee3 !== null) {
      annee3.textContent = getAge(new Date("2017/01/01")).toString();
    }
  });

  $('.navbar-toggler').on('click', function() {
    if (!$('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  /*--/ Star ScrollTop /--*/
  $('.scrolltop-mf').on("click", function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  /*--/ Star Counter /--*/
  $('.counter').counterUp({
    delay: 15,
    time: 1000
  });

  /*--/ Star Scrolling nav /--*/
  var mainNav_height = $('#mainNav').outerHeight() - 22;
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var scrollto = target.offset().top - mainNav_height;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      var scrollto_initial = $(initial_nav).offset().top - mainNav_height;
      $('html, body').animate({
        scrollTop: scrollto_initial
      }, 1000, "easeInOutExpo");
    }
  }

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll').on("click", function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: navHeight
  });
  /*--/ End Scrolling nav /--*/

  /*--/ Navbar Menu Reduce /--*/
  $(window).trigger('scroll');
  $(window).on('scroll', function() {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-expand-md').addClass('navbar-reduce');
      $('.navbar-expand-md').removeClass('navbar-trans');
    } else {
      if (!$('#navbarDefault').hasClass('show')) {
        $('.navbar-expand-md').removeClass('navbar-reduce');
      }
      $('.navbar-expand-md').addClass('navbar-trans');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

  /*--/ Star Typed /--*/
  if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
    var typed = new Typed('.text-slider', {
      strings: typed_strings.split(','),
      typeSpeed: 80,
      loop: true,
      backDelay: 1100,
      backSpeed: 30
    });
  }

  /*--/ Testimonials owl /--*/
  $('#testimonial-mf').owlCarousel({
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  
})(jQuery);