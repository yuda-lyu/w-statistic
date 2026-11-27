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
