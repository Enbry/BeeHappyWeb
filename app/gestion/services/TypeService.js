(function(){
    'use strict';

    function TypeService($resource, $localStorage){

        var apiPath = 'https://bee-happy.labesse.me';
        var token =  $localStorage.user.token;

        /**
         * Interact with configurations
         **/
        var resourceType = $resource(apiPath+'/types/:slug', {
            slug: '@slug'
        }, {
            //Post new type
            post:{
                method:"POST",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Get type details
            get:{
                method:"GET",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Modify a type
            patch:{
                method:"PATCH",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            },
            //Delete a type
            delete:{
                method:"DELETE",
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*' ,
                    Authorization: 'Bearer '+ token
                }
            }
        });


        return {
            resourceType: resourceType
        };
    }
    controllers.factory('TypeService', TypeService);
})();
