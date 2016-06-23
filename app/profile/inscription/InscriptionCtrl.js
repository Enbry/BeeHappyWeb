'use strict';

controllers.controller('InscriptionCtrl', function ($scope, $rootScope, $location, $localStorage, UserService) {

    this.title = "Page d'inscription";

    $scope.isHidden = false;
    $scope.isVisible = false;

    $scope.fadeIt = function () {
        $scope.isHidden = !$scope.isHidden;
        $scope.isVisible = !$scope.isVisible;

    };


    this.inscription = function (data) {

        UserService.users.register({
            username: data.username,
            email: data.email,
            plainPassword: data.plainPassword
        }, function (data) {
            $location.path("/profile");
        });

    };

    this.connexion = function (data) {

        UserService.token.login({
            username: data.username,
            password: data.password
        }, function (data) {
            $localStorage.user = {
                token: data.token
            };
            console.log($localStorage.user.token);
            window.location.reload();
            $location.path("/home");
        });

    };

    function msg(msg) {
        var alt = $('#alert');
        alt.css({
            "display": "none",
            "padding": "16px",
            "border": "2px solid #59b05c"
        });
        alt.fadeIn();
        alt.html(msg);
        setTimeout(function () {
            alt.fadeOut();
        }, 2000);
    }
})

controllers.directive("hideMe", function ($animate) {
    return function (scope, element, attrs) {
        scope.$watch(attrs.hideMe, function (newVal) {
            if (newVal) {
                $animate.addClass(element, "fadeIn")
            } else {
                $animate.removeClass(element, "fadeIn")
            }
        })
    }
})
controllers.directive("showMe", function ($animate) {
        return function (scope, element, attrs) {
            scope.$watch(attrs.showMe, function (newVal) {
                if (newVal) {
                    $animate.addClass(element, "fadeOut")
                } else {
                    $animate.removeClass(element, "fadeOut")
                }
            })
        }
    }
);
