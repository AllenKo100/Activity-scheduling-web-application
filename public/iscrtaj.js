var satiPrikazani = [0,2,4,6,8,10,12,15,17,19,21,23];
var rasporedPocetak;
var rasporedKraj;
var spisakDana = [];

var nizAktivnosti = [];

function iscrtajRaspored(div, dani, satPocetak, satKraj) {

    var duzina = (satKraj - satPocetak) * 2;

    spisakDana = dani;

    if(satPocetak >= satKraj || satPocetak < 0 || satPocetak > 24 || satKraj < 0 || satKraj > 24 || Number.isInteger(satPocetak) == false || Number.isInteger(satKraj) == false) {
        //alert("Greška");
        div.appendChild(document.createTextNode("Greška"));
    }
    else {

        rasporedPocetak = satPocetak;
        rasporedKraj = satKraj;

        div.className = "tabela";
        div.style.gridTemplateColumns = `repeat(${duzina+5}, 2.0%)`;
        div.style.gridTemplateRows = `0.2fr repeat(${dani.length}, 1fr)`;
        //Pravimo vremena iznad
        let prazanProstor = document.createElement("div");
        prazanProstor.style.gridColumn = "span 3";
        div.appendChild(prazanProstor);

        var pocetnoVrijeme = satPocetak;

        for(let i = 0; i < (duzina/2)+1; i++) {
            let vrijeme = document.createElement("div");
            vrijeme.style.gridColumn = "span 2";
            if(satiPrikazani.includes(pocetnoVrijeme) && pocetnoVrijeme < 10 && pocetnoVrijeme != satKraj) {
                let tekst = "0" + String(pocetnoVrijeme) + ":00";
                vrijeme.innerText = tekst;
                div.appendChild(vrijeme).className = "vrijeme";
            } else if(satiPrikazani.includes(pocetnoVrijeme) && pocetnoVrijeme >= 10 && pocetnoVrijeme != satKraj) {
                let tekst = String(pocetnoVrijeme) + ":00";
                vrijeme.innerText = tekst;
                div.appendChild(vrijeme).className = "vrijeme";
            } else {
                div.appendChild(vrijeme).className = "vrijeme";
            }
            pocetnoVrijeme++;
        }
        //div.appendChild(document.createElement("div"));
        //gotova vremena
        for(let i = 0; i < dani.length; i++) {
            let dan = document.createElement("div");
            dan.style.gridColumn = "span 4"
            dan.innerText = dani[i];
            div.appendChild(dan).className = "dan";

            let vrijemePrvo = satPocetak;

            for(let j = 0; j < duzina; j++) {
                let polje = document.createElement("div");
                var str = vrijemePrvo.toString();
                var str1 = str.replace(".", "-");
                polje.id = div.id + dani[i] + str1;
                polje.innerText = "";
                if(j % 2 == 1) {
                    div.appendChild(polje).className = "par";
                } else {
                    div.appendChild(polje).className = "nep";
                }
                vrijemePrvo += 0.5;
            }
        }
    }
}

function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
    if(raspored == null) {
        let povratni = "Greška - raspored nije kreiran";
        alert("Greška - raspored nije kreiran");
        return povratni;
    }

    if(vrijemePocetak > vrijemeKraj) {
        let povratni = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return povratni;
    }

    if(!(vrijemePocetak % 1 == 0 || vrijemePocetak % 1 == 0.5)) {
        let povratni = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return povratni;
    }

    if(!(vrijemeKraj % 1 == 0 || vrijemeKraj % 1 == 0.5)) {
        let povratni = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return povratni;
    }

    let greskaPocetakTest = "" + raspored.id.toString() + dan.toString() + vrijemePocetak.toString();
    let pozicijaPocetakTest = greskaPocetakTest.replace(".", "-");
    let zaBrisatiPocetakTest = document.getElementById(pozicijaPocetakTest);
    if(zaBrisatiPocetakTest == null) {
        console.log(pozicijaPocetakTest, " test")
        let povratni = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return povratni;
    }

    let vrijemeKrajPrije = vrijemeKraj - 0.5;
    let greskaKrajTest = "" + raspored.id.toString() + dan.toString() + vrijemeKrajPrije.toString();
    let pozicijaKrajTest = greskaKrajTest.replace(".", "-");
    let zaBrisatiKrajTest = document.getElementById(pozicijaKrajTest);
    if(zaBrisatiKrajTest == null) {
        console.log(pozicijaKrajTest, " test")
        let povratni = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return povratni;
    }

    if(vrijemePocetak == vrijemeKraj) {
        let povratni = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return povratni;
    }

    if(!spisakDana.includes(dan)) {
        let povratni = "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin";
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return povratni;
    }

    var provjera = vrijemePocetak;
    while(provjera < vrijemeKraj) {
        let str1 = "" + raspored.id.toString() + dan.toString() + provjera.toString();
        let pozicija = str1.replace(".", "-");
        var zaBrisati = document.getElementById(pozicija);
        if(zaBrisati.classList.contains('zauzeto') || zaBrisati.classList.contains('puni-kraj') || zaBrisati.classList.contains('pola-kraj')) {
            let povratni = "Greška - već postoji termin u rasporedu u zadanom vremenu";
            alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
            return povratni;
        }
        provjera += 0.5;
    }

    let str = "" + raspored.id + dan + vrijemePocetak.toString();
    let poz = str.replace(".", "-");
    let pocetak = document.getElementById(poz);
    let trajanje = (vrijemeKraj - vrijemePocetak) * 2;
    pocetak.style.gridColumn = `span ${trajanje}`;
    pocetak.innerText = naziv + "\n" + tip;
    if(Number.isInteger(vrijemeKraj)) {
        pocetak.className = "puni-kraj";
    } else {
        pocetak.className = "pola-kraj";
    }

    let tmp = vrijemePocetak + 0.5;
    while(tmp < vrijemeKraj) {
        let str1 = "" + raspored.id + dan + tmp.toString();
        var pozicija = str1.replace(".", "-");
        let zaBrisati = document.getElementById(pozicija);
        zaBrisati.style.display = "none";
        zaBrisati.className = "zauzeto";
        tmp += 0.5;
    }
}