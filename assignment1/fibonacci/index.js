module.exports = function (num) { // export default function() {} can also be used - ES6 version
    return fibonacci(Math.abs(num));
}

// function that finds nth fibonacci number.
function fibonacci(num) {
    if (num == 0 || num == 1) // if(num < 2)
        return num;
    return fibonacci(num - 2) + fibonacci(num - 1);
}
