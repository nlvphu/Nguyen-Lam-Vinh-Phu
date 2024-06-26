// Provide 3 unique implementations of the following function in JavaScript.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

//Naive with loop
var sum_to_n_a = function(n) {
    let sum =0;
    for (let i = 1; i<= n; ++i){
        sum+=i;
    }
    return sum;
};

//Mathematic solution for n consecutive integer numbers
var sum_to_n_b = function(n) {
    return (n*(n+1))/2;
};

//recursion solution
var sum_to_n_c = function(n) {
    if (n==0){
        return 0; 
    }

    return n + sum_to_n_c(n-1);
};

console.log(sum_to_n_a(0)); // Output: 0
console.log(sum_to_n_b(0)); // Output: 0
console.log(sum_to_n_c(0)); // Output: 0

console.log(sum_to_n_a(1)); // Output: 1
console.log(sum_to_n_b(1)); // Output: 1
console.log(sum_to_n_c(1)); // Output: 1

console.log(sum_to_n_a(2)); // Output: 3
console.log(sum_to_n_b(2)); // Output: 3
console.log(sum_to_n_c(2)); // Output: 3

console.log(sum_to_n_a(3)); // Output: 6
console.log(sum_to_n_b(3)); // Output: 6
console.log(sum_to_n_c(3)); // Output: 6

console.log(sum_to_n_a(10)); // Output: 55
console.log(sum_to_n_b(10)); // Output: 55
console.log(sum_to_n_c(10)); // Output: 55

console.log(sum_to_n_a(100)); // Output: 5050
console.log(sum_to_n_b(100)); // Output: 5050
console.log(sum_to_n_c(100)); // Output: 5050

console.log(sum_to_n_a(1000)); // Output: 500500
console.log(sum_to_n_b(1000)); // Output: 500500
console.log(sum_to_n_c(1000)); // Output: 500500
