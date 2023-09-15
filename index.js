/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer.prompt([{
    name: "url",
    message: "Type your url which has to be qr'ed",
    default: "www.google.com",
},
])
.then(answer => {
    const url = answer.url;
    console.log(url);
    writeToFile(url);
    convertLinkToQr(url);
})
.catch(err => {
    console.log(err);
});

function writeToFile(url){
    fs.writeFile("URL.txt", url, (err) => {
        if(err) console.log(err);
        console.log("Done");
    });
}

function convertLinkToQr(url){
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr'+Math.floor(Math.random()*10000)+'.png'));
}
