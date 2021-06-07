var http = require('http');
var express = require('express');
var path = require('path');
const fs  = require('fs');
const bodyParser = require('body-parser');
const { POINT_CONVERSION_COMPRESSED } = require('constants');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, '/public')));

const sequelize = require('./db.js');

//MODELI
const Predmet = require('./predmet.js')(sequelize);
const Grupa = require('./grupa.js')(sequelize);
const Aktivnost = require('./aktivnost.js')(sequelize);
const Dan = require('./dan.js')(sequelize);
const Tip = require('./tip.js')(sequelize);
const Student = require('./student.js')(sequelize);
sequelize.sync({alter:true});

//RELACIJE
//PREDMET 1:N GRUPA
Predmet.hasMany(Grupa, {
    foreignKey: {
        allowNull: false
    }
});
Grupa.belongsTo(Predmet);

//AKTIVNOST N:1 PREDMET
Predmet.hasMany(Aktivnost, {
    foreignKey: {
        allowNull: false
    }
});
Aktivnost.belongsTo(Predmet);

//AKTIVNOST N:0 GRUPA
Grupa.hasMany(Aktivnost, {
    foreignKey: {
        allowNull: true
    }
});
Aktivnost.belongsTo(Grupa);

//AKTIVNOST N:1 DAN
Dan.hasMany(Aktivnost, {
    foreignKey: {
        allowNull: false
    }
});
Aktivnost.belongsTo(Dan);

//AKTIVNOST N:1 TIP
Tip.hasMany(Aktivnost, {
    foreignKey: {
        allowNull: false
    }
});
Aktivnost.belongsTo(Tip);

//STUDENT N:M GRUPA
Student.belongsToMany(Grupa, {
    through: 'GrupeStudenti'
});
Grupa.belongsToMany(Student, {
    through: 'GrupeStudenti'
});



