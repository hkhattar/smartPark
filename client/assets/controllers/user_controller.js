app.controller('user_controller', ['$scope','$cookies','$location','$anchorScroll','$routeParams','user_factory',

 
    function($scope,$cookies,$location,$anchorScroll,$routeParams,user_factory)
    {









// // var cities = [
// //     {
// //         city : 'Toronto',
// //         desc : 'This is the best city in the world!',
// //         lat : 43.7000,
// //         long : -79.4000
// //     },
// //     {
// //         city : 'New York',
// //         desc : 'This city is aiiiiite!',
// //         lat : 40.6700,
// //         long : -73.9400
// //     },
// //     {
// //         city : 'Chicago',
// //         desc : 'This is the second best city in the world!',
// //         lat : 41.8819,
// //         long : -87.6278
// //     },
// //     {
// //         city : 'Los Angeles',
// //         desc : 'This city is live!',
// //         lat : 34.0500,
// //         long : -118.2500
// //     },
// //     {
// //         city : 'Las Vegas',
// //         desc : 'Sin City...\'nuff said!',
// //         lat : 36.0800,
// //         long : -115.1522
// //     }
// // ];


// var latlng = new google.maps.LatLng(39.305, -76.617);
// // map = new google.maps.Map(document.getElementById('map'), {
// //   center: latlng,
// //   zoom: 12
// // });
// //Angular App Module and Controller


//     // var mapOptions = {
//     //     zoom: 4,
//     //     center: latlng,
//     //     mapTypeId: google.maps.MapTypeId.TERRAIN
//     // }

//     $scope.map = new google.maps.Map(document.getElementById('map'), {
//   center: latlng,
//   zoom: 12
// });

//     $scope.markers = [];
    
//     var infoWindow = new google.maps.InfoWindow();
    
//     var createMarker = function (info){
        
//         var marker = new google.maps.Marker({
//             map: $scope.map,
//             position: new google.maps.LatLng(info.lat, info.long),
//             title: info.city
//         });
//         marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
//         google.maps.event.addListener(marker, 'click', function(){
//             infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
//             infoWindow.open($scope.map, marker);
//         });
        
//         $scope.markers.push(marker);
        
//     }  
    
//     for (i = 0; i < cities.length; i++){
//         createMarker(cities[i]);
//     }

//     $scope.openInfoWindow = function(e, selectedMarker){
//         e.preventDefault();
//         google.maps.event.trigger(selectedMarker, 'click');
//     }





















   
      // $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

      // $scope.username = "some name";
      // $scope.creator = "some name";

      $scope.Delete_spot = function(spot){
        // console.log('$scope.spots', $scope.spots)
        // console.log(spot);
        // var index = $scope.spots.indexOf(spot);
        // console.log('index',index)
        // $scope.spots.splice(index, 1);     

        user_factory.Delete_spot(spot, function(data){
          location.reload();
          // console.log(data);
        })
      }

      // $scope.Delete_spot = function(spot) { 
      //     var index = $scope.spots.indexOf(spot);
      //     $scope.spots.splice(index, 1);     
      //   }

      $scope.showSomething = function(input1,input2) {
           return input1 == input2 ? 'Cancel' : '';
      };
   
      console.log('user_controller loaded');

      $scope.scrollTo = function(id) 
      {
        $location.hash(id);
        $anchorScroll();
      }

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
      
      var house_numberRegex= /^\d+[a-zA-Z]*$/
      var driver_licenseRegex = /^[A-Z]{1}\d{7}$/
      // var users = [];
      
      $scope.users = 'm';

     $scope.register_user = function()
      {
        $scope.error = {message: 'All fields are required'};
       
        if($scope.user.f_name.length < 2)
        {
          $scope.error = {first: 'Invalid first name'};
          
        }
        else if($scope.user.l_name.length < 2)
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
        console.log('data',data)
        if(data.already){
          $scope.already = data.already
          console.log('$scope.already',$scope.already)
          error = data.already

        }
        logged_in_user = data;
      }

      $scope.log_get_error = function()
      {
        var error = user_factory.log_get_error();
        console.log("0000000000")
        console.log('error',error)
        return error.already;

        
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
        console.log('data',data)
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


    // function setSpots(data)
    //   {
    //     $scope.spots = data;
    //   }


      $scope.add_spot = function()
      {
        console.log('inside add_spot')
        if($scope.newSpot.contact.length == 10)
        {
          // console.log('inside create question clinet controller');
          $scope.error = {};
          // console.log('$scope.newQuestion',$scope.newQuestion)
          var user = user_factory.log_get_user();
          console.log('user',user)
          user_factory.add_spot($scope.newSpot,user,setSpots);

          $scope.newSpot = {};
          $location.url('/spots');
        }
        else{
          $scope.error = {message: 'Invalid phone number'};
        }
     
      }
//      contact
// street
// house_number
// city
// state
// country
// zip_code
// type_of_space
// number_of_spaces
// instructions 

      $scope.geocode = function()
      {

        // $scope.error = {message: 'All fields are required'};
       
        if($scope.newSpot.contact.length < 10)
        {
          $scope.error = {contact: 'Invalid phone number'};
          
        }
        else if($scope.newSpot.street.length < 5)
        {
          $scope.error = {street: 'Invalid street'};
          
        }
        else if (!$scope.newSpot.house_number.match(house_numberRegex)) { //if the house number entered does not match regex...
          $scope.error = {house_number: 'Invalid house_number'};

        }
      // else if ($scope.newSpot.start_date > $scope.newSpot.end_date ){
        // $scope.error = {date: 'End date should be greater than start date'}
        // }
         // else if ($scope.newSpot.start_time > $scope.newSpot.end_time ){
        // $scope.error = {time: 'End time should be greater than start time'}
        // }

        else if (!$scope.newSpot.license.match(driver_licenseRegex)) { //if the house number entered does not match regex...
          $scope.error = {driver_license: 'Invalid driver license number'};

        }
        else
        {
            console.log('inside geocode')
            console.log('newSpot',$scope.newSpot)
            // var location = document.getElementById("location-input").value
            // var location = $scope.newSpot.street + " "+  $scope.newSpot.city + " "+$scope.newSpot.state + " "+  $scope.newSpot.country + " "+  $scope.newSpot.zip_code
            var location = $scope.newSpot.street + " "+  "San Francisco" + " "+ "California" + " "+  "United States" + " "+  $scope.newSpot.zip_code

            console.log('location************',location)
            var user = user_factory.log_get_user();
            console.log('user',user)
            user_factory.geocode($scope.newSpot, location, user, function(data)
            {
              console.log('data************',data)
              // $scope.dates = 'data'
              console.log($scope.dates)
              $scope.address = 'Your address'+ ' " ' + data + ' " '
              $location.url('/spots');
            })
        }
        


      
      }

//show all the spots
         $scope.index_spot = function(){
        console.log('inside index_spot')
        user_factory.index_spot(function(data){
          $scope.spots = data;
          $scope.spot = {};
          console.log("index spot:")
          console.log($scope.spots)

        })
      }

      $scope.index_spot();

      // function setSpots(data)
      // {
      //   $scope.Spots = data;
      // }




      $scope.create_renter_by_id = function()
      {
        console.log('INSIDE create_renter_by_id')
        console.log('$scope.newRenter',$scope.newRenter)
        if($scope.newRenter.contact.length > 5)
        {
          console.log("inside create_renter_by_id if statement")
          $scope.error = {};
          console.log($scope.newRenter)

          function toDateStr(ts) {
              let dataF = new Date();   dataF.setTime(ts);
              let strDataF = dataF.toLocaleString();
              return strDataF;
        }

          // then use it in your aggregation:
          // db.Collection.aggregate([{ 
          // }]).map( function(doc) { 
          // doc['date'] = toDateStr(doc.timestamp);
          // return doc;
          // })
          var firstdate = toDateStr($scope.newRenter.arriving_on)
          console.log(firstdate)
          var seconddate = toDateStr($scope.newRenter.departing_on)
          console.log(seconddate)


          $scope.differenceInDays = function() {

              var dt1 = firstdate.split('/')
              
                var   dt2 = seconddate.split('/')
              
              var x = dt1[2].split(',')[0]
              console.log(dt2)
              var y = dt2[2].split(',')[0]
console.log('ppppppp')
              dt1.pop()
              dt2.pop()
              dt1.push(x)
              dt2.push(y)

              console.log(x)
                  // dt1 = dtt1[2].split(','),
                  // dt2 = dtt2[2].split(',')
                  // dt1.pop()
                  // dt2.pop()
                  console.log(dt1)
                  one = new Date(dt1[2], dt1[0]-1, dt1[1]),
                  two = new Date(dt2[2], dt2[0]-1, dt2[1]);

              var millisecondsPerDay = 1000 * 60 * 60 * 24;
              var millisBetween = two.getTime() - one.getTime();
              var days = millisBetween / millisecondsPerDay;
              console.log(Math.floor(days))
              return Math.floor(days);      
        };
          $scope.price = 6 *  ($scope.differenceInDays()+1)


          
          var user = user_factory.log_get_user();
          console.log('*************user',user)
          user_factory.create_renter_by_id($routeParams.id,$scope.newRenter,user,function(data)
          {
            console.log("routeParams.id", $routeParams.id)
            console.log('data',data)

             if($('#1').css('display')!='none'){
              $('#2').html("You have successfully booked and payed $ " + $scope.price).show().siblings('div').hide();
              }else if($('#2').css('display')!='none'){
              $('#1').show().siblings('div').hide();
              }
            // $location.url('/success')
        //     $scope.renter = data;
        //     // console.log("Data:")
        //     setRenter(data);
        //     // console.log(data)
        //     $scope.spots.push(data)
        //     // console.log($scope.questions[15])
        //     // loop through questions
        //     var spot;
        //     for (var x=0; x<$scope.spots.length;x++)
        //     {
        //       if($scope.spots[x]._id == data._spot)
        //       {
        //         spot = $scope.spots[x];
        //       }
        //     }
        //     // console.log('question',question)
        //     // find question that matches data._question
        //     // console.log(question._answers)
        //     // push answer (data) to that question
        //    spot._renters.push(data);
        //     // location.reload()
         
          })
        }
        else
        {
          $scope.error = {message: 'Your contact must be 10 characters long!'};
        }

      //    $scope.$watch('newAnswer', function () {
      //   // console.log('QQQQQQQQQQQQQ',$scope.newAnswer); 
      // });
      }

      $scope.get_spot_by_id = function()
      {
        // console.log('controller--get_question_by_id');
        user_factory.get_spot_by_id($routeParams.id,function(data)
        {
          $scope.spot = data;
        })
      }

      $scope.get_spot_by_id();
    } 
    // end of function($scope,$cookies,$location,$anchorScroll,$routeParams,user_factory)

]);

