
const fileData = require('./fileData.js')
const textMetrics = require('./textMetrics.js')


//1.This method will, when given a path, return a promise that resolves to a string with the contents of the files.
 fileData.getFileAsString('textfile.json').then(function(data)
 {
     console.log(data);
     console.log(typeof data);

 },function(why){
     console.log(why);
              });

//2.This method will, when given a path, return a promise that resolves to a JavaScript object.
setTimeout(function(){
fileData.getFileAsJSON('textfile.json').then(function(data)
{
     console.log(data);
     console.log(typeof data);    
 },function(why){
     console.log(why);
              });
},1000);           

//3.This method will take the text supplied, and store it in the file specified by path.
setTimeout(function(){
fileData.saveStringToFile('file.txt',"Hello! My Name is Himanshu Goel").then(function(data)
{
     console.log(data);   
 },function(why){
     console.log(why);
              });
},2000);


//4.This method will take the obj supplied and convert it into a string so that it may stored as in a file.
setTimeout(function(){
let data1={"Name":"Lansdowne","latitude":"29.83","longitude":"78.68"};
 fileData.saveJSONToFile('file1.json',data1).then(function(data)
 {
     console.log(data);    
 },function(why){
     console.log(why);
              });
},2500);


// This will compute the Metrics 
setTimeout(function(){
 textMetrics.createMetrics("Hello, my friends! This is a great day to say hello.").then(function(obj)
    {
       console.log(obj);
       console.log("obj here");
     },
 function(why){
     console.log(why);
              });
},3000);          


// Compute the Metrics of the First chapter1
setTimeout(function(){
 var file1=fileData.getFileAsString('chapter1.txt');
file1.then((data)=>{
    textMetrics.createMetrics(data)
 .then(function(obj){
       console.log("Chapter 1 Starts From Here")
       console.log(obj);
       console.log("Chapter 1 Ends Here");
     },
 function(why){
     console.log(why);
 });
});
},4000);


//Compute the Metrics of the Second chapter2

setTimeout(function(){  
var file2=fileData.getFileAsString('chapter2.txt');
file2.then((data)=>{
    textMetrics.createMetrics(data)
 .then(function(obj){
       console.log("Chapter 2 Starts From Here")
       console.log(obj);
       console.log("Chapter 2 Ends Here");
     },
 function(why){
     console.log(why);
 });
});  
},5000);


//Compute the Metrics of the Third chapter3
setTimeout(function(){  
 var file3=fileData.getFileAsString('chapter3.txt');
file3.then((data)=>{
    textMetrics.createMetrics(data)
 .then(function(obj){
      console.log("Chapter 3 Starts From Here")
       console.log(obj);
       console.log("Chapter 3 Ends Here");
     },
 function(why){
     console.log(why);
 });
 });
},6000); 













