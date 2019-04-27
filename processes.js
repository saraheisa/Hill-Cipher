function getDeterminent(matrix) {
    let x = matrix[0][0] * ((matrix[1][1] * matrix[2][2]) - (matrix[2][1] * matrix[1][2]));
    let y = matrix[0][1] * ((matrix[1][0] * matrix[2][2]) - (matrix[2][0] * matrix[1][2]));
    let z = matrix[0][2] * ((matrix[1][0] * matrix[2][1]) - (matrix[2][0] * matrix[1][1]));
    return (x - y + z);
}

function modularInverse(m, n) {
    let x = m;
    let y = n;

    let divs = [];
    let adds = [];

    let result;

    if (y > x) {
        let i = 1;
        while (x != 0) {
            divs[i] = Math.floor(y / x);
            let temp = x;
            x = y % x;
            y = temp;
            i++;
        }

        let len = divs.length;
        adds[len - 1] = 0;
        adds[len - 2] = 1;
        for (let index = len - 2; index > 0; index--) {
            adds[index - 1] = (divs[index] * adds[index]) + adds[index + 1];
        }

        if ((adds[0] * m) > (adds[1] * n)) {
            result = adds[0];
        } else {
            result = n - adds[0];
        }

    }

    return result;

}

function inverseMatrix(matrix) {
    let minorMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            minorMatrix[i][j] = (matrix[(i + 1) % 3][(j + 1) % 3] * matrix[(i + 2) % 3][(j + 2) % 3]) - (matrix[(i + 1) % 3][(j + 2) % 3] * matrix[(i + 2) % 3][(j + 1) % 3]);

        }
    }

    let adjointMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    for (let i = 0; i < minorMatrix.length; i++) {
        for (let j = 0; j < minorMatrix[i].length; j++) {
            adjointMatrix[j][i] = minorMatrix[i][j];
        }
    }
    return adjointMatrix;
}

function multiplyMatrix(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = 0;
        for (let j = 0; j < a[i].length; j++) {
            result[i] += b[j] * a[i][j];
        }
    }
    return result;
}

function gcd(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

function getRidOfNeg(x, n) {
    while(x < 0){
        x += n;
    }
    return x;
}

function removeRepetition(n) {
    let temp = "";
    for (let i = 0; i < n.length; i++) {
        if (temp.indexOf(n[i]) === -1) {
            temp += n[i];
        }
    }
    return temp;
}

function checkPlain(n, plain) {
    for (let i = 0; i < plain.length; i++) {
        if (n.indexOf(plain[i]) === -1) {
            return false;
        }
    }
    return true;
}

// let matrix = [[3, 10, 20],[20, 9, 17], [9, 4, 17]];

// let a = [[3, 10], [20, 9]];
// let b = [14, 25];

// console.log(getDeterminent(matrix));

// console.log((-10) % 3);   ridculously wrong you need to get red of the negative

// console.log(Math.floor(5 / 2));


// console.log(modularInverse(7, 10007));

// console.log(inverseMatrix(matrix));

// console.log(multiplyMatrix(matrix, [0, 19, 19]));

// console.log(gcd(256,234123));

// console.log(removeRepetition("abbcdaa"));

// console.log(checkPlain("abcd", "abcde"));
