"use strict";

/**
 *  PID Controller.
 */
class Controller {
  constructor(k_p, k_i, k_d, dt) {
    let i_max;
    if (typeof k_p === 'object') {
      let options = k_p;
      k_p = options.k_p;
      k_i = options.k_i;
      k_d = options.k_d;
      dt = options.dt;
      i_max = options.i_max;
    }

    // PID constants
    this.k_p = (typeof k_p === 'number') ? k_p : 1;
    this.k_i = k_i || 0;
    this.k_d = k_d || 0;

    // Interval of time between two updates
    // If not set, it will be automatically calculated
    this.dt = dt || 0;

    // Maximum absolute value of sumError
    this.i_max = i_max || 0;

    this.sumError  = 0;
    this.lastError = 0;
    this.lastTime  = 0;

    this.target    = 0; // default value, can be modified with .setTarget
  }

  setTarget(target) {
    this.target = target;
  }

  update(currentValue) {
    this.currentValue = currentValue;

    // Calculate dt
    let dt = this.dt;
    if (!dt) {
      let currentTime = Date.now();
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

    let error = (this.target - this.currentValue);
    this.sumError = this.sumError + error*dt;
    if (this.i_max > 0 && Math.abs(this.sumError) > this.i_max) {
      let sumSign = (this.sumError > 0) ? 1 : -1;
      this.sumError = sumSign * this.i_max;
    }

    let dError = (error - this.lastError)/dt;
    this.lastError = error;

    return (this.k_p*error) + (this.k_i * this.sumError) + (this.k_d * dError);
  }

  reset() {
    this.sumError  = 0;
    this.lastError = 0;
    this.lastTime  = 0;
  }
}

module.exports = Controller;
