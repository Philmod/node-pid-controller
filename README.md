# node-pid-controller

  Simple Node.js PID controller

![pid](http://upload.wikimedia.org/wikipedia/commons/9/91/PID_en_updated_feedback.svg)

## Installation

      $ npm install node-pid-controller

## Example
Let's take the example of a car cruise control.  We want the car driving at 120km/h.

### Create a Controller instance
```js
var Controller = require('node-pid-controller');
var ctr = new Controller(0.25, 0.01, 0.01); // k_p, k_i, k_d
```

### Set the target
```js
ctr.setTarget(120); // 120km/h
```

### Get the correction
```js
var correction = ctr.update(110); // 110km/h is the current speed
```

### Real example
Normally, you use the correction to a measure, in a closed loop
```js
var goalReached = false
while (!goalReached) {
  var output = measureFromSomeSensor();
  var input  = ctr.update(output);
  applyInputToActuator(input);
  goalReached = (input === 0) ? true : false; // in the case of continuous control, you let this variable 'false'
}
```

## Test
```js
mocha test
```

## Author

Philmod &lt;philippe.modard@gmail.com&gt;