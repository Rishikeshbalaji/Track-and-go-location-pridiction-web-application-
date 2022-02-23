//javascript.js
//set map options
var myLatLng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


// places function

//define calcRoute function
function calcRoute(destination) {
    //create request

    var request = {
        origin: document.getElementById("id_source").value,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    console.log(document.getElementById("id_source").value)

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("id_source").value + ".<br />To: " + destination + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
            directionMap = directionsDisplay.getMap()

        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });


}


var mMoveHandler;
var infowindow
var map;
function drawplaces(destination, place) {

  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
  directionsDisplay.setMap(map);
  calcRoute(destination)
  map = directionsDisplay.getMap()


  var geocoder = new google.maps.Geocoder()
  geocoder.geocode( { 'address': destination}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
    console.log("lat", latitude, "lon", longitude)

    var myLatlng = new google.maps.LatLng(latitude, longitude);

    var myOptions = {
        zoom: 10,
        center: myLatlng,
        };

  map = map;
  google.maps.event.addListener(map, "mousedown", function (e) {

                    //lat and lng is available in e object
                    var latLng = e.latLng;
                        console.log(latLng);
                });
   var request =  {
    location: myLatlng,
    radius: 8000,
    types: [place]
};
infowindow = new google.maps.InfoWindow();

var service = new google.maps.places.PlacesService(map);


service.nearbySearch(request, callback);

  }})

}

function callback(results, status){
    if(status == google.maps.places.PlacesServiceStatus.OK){
        for (var i=0; i<results.length; i++){
        	console.log(results[i])
            createMarker(results[i]);
        }
    }}

function createMarker(place){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function(){
    	infowindow.setContent(place.name);
    	infowindow.open(map, this);

    });
}

function sendmail(){
    Email.send({
        Host: "smtp.gmail.com",
        Username: "[user-name]",
        Password: "[password]",
        To: '[to]',
        From: "[from]",
        Subject: "Sending Email using javascript",
        Body: "Danger alert sent by ---",
      }).then(message =>{
      //console.log (message);
      if(message=='OK'){
      alert('Alert mail sent!');
      }
      else{
      console.error (message);
      alert('There is error at sending message. ')
      }});
}
