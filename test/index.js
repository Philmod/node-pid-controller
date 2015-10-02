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

  var k_p = 0.5,
      k_i = 0.1,
      k_d = 0.2,
      dt  = 1;

  // Create the controller
  var ctr = new Controller(k_p, k_i, k_d, dt);

  it('should have set the coefficient', function() {
    ctr.k_p.should.equal(k_p);
    ctr.k_i.should.equal(k_i);
    ctr.k_d.should.equal(k_d);
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
    ctr.dt = dt; // Reset original dt
  });

  it('should return the correction for the given integral length', function(){
    ctr.reset();
    ctr.sumLength = 5; // Only keep the five last errors
    for (var i = 0; i < 10; i++) {
      ctr.update(100 + i);
    }
    var correction = ctr.update(110);
    correction.should.equal(12.3);
    ctr.sumLength = 0; // Reset to original value
  });

  it('should return a null correction', function(){
    var ctr = new Controller(0, 0, 0);
    ctr.setTarget(120);
    var correction = ctr.update(110);
    correction.should.equal(0);
  });

});
