angular.module('starter')
        .controller('PlaceCtrl', function (
                $scope,
                $stateParams,
                placeDetailsFactory
                ) {
            var place = placeDetailsFactory.getTempPlaceDetails();
            $scope.place = place;
            $scope.placeId = $stateParams.placeId;
            $scope.myLocation = placeDetailsFactory.getTempLocation();
            $scope.placeLocation = {latitude: place.venue.location.lat, longitude: place.venue.location.lng, };

            var formattedAddressOfPlace = place.venue.location.formattedAddress.join(", ");

            var markers = [
                {
                    "title": 'My location',
                    "lat": $scope.myLocation.latitude,
                    "lng": $scope.myLocation.longitude,
                    "description": "This is my location"
                }
                ,
                {
                    "title": 'Venue location',
                    "lat": $scope.placeLocation.latitude,
                    "lng": $scope.placeLocation.longitude,
                    "description": formattedAddressOfPlace
                }
            ];
            var mapOptions = {
                center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var infoWindow = new google.maps.InfoWindow();
            var lat_lng = new Array();
            var latlngbounds = new google.maps.LatLngBounds();
            for (i = 0; i < markers.length; i++) {
                var data = markers[i];
                var myLatlng = new google.maps.LatLng(data.lat, data.lng);
                lat_lng.push(myLatlng);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: data.title
                });
                latlngbounds.extend(marker.position);
                (function (marker, data) {
                    google.maps.event.addListener(marker, "click", function (e) {
                        infoWindow.setContent(data.description);
                        infoWindow.open(map, marker);
                    });
                })(marker, data);
            }
            map.setCenter(latlngbounds.getCenter());
            map.fitBounds(latlngbounds);

            //***********ROUTING****************//

            //Initialize the Path Array
            var path = new google.maps.MVCArray();

            //Initialize the Direction Service
            var service = new google.maps.DirectionsService();

            //Set the Path Stroke Color
            var poly = new google.maps.Polyline({map: map, strokeColor: '#4986E7'});

            //Loop and Draw Path Route between the Points on MAP
            for (var i = 0; i < lat_lng.length; i++) {
                if ((i + 1) < lat_lng.length) {
                    var src = lat_lng[i];
                    var des = lat_lng[i + 1];
                    path.push(src);
                    poly.setPath(path);
                    service.route({
                        origin: src,
                        destination: des,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    }, function (result, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                                path.push(result.routes[0].overview_path[i]);
                            }
                        }
                    });
                }
            }

        });