'use strict';

controllers.controller('HomeCtrl', function ($location, $scope, PotagerService) {



  var vm = this;
  var path = $location.path();
  vm.listMarkers = [];

  /*vm.constructMarkers = function () {
    /**
    * Récupération potagers publiques
    */
    /*PotagerService.resource.get(function (datas) {
      vm.listePotager = datas.hives;
      var listMarkers = [];
      var tp;
      for(var i = 0; i < vm.listePotager.length;i++){
        var marker = {};
        if(vm.listePotager[i].coordinate != undefined){
          var m = "m"+ (i+1);
          marker[m] = {
            lat: Math.round(vm.listePotager[i].coordinate.lat*100)/100,
            lng: Math.round(vm.listePotager[i].coordinate.lng*100)/100,
            focus: false,
            message: vm.listePotager[i].name,
            icon: local_icons.bee_icon
          }
          console.log(marker[m]);

          listMarkers.push(marker);
        };
      }
      var convertedListMarkers = listMarkers.reduce(function(result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
        console.log(convertedListMarkers);
      }, {});;
      $scope.addMarkers(convertedListMarkers);
    });
  };*/

  var local_icons = {
    default_icon: {},
    bee_icon: {
      iconUrl: 'assets/images/bee-marker.svg',
      iconSize: [40, 66], // size of the icon
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    }
  };

  angular.extend($scope, {
    maxHeight: 200,
    icons: local_icons
  });

  var regions = {
    paris: {
      northEast: {
        lat: 48.982921,
        lng: 2.467117
      },
      southWest: {
        lat: 48.823141,
        lng: 2.25563
      }
    },
    markers: {}
  };

  $scope.setRegion = function (region) {
    if (!region) {
      $scope.maxbounds = {};
    } else {
      $scope.maxbounds = regions[region];
    }
  };

  angular.extend($scope, {
    maxbounds: regions.paris,
    defaults: {
      scrollWheelZoom: false
    }
  });

  $scope.addMarkers = function (marker) {
    angular.extend($scope, {
      markers: marker
    });
  };

  $scope.$on("leafletDirectiveMarker.dragend", function (event, args) {
    $scope.position.lat = args.model.lat;
    $scope.position.lng = args.model.lng;
  });


  vm.main_title = "CONCEPT";
  vm.conceptImageUrl = "./assets/images/home-concept.png";
  vm.features_title = "FEATURES";

  vm.featureTitle = "SELF WATERING";
  vm.featureImageUrl = "./assets/images/home-feature.png";
  vm.description = "No more over watering or under watering. Urban Potager will manage it for you";
  vm.featureTitle1 = "ENVIRONMENT";
  vm.featureImageUrl1 = "./assets/images/home-feature1.png";
  vm.description1 = "Control climatic conditions (temperature, humidity, air quality) in real-time";
  vm.featureTitle2 = "LIGHT CONTROL";
  vm.featureImageUrl2 = "./assets/images/home-feature2.png";
  vm.description2 = "Activate additional LED grow lights only when your place is too dark, or during winter-time";
  vm.featureTitle3 = "LOW CONSUMPTION";
  vm.featureImageUrl3 = "./assets/images/home-feature3.jpg";
  vm.description3 = "Urban Potager is a low voltage and low electric consumption indoor garden";
  vm.featureTitle4 = "MULTIPLE VARIETIES";
  vm.featureImageUrl4 = "./assets/images/home-feature4.jpg";
  vm.description4 = "Grow your own fresh herbs, cherry tomatoes, chili peppers, strawberries and even flowers";
  vm.featureTitle5 = "MOBILE APPLICATION";
  vm.featureImageUrl5 = "./assets/images/home-feature5.jpg";
  vm.description5 = "Monitor and adjust your indoor garden settings, and receive real-time notifications and advices";

  vm.button = "NOUS REJOINDRE";
  vm.login = function () {
    $location.path('/inscription/');
  };

  /**
  * Point d'entrée du controller
  */
/*  (function () {
    vm.constructMarkers();
  })();*/
});
