window.onload = () => {
    document.getElementById('dugmeDodaj').addEventListener("click", () => {
        dodavanjeAktivnosti();
    })
}

var tipoviAjax = new XMLHttpRequest();
tipoviAjax.onreadystatechange = function() {
    if(tipoviAjax.readyState == 4 && tipoviAjax.status == 200) {
        var odabirTipa = document.getElementById("odabirTip");
        var tipovi = JSON.parse(tipoviAjax.responseText);
        //idemo kroz niz;
        for(let i = 0; i < tipovi.length; i++) {
            odabirTipa.appendChild(new Option(tipovi[i].naziv, tipovi[i].id));
        }
    } else if(tipoviAjax.readyState == 4) {
        console.log("Greška");
        alert("Greška");
    }
}
tipoviAjax.open("GET", "http://localhost:3000/v2/tip", true);
tipoviAjax.send();

var daniAjax = new XMLHttpRequest();
daniAjax.onreadystatechange = function() {
    if(daniAjax.readyState == 4 && daniAjax.status == 200) {
        var odabirDana = document.getElementById("odabirDan");
        var dani = JSON.parse(daniAjax.responseText);
        //idemo kroz niz;
        for(let i = 0; i < dani.length; i++) {
            odabirDana.appendChild(new Option(dani[i].naziv, dani[i].id));
        }
    } else if(daniAjax.readyState == 4) {
        console.log("Greška");
        alert("Greška");
    }
}
daniAjax.open("GET", "http://localhost:3000/v2/dan", true);
daniAjax.send();

function dodavanjeAktivnosti() {
    let naziv = document.getElementById("naziv").value;
    let tip = document.getElementById("odabirTip");
    let tipId = tip.options[tip.selectedIndex].value;
    let pocetak = document.getElementById("pocetak").value;
    let kraj = document.getElementById("kraj").value;
    let dan = document.getElementById("odabirDan");
    let danId = dan.options[dan.selectedIndex].value;
    let imeDana = dan.options[dan.selectedIndex].text;

    let trenutnaAktivnost = {
        naziv: naziv,
        pocetak: Number(pocetak),
        kraj: Number(kraj),
        danId: parseInt(danId)
    }

    let aktivnostZaBazu = {
        naziv: naziv,
        pocetak: Number(pocetak),
        kraj: Number(kraj),
        GrupaId: null,
        predmetId: null,
        danId: parseInt(danId),
        tipId: parseInt(tipId)
    }

    let spisakPredmeta = [];
    let spisakAktivnosti = [];

    let idPredmeta = null;

    let trenutniPredmet = {
        naziv: naziv
    }

    var aktivnostiAjax = new XMLHttpRequest();
    aktivnostiAjax.onreadystatechange = function() {
        if(aktivnostiAjax.readyState == 4 && aktivnostiAjax.status == 200) {
            spisakAktivnosti = JSON.parse(aktivnostiAjax.responseText);
            console.log(aktivnostZaBazu);
            console.log(spisakAktivnosti);
            if(validiranje(trenutnaAktivnost, spisakAktivnosti)) {
                console.log("VALIDNA");
                var predmetiAjax = new XMLHttpRequest();
                predmetiAjax.onreadystatechange = function() {
                    if(predmetiAjax.readyState == 4 && predmetiAjax.status == 200) {
                        spisakPredmeta = JSON.parse(predmetiAjax.responseText);
                        console.log(spisakPredmeta);
                        let predmetPostoji = false;
                        for(let i = 0; i < spisakPredmeta.length; i++) {
                            if(naziv == spisakPredmeta[i].naziv) {
                                idPredmeta = spisakPredmeta[i].id;
                                aktivnostZaBazu.predmetId = idPredmeta;
                                predmetPostoji = true;
                                console.log(predmetPostoji);
                                break;
                            }
                        }
                        if(predmetPostoji == true) {
                            console.log("Predmet IMA");
                            var dodajAktivnostAjax1 = new XMLHttpRequest();
                            dodajAktivnostAjax1.onreadystatechange = function() {
                                if(dodajAktivnostAjax1.readyState == 4 && dodajAktivnostAjax1.status == 200) {
                                    alert("Aktivnost kreirana!");
                                }
                            }
                            dodajAktivnostAjax1.open("POST", "http://localhost:3000/v2/aktivnost", true)
                            dodajAktivnostAjax1.setRequestHeader("Content-Type", "application/json");
                            console.log("sada ovo");
                            console.log(aktivnostZaBazu);
                            dodajAktivnostAjax1.send(JSON.stringify(aktivnostZaBazu));
                        } else {
                            console.log("Predmet NEMA");
                            var kreirajPredmetAjax = new XMLHttpRequest();
                            kreirajPredmetAjax.onreadystatechange = function() {
                                if(kreirajPredmetAjax.readyState == 4 && kreirajPredmetAjax.status == 200) {
                                    let predmetTrenutni = JSON.parse(kreirajPredmetAjax.responseText);
                                    console.log("Evo trenutni:");
                                    console.log(predmetTrenutni);
                                    console.log(predmetTrenutni.id);
                                    //aktivnostZaBazu["predmetId"] = predmetTrenutni["id"];
                                    let tmp = {
                                        naziv: naziv,
                                        pocetak: Number(pocetak),
                                        kraj: Number(kraj),
                                        GrupaId: null,
                                        predmetId: predmetTrenutni.id,
                                        danId: parseInt(danId),
                                        tipId: parseInt(tipId)
                                    }
                                    var dodajAktivnostAjax2 = new XMLHttpRequest();
                                    dodajAktivnostAjax2.onreadystatechange = function() {
                                        if(dodajAktivnostAjax2.readyState == 4 && dodajAktivnostAjax2.status == 200) {
                                            alert("Aktivnost kreirana!");
                                        }
                                    }
                                    dodajAktivnostAjax2.open("POST", "http://localhost:3000/v2/aktivnost", true)
                                    dodajAktivnostAjax2.setRequestHeader("Content-Type", "application/json");
                                    console.log("Evo za bazu sad:");
                                    console.log(tmp);
                                    dodajAktivnostAjax2.send(JSON.stringify(tmp));
                                }
                            }
                            kreirajPredmetAjax.open("POST", "http://localhost:3000/v2/predmet", true)
                            kreirajPredmetAjax.setRequestHeader("Content-Type", "application/json");
                            kreirajPredmetAjax.send(JSON.stringify(trenutniPredmet));
                        }
                    }
                }
                predmetiAjax.open("GET", "http://localhost:3000/v2/predmet", true);
                predmetiAjax.send();
            } else {
                alert("Aktivnost NIJE kreirana!");
            }
        }
    }
    aktivnostiAjax.open("GET", "http://localhost:3000/v2/aktivnost", true);
    aktivnostiAjax.send();
}

