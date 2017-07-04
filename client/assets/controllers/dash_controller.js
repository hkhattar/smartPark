app.controller('dash_controller', ['$scope','$cookies','$location','$routeParams','user_factory',

    function($scope,$cookies,$location,$routeParams,user_factory)
    {
      console.log('dash_controller loaded');
      $scope.dash_user = {};
      user_factory.checkSesh(data => {
      	if (!data)
      	{
      		$location.url('/');
      	}  
      	else 
      	{
      		$scope.dash_user = data;
      	}
      	

      									})

  	}
  	
  ]);