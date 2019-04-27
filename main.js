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
  while (x < 0) {
    x += n;
  }
  return x;
}

let alphaTxt = document.getElementById("alphaTxt");
let charBtns = document.getElementsByClassName("btnsDiv")[0].childNodes;
let numCharTxt = document.getElementById("numCharTxt");
let okayBtn = document.getElementById("okayBtn");
let containers = document.getElementsByClassName("container");
let matrixDiv = document.getElementsByClassName("matrixDiv")[0].childNodes;
let goBtn = document.getElementById("goBtn");
let tabsDiv = document.getElementsByClassName("tabsDiv")[0].childNodes;
let title1 = document.getElementById("title1");
let txt1 = document.getElementById("txt1");
let title2 = document.getElementById("title2");
let txt2 = document.getElementById("txt2");
let actionBtn = document.getElementById("actionBtn");

let n;
let alphbetics;
let key = [
  [],
  [],
  []
];
let det;

charBtns[1].addEventListener("click", () => {
  alphaTxt.value += "abcdefghijklmnopqrstuvwxyz";
  numCharTxt.innerText = alphaTxt.value.length;
});

charBtns[3].addEventListener("click", () => {
  alphaTxt.value += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  numCharTxt.innerText = alphaTxt.value.length;
});

charBtns[5].addEventListener("click", () => {
  alphaTxt.value += "0123456789";
  numCharTxt.innerText = alphaTxt.value.length;
});

alphaTxt.addEventListener("keyup", () => {
  numCharTxt.innerText = alphaTxt.value.length;
});

okayBtn.addEventListener("click", () => {
  if (alphaTxt.value != "") {
    containers[0].classList.add("hide");
    containers[1].classList.remove("hide");
    n = parseInt(numCharTxt.innerText);
    alphbetics = alphaTxt.value;
  }
});

goBtn.addEventListener("click", () => {
  let index = 1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      key[i][j] = parseInt(matrixDiv[index].value);
      index += 2;
    }
  }
  console.log(key);
  if (checkRelativelyPrime()) {
    alertFunc(1, "relatively prime");
    console.log("relatively prime");

    containers[1].classList.add("hide");
    containers[2].classList.remove("hide");
  } else {
    alertFunc(0, "not relatively prime");
    console.log("not relatively prime");
  }
});

tabsDiv[1].addEventListener("click", () => {
  title1.innerText = "Enter Plain Text";
  title2.innerText = "Cipher Text";
  actionBtn.innerHTML = "encrypt";
});

tabsDiv[3].addEventListener("click", () => {
  title1.innerText = "Enter Cipher Text";
  title2.innerText = "Plain Text";
  actionBtn.innerHTML = "decrypt";
});

actionBtn.addEventListener("click", () => {
  if (actionBtn.innerHTML === "encrypt") {
    txt2.value = encrypt(txt1.value);
  } else {
    console.log(txt1.value);

    txt2.value = decrypt(txt1.value);
  }
});

function checkRelativelyPrime() {

  det = parseInt(getDeterminent(key));
  console.log("det = " + det);

  let g = gcd(det, n);
  console.log("gcd = " + g);

  if (g == 1) {
    return true;
  } else {
    return false;
  }
}

function encrypt(plain) {
  let cipher = "";
  if (alphbetics.indexOf(" ") == -1) {
    plain = plain.split(" ").join("");
  }

  for (let index = 0; index < plain.length; index += 3) {
    let x = alphbetics.indexOf(plain[index]);
    let y, z;

    if (index + 1 == plain.length) {
      y = 0;
      z = 1;
    } else {
      y = alphbetics.indexOf(plain[index + 1]);
      if (index + 2 == plain.length) {
        z = 0;
      } else {
        z = alphbetics.indexOf(plain[index + 2]);
      }
    }

    let res = multiplyMatrix(key, [x, y, z]);


    for (let i = 0; i < res.length; i++) {
      if (res[i] < 0) {
        res[i] = getRidOfNeg(res[i], n);
      }
      let j = res[i] % n;
      cipher += alphbetics[j];
    }
  }
  return cipher;
}

function decrypt(cipher) {
  let plain = "";
  let m = det;
  if (det < 0) {
    m = getRidOfNeg(det, n);
  }
  m = m % n;

  console.log("n: " + n);

  console.log("m:  " + m);


  let modularInv = modularInverse(m, n);

  let matrixInv = inverseMatrix(key);

  console.log(modularInv);


  for (let index = 0; index < cipher.length; index += 3) {
    let x = alphbetics.indexOf(cipher[index]);
    let y = alphbetics.indexOf(cipher[index + 1]);
    let z = alphbetics.indexOf(cipher[index + 2]);

    console.log("dec: " + [x, y, z]);


    let res = multiplyMatrix(matrixInv, [x, y, z]);

    console.log("matinv: " + res);



    for (let i = 0; i < res.length; i++) {
      res[i] *= modularInv;


      console.log("res[" + i + "]:  " + res[i]);

      if (res[i] < 0) {
        res[i] = getRidOfNeg(res[i], n);
      }



      let j = res[i] % n;

      plain += alphbetics[j];
    }

  }
  return plain;
}

// for alert
let alertContainer = document.getElementById("alertContainer");
let btn = document.getElementById("btn");
let alertIcon = document.getElementById("alertIcon");
let alertMessage = document.getElementById("alertMessage");
let alert = document.getElementById('alert');

function alertFunc(type, message) {
  if (type === 0) {
    alertIcon.classList.add('fa-times');
    alertIcon.classList.add('text-danger');
    alert.style.borderTop = "50px solid #0b9253";
  } else if (type === 1) {
    alertIcon.classList.add('fa-check');
    alertIcon.classList.add('text-success');
    alert.style.borderTop = "50px solid #262626";
  }
  alertMessage.innerHTML = message;
  alertContainer.classList.remove('hide');
  alert.classList.add("show-animation");

  setTimeout(() => {
    alertContainer.classList.add('hide-animation');
  }, 2000);

  setTimeout(() => {
    alertContainer.classList.add('hide');
    alert.classList.remove("show-animation");
    alertContainer.classList.remove('hide-animation');
    alertContainer.style.opacity = '1';
    alertIcon.className = '';
    alertIcon.classList.add('fas');
  }, 3000);
}