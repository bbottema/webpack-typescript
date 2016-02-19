declare var require: any;

// this line is never logged
console.log('ClassB.ts: if you see this, then ClassB.ts was packaged properly');

class ClassB {
}

var angular = require(angular);

angular.module('myApp').service(new ClassB());

export = ClassB;