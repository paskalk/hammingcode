var hammingCode = require("./node_modules/hamming-code/index.js");
var fs = require('fs');


//console.log("Encode 0011: ", hammingCode.encode("1010"));
//console.log("Decode 0011111: ", hammingCode.decode(hammingCode.encode("1010")));
// console.log("Check 0011111: ", hammingCode.check(hammingCode.encode("1111")));
// console.log("Check 0001111: ", hammingCode.check("0001111"));
// console.log("Decode 0001111: ", hammingCode.decode("0001111"));
// console.log("Pure Decode (without correcting) 0001111: ", hammingCode.pureDecode("0001111"));

const errorProbability = 0.1;
const errorDecimalPlaces = 1;

function encodeOrDecode(bigbinary,noOfBits,correctError){
    //Split string in groups of 4 an, return goups of 7 then concatenate
    
    var encodedString = '';
    let count = 0;
    let erroneousTransferCount = 0;
    for (let index = 0; index < (bigbinary.length)/noOfBits; index++) {
        
        let currentEncodedBit = bigbinary.substr(count, noOfBits);//encode("1111");
        
        if(noOfBits == 4){
            encodedString = encodedString + hammingCode.encode(currentEncodedBit);           
        } else {
            if (hammingCode.check(currentEncodedBit)){ //True means there's an error
                encodedString = encodedString + ((correctError = true) ? hammingCode.decode(currentEncodedBit) :hammingCode.pureDecode(currentEncodedBit));         
                erroneousTransferCount = erroneousTransferCount + 1;
            } else {
                encodedString = encodedString +  hammingCode.decode(currentEncodedBit);         
            }
        }
        count = count + noOfBits;
        
    }
    console.log('Number of errors found: ' + erroneousTransferCount);
    return encodedString;
}

function generate10milBits(){
    let tenMillionBits ='';
    for (let index = 0; index < 1000000; index++) {
        tenMillionBits = tenMillionBits.concat(Math.round(Math.random()));
    }
    //console.log(tenMillionBits);
    return tenMillionBits;
}

function hammingStart(){
    var bits = generate10milBits();
    
    let encodedString = encodeOrDecode(bits,4,false); //Encode
    //console.log(encodedString);

    //Simulate Noise
    let messagePlusNoise = sendMessage(encodedString);

    //decode message with errors
    let decodedNoisyString = encodeOrDecode(messagePlusNoise,7,true);
    //console.log(decodedString);

    // //decode message without errors
    // let decodedString = encodeOrDecode(encodedString,7,false);
    // //console.log(decodedString);


    fs.writeFile('code.txt', encodedString, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
}
 
function addNoise(b,p){

    if (p == errorProbability){//flip
        b = (b == 0) ? 1 : 0;
    }
    //console.log(b + 'prob: - >  ' + p)
    return b;
}

function sendMessage(message){
    var messageToSend = '';
    for (var i = 0; i < message.length; i++) {
        messageToSend = messageToSend + addNoise((message[i]),Math.random().toFixed(errorDecimalPlaces));
      }
    //   console.log(messageToSend);
   return messageToSend;
}


//sendMessage('0001');

hammingStart(); 


// console.log("encode : ", hammingCode.encode("0001"));
// console.log("Decode : ", hammingCode.decode("0001000"));
// console.log("pDecode : ", hammingCode.pureDecode("0001000"));
// console.log("pDecode : ", hammingCode.check("0001001"));
// encodeOrDecode('0001000',7,true)