module.exports =  function serialize(req, res, next) {  
    db.updateOrCreate(req.user, function(err, user){
      if(err) {return next(err);}
      // we store the updated information in req.user again
     if(user){
      req.user = {
        id: user.id,
        admin: user.admin
      };  
      next();
    }
   
    });
  }
  
  const db = {  
    updateOrCreate: function(user, cb){
      // db dummy, we just cb the user 
      cb(null, user);
    }
  };