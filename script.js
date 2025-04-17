class Person {
    constructor(name, age) {
      // 생성자: 새 인스턴스를 만들 때 호출됨
      this.name = name;
      this.age = age;
    }
  
    // 메소드 정의
    sayHello() {
      console.log(`안녕하세요, 저는 ${this.name}입니다.`);
    }
  }
  
  // 클래스를 사용해 인스턴스 생성
  const person1 = new Person("Alice", 25);
  const person2 = new Person("Bob", 30);
  
  person1.sayHello(); // "안녕하세요, 저는 Alice입니다."
  person2.sayHello(); // "안녕하세요, 저는 Bob입니다."


  class Student extends Person {
    constructor(name, age, studentId) {
      super(name, age); // 부모 클래스(Person)의 생성자 호출
      this.studentId = studentId; // Student 고유의 속성
    }
  
    study() {
      console.log(
        `${this.name} (학번: ${this.studentId}) 학생이 공부하고 있습니다.`
      );
    }
  }
  
  const student1 = new Student("Charlie", 20, "2023001");
  student1.sayHello(); // Person에게 상속받은 메소드 -> "안녕하세요, 저는 Charlie입니다."
  student1.study();



  // 변수 삽입
let user = "민수";
let greeting = `안녕하세요, ${user}님!`;
console.log(greeting); // "안녕하세요, 민수님!"

// 표현식 삽입
let price = 1000;
console.log(`가격: ${price * 1.1}원`); // "가격: 1100원"

// 여러 줄 문자열
let multiLine = `여러 줄의
문자열을
그대로 씁니다.`;
console.log(multiLine);


// 배열 구조 분해
let arr = [100, 200, 300];
let [x, y, z] = arr;
console.log(x, y, z); // 100 200 300

// 일부 요소만 가져오기
let [first, , third] = ["사과", "바나나", "체리"];
console.log(first, third); // "사과" "체리"

// 나머지 요소 가져오기
let [head, ...rest] = [1, 2, 3, 4];
console.log(head, rest); // 1 [2, 3, 4]

// 객체 구조 분해
let options = { title: "Menu", width: 100, height: 200 };
let { title, width, height } = options;
console.log(title, width, height); // "Menu" 100 200

// 변수명 변경과 기본값
let { width: w, height: h, color: c = "blue" } = options;
console.log(w, h, c); // 100 200 "blue"



// 배열 스프레드
let arr1 = [1, 2, 3];
let arr2 = [4, 5];
let combined = [...arr1, ...arr2, 6];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 배열 복사
let copy = [...arr1];
console.log(copy); // [1, 2, 3]

// 함수 인자로 사용
let numbers = [5, 3, 8, 1];
console.log(Math.max(...numbers)); // 8

// 객체 스프레드
let obj1 = { name: "컵", price: 3000 };
let obj2 = { ...obj1, color: "red" };
console.log(obj2); // { name: "컵", price: 3000, color: "red" }

// 객체 속성 덮어쓰기
let obj3 = { price: 2500, ...obj1 };
console.log(obj3); // { price: 3000, name: "컵" }


fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json()) // 응답을 JSON으로 변환
  .then((data) => {
    console.log("받은 데이터:", data);
    // 데이터로 DOM 조작 등 작업 수행
    document.getElementById("my-id").textContent = data.title;
  })
  .catch((error) => {
    console.error("에러 발생:", error);
  });

// POST 요청 보내기
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST", // HTTP 메서드 지정
  headers: {
    // 요청 헤더 설정
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    // 요청 본문 (문자열로 변환)
    title: "foo",
    body: "bar",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("응답 데이터:", data));



  // async/await 기본 사용법
async function loadData() {
    try {
      // await는 Promise가 이행될 때까지 실행을 일시 중단
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const data = await response.json();
      console.log("데이터:", data);
      return data; // Promise<data>로 자동 래핑됨
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }
  
  // async 함수 호출
  loadData().then((result) => {
    if (result) {
      console.log("처리 완료:", result);
    }
  });
  
  // 병렬 처리 예제
  async function loadMultipleData() {
    try {
      // Promise.all과 함께 사용하여 병렬 처리
      const [response1, response2] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/todos/1"),
        fetch("https://jsonplaceholder.typicode.com/todos/2"),
      ]);
  
      const data1 = await response1.json();
      const data2 = await response2.json();
  
      console.log("데이터1:", data1);
      console.log("데이터2:", data2);
    } catch (error) {
      console.error("에러:", error);
    }
  }


