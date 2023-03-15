// Array
var arr = [
    { name: 'John', age: 12 },
    { name: 'John', age: 12 }
];
function we17304_map(arr, cb) {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
        var newArr_1 = cb(arr[i]);
        temp.push(newArr_1);
    }
    return temp;
}
var newArr = we17304_map(arr, function (item) {
    return { name: item.name, age: item.age * 2 };
});
console.log(newArr);
function sort_We17304(array, cb) {
    if (cb && typeof (cb) === "function") {
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (cb(array[i], array[j])) {
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
        }
    }
    else {
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (array[i] == array[j]) {
                    console.log("abc");
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
        }
    }
}
var arr_test = [1, 5, 3, 7];
sort_We17304(arr_test, function (a, b) {
    return a > b;
});
console.log(arr_test);
