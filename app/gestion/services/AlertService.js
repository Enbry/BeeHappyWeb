(function(){
    'use strict';

    function AlertService($resource, $localStorage){

        var apiPath = 'https://urbanpotager.labesse.me';
        var token =  $localStorage.user.token;

        /**
         * Interact with configurations
         **/
        var resourceAlert = $resource(apiPath+'/alerts/:slug', {
            slug: '@slug'
        }, {
            //Post new alert
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Get alert details
            get:{
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Modify a alert
            patch:{
                method:"PATCH",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Delete a alert
            delete:{
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });

        /**
         * Interact with gardens with alert
         * */
        var resourceAlertGardens = $resource(apiPath+'/gardens/:slugGarden/alerts/:slugAlert', {
            slugGarden: '@slugGarden',
            slugAlert: '@slugAlert'

        }, {
            //Get garden alert
            get:{
                method:'GET',
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Unlink garden with current alert
            delete:{
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            post:{
                method:"POST",
                isArray:true,
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });

        return {
            resourceAlert: resourceAlert,
            resourceAlertGardens: resourceAlertGardens
        };
    }
    controllers.factory('AlertService', AlertService);
})();


