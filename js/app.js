var myApp = angular.module('myApp', ["ngRoute"]);

//Create the routes with .config
myApp.config(function($routeProvider) {
  $routeProvider
    .when("/create", {
      templateUrl: "partials/create.html",
      controller: "CreateCtrl"
    })
    .when("/connect", {
      templateUrl: "partials/connect.html",
      controller: "ConnectCtrl"
    })
    .when("/home", {
      templateUrl: "partials/home.html",
      controller: "HomeCtrl"
    })
    .when("/hoteList", {
      templateUrl: "partials/hotel-list.html",
      controller: "HotelListCtrl"
    })
    .when("/reservation", {
      templateUrl: "partials/reservation.html",
      controller: "KartListCtrl"
    })

    .otherwise ({
      redirectTo: "/home"
    });
});

//Create controller
myApp.controller("HomeCtrl", function($scope, hotelService) {

});
myApp.controller("CreateCtrl", function($scope) {

  return {
    restrict: 'A', // S'utilise uniquement en tant qu'attribut
    scope: true,
    require: 'ngModel',
    link: function (scope, elem, attrs, control) {
        var check = function () {
            //Valeur du champs courant
            var v1 = scope.$eval(attrs.ngModel); // attrs.ngModel = “ConfirmPassword”

            //valeur du champ à comparer
            var v2 = scope.$eval(attrs.CreateCtrl).$viewValue; // attrs.equalsTo = “Password”

            return v1 == v2;
        };

        scope.$watch(check, function (isValid) {
            // Défini si le champ est valide
            control.$setValidity("CreateCtrl", isValid);
        });
    }
  };

});

myApp.controller("ConnectCtrl", function($scope) {

});
myApp.controller("HeaderCtrl", function($scope, $location) {
  $scope.appDetails = {};
  $scope.appDetails.title = "HoBook";
//Code for the active class
  $scope.nav = {};
  $scope.nav.isActive = function(path) {
    if(path===$location.path()) {
      return true;
    }
    return false;
  }
  });

  myApp.controller("KartListCtrl", function($scope, kartService) {
  $scope.kart = kartService.getKart();
  $scope.buy = function(hotel){
    kartService.buy(hotel);
  }
});

  myApp.controller("HotelListCtrl", function($scope, hotelService, kartService) {
  	$scope.hotels = hotelService.getHotels();

  	$scope.addToKart = function(hotel) {
  	kartService.addToKart(hotel);
  	}
  });
  myApp.controller("KartListCtrl", function($scope, kartService) {

  $scope.kart = kartService.getKart();
  $scope.buy = function(hotel){
    kartService.buy(hotel);
  }
});

