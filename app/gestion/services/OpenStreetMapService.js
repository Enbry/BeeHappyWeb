(function(){
    'use strict';

    function OpenStreetMapService($resource){

        var apiPath = 'http://nominatim.openstreetmap.org/search?format=json&limit=1';

        /**
         * Interact with gardens with access
         * */
        var resource = $resource(apiPath, {}, {
            //Get garden access types
            get:{
                method:'GET'
            }
        });


        return {
            resource: resource
        };
    }
    controllers.factory('OpenStreetMapService', OpenStreetMapService);
})();


