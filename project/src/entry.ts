declare var require: any;

'use strict';

import ClassA = require('ClassA');
import ClassB = require('ClassB');

var a:ClassA = new ClassA(); // direct use, this works

var angular = require('angular');

angular.module('myApp', []).
    // this compiles as it should, but in runtime the provider will not be packaged and angular will throw an error
    run(function(myProvider: ClassB) {
    }
);