
(function($) {
  "use strict";

  let calInitialized = {
    "rdv-physique": false,
    "rdv-visio": false
  };

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
    //annees veille page de veille
    var annee3 = document.getElementById('anneesVeille2');
    if (annee3 !== null) {
      annee3.textContent = getAge(new Date("2017/01/01")).toString();
    }
    //kali egg
    var egg = new Egg("k,a,l,i,l,i,n,u,x", function() {
      // Crée une nouvelle div HTML
      var newDiv = $("<div>").attr("id", "kali-egg");
        
      // Ajoute la nouvelle div à la fin du body
      newDiv.appendTo("body");

      // Applique un style à la nouvelle div pour la positionner devant les autres éléments
      newDiv.css({
        "position": "absolute",
        "top": "0",
        "left": "0",
        "z-index": "9999"
      });

      // Charge la page "test.html" dans la div avec l'ID "ma-div"
      $("#kali-egg").load("kalilinux.html", function() {
        // Affiche la page après qu'elle ait fini de charger
        $(this).fadeIn(500);
      });
      
      // Cache la page après 10 secondes
      setTimeout(function() {
        $("#kali-egg").hide();
      }, 10000); // 10000 millisecondes = 10 secondes

      setTimeout(function() {
        newDiv.remove();
      }, 10000);
    }).listen();
    

    //Scroll reveal
    ScrollReveal().reveal('.animate-right',{ distance: '800px', duration: 900, origin: 'right', reset: true, mobile: false});
    ScrollReveal().reveal('.animate-left',{ distance: '800px', duration: 900, origin: 'left', reset: true, mobile: false});
    ScrollReveal().reveal('.animate-top',{ distance: '300px', duration: 900, origin: 'top', reset: true, mobile: false});
    ScrollReveal().reveal('.animate-bottom',{ distance: '100px', duration: 1000, origin: 'bottom', reset: true, mobile: false});
    ScrollReveal().reveal('.animate-bottom-noReset',{ distance: '50px', duration: 1000, origin: 'bottom', reset: false, mobile: true});
    ScrollReveal().reveal('.animate-center-left',{ distance: '378px', duration: 1000, origin: 'left', reset: true, mobile: false, delay: 500});
    ScrollReveal().reveal('.animate-center-right',{ distance: '378px', duration: 1000, origin: 'right', reset: true, mobile: false, delay: 500});
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
    
    // Function to initialize Cal
    function initializeCal() {
      // Remove any existing Cal instances in the rdv-content sections
      $('.rdv-content').empty();

      // Get the active div
      let activeRdvContentDiv = $('.rdv-content.active').first();
      let activeRdvContentDivId = activeRdvContentDiv.attr('id');
      let link = activeRdvContentDivId === "rdv-visio" ? "allan-chapuis/rdv-visio-ou-tel" : "allan-chapuis/rdv-physique";

      // Initialize Cal with the appropriate link
      Cal("inline", {
        elementOrSelector: "#" + activeRdvContentDivId,
        calLink: link,
        layout: "month_view"
      });
      Cal("ui", {
        styles: {
          branding: {
            brandColor: "#39b87d"
          }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    }

    // Function to initialize the floating button if not already initialized
    function initializeFloatingButton() {
      if (!calInitialized) {
        Cal("floatingButton", {
          calLink: "allan-chapuis/demande-de-devis",
          hideButtonIcon: false,
          buttonColor: "#1e1e1e",
          buttonTextColor: "#39b87d",
          buttonPosition: "bottom-left",
          buttonText: "Demander un devis"
        });
        Cal("ui", {
          styles: {
            branding: {
              brandColor: "#39b87d"
            }
          },
          hideEventTypeDetails: false,
          layout: "month_view"
        });
        calInitialized = true; // Set the flag to true after initialization
      }
    }

    // Function to toggle appointment types
    function toggleAppointmentType() {
      if ($('#toggleSwitch').is(':checked')) {
        $('#rdv-physique').removeClass('active');
        $('#rdv-visio').addClass('active');
        $('#titreRdv').text('Prendre un rendez vous en visio :');
        $('#toggleLabel').removeClass('grayed-out');
        Cal("preload", {calLink: "allan-chapuis/rdv-physique"})
      } else {
        $('#rdv-visio').removeClass('active');
        $('#rdv-physique').addClass('active');
        $('#titreRdv').text('Prendre un rendez vous :');
        $('#toggleLabel').addClass('grayed-out');
        Cal("preload", {calLink: "allan-chapuis/rdv-visio-ou-tel"})
      }
      initializeCal(); // Reinitialize Cal with the new active div
      $('cal-modal-box').hide(); // Cacher le bouton flottant
    }

    // Initial setup
    if ($('#toggleSwitch').is(':checked')) {
      $('#rdv-visio').addClass('active');
    } else {
      $('#rdv-physique').addClass('active');
    }
    initializeCal();

    // Initialize the floating button on page load
    initializeFloatingButton();

    // Event listener for toggle switch
    $('#toggleSwitch').change(toggleAppointmentType);

    //annees veille home
    var annee2 = document.getElementById('anneesVeille');
    if (annee2 !== null) {
      annee2.textContent = getAge(new Date("2017/01/01")).toString();
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

  // Scroll to contact
  $(document).ready(function() {
    // Ajouter un gestionnaire d'événements de clic au bouton
    $('.scroll-to-contact').click(function() {
      // Animer le défilement vers la section avec l'ID 'contact'
      $('html, body').animate({
        scrollTop: $('#contact').offset().top
      }, 1500, 'easeInOutExpo');
      return false;
    });
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
})(jQuery);