function validiranje(trenutnaAktivnost, spisakAktivnosti) {
    console.log("spisak prije: ", spisakAktivnosti);
    console.log("trenutna prije: ", trenutnaAktivnost);
    let ispravna = true;

    if(trenutnaAktivnost.pocetak < 8 || trenutnaAktivnost.kraj > 20 || trenutnaAktivnost.pocetak >= trenutnaAktivnost.kraj || (trenutnaAktivnost.pocetak % 1 != 0 && trenutnaAktivnost.pocetak % 1 != 0.5) || (trenutnaAktivnost.kraj % 1 != 0 && trenutnaAktivnost.kraj % 1 != 0.5)) {
        ispravna = false;
    }

    if(trenutnaAktivnost.naziv == "" || trenutnaAktivnost.naziv == null) {
        ispravna = false;
    }

    for(let i = 0; i < spisakAktivnosti.length; i++) {
        console.log("dan", spisakAktivnosti[i].danId);
        if(trenutnaAktivnost.danId == spisakAktivnosti[i].danId) {
            if(Number(trenutnaAktivnost.pocetak) >= Number(spisakAktivnosti[i].pocetak) && Number(trenutnaAktivnost.kraj) <= Number(spisakAktivnosti[i].kraj)) {
                ispravna = false;
            }
            if(Number(trenutnaAktivnost.pocetak) >= Number(spisakAktivnosti[i].pocetak) && Number(trenutnaAktivnost.pocetak) < Number(spisakAktivnosti[i].kraj)) {
                ispravna = false;
            }
            if(Number(trenutnaAktivnost.kraj) > Number(spisakAktivnosti[i].pocetak) && Number(trenutnaAktivnost.kraj) <= Number(spisakAktivnosti[i].kraj)) {
                ispravna = false;
            }
        }
    }

    console.log("jel ispravna: ", ispravna);

    return ispravna;
}