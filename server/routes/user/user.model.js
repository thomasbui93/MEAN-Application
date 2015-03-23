'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  hashedPassword: String,
  salt: String,
  address: {
    city: String,
    country: String,
  },
  birthDate:{
    date: Number,
    month: Number,
    year: Number,   
  },
  avatar: String,//image link
  description: String,
  createdOn: {
    type:Date, 
    default: Date.now
  },
  loginStatus: {
    lastLogin: {
      type:Date
    },
    ip:{
      type:String
    },
   status: {
    type:String,
    default:"active"
    },//status: 1.active, 2.block
  },
  managedOrganisations: [{
    type: Schema.Types.ObjectId, 
    ref: "Organisation" 
  }],//an array of organisation id which user is manager
  representOrganisations:  [{
    type: Schema.Types.ObjectId,
    ref: "Organisation" 
  }],//an array of organisation id which user is representative
  admin: {
    type:Boolean,
    "default":false
  },  
  events: [{
    type: Schema.Types.ObjectId,
    ref: "Event" 
  }], //an array of events id which user participated in 
  recruiments: [{
    type: Schema.Types.ObjectId, 
    ref: "Recruitment" 
  }]//an array of recruit
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Getter for safe-to-show info, no password hashed etc.
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      email: this.email
    };
  });

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    // this.constructor is the User model.
    this.constructor.findOne({
      email: value
    }, function(err, user) {
      if (err) throw err;

      // If there exists a different user with the same email,
      // the validation is failed.
      if (user) {
        if (self._id === user._id) return respond(true);
        return respond(false);
      }

      respond(true);
    });
  }, 'The specified email address is already in use.');


// Pre-save hook to ensure password not blank.
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword)) {
      next(new Error('Invalid password'));
    } else {
      next();
    }
  });

var validatePresenceOf = function(input) {
  return !!(input && input.length);
};

// Methods
UserSchema.methods = {
  authenticate: function(plainText) {
    if (this.encryptPassword(plainText) === this.hashedPassword) {
      return true;
    }
    return false;
  },

  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

UserSchema.statics.findByEmail = function(email, cb) {
  this.findOne({
    email: email
  }, cb);
};

module.exports = mongoose.model('User', UserSchema);