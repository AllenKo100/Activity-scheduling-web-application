window.alert = function() {};

let assert = chai.assert;
describe("raspored", function() {
    describe("iscrtajRaspored()", function() {
        it("Greška prilikom kreiranja rasporeda - vrijemeKraj manje od vrijemePočetak - test 1", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 9);
            assert.equal(div.innerHTML, "Greška");
            div.innerHTML = "";
        });

        it("Greška prilikom kreiranja rasporeda - sati nisu cijeli brojevi - test 2", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8.5, 9.5);
            assert.equal(div.innerHTML, "Greška");
            div.innerHTML = "";
        });

        it("Greška prilikom kreiranja rasporeda - vremena nisu u opsegu od 0 do 24 - test 3", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], -1, 23);
            assert.equal(div.innerHTML, "Greška");
            div.innerHTML = "";
        });

        it("Greška prilikom kreiranja rasporeda - vremena nisu u opsegu od 0 do 24 - test 4", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], -1, 25);
            assert.equal(div.innerHTML, "Greška");
            div.innerHTML = "";
        });

        it("Greška prilikom kreiranja rasporeda - vremena nisu u opsegu od 0 do 24 - test 5", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 1, 25);
            assert.equal(div.innerHTML, "Greška");
            div.innerHTML = "";
        });

        it("Tabela treba imati 25 kolona - test 6", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 20);
            assert.equal(div.style.gridTemplateColumns, "repeat(25, 2%)");
            div.innerHTML = "";
        });

        it("Tabela treba imati 6 redova - test 7", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 20);
            assert.equal(div.style.gridTemplateRows, "0.2fr repeat(5, 1fr)");
            div.innerHTML = "";
        });

        it("Tabela treba imati 17 kolona - test 8", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 12, 18);
            assert.equal(div.style.gridTemplateColumns, "repeat(17, 2%)");
            div.innerHTML = "";
        });

        it("Tabela treba imati 5 redova - test 9", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak"], 10, 20);
            assert.equal(div.style.gridTemplateRows, "0.2fr repeat(4, 1fr)");
            div.innerHTML = "";
        });

        it("Tabela treba imati 2 reda za vremena i dan - test 10", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak"], 6, 21);
            assert.equal(div.style.gridTemplateRows, "0.2fr repeat(1, 1fr)");
            div.innerHTML = "";
        });

        it("Tabela treba imati 3 reda za vremena i 2 dana - test 11", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Utorak", "Srijeda"], 1, 22);
            assert.equal(div.style.gridTemplateRows, "0.2fr repeat(2, 1fr)");
            div.innerHTML = "";
        });

        it("Tabela treba imati 10 redova - test 12", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Prvi", "Drugi", "Treći", "Četvrti", "Peti", "Šesti", "Sedmi", "Osmi", "Deveti"], 1, 22);
            assert.equal(div.style.gridTemplateRows, "0.2fr repeat(9, 1fr)");
            div.innerHTML = "";
        });

        it("Tabela sa 5 dana i intervalom od 8 do 22 - test 13", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 22);
            assert.equal(div.style.gridTemplateRows, "0.2fr repeat(5, 1fr)");
            assert.equal(div.style.gridTemplateColumns, "repeat(33, 2%)");
            div.innerHTML = "";
        });

        it("Tabela bez dana i intervalom od 9 do 17 - test 14", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, [], 9, 17);
            assert.equal(div.style.gridTemplateColumns, "repeat(21, 2%)");
            div.innerHTML = "";
        });

        it("Tabela sa 5 dana i intervalom od 9 do 10 - test 15", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 9, 10);
            assert.equal(div.style.gridTemplateRows, "0.2fr repeat(5, 1fr)");
            assert.equal(div.style.gridTemplateColumns, "repeat(7, 2%)");
            div.innerHTML = "";
        });

        it("Tabela sa 3 dana i intervalom od 9 do pola 10 - test 16", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Srijeda", "Četvrtak", "Petak"], 9, 10);
            assert.equal(div.style.gridTemplateRows, "0.2fr repeat(3, 1fr)");
            assert.equal(div.style.gridTemplateColumns, "repeat(7, 2%)");
            div.innerHTML = "";
        });

        it("Test izgleda tabele - test 17", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Srijeda", "Četvrtak", "Petak"], 9, 13);
            let danOkvir = div.getElementsByClassName("dan");
            assert.equal(danOkvir[0].style.gridColumn, "span 4 / auto");
            div.innerHTML = "";
        });

        it("Test izgleda bordera za polovicne sate - test 18", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Srijeda", "Četvrtak", "Petak"], 9, 17);
            let neparniBorder = div.getElementsByClassName("nep");
            div.innerHTML = "";
        });
        it("Ispravnost teksta pravih dana - test 19", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 11, 17);
            assert.equal(div.getElementsByClassName("dan")[0].innerText, "Ponedjeljak");
            assert.equal(div.getElementsByClassName("dan")[1].innerText, "Utorak");
            assert.equal(div.getElementsByClassName("dan")[2].innerText, "Srijeda");
            assert.equal(div.getElementsByClassName("dan")[3].innerText, "Četvrtak");
            assert.equal(div.getElementsByClassName("dan")[4].innerText, "Petak");
            div.innerHTML = "";
        });
        it("Ispravnost teksta izmišljenih dana - test 20", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Prvi", "DRUGI", "TREĆI", "petakpetak"], 11, 17);
            assert.equal(div.getElementsByClassName("dan")[0].innerText, "Prvi");
            assert.equal(div.getElementsByClassName("dan")[1].innerText, "DRUGI");
            assert.equal(div.getElementsByClassName("dan")[2].innerText, "TREĆI");
            assert.equal(div.getElementsByClassName("dan")[3].innerText, "petakpetak");
            div.innerHTML = "";
        });
    })

    describe("dodajAktivnost()", function() {
        it("vrijemePocetak vece od vrijemeKraj - test 1", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 16);
            let greska = iscrtajModul.dodajAktivnost(div, "WT", "Predavanje", 9, 8, "Četvrtak");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            div.innerHTML = "";
        });
        it("vrijemePocetak i vrijemeKraj se podudaraju - test 2", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 16);
            let greska = iscrtajModul.dodajAktivnost(div, "WT", "Predavanje", 10, 10, "Četvrtak");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            div.innerHTML = "";
        });
        it("Dan ne postoji - test 3", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Srijeda", "Četvrtak", "Petak"], 8, 16);
            let greska = iscrtajModul.dodajAktivnost(div, "WT", "Predavanje", 10, 12, "Utorak");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            div.innerHTML = "";
        });
        it("Vremena ne postoje - test 4", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Srijeda", "Četvrtak", "Petak"], 8, 16);
            let greska = iscrtajModul.dodajAktivnost(div, "WT", "Predavanje", 7, 17, "Utorak");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            div.innerHTML = "";
        });
        it("Zauzet termin u rasporedu - test 5", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 16);
            iscrtajModul.dodajAktivnost(div, "WT", "Predavanje", 10, 12, "Četvrtak");
            let greska = iscrtajModul.dodajAktivnost(div, "WT", "Vježbe", 11, 12, "Četvrtak");
            assert.equal(greska, "Greška - već postoji termin u rasporedu u zadanom vremenu");
            div.innerHTML = "";
        });
        it("Popunjen cijeli raspored - test 6", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak"], 10, 15);
            iscrtajModul.dodajAktivnost(div, "WT", "Predavanje", 10, 12, "Ponedjeljak");
            iscrtajModul.dodajAktivnost(div, "WT", "Vježbe", 12, 15, "Ponedjeljak");
            assert.equal(div.getElementsByClassName("nep").length, 0);
            assert.equal(div.getElementsByClassName("par").length, 0);
            div.innerHTML = "";
        });
        it("Random raspored - test 7", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 16);
            iscrtajModul.dodajAktivnost(div, "OOI", "Predavanje", 8, 12, "Ponedjeljak");
            iscrtajModul.dodajAktivnost(div, "VVS", "Vježbe", 12, 15, "Utorak");
            assert.equal(div.getElementsByClassName("zauzeto").length, 12);
            div.innerHTML = "";
        });
        it("Random raspored - test 8", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 7, 18);
            iscrtajModul.dodajAktivnost(div, "OOI", "Predavanje", 8, 12, "Ponedjeljak");
            iscrtajModul.dodajAktivnost(div, "VVS", "Vježbe", 12, 15, "Utorak");
            iscrtajModul.dodajAktivnost(div, "WT", "Predavanje", 11, 15, "Srijeda");
            iscrtajModul.dodajAktivnost(div, "WT", "Vježbe", 15, 16, "Četvrtak");
            assert.equal(div.getElementsByClassName("zauzeto").length, 20);
            div.innerHTML = "";
        });
        it("Popunjen cijeli raspored - test 9", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 9, 13);
            iscrtajModul.dodajAktivnost(div, "OOI", "Predavanje", 9, 12, "Ponedjeljak");
            iscrtajModul.dodajAktivnost(div, "RG", "Tutorijal", 12, 13, "Ponedjeljak");
            iscrtajModul.dodajAktivnost(div, "VVS", "Vježbe", 9, 11, "Utorak");
            iscrtajModul.dodajAktivnost(div, "OIS", "Predavanje", 11, 13, "Utorak");
            iscrtajModul.dodajAktivnost(div, "WT", "Predavanje", 9, 12, "Srijeda");
            iscrtajModul.dodajAktivnost(div, "WT", "Vježbe", 12, 13, "Srijeda");
            iscrtajModul.dodajAktivnost(div, "RG", "Predavanje", 9, 11, "Četvrtak");
            iscrtajModul.dodajAktivnost(div, "OOI", "Vježbe", 11, 13, "Četvrtak");
            iscrtajModul.dodajAktivnost(div, "VVS", "Predavanje", 9, 12, "Petak");
            iscrtajModul.dodajAktivnost(div, "OIS", "Tutorijal", 12, 13, "Petak");
            assert.equal(div.getElementsByClassName("par").length, 0);
            assert.equal(div.getElementsByClassName("nep").length, 0);
            div.innerHTML = "";
        });
        it("Random raspored - test 10", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 11, 17);
            iscrtajModul.dodajAktivnost(div, "OOI", "Vježbe", 11, 13, "Četvrtak");
            iscrtajModul.dodajAktivnost(div, "VVS", "Predavanje", 12, 14, "Petak");
            iscrtajModul.dodajAktivnost(div, "OIS", "Tutorijal", 12, 13, "Srijeda");
            assert.equal(div.getElementsByClassName("zauzeto").length, 7);
            div.innerHTML = "";
        });
        it("Ispitivanje tačnosti boje - test 11", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 11, 20);
            iscrtajModul.dodajAktivnost(div, "OOI", "Vježbe", 11, 13, "Četvrtak");
            iscrtajModul.dodajAktivnost(div, "VVS", "Predavanje", 12, 14, "Petak");
            iscrtajModul.dodajAktivnost(div, "OIS", "Tutorijal", 12, 13, "Srijeda");
            assert.equal(div.getElementsByClassName("zauzeto")[0].style.backgroundColor, "");
            div.innerHTML = "";
        });
        it("Colspan ispravnost - test 12", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 6, 18);
            iscrtajModul.dodajAktivnost(div, "OOI", "Vježbe", 11, 13, "Četvrtak");
            iscrtajModul.dodajAktivnost(div, "VVS", "Predavanje", 12, 14, "Petak");
            iscrtajModul.dodajAktivnost(div, "OIS", "Tutorijal", 12, 13, "Srijeda");
            assert.equal(div.getElementsByClassName("puni-kraj")[0].style.gridColumn, "span 2 / auto");
            div.innerHTML = "";
        });
        it("Neispravan format vrijemePocetak - test 13", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 9, 19);
            iscrtajModul.dodajAktivnost(div, "OOI", "Vježbe", 11, 13, "Četvrtak");
            iscrtajModul.dodajAktivnost(div, "VVS", "Predavanje", 12, 14, "Petak");
            let greska = iscrtajModul.dodajAktivnost(div, "OIS", "Tutorijal", 12.3, 13, "Srijeda");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            div.innerHTML = "";
        });
        it("Neispravan format vrijemeKraj - test 14", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 18);
            iscrtajModul.dodajAktivnost(div, "OOI", "Vježbe", 11, 13, "Četvrtak");
            iscrtajModul.dodajAktivnost(div, "VVS", "Predavanje", 12, 14, "Petak");
            let greska = iscrtajModul.dodajAktivnost(div, "OIS", "Tutorijal", 12, 13.2, "Srijeda");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            div.innerHTML = "";
        });
        it("Neispravan format vrijemePocetak i vrijemeKraj - test 15", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 10, 16);
            iscrtajModul.dodajAktivnost(div, "OOI", "Vježbe", 11, 13, "Četvrtak");
            iscrtajModul.dodajAktivnost(div, "VVS", "Predavanje", 12, 14, "Petak");
            let greska = iscrtajModul.dodajAktivnost(div, "OIS", "Tutorijal", 12.6, 13.2, "Srijeda");
            assert.equal(greska, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            div.innerHTML = "";
        });
        it("Random raspored - test 16", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Srijeda", "Četvrtak", "Petak"], 11, 17);
            iscrtajModul.dodajAktivnost(div, "OOI", "Vježbe", 11, 13, "Četvrtak");
            assert.equal(div.getElementsByClassName("zauzeto").length, 3);
            assert.equal(div.getElementsByClassName("puni-kraj").length, 1);
            iscrtajModul.dodajAktivnost(div, "VVS", "Predavanje", 12, 14.5, "Petak");
            assert.equal(div.getElementsByClassName("zauzeto").length, 7);
            assert.equal(div.getElementsByClassName("pola-kraj").length, 1);
            iscrtajModul.dodajAktivnost(div, "OIS", "Tutorijal", 12, 13, "Srijeda");
            assert.equal(div.getElementsByClassName("zauzeto").length, 8);
            assert.equal(div.getElementsByClassName("puni-kraj").length, 2);
            div.innerHTML = "";
        });
        it("Rubni slučajevi - test 17", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 19);
            iscrtajModul.dodajAktivnost(div, "OOI", "Predavanje", 8, 19, "Ponedjeljak");
            assert.equal(div.getElementsByClassName("zauzeto").length, 21);
            assert.equal(div.getElementsByClassName("puni-kraj").length, 1);
            iscrtajModul.dodajAktivnost(div, "RG", "Predavanje", 8, 8.5, "Četvrtak");
            assert.equal(div.getElementsByClassName("zauzeto").length, 21);
            assert.equal(div.getElementsByClassName("pola-kraj").length, 1);
            iscrtajModul.dodajAktivnost(div, "WT", "Tutorijal", 18.5, 19, "Utorak");
            assert.equal(div.getElementsByClassName("zauzeto").length, 21);
            assert.equal(div.getElementsByClassName("puni-kraj").length, 2);
            div.innerHTML = "";
        });
        it("Ispravnost teksta - test 18", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Srijeda", "Četvrtak", "Petak"], 11, 17);
            iscrtajModul.dodajAktivnost(div, "Novo", "Predavanje", 11, 13, "Četvrtak");
            assert.equal(div.getElementsByClassName("puni-kraj")[0].innerText, "Novo\nPredavanje");
            iscrtajModul.dodajAktivnost(div, "RMA", "Predavanje", 12, 14.5, "Petak");
            assert.equal(div.getElementsByClassName("pola-kraj")[0].innerText, "RMA\nPredavanje");
            iscrtajModul.dodajAktivnost(div, "OIS", "Tutorijal", 14, 15, "Četvrtak");
            assert.equal(div.getElementsByClassName("puni-kraj")[1].innerText, "OIS\nTutorijal");
            div.innerHTML = "";
        });
        it("Ispravnost teksta i dužine kolone- test 19", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Srijeda", "Četvrtak", "Petak"], 11, 17);
            let ime = "DM";
            let tip = "Tutorijal"
            iscrtajModul.dodajAktivnost(div, ime, tip, 11, 13, "Četvrtak");
            assert.equal(div.getElementsByClassName("puni-kraj")[0].innerText, ime + "\n" + tip);
            assert.equal(div.getElementsByClassName("puni-kraj")[0].style.gridColumn, "span 4 / auto");
            iscrtajModul.dodajAktivnost(div, "ASP", "Konsultacije", 12, 14.5, "Petak");
            assert.equal(div.getElementsByClassName("pola-kraj")[0].innerText, "ASP\nKonsultacije");
            assert.equal(div.getElementsByClassName("pola-kraj")[0].style.gridColumn, "span 5 / auto");
            iscrtajModul.dodajAktivnost(div, "", "Tutorijal", 14, 15, "Četvrtak");
            assert.equal(div.getElementsByClassName("puni-kraj")[1].innerText, "\nTutorijal");
            assert.equal(div.getElementsByClassName("puni-kraj")[1].style.gridColumn, "span 2 / auto");
            div.innerHTML = "";
        });
        it("2 dana ne postoje, treći postoji - test 20", function() {
            let div = document.getElementById("okvir-test");
            iscrtajModul.iscrtajRaspored(div, ["Ponedjeljak", "Srijeda", "Petak"], 6, 15);
            let greska1 = iscrtajModul.dodajAktivnost(div, "WT", "Predavanje", 10, 12, "Utorak");
            assert.equal(greska1, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            let greska2 = iscrtajModul.dodajAktivnost(div, "PJP", "Vježba", 10, 12, "Četvrtak");
            assert.equal(greska2, "Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            iscrtajModul.dodajAktivnost(div, "RMS", "Predavanje", 10, 11, "Petak");
            assert.equal(div.getElementsByClassName("puni-kraj")[0].innerText, "RMS\nPredavanje");
            assert.equal(div.getElementsByClassName("puni-kraj")[0].style.gridColumn, "span 2 / auto");
            div.innerHTML = "";
        });
    })
})