function make_verify_number(){
    return parseInt(Math.random() * (999999 - 100000) + 100000)
}

module.exports = make_verify_number;