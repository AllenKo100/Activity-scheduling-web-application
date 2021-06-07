const { assert } = require('chai');
let chai = require('chai');
let chaiHttp = require("chai-http");
let server = require('./spirala');

chai.assert;

chai.use(chaiHttp);

const fs = require('fs');

let testovi = [];


let data = fs.readFileSync('testniPodaci.txt', {encoding:'utf8'});

let redovi = data.toString('utf-8').split(/\r\n|\n/);


for(let i = 0; i < redovi.length; i++) {
    jsonString = "{";
    let red = redovi[i].split(/[,]+(?![^\[]*\])(?![^\{]*\})/);
    if(red[0] == "GET" || red[0] == "DELETE") {
        jsonString += '"operacija":"' + (red[0]) + '",';
        jsonString += '"ruta":"' + (red[1]) + '",';
        jsonString += '"ulaz":"' + (red[2]) + '",';
        jsonString += '"izlaz":' + (red[3] + '');
    } else if(red[0] == "POST") {
        jsonString += '"operacija":"' + (red[0]) + '",';
        jsonString += '"ruta":"' + (red[1]) + '",';
        jsonString += '"ulaz":' + (red[2]) + ',';
        jsonString += '"izlaz":' + (red[3] + '');
    }
    jsonString += '}';
    testovi.push(jsonString);
    //Provjera kroz konzolu
    //console.log(jsonString);
}

describe("Zadatak 3 - Testovi", () => {
    for(let i = 0; i < testovi.length; i++) {
        let trenutni = JSON.parse(testovi[i].replace(/\\"/g, '"'));
        it("Test " + (i+1).toString() + " " + trenutni["operacija"].toString() + "," + trenutni["ruta"].toString(), function(done) {
            if(trenutni["operacija"] == "GET") {
                chai.request(server)
                .get(trenutni["ruta"])
                .end(function(err, res) {
                    assert.deepEqual(res.body, trenutni["izlaz"]);
                    done();
                });
            }
            if(trenutni["operacija"] == "POST"){
                chai.request(server)
                .post(trenutni["ruta"])
                .send(trenutni["ulaz"])
                .end(function(err, res) {
                    assert.deepEqual(res.body, trenutni["izlaz"]);
                    done();
                });
            }
            if(trenutni["operacija"] == "DELETE"){
                chai.request(server)
                .delete(trenutni["ruta"])
                .end(function(err, res) {
                    assert.deepEqual(res.body, trenutni["izlaz"]);
                    done();
                });
            }
        });
    }
});