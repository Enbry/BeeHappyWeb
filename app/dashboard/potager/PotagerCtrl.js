(function() {
  'use strict';

  function PotagerCtrl($location, ConfigurationService, toaster, $scope, MeasuresService) {

    var vm = this;
    var logDatas;
    vm.title = "DASHBOARD";
    //Récupération des paramètres de l'url
    vm.hive = $location.search().param;

    /**
    * Redirection vers la page de gestion du hive
    */
    vm.onEditClick = function () {
      $location.path('/gestion/').search({hive: vm.hive.slug});
    };

    /**
    * Gestion toaster alerting
    */
    vm.alertingUser = function () {
      if(vm.hasAirTemp === false || vm.hasDaylight === false || vm.hasHumidity === false || vm.hasWaterLevel === false || vm.hasWaterTemp === false){
        toaster.pop({
          type: 'info',
          title: '',
          body: "Une ou plusieurs données ne sont pas remontées",
          showCloseButton: true,
          timeout: 2000
        });
      }
      if(vm.hasConfiguration === false){
        toaster.pop({
          type: 'info',
          title: '',
          body: "Aucune configuration pour ce hive",
          showCloseButton: true,
          timeout: 2000
        });
      }
    };

    /**
    * Récupération toutes les mesures présentes dans typesMeasures
    */

    vm.getWaterLevelMeasures = function () {
      console.log(vm);
      MeasuresService.resource.get({slugHive: vm.hive.slug, slugType: "temperature-outside"}, function (datasWater) {
        if(datasWater.measures[0] != undefined){
          vm.completeWaterLevel = datasWater;
          vm.currentWaterLevel = datasWater.measures[0].value;
        }else {
          vm.hasWaterLevel = false;
        }
      });
    };
    vm.getHumidityMeasure = function () {
      MeasuresService.resource.get({slugHive: vm.hive.slug, slugType: "temperature-inside"}, function (datasHumidity) {
        if(datasHumidity.measures[0] != undefined){
          vm.completeHumidity = datasHumidity;
          vm.currentAirHumidity = datasHumidity.measures[0].value;
        }else {
          vm.hasHumidity = false;
        }
      });
    };
    vm.getWaterTempMeasure = function () {
      MeasuresService.resource.get({slugHive: vm.hive.slug, slugType: "humidity-inside"
}, function (datasWaterTemp) {
        if(datasWaterTemp.measures[0] != undefined){
          vm.completeWaterTemp = datasWaterTemp;
          vm.currentWaterTemp = datasWaterTemp.measures[0].value;
        }else {
          vm.hasWaterTemp = false;
        }
      });
    };
    vm.getAirTempMeasure = function () {
      MeasuresService.resource.get({slugHive: vm.hive.slug, slugType: "air-quality-outside"}, function (datasAirTemp) {
        if(datasAirTemp.measures[0] != undefined){
          vm.completeAirTemp = datasAirTemp;
          vm.currentAirTemp = datasAirTemp.measures[0].value;
        }else {
          vm.hasAirTemp = false;
        }
        vm.alertingUser();
      });
    };

    /**
    * Récupération configuration
    */
    /*vm.getConfig = function () {
      var hiveSlug = vm.hives.slug;
      ConfigurationService.resourceConfiguredHives.get({ slugHive: hiveSlug}, function (datas) {
        vm.configCurrentHive = datas;
        if(vm.configCurrentHive.configuration.is_watering_active){
          vm.isIrrigActive = true;
          vm.irrigation = "Irrigation active";

        }else {
          vm.isIrrigActive = false;
          vm.irrigation = "Irrigation inactive";
        }

      }, function (response) {
        //Si aucune configuration liée au hive
        if(response.status === 404){
          vm.hasConfiguration = false;
        }
      });
    };*/

    /**
    * Gestion du select
    * @type {{availableOptions: *[], selectedOption: {id: string, name: string}}}
    */
    vm.dataType = {
      availableOptions: [
        {id: '1', name: 'Humidité de l\'air'},
        {id: '2', name: 'Température Extérieure'},
        {id: '3', name: 'Température intérieure'},
        {id: '4', name: 'Qualité de l\'air'}
      ],
      selectedOption: {id: '0', name: ''}
    };
    vm.updateSelectedOption = function (selectedOption) {
      vm.freshGraph(selectedOption);
    };

    /**
    * Calcul la moyenne d'un tableau
    */
    vm.calcMoyenne = function(array) {
      var somme = 0;

      for(var j = 0; j < array.length; j++){
        somme += array[j].value;
      }
      return somme/array.length;;
    };

    /**
    * Organisation/Tri datas
    * @param datas
    * @returns {*[]}
    */
    vm.organisationDatas = function(datas){
      var datasAfterDeletedUseless = [];
      vm.datasForCurrentHour = []; vm.datasForCurrentHourLess1 = []; vm.datasForCurrentHourLess2 = []; vm.datasForCurrentHourLess3 = [];
      vm.datasForCurrentHourLess4 = []; vm.datasForCurrentHourLess5 = []; vm.datasForCurrentHourLess6 = []; vm.datasForCurrentHourLess7 = [];
      vm.datasForCurrentHourLess8 = []; vm.datasForCurrentHourLess9 = []; vm.datasForCurrentHourLess10 = []; vm.datasForCurrentHourLess11 = [];
      vm.datasForCurrentHourLess12 = [];

      //Suppression des valeurs au delà des 12 dernières heures
      for(var it = 0; it < datas.measures.length; it++){
        if(moment(datas.measures[it].created_at) <= moment()){
          datasAfterDeletedUseless.push(datas.measures[it]);
        }
      }

      //Tri des données restantes dans le bon créneau horaire
      for(var ite = 0; ite < datasAfterDeletedUseless.length; ite++){
        switch (moment(datasAfterDeletedUseless[ite].created_at).hour()){
          case moment().hour():
          vm.datasForCurrentHour.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(1, 'hour').hour():
          vm.datasForCurrentHourLess1.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(2, 'hour').hour():
          vm.datasForCurrentHourLess2.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(3, 'hour').hour():
          vm.datasForCurrentHourLess3.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(4, 'hour').hour():
          vm.datasForCurrentHourLess4.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(5, 'hour').hour():
          vm.datasForCurrentHourLess5.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(6, 'hour').hour():
          vm.datasForCurrentHourLess6.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(7, 'hour').hour():
          vm.datasForCurrentHourLess7.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(8, 'hour').hour():
          vm.datasForCurrentHourLess8.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(9, 'hour').hour():
          vm.datasForCurrentHourLess9.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(10, 'hour').hour():
          vm.datasForCurrentHourLess10.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(11, 'hour').hour():
          vm.datasForCurrentHourLess11.push(datasAfterDeletedUseless[ite]);
          break;
          case moment().subtract(12, 'hour').hour():
          vm.datasForCurrentHourLess12.push(datasAfterDeletedUseless[ite]);
          break;
          default:
          break;
        }
      }

      //Calcul les moyennes des données de chaque heure
      vm.dataForCurrHour = vm.calcMoyenne(vm.datasForCurrentHour);
      vm.dataForCurrHourLess1 = vm.calcMoyenne(vm.datasForCurrentHourLess1);
      vm.dataForCurrHourLess2 = vm.calcMoyenne(vm.datasForCurrentHourLess2);
      vm.dataForCurrHourLess3 = vm.calcMoyenne(vm.datasForCurrentHourLess3);
      vm.dataForCurrHourLess4 = vm.calcMoyenne(vm.datasForCurrentHourLess4);
      vm.dataForCurrHourLess5 = vm.calcMoyenne(vm.datasForCurrentHourLess5);
      vm.dataForCurrHourLess6 = vm.calcMoyenne(vm.datasForCurrentHourLess6);
      vm.dataForCurrHourLess7 = vm.calcMoyenne(vm.datasForCurrentHourLess7);
      vm.dataForCurrHourLess8 = vm.calcMoyenne(vm.datasForCurrentHourLess8);
      vm.dataForCurrHourLess9 = vm.calcMoyenne(vm.datasForCurrentHourLess9);
      vm.dataForCurrHourLess10 = vm.calcMoyenne(vm.datasForCurrentHourLess10);
      vm.dataForCurrHourLess11 = vm.calcMoyenne(vm.datasForCurrentHourLess11);
      vm.dataForCurrHourLess12 = vm.calcMoyenne(vm.datasForCurrentHourLess12);

      return [vm.dataForCurrHourLess12, vm.dataForCurrHourLess11, vm.dataForCurrHourLess10, vm.dataForCurrHourLess9,
        vm.dataForCurrHourLess8, vm.dataForCurrHourLess7, vm.dataForCurrHourLess6, vm.dataForCurrHourLess5,
        vm.dataForCurrHourLess4, vm.dataForCurrHourLess3, vm.dataForCurrHourLess2,  vm.dataForCurrHourLess1, vm.dataForCurrHour];
      };

      /**
      * Gestion du graph
      * @type {string[]}
      */
      vm.freshGraph = function (selectedOtion) {

        //Graph 12 dernières heures
        $scope.colours = ['#FD1F5E','#1EF9A1','#7FFD1F','#68F000'];
        $scope.labels = [];
        for(var d = 0; d < 13; d++){
          vm.currentHour = moment();
          var tempHour = 0;
          tempHour = vm.currentHour.subtract(d, 'hour').hour();
          $scope.labels.push(tempHour+"h");
        }
        $scope.labels.reverse();

        $scope.series = [vm.dataType.selectedOption.name];
        switch (selectedOtion.id) {

          case "1":
          vm.getHumidityMeasure();
          $scope.data = vm.organisationDatas(vm.completeHumidity);
          break;
          case "2":
          vm.getWaterTempMeasure();
          $scope.data = vm.organisationDatas(vm.completeWaterTemp);
          break;
          case "3":
          vm.getAirTempMeasure();
          $scope.data = vm.organisationDatas(vm.completeAirTemp);
          break;
          case "4":
          vm.getWaterLevelMeasures();
          $scope.data = vm.organisationDatas(vm.completeWaterLevel);
          break;
          default:
          break;
        }
      };


      /**
      * Téléchargement historique (@todo à implémenter quand ce sera fait au niveau de l'api)
      */
      /* var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logDatas));
      var a = document.createElement('a');
      a.href = 'data:' + data;
      a.download = 'data.json';
      a.innerHTML = 'Télécharger historique';
      var container = document.getElementById('container');
      container.appendChild(a);*/


      /**
      * Point d'entrée du controller
      */
      (function () {

        //Redirige vers le dashboard si aucun hive n'a été sélectionné
        if(typeof (vm.hive) === 'string'){
          $location.path('/dashboard')
        }
        vm.getWaterLevelMeasures();
        vm.getAirTempMeasure();
        vm.getWaterTempMeasure();
        vm.getHumidityMeasure();
        vm.freshGraph({id: "0", name: ""}); //option settée par défaut dans le select
      })();
}

    controllers.controller('PotagerCtrl', PotagerCtrl);
  }());
