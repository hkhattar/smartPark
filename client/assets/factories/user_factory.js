app.factory('user_factory',function($http){
        console.log('start user_factory');

        var factory = {};
        var logged_in_user = {};
        var error = {}


        factory.Delete_spot = function(spot, callback)
        {
          // console.log(spot);
          // spots.splice(spots.indexOf(spots._id), 1);

          console.log('spot',spot)
          $http.post('/delete_spot', spot).then(function(data){
            callback(spot);
          })
        }

        factory.register_user = function(user,callback)
        {
          console.log('inside register user client factory')
          $http.post('/register', user).then(function(returned_data)
          {
            logged_in_user = returned_data.data;
            error = returned_data.data
            if (typeof(callback) == 'function')
            {
              callback(returned_data.data);
            }
          });
        }

         factory.index_user = function(callback)
    {
      $http.get('/users').then(function(returned_data)
      {
        console.log('returned_data',returned_data)
        if(typeof(callback) == 'function')
        {
          callback(returned_data.data);
        }
      })
    }

      factory.checkSesh = function(cb)
       { //checks to see if there is a session object
          $http.get('/checksesh').then(function(response) 
            { //get request to check if session has been created
              if (typeof(cb) == 'function') 
                { //if cb is a function...
                  cb(response.data); //invoke cb and pass returned information (may be null/undefined!!)
                  // console.log('response.data',response.data)
                  logged_in_user = response.data
                }
            })

      };

      factory.log_get_user = function(){
        return logged_in_user;
      }

      factory.log_get_error = function(){      
        return error;
      }

      factory.login = function(user, cb) { //logs user in based on entered information
        console.log('inside factory login')
      let errors = []; //creates empty array to store errors
        $http.post('/login',user).then(function(response)
        { //execute post request passing user object
          if (typeof(cb) == 'function') { //if cb is a function...
            cb(response.data); //invoke cb and pass retrived information (logged in user)
          }
        }, err => { //if an error is thrown during post request...
          cb(err); //invoke cb and pass error
        });
      // }
      if (errors.length > 0) { //if the errors array is not empty (fields were left empty)...
        if (typeof(cb) == 'function') { //and cb is a function...
          cb({
            'errorsFront': errors //invoke cb and pass errors array
          });
        }
      }
    }


      factory.geocode = function(newSpot, location, user, callback)
      {
          axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
          params:{
          address: location,
          key: 'AIzaSyBgKwURsd4XhAq0GBTGTDOToFu1S_lFwkk'
          } // end of params
          })// end of axios.get
          .then(function(response)
          {
          //log full response
          callback(response.data.results[0].formatted_address)
          var lat = response.data.results[0].geometry.location.lat;
          var lng = response.data.results[0].geometry.location.lng;

          $http.post('/spots',{user: user, spot:newSpot, lat:lat, lng: lng}).then(function(returned_data)
          {
            console.log(returned_data)
            if (typeof(callback) == 'function')
          {
            // callback(returned_data.data.dates);
              callback(returned_data.data);

            console.log('returned_data',returned_data)
          }//end of if type of callback is function
          })//end of http post

          })
          .catch(function(error){
          alert('Invalid address')
          console.log(error)
          })
   
      }

//get all the spots
    factory.index_spot = function(callback) {
      $http.get('/spots').then(function(returned_data) {
        if(typeof(callback) == 'function') {
          callback(returned_data.data);
        }
      })
    }

       factory.create_renter_by_id = function(id,renterContent, user, callback){
        $http.post('/renters/' + id,{user: user, renter: renterContent}).then(function(returned_data){          
          if(typeof(callback) == 'function'){
            callback(returned_data);
          }
        })

       }

//get particular spot by id(the user wants to book this particular spot)
    factory.get_spot_by_id = function(id,callback)
    {
      $http.get('/spots/' + id).then(function(returned_data)
      {
        callback(returned_data.data);
          
      })
    }
       
        return factory;
    })

