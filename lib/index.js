/**
 *  PID Controller.
 */
var Controller = function(k_p, k_i, k_d, dt) {
  // PID constants
  this.k_p = (typeof k_p === 'number') ? k_p : 1;
  this.k_i = k_i || 0;
  this.k_d = k_d || 0;

  // Interval of time between two updates
  // If not set, it will be automatically calculated
  this.dt = dt || 0;

  // Maximum length of the integral term
  this.sumLength = 0;

  this.sumError  = 0;
  this.lastError = 0;
  this.lastTime  = 0;
  this.iErrors   = [];

  this.target    = 0; // Default value, can be modified with setTarget()
};

Controller.prototype.setTarget = function(target) {
  this.target = target;
};

Controller.prototype.update = function(currentValue) {
  this.currentValue = currentValue;

  // Calculate dt
  var dt = this.dt;
  if (!dt) {
    var currentTime = Date.now();
    if (this.lastTime === 0) { // First time update() is called
      dt = 0;
    } else {
      dt = (currentTime - this.lastTime) / 1000; // in seconds
    }
    this.lastTime = currentTime;
  }
  if (typeof dt !== 'number' || dt === 0) {
    dt = 1;
  }

  var error = this.target - this.currentValue;

  // Calculate integral term
  var iError = error*dt;
  if (this.sumLength > 0) {
    var oldestError = 0;
    if (this.iErrors.length > this.sumLength) {
      oldestError = this.iErrors.shift();
    }
    this.iErrors.push(iError);
    console.log(this.iErrors);
    this.sumError += iError - oldestError;
  } else {
    this.sumError += iError;
  }

  // Calculate derivative term
  var dError = (error - this.lastError)/dt;
  this.lastError = error;

  return (this.k_p*error) + (this.k_i * this.sumError) + (this.k_d * dError);
};

Controller.prototype.reset = function() {
  this.sumError  = 0;
  this.lastError = 0;
  this.lastTime  = 0;
  this.iErrors   = [];
};

module.exports = Controller;
