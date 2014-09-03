require.config({

    baseUrl: "js/scripts",
    
	// alias libraries paths
    paths: {
        'angular': '../lib/angular',
        'angular-route': '../lib/angular-route',
        'async': '../lib/async',
        'angularAMD': '../lib/angularAMD',
        'ngRequire': '../lib/ngRequire',
        'ngload': '../lib/ngload',
        'ui-bootstrap': '../lib/ui-bootstrap-tpls',
        'prettify': '../lib/prettify',

        'HomeController': 'controller/home_ctrl',
        'MapController': 'controller/map_ctrl',
        'ModulesController': 'controller/modules_ctrl',
        'SubHomeController': 'controller/sub_home_ctrl'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'ngRequire': ['angular'],
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },

    // kick start application
    deps: ['app']
});
