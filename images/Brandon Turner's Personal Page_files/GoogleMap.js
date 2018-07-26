$(document).ready(function (){
		
	/* Google Map
	-----------------------------------------------------*/
	
function mapInitialize() {
		
	var mapStyles =  [
	  	{
		  	"stylers": [
			  {
				  "hue": "#ff1a00"
			  },
			  {
				  "invert_lightness": true
			  },
			  {
				  "saturation": -100
			  },
			  {
				  "lightness": 33
			  },
			  {
				  "gamma": 0.5
			  }
		  	]
	  	},
	  	{
		  "featureType": "water",
		  "elementType": "geometry",
		  "stylers": [
			  {
				  "color": "#2D333C"
			  }
		  ]
	  	}
  	];
		  
	  
				  
	  var latitude = 34.0204989;
	  var longitude = -118.4117325;

	  
	  var myOptions = {
		zoom: 10,
		center: new google.maps.LatLng(latitude,longitude-0.01),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		panControl: false,
		zoomControl: false,
		scaleControl: false,
		streetViewControl: false,
		styles: mapStyles
	  };
	  
	  var map = new google.maps.Map(document.getElementById('google-map'), myOptions);
	  
	  var image = 'images/my-location.png';
	  var myLatLng = new google.maps.LatLng(latitude,longitude);
	  var myLocation = new google.maps.Marker({
		  position: myLatLng,
		  map: map,
		  icon: image
	  });
	
	}
	google.maps.event.addDomListener(window, 'load', mapInitialize);
});