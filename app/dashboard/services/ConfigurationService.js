(function(){
    'use strict';

    function ConfigurationService($resource, $localStorage){

        var apiPath = 'https://bee-happy.labesse.me'
        var token =  $localStorage.user.token;

        /**
         * Interact with configurations
         **/
        var resourceConfig = $resource(apiPath+'/types/:slug', {
            slug: '@slug'
        }, {
            //Post new configuration
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Get configuration details
            get:{
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Modify a configuration
            patch:{
                method:"PATCH",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Delete a configuration
            delete:{
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });

        /**
         * Interact with gardens with configuration
         * */
        var resourceConfiguredGardens = $resource(apiPath+'/gardens/:slugGarden/configurations/:slugConfiguration', {
            slugGarden: '@slugGarden',
            slugConfiguration: '@slugConfiguration'

        }, {
            get:{
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Get garden configurations
            query:{
                method:'GET',
                isArray:true,
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Unlink garden with current configuration
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
            resourceConfig: resourceConfig,
            resourceConfiguredGardens: resourceConfiguredGardens
        };
    }
    controllers.factory('ConfigurationService', ConfigurationService);
})();