//Create services with factory
//Create another factory
myApp.factory("kartService", function() {
  var kart = [];

  return {
    getKart: function() {
      return kart;
    },
    addToKart: function(hotel) {
      kart.push(hotel);
    },
    buy: function(hotel) {
      alert("HoBook vous remercie pour cette réservation: " + hotel.name);
    }
  }
});
  myApp.factory("hotelService", function() {
    var hotels = [
      {
        "name": "Corinthia Hotel Budapest",
        "stars": 5,
        "description": "Hotel de charme",
        "photos": [
            "/photos/hotel/corinthiahotelbudapest/1.jpg",
            "/photos/hotel/corinthiahotelbudapest/2.jpg",
            "/photos/hotel/corinthiahotelbudapest/3.jpg"
        ],
        "currency": "€",
        "rooms": [{
            "type": "Supérieur Double",
            "number": 20,
            "description": "Parfait pour dormir avec son anaconda",
            "photos": [
                "/photos/room/corinthiahotelbudapest/1.jpg",
                "/photos/room/corinthiahotelbudapest/5.jpg"
            ],
            "price": 730
        }, {
            "type": "Chambre Double Deluxe",
            "number": 50,
            "description": "Il se dit qu'un maitre shaolin a dormit ici!",
            "photos": [
                "/photos/room/corinthiahotelbudapest/2.jpg",
                "/photos/room/corinthiahotelbudapest/4.jpg"
            ],
            "price": 920
        }, {
            "type": "Chambre Double Luxe",
            "number": 25,
            "description": "Parfait pour vous reposer entre deux vols si vous êtes un homme d'affaire!",
            "photos": [
                "/photos/room/corinthiahotelbudapest/3.jpg",
                "/photos/room/corinthiahotelbudapest/6.jpg"
            ],
            "price": 1120
        }, {
            "type": "Suite",
            "number": 15,
            "description": "Si vous êtes 3 ou plus ou que vous avez envie d'une chambre pour un film d'action cette chambre est pour vous",
            "photos": [
                "/photos/room/corinthiahotelbudapest/3.jpg",
                "/photos/room/corinthiahotelbudapest/6.jpg"
            ],
            "price": 1200
        }],
        "reviews": [{
            "name": "Blue l'oiseau",
            "review": "Non mais c'est géniale, j'ai même eu le droit à ma vollière",
            "rating": 4
        }]
    }, {
        "name": "Grand Hotel Palatino",
        "stars": 4,
        "description": "A 5 minutes du Colisée, cette hôtel vous raviera, si vous souhaitez visiter Rome et ses alentours.",
        "photos": ["/photos/hotel/grandhotelpalatino/1.jpg", "/photos/hotel/grandhotelpalatino/2.jpg", "/photos/hotel/grandhotelpalatino/3.jpg"],
        "currency": "€",
        "rooms": [{
            "type": "Chambre Double Standard +",
            "number": 10,
            "description": "Une chambre de bonne quoi",
            "photos": ["/photos/room/grandhotelpalatino/2.jpg", "/photos/room/grandhotelpalatino/5.jpg"],
            "price": 312.5
        }, {
            "type": "Chambre Double Standar + +",
            "number": 25,
            "description": "Un peu plus grande que la première",
            "photos": ["/photos/room/grandhotelpalatino/3.jpg", "/photos/room/grandhotelpalatino/2.jpg"],
            "price": 322.5
        }, {
            "type": "Chambre Double Supérieur",
            "number": 3,
            "description": "Chambre de ouf",
            "photos": ["/photos/room/grandhotelpalatino/1.jpg"],
            "price": 352.5
        }, {
            "type": "Chambre Triple",
            "number": 13,
            "description": "Pour 3 personnes oklm",
            "photos": ["/photos/room/grandhotelpalatino/3.jpg"],
            "price": 452.5
        }, {
            "type": "Suite",
            "number": 13,
            "description": "On a pas la piscine dans la chambre mais c'est une suite quand même",
            "photos": ["/photos/room/grandhotelpalatino/4.jpg"],
            "price": 1400
        }],
        "reviews": [{
            "name": "Mister Spleen",
            "review": "Super hotel",
            "rating": 4
        }, {
            "name": "Miss Spleen",
            "review": "On a vu un monsieur en blanc embrasser des enfants !",
            "rating": 5
        }]
    }, {
        "name": "Hotel Dann Carlton Belfort Medellin",
        "stars": 5,
        "description": "Hotel en plein coeur de Belfort avec une magnifique vue et une piscine",
        "photos": ["/photos/hotel/danncarltonbelfort/1.jpg", "/photos/hotel/danncarltonbelfort/2.jpg"],
        "currency": "€",
        "rooms": [{
            "type": "Chambre simple",
            "number": 50,
            "description": "Une petite chambre à 1000€ ouai et alors ?",
            "photos": ["/photos/room/danncarltonbelfort/2.jpg", "/photos/room/danncarltonbelfort/5.jpg"],
            "price": 1000
        }, {
            "type": "Chambre double",
            "number": 30,
            "description": "Une chambre double à 1200€ ouai et alors ?",
            "photos": ["/photos/room/danncarltonbelfort/4.jpg", "/photos/room/danncarltonbelfort/3.jpg"],
            "price": 1200
        }, {
            "type": "Suite",
            "number": 10,
            "description": "Petite suite tout confort, on offre la première bouteille le reste est payant et surtout on vole pas les peignoires",
            "photos": ["/photos/room/danncarltonbelfort/1.jpg"],
            "price": 2500
        }],
        "reviews": [{
            "name": "Gandalf",
            "review": "J'ai essayé de rentrer mais un vigile ma dit : vous ne passerez pas !",
            "rating": 2
        },{
            "name": "Frodo",
            "review": "Il y a sacquet à volonté !",
            "rating": 5
        },{
            "name": "Golum",
            "review": "J'ai pris une chambre double pour mon précieu et moi c'était géniale !",
            "rating": 5
        }]
    }];

    return {
      getHotels: function() {
        return hotels;
      }
    }
  });
