ng-require
==========

A js library for loading angular pieces dynamically. 

The `ngRequire` directive loads the specified angular resource pieces by requirejs. 

It requires angularAMD (https://github.com/marcoslin/angularAMD) for registering angular pieces (controllers, services, filters, etc.) immediately.


Usage:
```html
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
```

```js
define(['angularAMD'], function(angularAMD){
		angularAMD.controller('MainCtrl', MainCtrl);
		
		function MainCtrl() {
			// MainCtrl codes.
		}
	   });
```
