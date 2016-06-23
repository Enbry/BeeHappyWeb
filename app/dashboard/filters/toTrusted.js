(function() {
    'use strict';

    function toTrusted($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }
    controllers.filter('toTrusted', toTrusted);
}());
