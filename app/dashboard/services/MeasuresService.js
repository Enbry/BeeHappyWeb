(function(){
    'use strict';

    function MeasuresService($resource, $localStorage){

        var apiPath = 'https://bee-happy.labesse.me';
        var token =  $localStorage.user.token;

        /**
         * Get measures of a hive
         * */
        var resource = $resource(apiPath+'/hives/:slugHive/measures/:slugType', {
            slugHive: '@slugHive',
            slugType: '@slugType'
        }, {
            get:{
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });

        return {
            resource: resource
        };
    }
    controllers.factory('MeasuresService', MeasuresService);
})();
