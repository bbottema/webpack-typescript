declare var require: any;

'use strict';

var angular = require('angular');
var app = angular.module('myApp', []);


import ClassA = require('ClassA'); 
require('ClassA');
import ClassB = require('ClassB'); 
require('ClassB');

var a:ClassA = new ClassA(); // direct use, this works

// this compiles as it should, but in runtime the provider will not be packaged and angular will throw an error
app.run(function(myProvider: ClassB) {});