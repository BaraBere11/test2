const express = require("express");
const path = require("path");
const mod = require("./data_prep.js")
const app = express();




const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    let resText = "<h2>Declaration</h2>";
    resText += "<p>I aknowledge that College's intergity policy - and my own integrity - remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates... even when no one is watching. I declare I will not break the trust.<p>"
    resText += "<p>Name: <mark>Artem Pankov</mark><p>";
    resText += "<p>Student Number: <mark>109060210</mark><p>";
    resText += "<a href = '/CPA'> Click to visit CPA Students </a><br>"; 
    resText += "<a href = '/highGPA'> Click to see who has the highest GPA </a>";
  res.send(resText);
});

app.get("/CPA", (req, res) => {
    mod.cpa().then(value => 
        res.json(value)).catch((err)=>res.json(err));
});

app.get("/highGPA", (req, res) => {
    mod.highGPA().then(value => {
        let resText = "<h2>Highest GPA</h2>";
        resText += "<p>StudentID: " + value.studId +"</p>";
        resText += "<p>Name: " + value.name +"</p>";
        resText += "<p>Program: " + value.program +"</p>";
        resText += "<p>GPA: " + value.gpa +"</p>";
        res.send(resText);
    }).catch((err)=>res.json(err));
});

app.use((req,res)=>{
    res.status(404).send("Page Not Found!");
 });

function onHttpStart(){
    console.log("Express http server listening on: " +HTTP_PORT);
}


mod.prep().then(app.listen(HTTP_PORT, onHttpStart))
.catch(()=>{console.log("Error: unable to read files")});