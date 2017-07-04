app.factory('user_factory',function($http){
        console.log('start user_factory');

        var factory = {};
        var logged_in_user = {};

        factory.register_user = function(user,callback)
        {
          console.log('inside register user client factory')
          $http.post('/register', user).then(function(returned_data)
          {
            // console.log('user',user)
            // console.log('returned_data in belt factory', returned_data.data)
            logged_in_user = returned_data.data;
            // console.log('logged_in_user inside register_user belt factory',logged_in_user)
            if (typeof(callback) == 'function')
            {
              // console.log('user in belt factory', user)
              callback(user);
            }
          });
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
        console.log('inside belt factory log_get_user','logged_in_user',logged_in_user)
      
        return logged_in_user;
      }
       
        return factory;
    })

