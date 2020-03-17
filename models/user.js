var mongoose=require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
var validator=require('validator');


var UserSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    phonenumber:{
        type:Number
    },
    age:{
        type:Number,
    },        
    gender:{
        type:String
    },
    birthdate:{
        type:Date
    },
    role:{
        type:String
    }
})

UserSchema.plugin(passportLocalMongoose);
UserSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

module.exports = mongoose.model('User', UserSchema);