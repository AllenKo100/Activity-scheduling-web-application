window.onload = () => {
    document.getElementById('dodajDugme').addEventListener("click", () => {
        parsiranje();
    })
}

var grupeAjax = new XMLHttpRequest();
grupeAjax.onreadystatechange = function() {
    if(grupeAjax.readyState == 4 && grupeAjax.status == 200) {
        var odabirGrupe = document.getElementById("grupaSelect");
        grupe = JSON.parse(grupeAjax.responseText);
        //idemo kroz niz;
        for(let i = 0; i < grupe.length; i++) {
            odabirGrupe.appendChild(new Option(grupe[i].naziv, grupe[i].id));
        }
    } else if(grupeAjax.readyState == 4) {
        console.log("Greška");
        alert("Greška");
    }
}
grupeAjax.open("GET", "http://localhost:3000/v2/grupa", true);
grupeAjax.send();

function parsiranje() {
    console.log("ušlo parsiranje");
    let nizStudenti = [];
    let tekst = document.getElementById("textAreaStudent").value.split('\n');;
    let izabranaGrupa = document.getElementById("grupaSelect");
    let idGrupa = izabranaGrupa.options[izabranaGrupa.selectedIndex].value;

    for(let i = 0; i < tekst.length; i++) {
        if(tekst[i] != "") {
            let podaci = tekst[i].split(',');
            let trenutni = {
                ime: podaci[0].trim(),
                index: podaci[1].trim()
            }
            nizStudenti.push(trenutni);
        }
    }

    var upisStudentaAjax = new XMLHttpRequest();
    upisStudentaAjax.onreadystatechange = function() {
        if(upisStudentaAjax.readyState == 4 && upisStudentaAjax.status == 200) {
            let povratni = JSON.parse(upisStudentaAjax.responseText);
            let tekstPolje = document.getElementById("textAreaStudent");
            tekstPolje.value = "";

            for(let i = 0; i < povratni.length; i++) {
                tekstPolje.value += povratni[i];
                tekstPolje.value += "\n";
            }
        } else if(upisStudentaAjax.readyState == 4) {
            console.log("greška");
            alert("greška");
        }
    }
    upisStudentaAjax.open("POST", "http://localhost:3000/v2/noviStudenti/" + idGrupa, true);
    upisStudentaAjax.setRequestHeader("Content-Type", "application/json");
    upisStudentaAjax.send(JSON.stringify(nizStudenti));
}