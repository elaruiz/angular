angular.module('TableApp', ['TableApp.controllers','datatables']);
  
  angular.module('TableApp.controllers', [])

  .controller('tableController', ["$scope","$http","DTOptionsBuilder", "DTColumnBuilder",function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
  	var url = "http://uda-scrapper.us-east-2.elasticbeanstalk.com/api/scraps/simple";
    $http({
            method: 'GET',
            url: url,
            crossDomain: true,
            headers: { 
            	'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (data) {
            $scope.scrapperList = data.data.data;
        });
	      
    $scope.vm = {};

    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
      .withOption('order', [0, 'asc']);
  }])
  .controller("modalController", ["$scope", function($scope) {
    $scope.selRow = function(row) {
      $scope.selected_row = row;
      var obj = row.data;
        $scope.object = {};

        for (key in obj) {
            if (obj.hasOwnProperty(key) && typeof(obj[key]) !== "object" && key !== "id") {
                $scope.object[key] = obj[key];
            }
        }
        angular.element('#myModal').modal();
    }
    $scope.isSelected = function(row) {
      return $scope.selected_ === row;
    }

  }
]);
