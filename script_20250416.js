// var
var name = "홍길동";
var age = 25;
// let
let count = 0;
count = count + 1; // 재할당 가능
// const
const PI = 3.14159;
const API_URL = "https://api.example.com";
// PI = 3.15; // 오류 발생: 재할당 불가


// 함수 스코프
function greet() {
  var message = "Hello";
  console.log(message);
  {
    var x = 10;
    console.log(x);
  }
  console.log(x);
}
// console.log(x); // 오류 발생: x는 함수 스코프에 속해 있음
greet(); // Hello

// 블록 스코프
{
  let x = 10;
  const y = 20;
  console.log(x, y);
}
// console.log(x, y); // 오류 발생: x와 y는 블록 스코프에 속해 있음


let num = 10; // 숫자
console.log(typeof num);
let str = "Hello"; // 문자열
console.log(typeof str);
let bool = true; // 불리언
console.log(typeof bool);
let und; // undefined
console.log(typeof und);
let obj = {
  name: "홍길동",
  age: 25,
}; // 객체
console.log(typeof obj);
let arr = [1, 2, 3]; // 배열
console.log(typeof arr);
let func = function () {}; // 함수
console.log(typeof func);



function add(a, b) {
    return a + b;
}
  
let result1 = add(1, 2);
console.log(result1);
  
let addArrow = (a, b) => a + b;
let result2= addArrow(1, 2);
console.log(result2);



let person = {
    name: "홍길동",
    age: 25,
    greet: function () {
      console.log("안녕하세요!");
    },
  };
  
  console.log(person.name); // 홍길동
  console.log(person["age"]); // 25
  person.greet(); // 안녕하세요!
  person["greet"]();



let fruits = ["apple", "banana", "cherry"];
fruits.push("orange"); // 배열 끝에 "orange" 추가
console.log(fruits); // ["apple", "banana", "cherry", "orange"]

let numbers = [1, 2, 3, 4, 5];
numbers.pop(); // 배열 끝 요소 제거
console.log(numbers); // [1, 2, 3, 4]

let colors = ["red", "green", "blue"];
colors.unshift("yellow"); // 배열 앞에 "yellow" 추가
console.log(colors); // ["yellow", "red", "green", "blue"]

let fruits1 = ["apple", "banana", "cherry"];
fruits1.splice(1, 0, "orange", "kiwi"); // 인덱스 1에 "orange"와 "kiwi" 추가
console.log(fruits1); // ["apple", "orange", "kiwi", "banana", "cherry"]

let numbers1 = [1, 2, 3, 4, 5];
numbers1.splice(2, 1, 99); // 인덱스 2에 99 추가
console.log(numbers1); // [1, 2, 99, 4, 5]



let a = 10;
let b = 20;
let c = a + b; // 30
console.log(c);

let str1 = "Hello";
let str2 = "World";
let result = str1 + " " + str2; // "Hello World"
console.log(result);

let x = 5;
x += 10; // x = x + 10
console.log(x);

let y = 10;
y *= 2; // y = y * 2
console.log(y);

let isTrue = true;
let isFalse = false;
console.log(isTrue && isFalse); // false
console.log(isTrue || isFalse); // true
console.log(!isTrue); // false