// 이게 1억줄짜리 코드고, 20년 프로젝트, 만드는 참여자가 2000명이라면,,,? 문제천지

// 코드에 쓰인 수많은 변수 중 하나
// var v1 = 'v1';
// 이 다음에 10000 줄의 코드
// v1 = 'jinhyun';
// 이래버리면 이 버그를 어케 찾음?

// var o = {
//     v1:'v1',
//     v2:'v2'
// }
// 객체로 정리


// function f1(){
//     console.log(o.v1);
// }

// function f2(){
//     console.log(o.v2);
// }

// f1();
// f2();
// 근데 이 1억개의 코드 사이에서 함수 만드는데 f1 이라는 이름을 실수로 써버리면
// 기존의 f1 함수가 삭제되어버리는 대참사 발생.... 객체가 우릴 구원해준댜


// var o ={
//     v1:'v1',
//     v2:'v2',
//     f1: function(){
//         console.log(o.v1);
//     },
//     f2: function (){
//         console.log(o.v2);
//     }
// }
// 근데 이렇게 써버리면... o를 선언하는데 f1,f2 선언할 때 o를 써버리면...
// 만약 객체 이름을 수정이라도 해버리면 아주 대참사가 일어나는 거다 (f1,f2 선언 시에는
// o라고 쓰고 있기 때문)

// 그래서 JavaScript 개발자들은 만들어냈다. this를,,, 
var o ={
    v1:'v1',
    v2:'v2',
    f1: function(){
        console.log(this.v1);
    },
    f2: function (){
        console.log(this.v2);
    }
}
// 따라서 우리가 만든 객체가 담기는 변수의 이름이 무엇이든
//  그 함수가 속해있는 객체를 참조할 수 있게 됨
