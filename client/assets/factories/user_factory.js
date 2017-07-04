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

         factory.index_user = function(callback)
    {
      $http.get('/users').then(function(returned_data)
      {
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
        console.log('inside belt factory log_get_user','logged_in_user',logged_in_user)
      
        return logged_in_user;
      }

      factory.login = function(user, cb) { //logs user in based on entered information
        // console.log('inside factory login')
      let errors = []; //creates empty array to store errors
      // if (!user || !user.email ||
      //   !user.password) { //if any fields are left blank...
      //   errors.push('Please fill in all fields'); //pushes error to errors array
      // } else { //if all fields are filled in...
        // console.log('user',user)
        $http.post('/login',user).then(function(response)
        { //execute post request passing user object
          // console.log('user',user)
          // console.log('response',response)
          // console.log('inside http function factory login ')
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
       
        return factory;
    })

