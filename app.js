(function(){
    var homeApp = angular.module("HomeApp", ["ngAnimate"]);
    homeApp.controller("HomeController", function ($scope){
        $scope.images = [{
            src:"/images/trans1.png",
            title : "Pic1"
        },
        {
            src:"/images/trans2.png",
            title:"Pic2"
        },
        {
            src:"/images/trans3.png",
            title:"Pic3"
        }
    ]
    });
    HomeController.$inject = ["$scope"];
    homeApp.directive("slider", function($timeout){
        return {
            restrict : "AE",
            replace : true,
            scope : {
                images = "="
            },
            link : function(scope, elem, attrs) {
                scope.currentIndex=0;
                scope.next = function(){
                    scope.currentIndex<scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex=0;
                };
                scope.prev = function(){
                    scope.currentIndex>0 ? scope.currentIndex-- : scope.currentIndex=scope.images.length - 10;
                };
                scope.$watch("currentIndex", function(){
                    scope.images.forEach(function(image){
                        images.visible = false;
                    });
                    scope.images[scope.currentIndex].visible = true;
                });
                var timer;
		        var sliderFunc=function(){
			        timer=$timeout(function(){
				        scope.next();
				        timer=$timeout(sliderFunc,5000);
			        },5000);
		        };		
		        sliderFunc();		
		        scope.$on('$destroy',function(){
			        $timeout.cancel(timer);
		        });
        },
        templateUrl : "templates/template.html",
        };
    })
    window.onscroll = function() {
        if (document.getElementById("fixed-header").offsetTop < window.pageYOffset){
            document.getElementById("fixed-header").classList.add("sticky");
        }
        else{
            document.getElementById("fixed-header").classList.remove("sticky");
        }
    }
})();