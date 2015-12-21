(function() {

  'use strict';

  angular.module('myApp.myModule')
  .directive('myDirective', myDirective);

  function myDirective() {

    return {
      restrict: 'EA',
      controller: MyDirectiveCtrl,
      controllerAs: 'module',
      scope: {
        twoway: '=',
        interpolate: '@',
        invoke: '&'
      },
      link: (scope, element, attrs) => {
          scope.widget.init()
        });
      }
    };
  }

  class MyDirectiveCtrl {
    constructor(
      $scope,
      MyService,
      MyFactory
    ) {

      this.$scope    = $scope;
      this.MyService = MyService;
      this.MyFactory = MyFactory;

    }
    
    /**
     * init
     * 
     * 
     * @returns
     * 
     */
    init() {
      this.MyService.serviceMethod();
      this.MyFactory.factoryMethod();
    }
  }

})();
