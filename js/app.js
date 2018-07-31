
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      latitud:-23.2794319,
      longitud: -46.7448066
    },
    zoom: 15
  });
  var infoWindow = new google.maps.InfoWindow({ map: map });

  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Você está aqui queridinho(a)');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var txtOrigin = document.getElementById('txtOrigin');
  var txtDestiny = document.getElementById('txtDestiny');
  var btnRota = document.getElementById('btnRota');
  new google.maps.places.Autocomplete(txtOrigin);
  new google.maps.places.Autocomplete(txtDestiny);
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  directionsDisplay.setMap(map);

  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: txtOrigin.value,
      destination: txtDestiny.value,
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Não encontramos a rota');
      }
    });
  };

  var tracarRota = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  btnRota.addEventListener('click', tracarRota);

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }
}
// login
 $("#btnLogin").click(function(event) {

    //Fetch form to apply custom Bootstrap validation
    var form = $("#formLogin")

    if (form[0].checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    
    form.addClass('was-validated');
  });
