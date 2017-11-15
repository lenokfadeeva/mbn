var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var validate=require('mongoose-validator');
var titlize=require('mongoose-title-case');

var nameValidator=[
  validate({
     validator: 'matches',
     arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
     message: 'Must be at least 3 characters, max 30, no special chracters or numbers, must have space in between name'
  }),
   validate({
      validator: 'isLength',
      arguments: [3,30],
      message: 'Name should be between{ARGS[0]} and {ARGS[1]} characters'
  }) 
];

var emailValidator=[
  validate({
     validator: 'isEmail',
     arguments: 	
/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
     message: 'Is not a valid e-mail'
  }),
  validate({
      validator: 'isLength',
      arguments: [3,30],
      message: 'Email should be between{ARGS[0]} and {ARGS[1]} characters'
  })
];

var usernameValidator=[
  validate({
     validator: 'isLength',
     arguments: [3,30],
     message: 'Username should be between{ARGS[0]} and {ARGS[1]} characters'
  }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Username must contain letters and numbers only'
    })
];

var passwordValidator=[
  validate({
     validator: 'matches',
     arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
     message: 'Password needs to have one lower case, one uppercase, one number, one special character, and must be at least 8 characters, but no more than 35'
  }),
    validate({
      validator: 'isLength',
      arguments: [8,35],
      message: 'Password should be between{ARGS[0]} and {ARGS[1]} characters'
  })
];

var cityValidator=[
  validate({
     validator: 'matches',
     arguments: /^[a-zA-Z]{3,20}$/,
     message: 'Must be at least 3 characters, no special chracters or numbers'
  }),
   validate({
      validator: 'isLength',
      arguments: [3,20],
      message: 'City should be between{ARGS[0]} and {ARGS[1]} characters'
  }) 
];

var UserSchema=new Schema({
    
    email: {type: String, lowercase: true, required: true, validate: emailValidator, unique: true},
    username: {type: String, lowercase: true, required: true, validate: usernameValidator, unique: true},
    name: {type: String, required: true, validate: nameValidator, unique: true},
    password: {type: String, required: true, validate: passwordValidator},
    city: {type: String, validate: cityValidator, required: true},
    status: {type:String, lowercase: true, required:true},    
    phone: {type:String, required: true, default: ' '},   
    age: {type:String, required: true, default: ' '},   
    experience: {type:String, required: true, default: ' '} 
      
});

UserSchema.pre('save', function(next){
    var user=this;
    
    if(!user.isModified('password')) return next();
    
    bcrypt.hash(user.password, null, null, function(err,hash){
        if(err) return next(err); 
        user.password=hash;
        next();
    });
});

UserSchema.plugin(titlize, {
    paths: ['name']
});

UserSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);