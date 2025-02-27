// var M = {
//     v:'v',
//     f:function(){
//         console.log(this.v);
//     }
// }

// M.f();

// // 객체가 많아진다면...?

var part = require('./mpart.js');
// 모듈을 불러올 때는 require를 쓴다
// ./는 현재 디렉토리라는 뜻

console.log(part.v);
part.f();