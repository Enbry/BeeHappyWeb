(function() {
      'use strict';

    function DashboardCtrl($location, PotagerService, $localStorage) {


        if (!$localStorage.user) {
            $location.path('/inscription');
        }
        else {
            var vm = this;
            vm.title = "Mes Ruches";
          vm.dash = undefined;

            /**
             * Appel service pour récupérer les potagers
             * @returns {*|{method, isArray, transformResponse}}
             */
            vm.getDatas = function(){
                return PotagerService.resourcePersonalHives.query(function (datas) {
                    vm.listePotagers = datas;
                    console.log(datas);

                });
            };

            /**
             * Gestion des images aléatoires des dash
             */
            vm.addRandImages = function () {
                for(var i = 0; i < vm.listePotagers.hives.length; i++){
                    var imagRandom = vm.getImageRandom();
                    vm.listePotagers.hives[i].imgRand = imagRandom;
                }
            };

            vm.getImageRandom = function () {
                var temp = Math.floor((Math.random() * 5) + 1);
                return "assets/images/dashboards/"+ temp +".jpg";
            };

            /**
             * Redirige l'utilisateur sur le potager sélectionné
             * @param p
             */
            vm.selectedPotager = function(p){
                $location.path('/potager/').search({param: p});
            };
         }
      }
      controllers.controller('DashboardCtrl', DashboardCtrl);
  }());
