+(function(){

define(function(){

'use strict';

/**
 * @ngdoc module
 * @name ngRequire
 * @description
 *
 * # ngRequire
 *
 * The `ngRequire` module provides a way to dynamically load controllers, filters, services and directives for angular apps.
 *
 *
 *
 * <div doc-module-components="ngRequire"></div>
 */
 /* global -ngRequireModule */
var ngRequireModule = angular.module('ngRequire', []).
                        directive('ngRequire', ngRequireFactory).
						directive('ngRequire', ngRequireFillContentFactory);


/**
 * @ngdoc directive
 * @name ngRequire
 * @restrict A
 *
 * @description
 * The `ngRequire` directive loads the specified angular resource pieces by requirejs.
 * 
 * It requires angularAMD (https://github.com/marcoslin/angularAMD) for registering 
 * angular pieces (controllers, services, filters, etc.) immediately.
 *
 *
 * @element ANY
 * @scope
 * @priority 599
 * @param {string} ngRequire It specifies the resources to load.
 *
 * @example
  <example module="ngRequire" deps="angular-animate.js" animations="true">
     <file name="index.html">
        <div ng-controller="MainCtrl as main" ng-require="MainCtrl">
          Choose:
          <a href="Book/Moby">Moby</a> |
          <a href="Book/Moby/ch/1">Moby: Ch1</a> |
          <a href="Book/Gatsby">Gatsby</a> |
          <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
          <a href="Book/Scarlet">Scarlet Letter</a><br/>

          <div class="view-animate-container">
            <div ng-view class="view-animate"></div>
          </div>
          <hr />

          <pre>$location.path() = {{main.$location.path()}}</pre>
          <pre>$route.current.templateUrl = {{main.$route.current.templateUrl}}</pre>
          <pre>$route.current.params = {{main.$route.current.params}}</pre>
          <pre>$routeParams = {{main.$routeParams}}</pre>
        </div>
      </file>

      <file name="MainCtrl.js">
       define(['angularAMD'], function(angularAMD){
		angularAMD.controller('MainCtrl', MainCtrl);
		
		function MainCtrl() {
			// MainCtrl codes.
		}
	   });
      </file>
  </example>
 */
ngRequireFactory.$inject = ['$animate'];
function ngRequireFactory($animate) {
  return {
    multiElement: true,
    transclude: 'element',
    priority: 599,
    terminal: true,
    restrict: 'A',
    $$tlb: true,
    link: function ($scope, $element, $attr, ctrl, $transclude) {
		if ($attr.ngRequire) {
			require($attr.ngRequire.split(','), function(){
				$scope.$apply(update);
			});
		} else {
			update();
		}
		
		function update(){
            $transclude(function (clone, newScope) {
                clone[clone.length++] = document.createComment(' end ngRequire: ' + $attr.ngRequire + ' ');
                $animate.enter(clone, $element.parent(), $element);
            });
		}
    }
  };
};

// This directive is called during the $transclude call of the first `ngRequire` directive.
// It will replace and compile the content of the element after the required resources loaded.
// We need this directive so that the element content is already filled when
// the link function of another directive on the same element as ngRequire
// is called.
ngRequireFillContentFactory.$inject = ['$compile'];
function ngRequireFillContentFactory($compile) {
  return {
    restrict: 'A',
    priority: -400,
    link: function(scope, $element) {
      var link = $compile($element.contents());
      link(scope);
    }
  };
}
});
})();
