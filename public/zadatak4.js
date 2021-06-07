//čuvamo sve predmete i aktivnosti
var predmeti = [];
var aktivnosti = [];

function dajPredmete() {
    var ajaxPredmeti = new XMLHttpRequest();
    ajaxPredmeti.onreadystatechange = function() {
        if(ajaxPredmeti.readyState == 4 && ajaxPredmeti.status == 200) {
            predmeti = JSON.parse(ajaxPredmeti.responseText);
        }
    }
    ajaxPredmeti.open("GET", "http://localhost:3000/predmeti", true);
    ajaxPredmeti.send();
}

function dajAktivnosti() {
    var ajaxAktivnosti = new XMLHttpRequest();
    ajaxAktivnosti.onreadystatechange = function() {
        if(ajaxAktivnosti.readyState == 4 && ajaxAktivnosti.status == 200) {
            aktivnosti = JSON.parse(ajaxAktivnosti.responseText);
        }
    }
    ajaxAktivnosti.open("GET", "http://localhost:3000/aktivnosti", true);
    ajaxAktivnosti.send();
}

function napraviPredmet(naziv) {
    var noviPredmet = {
        naziv : naziv
    };
    //pravimo ajax
    var noviPredmetAjax = new XMLHttpRequest();
    noviPredmetAjax.onreadystatechange = function() {
        if(noviPredmetAjax.readyState == 4 && noviPredmetAjax.status == 400) {
            console.log("dodan predmet");
        }
    }
    noviPredmetAjax.open("POST", "http://localhost:3000/predmet", true);
    noviPredmetAjax.setRequestHeader("Content-Type", "application/json");
    noviPredmetAjax.send(JSON.stringify(noviPredmet));
}

function novaAktivnost() {

    console.log("Broj predmeta: ", predmeti.length);

    var naziv = document.getElementById('naziv').value;
    var tip = document.getElementById('tip').value;
    var pocetak = Number(document.getElementById('pocetak').value);
    var kraj = Number(document.getElementById('kraj').value);
    var dan = document.getElementById('dan').value;

    var postojiPredmet = false;
    console.log(predmeti.length);
    for(var i = 0; i < predmeti.length; i++) {
        console.log(predmeti[i].naziv);
        if(naziv == predmeti[i].naziv) {
            postojiPredmet = true;
        }
    }
    console.log(postojiPredmet);
    if(postojiPredmet == false) {
        console.log("ušlo");
        napraviPredmet(naziv);
    }
    
    var nova = {
        naziv : naziv,
        tip : tip,
        pocetak : pocetak,
        kraj : kraj,
        dan : dan
    };

    var dodaniPredmet = {
        naziv : naziv
    }

    console.log("dodani predmet naziv: ", dodaniPredmet.naziv);

    var novaAktivnostAjax = new XMLHttpRequest();
    novaAktivnostAjax.onreadystatechange = function() {
        if(novaAktivnostAjax.readyState == 4 && novaAktivnostAjax.status == 200) {
            console.log("dodana");
            var poruka = JSON.parse(novaAktivnostAjax.responseText);
            alert(poruka.message);
            predmeti.push(dodaniPredmet);
        } else if(novaAktivnostAjax.readyState == 4 && postojiPredmet == false) {
            var poruka = JSON.parse(novaAktivnostAjax.responseText);
            alert(poruka.message);
            var brisanjePredmetaAjax = new XMLHttpRequest();
            brisanjePredmetaAjax.open("DELETE", "http://localhost:3000/predmet/" + nova.naziv, true);
            brisanjePredmetaAjax.send();
        } else if(novaAktivnostAjax.readyState == 4) {
            var poruka = JSON.parse(novaAktivnostAjax.responseText);
            alert(poruka.message);
        }
    }
    novaAktivnostAjax.open("POST", "http://localhost:3000/aktivnost");
    novaAktivnostAjax.setRequestHeader("Content-Type", "application/json");
    novaAktivnostAjax.send(JSON.stringify(nova));
}

window.onload = () => {
    var ajaxPredmeti = new XMLHttpRequest();
    ajaxPredmeti.onreadystatechange = function() {
        if(ajaxPredmeti.readyState == 4 && ajaxPredmeti.status == 200) {
            predmeti = JSON.parse(ajaxPredmeti.responseText);
        }
    }
    ajaxPredmeti.open("GET", "http://localhost:3000/predmeti", true);
    ajaxPredmeti.send();

    var ajaxAktivnosti = new XMLHttpRequest();
    ajaxAktivnosti.onreadystatechange = function() {
        if(ajaxAktivnosti.readyState == 4 && ajaxAktivnosti.status == 200) {
            aktivnosti = JSON.parse(ajaxAktivnosti.responseText);
        }
    }
    ajaxAktivnosti.open("GET", "http://localhost:3000/aktivnosti", true);
    ajaxAktivnosti.send();

    document.getElementById('dugmeDodaj').addEventListener("click", () => {
        novaAktivnost();
    })
}