'use strict';

controllers.controller('GestionCtrl', function ($location, $window, $route, PotagerService, $q, ConfigurationService, AlertService, TypeService, AccessService, $localStorage, OpenStreetMapService, $scope) {


        if (!$localStorage.user)
        {
            $location.path('/inscription');
        } else {
            var vm = this;
            var path = $location.path();
            vm.title = "Page gestion";
            vm.longitude = 40.095;
            vm.latitude = -3.823;
            vm.editHive = false;
            vm.editConfiguration = false;
            vm.changeConfiguration = false;
            vm.newConfiguration = false;
            vm.newAlert = false;
            vm.changeAlert = false;
            vm.changeAlertValue=0;
            vm.editAlert = false;
            vm.editAlerts = [];
            vm.comparisonTable = [
                "==",
                "!=",
                "<",
                ">",
                "<=",
                ">="
            ];
            vm.configurationModel = {
                "name": null,
                "description": null,
                "lightTreshold": null,
                "lightingStart": {
                    "hour": null,
                    "minute": null
                },
                "lightingEnd": {
                    "hour": null,
                    "minute": null
                },
                "isWateringActive": null,
                "wateringStart": {
                    "hour": null,
                    "minute": null
                },
                "wateringEnd": {
                    "hour": null,
                    "minute": null
                }
            };
            vm.alertModel = {
                "name": null,
                "description": null,
                "message": null,
                "type": null,
                "comparison": null,
                "threshold": null
            };


            var mainMarker = {
                lat: vm.latitude,
                lng: vm.longitude,
                focus: true,
                draggable: false
            };

            angular.extend($scope, {
                markers: {
                    mainMarker: {
                        lat: 42,
                        lng: 42,
                        focus: true,
                        draggable: true
                    }
                },
                center: {
                    lat: 40.095,
                    lon: -3.823,
                    zoom: 8
                }
            });

            //Récupération des paramètres de l'url
            var params = $location.search();

            if(params.configuration)
            {

                vm.page = "configuration";

                ConfigurationService.resourceConfig.get({slug: params.configuration}, function (datas) {
                    console.log(datas);

                    vm.configuration = datas.configuration;

                    vm.configurationCopy = {
                        "name": vm.configuration.name,
                        "description": vm.configuration.description,
                        "lightTreshold": vm.configuration.light_treshold,
                        "lightingStart": {
                            "hour":vm.getHours(vm.configuration.lighting_start),
                            "minute": vm.getMinutes(vm.configuration.lighting_start)
                        },
                        "lightingEnd": {
                            "hour":vm.getHours(vm.configuration.lighting_end),
                            "minute": vm.getMinutes(vm.configuration.lighting_end)
                        },
                        "isWateringActive": vm.configuration.is_watering_active,
                        "wateringStart": {
                            "hour":vm.getHours(vm.configuration.watering_start),
                            "minute": vm.getMinutes(vm.configuration.watering_start)
                        },
                        "wateringEnd": {
                            "hour":vm.getHours(vm.configuration.watering_end),
                            "minute": vm.getMinutes(vm.configuration.watering_end)
                        }
                    };
                });


              }else if (params.hive)
            {

                vm.page = "potager";

                PotagerService.resource.get({slug: params.hive}, function(datas){
                    console.log(datas);

                    vm.hive = datas.hive;

                    //vm.hiveCopy = angular.copy(vm.hive);
                    vm.hiveCopy = {
                        "name": vm.hive.name,
                        "description": vm.hive.description,
                        "isPublic": vm.hive.isPublic,
                        //"latitude": parseFloat(vm.hive.coordinate.lat),
                        //"longitude": parseFloat(vm.hive.coordinate.lng),
                        "showLocation": vm.hive.show_location,
                        "country": vm.hive.address.country,
                        "city": vm.hive.address.city,
                        "zipCode": vm.hive.address.zipCode,
                        "address1": vm.hive.address.line1,
                        "address2": vm.hive.address.line2
                    };

                    ConfigurationService.resourceConfiguredHives.get({slugHive: params.hive}, function (datas) {

                        vm.configuration = datas.configuration;

                        //vm.configurationCopy = angular.copy(vm.configuration);

                        vm.configurationCopy = {
                            "name": vm.configuration.name,
                            "description": vm.configuration.description,
                            "lightTreshold": vm.configuration.light_treshold,
                            "lightingStart": {
                                "hour":vm.getHours(vm.configuration.lighting_start),
                                "minute": vm.getMinutes(vm.configuration.lighting_start)
                            },
                            "lightingEnd": {
                                "hour":vm.getHours(vm.configuration.lighting_end),
                                "minute": vm.getMinutes(vm.configuration.lighting_end)
                            },
                            "isWateringActive": vm.configuration.is_watering_active,
                            "wateringStart": {
                                "hour":vm.getHours(vm.configuration.watering_start),
                                "minute": vm.getMinutes(vm.configuration.watering_start)
                            },
                            "wateringEnd": {
                                "hour":vm.getHours(vm.configuration.watering_end),
                                "minute": vm.getMinutes(vm.configuration.watering_end)
                            }
                        };
                    });

                    ConfigurationService.resourceConfig.get({}, function (datas) {
                        console.log(datas);

                        vm.configurations = datas.configurations;
                    });

                    AlertService.resourceAlertHives.get({slugHive: params.hive}, function(datas) {
                        console.log(datas);

                        vm.alerts = datas.alerts;

                        vm.alertsCopy = angular.copy(vm.alerts);


                    });


                    TypeService.resourceType.get({}, function(datas){
                        vm.types = datas.types;
                    });

                    AlertService.resourceAlert.get({}, function(datas){
                        vm.userAlerts = datas.alerts;
                    });

                });



            } else if (params.alert)
            {
                vm.page = "alert";


                AlertService.resourceAlert.get({slug: params.alert}, function (datas) {
                    console.log(datas);

                    vm.alert = datas.alert;

                    vm.alertCopy = angular.copy(vm.alert);

                    vm.alertCopy = {
                        "comparison": vm.alert.comparison,
                        "description": vm.alert.description,
                        "message": vm.alert.message,
                        "name": vm.alert.name,
                        "threshold": vm.alert.threshold,
                        "type": vm.alert.type
                    };


                    TypeService.resourceType.get({}, function(datas){
                        vm.types = datas.types;
                    });

                    AlertService.resourceAlert.get({}, function(datas){
                        vm.alerts = datas.alerts;
                    });
                });


            } else if ($location.hash() === "newhive")
            {
                vm.page = "newhive";

                vm.hive = {
                    "name": null,
                    "description": null,
                    "isPublic": null,
                    "latitude": 42,
                    "longitude": 42,
                    "showLocation": null,
                    "country": null,
                    "city": null,
                    "zipCode": null,
                    "address1": null,
                    "address2": null
                };
            } else
            {

                //if($location)
                vm.page = "index";

                ConfigurationService.resourceConfig.get({}, function (datas) {
                    vm.configurations = datas.configurations;
                });

                AlertService.resourceAlert.get({}, function (datas) {

                    vm.alerts = datas.alerts;
                });

            }

            vm.getHours = function (phpDate)
            {
                return new Date(phpDate).getUTCHours();
            };

            vm.getMinutes = function (phpDate)
            {
                return new Date(phpDate).getUTCMinutes();
            };

            vm.reset = function(type, action, index)
            {
                if(type === "alert")
                {
                    if(action === "edit")
                    {
                        if(index === "solo")
                        {
                            vm.editAlert = false;
                        } else {
                            vm.editAlerts[index] = false;
                        }
                    } else if(action === "new")
                    {
                        vm.newAlert = false;
                    } else if(action === "change")
                    {
                        vm.changeAlert = false;
                    }
                } else if(type === "configuration")
                {
                    if(action === "edit")
                    {
                        vm.editConfiguration = false;
                    } else if(action === "change")
                    {
                        vm.changeConfiguration = false;
                    } else if (action === "new")
                    {
                        vm.newConfiguration = false;
                    }
                } else if (type === "potager")
                {
                    vm.editHive = false;
                }
            };

            vm.display = function(type, action, index)
            {
                if(type === "alert")
                {
                    if(action === "edit")
                    {
                        if(index === "solo")
                        {
                            vm.editAlert = true;
                        } else {
                            vm.editAlerts[index] = true;
                        }
                        vm.newAlert = false;
                        vm.changeAlert = false;
                    } else if(action === "new")
                    {
                        vm.editAlerts = false;
                        vm.newAlert = true;
                        vm.changeAlert = false;
                    } else if(action === "change")
                    {
                        vm.editAlerts = false;
                        vm.newAlert = false;
                        vm.changeAlert = true;
                    }

                } else if(type === "configuration")
                {
                    if(action === "edit")
                    {
                        vm.editConfiguration = true;
                        vm.changeConfiguration = false;
                        vm.newConfiguration = false;
                    } else if(action === "change")
                    {
                        vm.editConfiguration = false;
                        vm.changeConfiguration = true;
                        vm.newConfiguration = false;
                    } else if (action === "new")
                    {
                        vm.editConfiguration = false;
                        vm.changeConfiguration = false;
                        vm.newConfiguration = true;
                    }
                } else if (type === "potager")
                {
                    vm.editHive = true;
                }
            };

            vm.new = function(type, model, slugHive)
            {
                if(type==="configuration")
                {
                    ConfigurationService.resourceConfig.post({}, model ,function (datas){
                        ConfigurationService.resourceConfiguredHives.post({slugHive: slugHive, slugConfiguration: datas.configuration.slug},function(datas) {
                            $route.reload();
                        });

                    });
                } else if (type==="alert")
                {
                    AlertService.resourceAlert.post({}, model, function (datas) {
                        console.log(datas);
                        AlertService.resourceAlertHives.post({slugHive: slugHive, slugAlert:datas.alert.slug}, function(datas){
                            $route.reload();
                        })

                    });
                } else if (type==="potager")
                {
                    console.log(model);
                    PotagerService.resource.post({}, model, function(datas){
                        $location.path(path).search({hive: datas.garden.slug});
                    });
                }
            };

            vm.edit = function(type, slug, changes)
            {
                if (type === "configuration")
                {
                    ConfigurationService.resourceConfig.patch({slug: slug}, changes ,function (datas){
                        $route.reload();
                    });
                } else if (type === "alert")
                {
                    console.log(changes);
                    delete changes.slug;
                    AlertService.resourceAlert.patch({slug: slug}, changes, function(datas){
                        $route.reload();
                    });
                } else if (type === "potager")
                {
                    PotagerService.resource.patch({slug: slug}, changes, function(datas){

                        $route.reload();
                    });
                }
            };

            vm.change = function(type, slugHive, slug)
            {
                if(type === "configuration")
                {
                    if(vm.configuration)
                    {
                        ConfigurationService.resourceConfiguredHives.delete({slugHive: slugHive}, function (datas){});
                    }

                    ConfigurationService.resourceConfiguredHives.post({slugHive: slugHive, slugConfiguration: slug}, function (datas){
                        ConfigurationService.resourceConfiguredHives.get({slugHive: slugHive}, function (datas) {
                            vm.configuration = datas.configuration;
                            vm.changeConfiguration = false;
                        });
                    });
                } else if(type === "alert")
                {
                    console.log(slug);
                    AlertService.resourceAlertHives.post({slugHive: slugHive, slugAlert: slug}, function(datas){
                        $route.reload();
                    });
                }
            };

            vm.unlink = function(type, slugHive, slug)
            {
                if(type === "configuration")
                {
                    ConfigurationService.resourceConfiguredHives.delete({slugHive: slugHive}, function (datas){
                        delete vm.configuration;
                    });
                } else if (type === "alert")
                {
                    console.log(slug);
                    AlertService.resourceAlertHives.delete({slugHive: slugHive, slugAlert: slug}, function(datas){
                        $route.reload();
                    })
                }
            };


            vm.delete = function(type, slug)
            {
                if(type === "configuration")
                {
                    ConfigurationService.resourceConfig.delete({slug: slug}, function(datas){
                        $location.path(path).search({});
                    });
                } else if (type === "potager")
                {
                    PotagerService.resource.delete({slug: slug}, function(datas){
                        $location.path('/dashboard').search({});
                    });
                } else if (type === "alert")
                {
                    AlertService.resourceAlert.delete({slug: slug}, function(datas){
                        $location.path(path).search({});
                    });
                }
            };


            vm.goToPage = function(type, action, slug)
            {
                if(type === "potager" || type === "alert" || type === "configuration")
                {
                    if(action === "new")
                    {
                        $location.path(path).hash(action+type);
                    } else if (slug && action === "select")
                    {
                        if(type === "potager")
                        {
                            $location.path(path).search({hive: slug});
                        } else if (type === "configuration")
                        {
                            $location.path(path).search({configuration: slug});
                        } else if (type === "alert")
                        {
                            $location.path(path).search({alert: slug});
                        }
                    }
                }
            };

            vm.geocode = function(address1, address2, city, postalcode, country)
            {
                console.log('here');
                OpenStreetMapService.resource.get({ street:address2?address1:address1+address2,city: city, postalcode:postalcode, country: country}, function(datas){
                    if(datas[0])
                    {
                        vm.hive.longitude = datas[0].lon;
                        vm.hive.latitude= datas[0].lat;
                        $scope.markers['mainMarker'].lng = parseFloat(datas[0].lon);
                        $scope.markers['mainMarker'].lat= parseFloat(datas[0].lat);
                        $scope.center.lng = parseFloat(datas[0].lon);
                        $scope.center.lat= parseFloat(datas[0].lat);
                        $scope.center.zoom= 15;
                    }
                });
            };

            /**
             * Redirige l'utilisateur vers la page gestion
             */
            vm.goBack = function (type) {
                $location.path('/potager').search({"param": vm.hive});
            };
        }



    })
    .directive('index', function () {
        return {
            templateUrl: 'gestion/directives/index.html'
        };
    })
    .directive('alert', function () {
        return {
            templateUrl: 'gestion/directives/alert/index.html'
        };
    })
    .directive('alertdisplay', function () {
        return {
            templateUrl: 'gestion/directives/alert/display.html'
        };
    })
    .directive('alertlist', function () {
        return {
            templateUrl: 'gestion/directives/alert/list.html'
        };
    })
    .directive('alertchangeform', function () {
        return {
            templateUrl: 'gestion/directives/alert/change_form.html'
        };
    })
    .directive('alerteditform', function () {
        return {
            templateUrl: 'gestion/directives/alert/edit_form.html'
        };
    })
    .directive('alertnewform', function () {
        return {
            templateUrl: 'gestion/directives/alert/new_form.html'
        };
    })
    .directive('configuration', function () {
        return {
            templateUrl: 'gestion/directives/configuration/index.html'
        };
    })
    .directive('configurationdisplay', function () {
        return {
            templateUrl: 'gestion/directives/configuration/display.html'
        };
    })
    .directive('configurationlist', function () {
        return {
            templateUrl: 'gestion/directives/configuration/list.html'
        };
    })
    .directive('configurationchangeform', function () {
        return {
            templateUrl: 'gestion/directives/configuration/change_form.html'
        };
    })
    .directive('configurationeditform', function () {
        return {
            templateUrl: 'gestion/directives/configuration/edit_form.html'
        };
    })
    .directive('configurationnewform', function () {
        return {
            templateUrl: 'gestion/directives/configuration/new_form.html'
        };
    })
    .directive('potager', function () {
        return {
            templateUrl: 'gestion/directives/potager/index.html'
        };
    })
    .directive('potagerdisplay', function () {
        return {
            templateUrl: 'gestion/directives/potager/display.html'
        };
    })
    .directive('potagerlist', function () {
        return {
            templateUrl: 'gestion/directives/potager/list.html'
        };
    })
    .directive('potagerlistalert', function () {
        return {
            templateUrl: 'gestion/directives/potager/list_alert.html'
        };
    })
    .directive('potagereditform', function () {
        return {
            templateUrl: 'gestion/directives/potager/edit_form.html'
        };
    }).directive('potagernewform', function () {
    return {
        templateUrl: 'gestion/directives/potager/new_form.html'
    };
});
