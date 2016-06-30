(function () {
    'use strict';

    function PotagerService($resource, $localStorage) {

        var apiPath = 'https://bee-happy.labesse.me';
        var token = "";
        if ($localStorage.user){
            token =  $localStorage.user.token;
        }

        /**
         * All public gardens
         **/
        var resource = $resource(apiPath+'/hives/:slug', {slug: '@slug'}, {
            get: {
                method: 'GET',
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            },
            update: {
                method: 'PUT',
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            },
            patch: {
                method: 'PATCH',
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            },
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            },
            delete: {
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            }
        });

        var resourcePersonalHives = $resource(apiPath+'/hives', {}, {
            query: {
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ token
                }
            }
        });
        return {
            resource: resource,
            resourcePersonalHives: resourcePersonalHives
        };
    }

    angular.module('myApp.services', []).factory('PotagerService', PotagerService);
})();
