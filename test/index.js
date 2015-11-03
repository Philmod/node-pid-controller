/**
 * Module dependencies.
 */

var Controller = require('../')
  , should = require('should')
  , assert = require('assert')
  ;

/**
 * Tests
 */
describe('pid-controller', function(){

  var options = {
    k_p: 0.5,
    k_i: 0.1,
    k_d: 0.2,
    dt: 1
  };

  // Create the controller
  var ctr = new Controller(options.k_p, options.k_i, options.k_d, options.dt);

  it('should have set the coefficient', function() {
    ctr.k_p.should.equal(options.k_p);
    ctr.k_i.should.equal(options.k_i);
    ctr.k_d.should.equal(options.k_d);
    ctr.dt.should.equal(options.dt);
  });

  it('should have set the coefficient from an options object', function(){
    var ctr = new Controller(options);

    ctr.k_p.should.equal(options.k_p);
    ctr.k_i.should.equal(options.k_i);
    ctr.k_d.should.equal(options.k_d);
    ctr.dt.should.equal(options.dt);
  });

  it('should set the target', function(){
    var v = 120; // 120km/h
    ctr.setTarget(v);
    ctr.target.should.equal(v);
  });

  it('should return the correction', function(){
    var vt = 110; // current speed
    var correction = ctr.update(vt);
    correction.should.equal(8);
  });

  it('should reset the controller', function(){
    ctr.reset();
    ctr.sumError.should.equal(0);
    ctr.lastError.should.equal(0);
    ctr.lastTime.should.equal(0);
  });

  it('should return the correction for the given update interval', function(){
    ctr.dt = 2; // 2 seconds between updates
    var correction = ctr.update(115);
    correction.should.equal(4);
    ctr.dt = options.dt; // Reset dt
  });

  it('should return the correction with sumError <= i_max', function() {
    var ctr = new Controller(options);
    ctr.i_max = 5; // sumError will be 10
    ctr.setTarget(120);
    var correction = ctr.update(110);
    correction.should.equal(7.5);
    ctr.sumError.should.be.belowOrEqual(ctr.i_max);
  });

  it('should return a null correction', function(){
    var ctr = new Controller(0, 0, 0);
    ctr.setTarget(120);
    var correction = ctr.update(110);
    correction.should.equal(0);
  });

});
