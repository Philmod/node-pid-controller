# node-pid-controller

Simple Node.js PID controller.

![pid](http://upload.wikimedia.org/wikipedia/commons/9/91/PID_en_updated_feedback.svg)

## Installation

```
$ npm install node-pid-controller
```

## Example

Let's take the example of a car cruise control. We want the car driving at 120km/h.

### Create a Controller instance

`k_p`, `k_i` and `k_d` are the proportional, integral and derivative terms. `dt` is the interval of time between two measures. If not set, it will be automatically calculated.

```js
let Controller = require('node-pid-controller');

let ctr = new Controller({
  k_p: 0.25,
  k_i: 0.01,
  k_d: 0.01,
  dt: 1
});
```

You can also pass options as arguments:
```js
let ctr = new Controller(0.25, 0.01, 0.01, 1); // k_p, k_i, k_d, dt
```

### Set the target

```js
ctr.setTarget(120); // 120km/h
```

### Get the correction

```js
let correction = ctr.update(110); // 110km/h is the current speed
```

### Real example

Normally, you use the correction to a measure, in a closed loop.

```js
let goalReached = false
while (!goalReached) {
  let output = measureFromSomeSensor();
  let input  = ctr.update(output);
  applyInputToActuator(input);
  goalReached = (input === 0) ? true : false; // in the case of continuous control, you let this variable 'false'
}
```

## Options

* `k_p`, `k_i`, `k_d`: the PID's coefficients
* `dt`: interval of time (in seconds) between two measures. If not provided, it will be automatically calculated.
* `i_max`: the maximum absolute value of the integral term (optional)

## Test

```js
mocha test
```

## Author

Philmod &lt;philippe.modard@gmail.com&gt;
