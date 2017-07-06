app.controller('user_controller', ['$scope','$cookies','$location','$routeParams','user_factory',

    function($scope,$cookies,$location,$routeParams,user_factory)
    {
   
      console.log('user_controller loaded');

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
        return data;
        

                        })


      var pwordRegex =
      /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'?/><.;,])(?!.*\s).*$/; //regex to test password against
      var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$///regex to test email against
      
      // var users = [];
      
      $scope.users = 'm';

     $scope.register_user = function()
      {
        $scope.error = {message: 'All fields are required'};
       
        if($scope.user.first_name.length < 2)
        {
          $scope.error = {first: 'Invalid first name'};
          
        }
        else if($scope.user.last_name.length < 2)
        {
          $scope.error = {last: 'Invalid last name'};
          
        }
        else if (!$scope.user.email.match(emailRegex)) { //if the email entered does not match regex...
          $scope.error = {email: 'Invalid email'};

        }
        else if (!$scope.user.password.match(pwordRegex)) { //if the password entered does not match regex...
          $scope.error = {password: 'Password does not meet minimum requirements:Must be at least 8 characters in length and include at least 1 lowercase and 1 uppercase letter, 1 number, and 1 special character' }
       
        }
        else if (!$scope.user.password.match($scope.user.confirm_password)) { //if the password entered does not match regex...
          $scope.error = {confirm_password: 'Password and confirm password must match' }
       
        }

        else
        {
          // console.log('inside register user client controller');
          $scope.error = {};
          // console.log('$scope.user in belt controller before factory',$scope.user)
          user_factory.register_user($scope.user,setUsers);
          // console.log('$scope.user in belt controller after factory',$scope.user)
          $scope.user = {};
          $location.url('/dashboard');
        }
     
      }

        $scope.index_user = function(){
        user_factory.index_user(function(data){
          console.log('data',data)
          $scope.users = 'lll';
          console.log('$scope.users',$scope.users)
          // $scope.user = {};
        })
      }
      // $scope.users = 'hhii';
      function setUsers(data)
      {
        logged_in_user = data;
      }

       $scope.log_get_user = function()
      {
        var user = user_factory.log_get_user();
        console.log("0000000000")
        console.log('user',user)

        return user.f_name;
      }


        $scope.login = () => { //when the user hits the login button...
      console.log('inside scope.login')
      $scope.logErrors = []; //clear out all previous login errors
      // console.log('$scope.loginUser',$scope.loginUser)
      user_factory.login($scope.loginUser, data => { //run the userFactory.login method and pass the entered user information and a callback function
        
        if (data.errors) { //if the returned data has an errors key...
          
          for (let key in data.errors) { //for every key in the data.errors...
            $scope.logErrors.push(data.errors[key].message); //push these errors to the logErrors array
          }
          $scope.loginUser = {}; //clear the login input fields
          // second.focus(); //put the user's cursor back on the first input in login
        } else if (data.errorsFront) { //if the returned data has the errorsFront key (custom)...
          $scope.logErrors = data.errorsFront; //set logErrors to equal the returned errors...
          // second.focus(); //put the user's cursor back on the first input in login
        } else { //if no errors are returned...
          $location.url('/dashboard'); //send the user to the dashboard with their respective user id
        } //if/else
      }); //userFactory.login
    }; //$scope.login


    

      
    }

]);
