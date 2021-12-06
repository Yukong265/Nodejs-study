var Human = function(type){
    this.type = type || 'human';
}

Human.isHuman = function(human){
    return human instanceof Human;
}

Human.prototype.breathe = function() {
    alert('h-a-a-a-m');
}

var Zero = function(type, firstName, lastName){
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
}

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero;
Zero.prototype.sayName = function(){
    alert(this.firstName + '' + this.lastName);
}
var oldZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(oldZero)

// 위의 코드를 클래스 기반 코드로 바꿔 보겠습니다.

class Human1 {
    constructor(type = 'human'){
        this.type = type;
    }

    static isHuman(human){
        return human instanceof Human;
    }

    breathe(){
        alert('h-a-a-a-m');
    }
}

class Zero1 extends Human {
    constructor(type, firstName, lastName) {
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayName() {
        super.breathe()
        alert(`${this.firstName} ${this.lastName}`);
    }
}

const newZero = new Zero1('human', 'Zero', 'Cho');
Human1.isHuman(newZero);