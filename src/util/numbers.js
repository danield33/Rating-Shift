Number.prototype.toSymbolic = function() {

    let number = this.valueOf();
    if(number > 1000000){
        number /= 1000000
        number = Math.round(number);
        return number.toString() + "M"
    } else if(number > 1000){
        number/=1000
        number = Math.round(number);
        return number.toString() + "K"
    }

}