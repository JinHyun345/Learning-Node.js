// 데이터를 정리하는 도구 :  array, object
// JavaScript에서 코드를 그룹화하는 도구 :  함수
//JavaScript 상에서 함수의 특성 : 처리해야 할 일에 대한 
// 정보를 담고 있는 statment 이자 value임 ㅎㅎ 함수를 변수에 넣을 수 있다는 소리임

//if문이나 while문 등은 값이 될 수 없다

var plus = function(){
    console.log(1+2);
    console.log(2+2);
}

console.log(plus);
plus();


var a = [plus];
a[0]();
// 함수는 배열의 원소로서 존재할 수 있고 (근데 이런 경우는 많이 없대)

var o = {
    func:plus
}
o.func();
// 객체의 property로도 존재할 수 있다........와우 
// (이렇게 많이 쓴대, 객체는 이름이 있어서 쓰기 유용)

// 함수는 데이터다 ㄷㄷ