var Promise = require('bluebird');

var stuffArray = [ 
	{id: 1, stuff: ["a", "b"]}, 
	{id: 2, stuff: ["c", "d"]}, 
	{id: 3, stuff: ["e", "f"]}
	];

Promise.all(stuffArray)
    .map(function(stuffItem){
        return Promise.all(stuffItem.stuff)
            .map(processStuff)
            .then(function(v){
                stuffItem.stuff = v;
                return stuffItem;
            });
    })
    .then(function(arrayOut) {
        console.log(arrayOut);
    });

function processStuff(value){
    var deferred = Promise.defer();
    deferred.resolve('processed:' + value);
    return deferred.promise;
}