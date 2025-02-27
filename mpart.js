var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }
}

module.exports = M;

// M이 가리키는 저 객체를 이 파일 바깥에서 사용할 수 있도록 하겠다는 선언