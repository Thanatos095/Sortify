function getRandomInt(min : number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getUniformNumber(min : number, max : number){
    return Math.round(Math.random() * (max - min) + min);
}
function getNormalNumber(min : number, max : number){
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) 
        num = getNormalNumber(min, max) // resample between 0 and 1 if out of range
    else{
        num *= max - min // Stretch to fill range
        num += min // offset to min
    }
  return Math.round(num);
}

const getUniformRange = (min : number, max : number, length : number) => Array.from({ length : length } , item => getUniformNumber(min, max))
const getNormalRange = (min : number, max : number, length : number) => Array.from({ length : length } , item => getNormalNumber(min, max))

export {getRandomInt, getUniformRange, getNormalRange};