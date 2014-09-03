/**
 * Created by pengpeng on 2014/9/3.
 */
define(['angularAMD'], function (angularAMD) {
    angularAMD.controller('SubHomeController', function ($scope, $window) {
        $scope.title = "Big big way!!!";
        $scope.openGitHubPage = function () {
            console.log("MMMMMM hello world!");
        };
    });
});
