describe("Unit: Testing Modules", function() {
  describe("App module:", function() {

    var module;
    beforeEach(function() {
      module = angular.module('voluntr');
    });

    it("should be regstered", function() {
      expect(module).not.toBe(null);
    });

    describe("Dependencies:", function() {
      var deps;
      var hasModule = function(m) {
        return deps.indexOf(m) >= 0;
      }

      beforeAll(function() {
        deps = module.value('voluntr').requires;
      });

      it("should have the restangular dependency", function() {
        expect(hasModule('restangular')).toBe(true);
      });

      it("should have the ui.router dependency", function() {
        expect(hasModule('ui.router')).toBe(true);
      });
      it("should have the ng-animate dependency", function(){
            expect(hasModule('ngAnimate')).toBe(true);
      });

    });
  });
});