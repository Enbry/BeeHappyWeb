'use strict';

controllers.controller('ProfileCtrl', function ($scope, $rootScope, $location, $localStorage, UserService, PotagerService) {

    if (!$localStorage.user) {
        $location.path("/inscription");
    }
    else {

        var vm = this;

        UserService.user.get(function(data){
            vm.user = data.user;
        });

        PotagerService.resourcePersonalGardens.get(function(data){
            console.log(data);
        });

    }

});