//RUTE V2
//predmet - read
app.get('/v2/predmet', async function(req, res) {
    const predmeti = await Predmet.findAll();
    res.json(predmeti);
})
//predmet - read - po id
app.get('/v2/predmet/:id', async function(req, res) {
    let trenutniId = req.params.id;
    const predmet = await Predmet.findOne({
        where: {
            id: trenutniId
        }
    })
    res.json(predmet);
})
//predmet - create
app.post('/v2/predmet', async function(req, res) {
    let novi = req.body["naziv"];
    const [noviPredmet, uspjesno] = await Predmet.findOrCreate({
        where: { 
            naziv: novi
        },
        defaults: {
            naziv: novi
        }
    });
    if(uspjesno) res.json(noviPredmet);
    else res.json({ message: "Predmet postoji!"});
})
//predmet - update
app.put('/v2/predmet/:id', async function(req, res) {
    let novi = req.body;
    let idTrenutni = req.params.id;
    await Predmet.update(novi, {
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Update uspješan!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})
//predmet - delete
app.delete('/v2/predmet/:id', async function(req, res) {
    let idTrenutni = req.params.id;
    await Predmet.destroy({
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Brisanje uspješno!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//AKTIVNOST
//aktivnost - read
app.get('/v2/aktivnost', async function(req, res) {
    const aktivnosti = await Aktivnost.findAll();
    res.json(aktivnosti);
})

//aktivnost - read - po id
app.get('/v2/aktivnost/:id', async function(req, res) {
    let trenutniId = req.params.id;
    const aktivnost = await Aktivnost.findOne({
        where: {
            id: trenutniId
        }
    })
    res.json(aktivnost);
})

//aktivnost - create
app.post('/v2/aktivnost', async function(req, res) {
    const aktivnost = req.body;
    await Aktivnost.create(aktivnost).then(function(){
        res.json(aktivnost);
    });
})

//aktivnost - delete
app.delete('/v2/aktivnost/:id', async function(req, res) {
    let idTrenutni = req.params.id;
    await Aktivnost.destroy({
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Brisanje uspješno!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//aktivnost - update
app.put('/v2/aktivnost/:id', async function(req, res) {
    let nova = req.body;
    let idTrenutni = req.params.id;
    await Aktivnost.update(nova, {
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Update uspješan!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//TIP
//tip - read
app.get('/v2/tip', async function(req, res) {
    const tipovi = await Tip.findAll();
    res.json(tipovi);
})

//tip - read - po id
app.get('/v2/tip/:id', async function(req, res) {
    let trenutniId = req.params.id;
    const tip = await Tip.findOne({
        where: {
            id: trenutniId
        }
    })
    res.json(tip);
})

//tip - create
app.post('/v2/tip', async function(req, res) {
    const novi = req.body["naziv"];
    let noviTip = await Tip.create({naziv:novi});
    res.json(noviTip);
})

//tip - delete
app.delete('/v2/tip/:id', async function(req, res) {
    let idTrenutni = req.params.id;
    await Tip.destroy({
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Brisanje uspješno!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//tip - update
app.put('/v2/tip/:id', async function(req, res) {
    let novi = req.body;
    let idTrenutni = req.params.id;
    await Tip.update(novi, {
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Update uspješan!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//DAN
//dan - read
app.get('/v2/dan', async function(req, res) {
    const dani = await Dan.findAll();
    res.json(dani);
})

//dan - read - po id
app.get('/v2/dan/:id', async function(req, res) {
    let trenutniId = req.params.id;
    const dan = await Dan.findOne({
        where: {
            id: trenutniId
        }
    })
    res.json(dan);
})

//dan - create
app.post('/v2/dan', async function(req, res) {
    const novi = req.body["naziv"];
    let noviDan = await Dan.create({naziv:novi});
    res.json(noviDan);
})

//dan - delete
app.delete('/v2/dan/:id', async function(req, res) {
    let idTrenutni = req.params.id;
    await Dan.destroy({
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Brisanje uspješno!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//dan - update
app.put('/v2/dan/:id', async function(req, res) {
    let novi = req.body;
    let idTrenutni = req.params.id;
    await Dan.update(novi, {
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Update uspješan!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//GRUPA
//grupa - read
app.get('/v2/grupa', async function(req, res) {
    const grupe = await Grupa.findAll();
    res.json(grupe);
})

//grupa - read - po id
app.get('/v2/grupa/:id', async function(req, res) {
    let trenutniId = req.params.id;
    const grupa = await Grupa.findOne({
        where: {
            id: trenutniId
        }
    })
    res.json(grupa);
})

//grupa - create
app.post('/v2/grupa', async function(req, res) {
    const nova = req.body;
    let novaGrupa = await Grupa.create(nova);
    res.json(novaGrupa);
})

//grupa - delete
app.delete('/v2/grupa/:id', async function(req, res) {
    let idTrenutni = req.params.id;
    await Grupa.destroy({
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Brisanje uspješno!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//grupa - update
app.put('/v2/grupa/:id', async function(req, res) {
    let nova = req.body;
    let idTrenutni = req.params.id;
    await Grupa.update(nova, {
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Update uspješan!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//STUDENT
//student - read
app.get('/v2/student', async function(req, res) {
    const studenti = await Student.findAll();
    res.json(studenti);
})

//student - read - po id
app.get('/v2/student/:id', async function(req, res) {
    let trenutniId = req.params.id;
    const student = await Student.findOne({
        where: {
            id: trenutniId
        }
    })
    res.json(student);
})

//student - create
app.post('/v2/student', async function(req, res) {
    let ime = req.body["ime"];
    let index = req.body["index"];
    let noviStudent = await Student.create({
        ime: ime,
        index: index
    });
    res.json(noviStudent);
})

//student - delete
app.delete('/v2/student/:id', async function(req, res) {
    let idTrenutni = req.params.id;
    await Student.destroy({
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Brisanje uspješno!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//student - update
app.put('/v2/student/:id', async function(req, res) {
    let nova = req.body;
    let idTrenutni = req.params.id;
    await Student.update(nova, {
        where: {
            id: idTrenutni
        }
    }).then(function(results) {
        res.json({ message : "Update uspješan!"}); 
    }).catch(function(error) {
        console.log("Error");
        res.json({ message : "Greška!"});
    })
})

//RUTA ZADATAK 2
app.post('/v2/noviStudenti/:id', async function(req, res) {
    let noviStudenti = req.body;
    let noviID = req.params.id;

    console.log(noviStudenti);

    //trebaju nam svi studenti
    let spisakStudenta = await Student.findAll();

    let povratnePoruke = [];

    for(let i = 0; i < noviStudenti.length; i++) {
        let postojiImeIndex = false;
        let postojiIndex = false;
        for(let j = 0; j < spisakStudenta.length; j++) {
            if(noviStudenti[i].ime == spisakStudenta[j].ime && noviStudenti[i].index == spisakStudenta[j].index) {
                console.log("Prvi if");
                const trenutniStudent = await Student.findOne({
                    where: {
                        index: spisakStudenta[j].index
                    }
                })
                const trenutnaGrupa = await Grupa.findOne({
                    where: {
                        id: noviID
                    }
                })

                console.log(trenutniStudent.id);

                const sveGrupe = await trenutniStudent.getGrupe();
                let ubacena = false;
                for(let k = 0; k < sveGrupe.length; k++) {
                    if(sveGrupe[k].predmetId == trenutnaGrupa.predmetId) {
                        await trenutniStudent.removeGrupa(sveGrupe[k]);
                        await trenutniStudent.addGrupa(trenutnaGrupa);
                        ubacena = true;
                        break;
                    }
                }

                if(ubacena == false) {
                    await trenutniStudent.addGrupa(trenutnaGrupa);
                }

                postojiImeIndex = true;
                break;
            } else if(noviStudenti[i].ime != spisakStudenta[j].ime && noviStudenti[i].index == spisakStudenta[j].index) {
                console.log("Drugi if");
                povratnePoruke.push("Student " + noviStudenti[i].ime + " nije kreiran jer postoji student " + spisakStudenta[j].ime + " sa indexom " + spisakStudenta[j].index);
                postojiIndex = true;
                break;
            }
        }

        if(postojiImeIndex == false && postojiIndex == false) {
            const noviStudent = await Student.create({ 
                ime: noviStudenti[i].ime,
                index: noviStudenti[i].index
            })
            const novaGrupa = await Grupa.findOne({where: {id: noviID}})
            noviStudent.addGrupa(novaGrupa)
        }
    }

    if(povratnePoruke.length == 0) {
        //Ukoliko je sve uspješno, po postavsi spirale šaljemo code 200
        res.status(200).send(povratnePoruke);
    } else {
        res.send(povratnePoruke);
    }
})

//RUTE V1
app.post('/v1/predmet', function(req, res) {
    fs.readFile('predmeti.txt', function(err, data) {
        if(err) {
            throw err
        }

        let predmeti = data.toString().split(/\r?\n/);
        let predmetNovi = req.body["naziv"];

        if(predmeti != "") {
            for(let i = 0; i < predmeti.length; i++) {
                if(predmetNovi.toString().toUpperCase() == predmeti[i].toUpperCase()) {
                    res.json({ message: "Naziv predmeta postoji!" })
                    return;
                }
            }
        }

        fs.appendFile('predmeti.txt', req.body["naziv"].toString().toUpperCase() + "\n", function(err) {
            if(err) {
                throw err
            }
            res.json({ message: "Uspješno dodan predmet!"});
            return;
        });
    });
});

app.get('/v1/predmeti', function(req, res) {
    fs.readFile('predmeti.txt', function(err, data) {
        if(err) {
            throw err;
        }

        let predmeti = data.toString().trimEnd().split(/\r?\n/);
        let nizObjekata = [];

        for(let i = 0; i < predmeti.length; i++) {
            
            if(predmeti[i] != ""){
                let predmet = {
                    naziv: predmeti[i]
                };
                nizObjekata.push(predmet);
            }
            
        }

        res.status(200).json(nizObjekata);
    });
});

app.get('/v1/aktivnosti', function(req, res) {
    fs.readFile('aktivnosti.txt', function(err, data) {
        if(err) {
            throw err;
        }

        let aktivnosti = data.toString().trimEnd().split(/\r?\n/);
        let nizObjekata = [];

        for(let i = 0; i < aktivnosti.length; i++) {
            
            if(aktivnosti[i] != "") {
                let podaci = aktivnosti[i].split(",");
                let aktivnost = {
                    naziv: podaci[0],
                    tip: podaci[1],
                    pocetak: Number(podaci[2]),
                    kraj: Number(podaci[3]),
                    dan: podaci[4]
                };
                nizObjekata.push(aktivnost);
            }
        }

        res.status(200).json(nizObjekata);
    });
});

app.post('/v1/aktivnost', function(req, res) {
    
    var ispravna = true;

    if(req.body["pocetak"] < 8 || req.body["kraj"] > 20 || req.body["pocetak"] >= req.body["kraj"] || (req.body["pocetak"] % 1 != 0 && req.body["pocetak"] % 1 != 0.5) || (req.body["kraj"] % 1 != 0 && req.body["kraj"] % 1 != 0.5)) {
        ispravna = false;
    }

    if(req.body["naziv"] == "" || req.body["naziv"] == null || req.body["tip"] == "" || req.body["tip"] == null || req.body["dan"] == "" || req.body["dan"] == null) {
        ispravna = false;
    }

    fs.readFile('aktivnosti.txt', function(err, data) {
        if(err) {
            throw err;
        }

        let aktivnosti = data.toString().trimEnd().split(/\r?\n/);

        for(let i = 0; i < aktivnosti.length; i++) {
            if(aktivnosti[i] != "") {
                let podaci = aktivnosti[i].split(",");

                let objekat = {
                    naziv : podaci[0],
                    tip : podaci[1],
                    pocetak : podaci[2],
                    kraj : podaci[3],
                    dan : podaci[4]
                };
    
                if(req.body["dan"].toString().toUpperCase() == podaci[4].toUpperCase() && Number(req.body["pocetak"]) >= Number(podaci[2]) && Number(req.body["kraj"]) <= Number(podaci[3])) {
                    ispravna = false;
                }
                if(req.body["dan"].toString().toUpperCase() == podaci[4].toUpperCase() && Number(req.body["pocetak"]) >= Number(podaci[2]) && Number(req.body["pocetak"]) < Number(podaci[3])) {
                    ispravna = false;
                }
                if(req.body["dan"].toString().toUpperCase() == podaci[4].toUpperCase() && Number(req.body["kraj"]) > Number(podaci[2]) && Number(req.body["kraj"]) <= Number(podaci[3])) {
                    ispravna = false;
                }
            }
        }
        if(ispravna == false) {
            res.status(400);
            res.json({ message: "Aktivnost nije validna!" });
            return 0;
        } else {
            res.status(200);
            res.json({ message: "Uspješno dodana aktivnost!" });
            fs.appendFile('aktivnosti.txt', req.body["naziv"].toUpperCase() + "," + req.body["tip"] + "," + req.body["pocetak"] + "," + req.body["kraj"] + "," + req.body["dan"] + "\n", function(err) {
                if(err) {
                    throw err;
                }
                return;
            });
            return 0;
        }
    });
});

app.get('/v1/predmet/:naziv/aktivnost', function(req, res) {
    fs.readFile('aktivnosti.txt', function(err, data) {
        if(err) {
            throw err;
        }

        let aktivnosti = data.toString().split(/\r?\n/);
        let nizObjekata = [];

        for(let i = 0; i < aktivnosti.length; i++) {
            let podaci = aktivnosti[i].split(",");
            let aktivnost = {
                naziv: podaci[0],
                tip: podaci[1],
                pocetak: Number(podaci[2]),
                kraj: Number(podaci[3]),
                dan: podaci[4]
            };
            if(req.params.naziv.toUpperCase() == podaci[0].toUpperCase()) {
                nizObjekata.push(aktivnost);
            }
        }

        res.status(200).json(nizObjekata);
    })
})

app.delete('/v1/all', function(req, res) {
    let error = false;
    fs.writeFile('predmeti.txt', '', function(err) {
        if(err) error = true;
    })
    fs.writeFile('aktivnosti.txt', '', function(err) {
        if(err) error = true;
    })
    if(error == true) {
        res.json({ message: "Greška - sadržaj datoteka nije moguće obrisati!" });
    } else {
        res.json({ message: "Uspješno obrisan sadržaj datoteka!" });
    }
})

app.delete('/v1/predmet/:naziv', function(req, res) {
    let nazivPredmeta = req.params.naziv;
    let noviPredmeti = [];
    let imaPredmet = false;
    fs.readFile('predmeti.txt', function(err, data) {
        if(err) {
            throw err;
        } else {
            let predmeti = data.toString().split(/\r?\n/);
            for(let i = 0; i < predmeti.length; i++) {
                if(predmeti[i].toUpperCase() == nazivPredmeta.toUpperCase()) {
                    imaPredmet = true;
                    break;
                }
            }
            noviPredmeti = predmeti.filter(function(x) {
                let trenutni = x.split(",");
                return trenutni[0].toUpperCase() != nazivPredmeta.toUpperCase();
            }).toString().split(',').join("\n");
        }

        fs.writeFile('predmeti.txt', noviPredmeti, function(err) {
            if(err || imaPredmet == false) {
                res.json({message : "Greška - predmet nije obrisan!"});
            } else {
                res.json({message : "Uspješno obrisan predmet!"});
            }
        })
    });
});

app.delete('/v1/aktivnost/:naziv', function(req, res) {
    let nazivAktivnost = req.params.naziv;
    let noveAktivnosti = [];
    let imaAktivnosti = false;
    fs.readFile('aktivnosti.txt', function(err, data) {
        if(err) {
            throw err;
        } else {
            let aktivnosti = data.toString().split(/\r?\n/);
            for(let i = 0; i < aktivnosti.length; i++) {
                let podaci = aktivnosti[i].split(",");
                if(podaci[0].toUpperCase() == nazivAktivnost.toUpperCase()) {
                    imaAktivnosti = true;
                    break;
                }
            }
            noveAktivnosti = aktivnosti.filter(function(x) {
                let trenutni = x.split(",");
                return trenutni[0].toUpperCase() != nazivAktivnost.toUpperCase();
            }).join('\n');
        }

        fs.writeFile('aktivnosti.txt', noveAktivnosti, function(err) {
            if(err || imaAktivnosti == false) {
                res.status(400);
                res.json({message : "Greška - aktivnost nije obrisana!"});
                return;
            } else {
                res.status(200);
                res.json({message : "Uspješno obrisana aktivnost!"});
                return;
            }
        })
    });
});

//KRAJ RUTE V1



app.listen(3000);

module.exports = app;