function one(){
    two()
    console.log('one')
}
function two(){
    three()
    console.log('two')
}
function three(){
    console.log('three')
}

one()

// expectation
// three, two, one

// result
// three, two, one

// In js, it is output according to the function call stack