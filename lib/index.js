/** 
 *  PID Controller.
 */
var Controller = function(k_p, k_i, k_d, dt) {
  if (typeof k_p != 'number') k_p = 1;

  // PID constants
  this.k_p = k_p;
  this.k_i = k_i || 0;
  this.k_d = k_d || 0;

  // Time interval between two updates
  // If set to true, the interval will be automatically calculated
  this.dt  = dt;

  this.sumError  = 0;
  this.lastError = 0;
  this.lastTime  = 0;

  this.target    = 0; // default value, can be modified with .setTarget
};

Controller.prototype.setTarget = function(target) {
  this.target = target;
};

Controller.prototype.update = function(currentValue) {
  this.currentValue = currentValue;

  // Calculate dt
  var dt = this.dt;
  if (this.dt === true) {
    var currentTime = Date.now();
    if (this.lastTime === 0) { // First time update() is called
      dt = 1;
    } else {
      dt = (this.lastTime - currentTime) / 1000; // in seconds
    }
    this.lastTime = currentTime;
  }
  if (typeof dt !== 'number') {
    dt = 1;
  }

  var error = (this.target - this.currentValue);
  this.sumError = this.sumError + error*dt;
  var dError = error - this.lastError;
  if (dt !== 0) { // Make sure to do not divide by 0
    dError /= dt;
  }
  this.lastError = error;

  return (this.k_p*error) + (this.k_i * this.sumError) + (this.k_d * dError);
};

Controller.prototype.reset = function() {
  this.sumError  = 0;
  this.lastError = 0;
  this.lastTime  = 0;
};

module.exports = Controller;
