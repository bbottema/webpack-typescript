// this line is never logged
console.log('ClassB.ts: if you see this, then ClassB.ts was packaged properly');

class ClassB {
    public func: Function = function(): void {};
}

var angular = require('angular');

angular.module('myApp').service('myProvider', (new ClassB()).func);

export = ClassB;
