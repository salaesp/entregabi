var map;
var markers = [];
var liveTweets;
var heatmap;

function initialize() {

    //Setup Google Map
    var myLatlng = new google.maps.LatLng(-34.8949073,-58.0383143);
    var light_grey_style = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];
    var myOptions = {
        zoom: 12,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        styles: light_grey_style
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    //Setup heat map and link to Twitter array we will append data to
    
    liveTweets = new google.maps.MVCArray();
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: liveTweets,
        radius: 25
    });
    heatmap.setMap(map);

    //showliveTweets();
    
    //get_markers();
}
function add_marker(o) {
    
    var image = "css/small-dot-icon.png";
    var tweetLocation = new google.maps.LatLng(o.coordinates.coordinates[1], o.coordinates.coordinates[0]);
    var marker = new google.maps.Marker({
        position: tweetLocation,
        map: map,
        icon: image,
        title: o.text
    });
    liveTweets.push(tweetLocation);
    markers.push(marker);

}

function get_markers() {
    $("#loader").show();
    $.ajax({
        url: '/test2',
	data: {search: "Simeone"},
        complete: function (data) {
            
            t = data.responseText;

            var obj = jQuery.parseJSON(t);

            var total = obj.length;
            $("#term").val("Total de tweets: "+ total);
            for (x = 0; x < total; x++)
            {
                add_marker(obj[x]); 
            }
            $("#loader").hide();
        }
    }).fail(function () {

        alert("No se pudieron cargar los tweets");

    });
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

function cleanHeatMap(){
  
  heatmap.setMap(null);
  liveTweets = new google.maps.MVCArray();
  heatmap = new google.maps.visualization.HeatmapLayer({
        data: liveTweets,
        radius: 25
    });
    heatmap.setMap(map);
}

function showliveTweets(){
  
   if(io !== undefined) {
    //alert("entro al if io");
    // Storage for WebSocket connections
    var socket = io.connect('/');

    // This listens on the "twitter-steam" channel and data is
    // received everytime a new tweet is receieved.
    socket.on('twitter-stream', function (data) {
     // alert(1);
      //Add tweet to the heat map array.
      var tweetLocation = new google.maps.LatLng(data.lng,data.lat);
      liveTweets.push(tweetLocation);

      //Flash a dot onto the map quickly
      var image = "css/small-dot-icon.png";
      var marker = new google.maps.Marker({
        position: tweetLocation,
        map: map,
        icon: image,
        title: o.text
      });
      markers.push(marker);
     // alert(marker);
      /*setTimeout(function(){
        marker.setMap(null);
      },600);*/

    });

    // Listens for a success response from the server to
    // say the connection was successful.
    socket.on("connected", function(r) {

      //Now that we are connected to the server let's tell
      //the server we are ready to start receiving tweets.
      socket.emit("start tweets");
    });
  }
  
}