var hammingCode = require("./node_modules/hamming-code/index.js");
var fs = require('fs');


//console.log("Encode 0011: ", hammingCode.encode("1010"));
//console.log("Decode 0011111: ", hammingCode.decode(hammingCode.encode("1010")));
// console.log("Check 0011111: ", hammingCode.check(hammingCode.encode("1111")));
// console.log("Check 0001111: ", hammingCode.check("0001111"));
// console.log("Decode 0001111: ", hammingCode.decode("0001111"));
// console.log("Pure Decode (without correcting) 0001111: ", hammingCode.pureDecode("0001111"));


function encodeBits(bigbinary){
    //Split string in groups of 4 an, return goups of 7 then concatenate
    //let stringPos = 1;
    //console.log(bigbinary.length +1);
    let encodedString = 0;
    let count = 0;
    for (let index = 0; index < (bigbinary.length + 1)/4; index++) {
        
        let currentEncodedBit = bigbinary.substr(count, 4);//encode("1111");
        
        encodedString = encodedString + hammingCode.encode(currentEncodedBit);
        
        count = count + 4;
       
    }
     console.log(encodedString);
}

function generate10milBits(){
    let tenMillionBits ='';
    for (let index = 0; index < 10000000; index++) {

        //tenMillionBits = tenMillionBits +  randomIntInc(0,1);
        tenMillionBits = tenMillionBits.concat(randomIntInc(0,1));
        
    }
    //console.log(tenMillionBits);
    return tenMillionBits;
}
function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low)
}

function hammingStart(){
    var bits = generate10milBits();
     //console.log(bits);
    //encodeBits(bits);
    //encodeBits('001111000110');
    //console.log(hammingCode.encode(bits));
    //console.log(hammingCode.decode("11010110110001100"));

var enc = hammingCode.encode(bits);

    fs.writeFile('code.txt', enc, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}


hammingStart(); 
