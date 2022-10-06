const fs = require('fs');

var students = [];
var cpaSt = []

function prep() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./students.json',(err,data)=>{
            if (err) reject("unamble te read file");
            students= JSON.parse(data);
        });
        resolve();
    });
}

function cpa() {
    cpaSt = [];
    return new Promise(function(resolve, reject) {
        if (students.length == 0) reject("no results returned");
        for (let i = 0; i < students.length; i++) {
            if (students[i].program == "CPA") {
                cpaSt.push(students[i]);
            }
        }
        if (cpaSt.length == 0) reject("no results returned");
        resolve(cpaSt);
    })
}

function highGPA() {
    return new Promise(function(resolve, reject) {
        if (students.length == 0) reject("no results returned");
        let k = 0;
        let max = students[0].gpa;
        for ( i = 1; i < students.length; i++) {
            if (students[i].gpa > max) {
                max = students[i].gpa;
                k = i;
            }
        }
        resolve(students[k]);
    })
}

module.exports = {prep, cpa, highGPA};

