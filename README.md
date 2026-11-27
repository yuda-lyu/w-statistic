# w-statistic
A tool for statistical analysis.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![npm version](http://img.shields.io/npm/v/w-statistic.svg?style=flat)](https://npmjs.org/package/w-statistic) 
[![license](https://img.shields.io/npm/l/w-statistic.svg?style=flat)](https://npmjs.org/package/w-statistic) 
[![npm download](https://img.shields.io/npm/dt/w-statistic.svg)](https://npmjs.org/package/w-statistic) 
[![npm download](https://img.shields.io/npm/dm/w-statistic.svg)](https://npmjs.org/package/w-statistic) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-statistic.svg)](https://www.jsdelivr.com/package/npm/w-statistic)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-statistic/w-statistic.html).

## Numeric handling
Functions that take a numeric array (or numeric options) only use finite numbers. `±Infinity` (including the strings `'Infinity'`, `'-Infinity'` and `'1e400'`) is treated like any other non-numeric value: it is not counted and not used in the calculation, and an option given as `±Infinity` (for example `opt.min`, `opt.max`, `opt.dx`, `opt.interpX`) is treated as not given. When no usable number is left, each function keeps its usual no-data result (for example `null`, `[]` or a rejected promise). Numeric strings follow `isenum` of wsemi: decimal notation only, so `'0x10'` is not counted.

```alias
arrAverage([1, 2, 3, Infinity, -Infinity]) // => 2
```

An element that is not a valid number (a marker string such as `'-'`, `null`, a boolean, an object, `NaN`, `±Infinity`) never makes a call fail: it is left out of the calculation. For regression (`regLine`, `regPoly`, `regPower`) a point is left out as a whole when either coordinate is not a valid number (`regPower` also needs both coordinates greater than 0). `regMpLine` hands its matrices to a third-party package as they are and does not skip elements.

For the exponential moving average (`arrMovingAverage` with `mode: 'EMA'`), a point that is not a valid number is left out of the recursion and its output repeats the previous EMA. The first valid point is the seed; the points before it have no EMA yet and their output is `null` (all `null` when no point is valid, like the other two modes). The output always keeps the length of the input and is finite from the first valid point on.

```alias
arrMovingAverage([10, 12, 'abc', 13, 12], { mode: 'EMA', selectCountHalf: 2 })
// => [10, 11.333333333333334, 11.333333333333334, 12.444444444444445, 12.148148148148147]
arrMovingAverage(['x', null, 12, 'z', 11], { mode: 'EMA', selectCountHalf: 2 })
// => [null, null, 12, 12, 11.333333333333334]
```

`arrNormHist` and `arrLogNormHist` reject with `'no effective data'` when no valid number is left (`arrLogNormHist` also when no valid number is greater than 0).

## Quantile (type 7)
`arrQuantile7(arr, ratio)` returns the type 7 quantile (the default of R `quantile` and numpy `quantile`): the sorted valid numbers are interpolated linearly at position `(n - 1) * ratio`. It differs from `arrQuartile`, which returns the nearest original value (population quantile). Only finite numbers are used; it returns `null` for a non-array, an empty array, no valid number, or a `ratio` that is not a number from 0 to 1.

```alias
arrQuantile7([3, 6, 7, 8, 8, 10, 13, 15, 16, 20], 0.25) // => 7.25
arrQuartile([3, 6, 7, 8, 8, 10, 13, 15, 16, 20], 0.25) // => 7
```

## Installation

### Using npm(ES6 module):
```alias
npm i w-statistic
```

### In a browser(UMD module):

Add script for w-statistic.
```alias
<script src="https://yuda-lyu.github.io/w-statistic/dist/w-statistic.umd.js"></script>
```
