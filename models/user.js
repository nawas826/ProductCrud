var mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
   name:{
     type:String,
     require:true
   },
   email:{
        type:String,
        require:true
    },
   phone:{
       type:Number,
       require:true
   },
   password:{
     type:String,
     require:true
   }

});
module.exports = User = mongoose.model('UserSchema',UserSchema);