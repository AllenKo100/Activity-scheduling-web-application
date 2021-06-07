let okvir=document.getElementById("okvir");
iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],0,19);
dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
dodajAktivnost(okvir,"WT","vježbe",12,13.5,"Ponedjeljak");
dodajAktivnost(okvir,"RMA","predavanje",14,17,"Ponedjeljak");
dodajAktivnost(okvir,"RMA","vježbe",12.5,14,"Utorak");
dodajAktivnost(okvir,"DM","tutorijal",14,16,"Utorak");
dodajAktivnost(okvir,"DM","predavanje",16,19,"Utorak");
dodajAktivnost(okvir,"OI","predavanje",12,15,"Ponedjeljak");
dodajAktivnost(okvir,"OI","predavanje",12,15,"Petak");
dodajAktivnost(okvir,"WT","vježbe",8.5,9,"Jeste");
dodajAktivnost(okvir,"WT","vježbe",7,9,"NoviDan");

let okvir2 = document.getElementById("okvir2");
iscrtajRaspored(okvir2, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 17);
dodajAktivnost(okvir2, "OOI", "Predavanje", 10, 12, "Ponedjeljak");
dodajAktivnost(okvir2, "WT", "Vježbe", 11, 15, "Ponedjeljak");
dodajAktivnost(okvir2, "WT", "Predavanje", 13, 15, "Utorak");
dodajAktivnost(okvir2, "WT", "Vježbe", 16, 17, "Utorak");
dodajAktivnost(okvir2, "OOI", "Vježbe", 8, 17, "Srijeda");
dodajAktivnost(okvir2, "OIS", "Predavanje", 11, 14, "Četvrtak");
dodajAktivnost(okvir2, "OIS", "Vježbe", 16, 17, "Četvrtak");
dodajAktivnost(okvir2, "RG", "Predavanje", 8, 17, "Petak");
dodajAktivnost(okvir2, "RG", "Vježbe", 9, 11, "Četvrtak");
dodajAktivnost(okvir2, "OIS", "Tutorijal", 9, 11, "Petak");

let okvir3 = document.getElementById("okvir3");
iscrtajRaspored(okvir3, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 16);
dodajAktivnost(okvir3, "OOI", "Predavanje", 8, 12, "Ponedjeljak");
dodajAktivnost(okvir3, "VVS", "Vježbe", 12, 15, "Utorak");
dodajAktivnost(okvir3, "VVS", "Vježbe", 12.2, 15, "Srijeda");
dodajAktivnost(okvir3, "VVS", "Vježbe", 12, 15.4, "Srijeda");

dodajAktivnost(okvir, "OIS", "Predavanje", 10, 13, "Četvrtak");
dodajAktivnost(okvir, "RG", "Predavanje", 10, 12, "Petak");

dodajAktivnost(okvir, "WT", "TEST", 18, 20, "Ponedjeljak");