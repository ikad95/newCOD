
function initMap () {
        var map = new google.maps.Map(document.getElementById('map_static'), {
          center: {lat: 22.57, lng: 88.3629},
          zoom: 13,
          scrollwheel: false,
          draggable: false,
          disableDoubleClickZoom: true,
          disableDefaultUI: true
        });
      }
      var address;
      var to;
      function IinitMap() {
        var geocoder = new google.maps.Geocoder;
	var map = new google.maps.Map(document.getElementById('map_static'), {
          center: {lat: 22.57, lng: 88.3629},
          zoom: 13,
          scrollwheel: false,
          draggable: false,
          disableDoubleClickZoom: true,
          disableDefaultUI: true
        });
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 22.57, lng: 88.3629},
          zoom: 13
        });
        map.setOptions({ draggableCursor: 'pointer' });
        var input = /** @type {!HTMLInputElement} */(
            document.getElementById('map-input'));
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        google.maps.event.addListener(map, "click", function(event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var latlng = new google.maps.LatLng(lat, lng);
            marker.setPosition(latlng);
            $.ajax({ 
              type: 'GET', 
              url: "http://maps.googleapis.com/maps/api/geocode/json", 
              data: { latlng: marker.getPosition().lat()+","+marker.getPosition().lng() }, 
              dataType: 'json',
              success: function (response) { 
                  document.getElementById('map-input').value = response['results'][0]['formatted_address'];
              }
          });

        });
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          draggable: true,
          icon: 'img/marker2.png',
          position: {lat:22.5726,lng:88.3639},
          anchorPoint: new google.maps.Point(0, -29)
        });
        marker.addListener('dragend',function(event) {
          var latlng = {lat:marker.getPosition().lat(), lng:marker.getPosition().lng()};
          //window.open("http://maps.googleapis.com/maps/api/geocode/json?latlng="+marker.getPosition().lat()+","+marker.getPosition().lng()+"&sensor=true;")
          //geocodeLatLng(geocoder, map, latlng);
          $.ajax({ 
              type: 'GET', 
              url: "http://maps.googleapis.com/maps/api/geocode/json", 
              data: { latlng: marker.getPosition().lat()+","+marker.getPosition().lng() }, 
              dataType: 'json',
              success: function (response) { 
                  document.getElementById('map-input').value = response['results'][0]['formatted_address'];
              }
          });          

        });

        marker.addListener('click', function() {
          var latlng = {lat:marker.getPosition().lat(), lng:marker.getPosition().lng()};
          //geocodeLatLng(geocoder, map, latlng);
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(true);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
          //got address make api call!
          //bookApiCall(address+","+marker.getPosition().lat()+","+marker.getPosition().lat());
          
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
          infowindow.open(map, marker);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-establishment', ['establishment']);
        setupClickListener('changetype-geocode', ['geocode']);
      }