(function() {
      'use strict';

    function DashboardCtrl($location, PotagerService, $localStorage) {


        if (!$localStorage.user) {
            $location.path('/inscription');
        }
        else {
            var vm = this;
            vm.title = "MES POTAGERS";
          vm.dash = undefined;

            /**
             * Appel service pour récupérer les potagers
             * @returns {*|{method, isArray, transformResponse}}
             */
            vm.getDatas = function(){
                return PotagerService.resourcePersonalGardens.query(function (datas) {
                    vm.listePotagers = datas;
                });
            };

      
            /**
             * Gestion des images aléatoires des dash
             */
            vm.addRandImages = function () {
                for(var i = 0; i < vm.listePotagers.gardens.length; i++){
                    var imagRandom = vm.getImageRandom();
                    vm.listePotagers.gardens[i].imgRand = imagRandom;
                }
            };

            vm.getImageRandom = function () {
                var temp = Math.floor((Math.random() * 18) + 1);
                return "assets/images/dashboards/"+ temp +".png";
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
