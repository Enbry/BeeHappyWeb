(function () {
    'use strict';

    function UserService($resource, $localStorage) {

        var apiPath = 'https://bee-happy.labesse.me';
        var tok = "";
        if ($localStorage.user){
            tok =  $localStorage.user.token;
        }

        var user = $resource(apiPath+'/me', {}, {
            get:{
                method: 'GET',
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                    Authorization: 'Bearer '+ tok
                }
            }
        });

        var token = $resource(apiPath+'/token', {}, {
            login:{
                method: 'POST',
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                }
            }
        });

        var users = $resource(apiPath+'/users', {}, {
            register:{
                method: 'POST',
                headers:{
                    Accept: 'text/html, application/json, text/plain, */*',
                }
            }
        });

        return {
            user: user,
            token: token,
            users: users
        };
    }

    controllers.factory('UserService', UserService);
})();
