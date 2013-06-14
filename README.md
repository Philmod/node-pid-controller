# node-pid-controller

  Node.js PID controller

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

## Author

Philmod &lt;philippe.modard@gmail.com&gt;