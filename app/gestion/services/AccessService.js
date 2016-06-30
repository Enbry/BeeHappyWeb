(function(){
    'use strict';

    function AccessService($resource, $localStorage){

        var apiPath = 'https://bee-happy.labesse.me';
        var token =  $localStorage.user.token;

        /**
         * Interact with gardens with access
         * */
        var resourceAccessGardens = $resource(apiPath+'/gardens/:slugGarden/access/:slugAccess', {
            slugGarden: '@slugGarden',
            slugAccess: '@slugAccess'

        }, {
            //Get garden access types
            get:{
                method:'GET',
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Unlink garden access with type
            delete:{
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            patch:{
                method:"PATCH",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });


        return {
            resourceAccessGardens: resourceAccessGardens
        };
    }
    controllers.factory('AccessService', AccessService);
})();
