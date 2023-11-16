// TUTTE LE CANZONI DOVRANNO ANDARE SOTTO QUESTO DIV
const target = document.getElementById("second-main-div");

class Song {
    constructor(number, title, artist, played, duration, target){
        this.number = number;
        this.title = title;
        this.artist = artist;
        this.played = played;
        this.duration = duration;
        this.target = target;
        this.HTMLInit();
    }

    HTMLInit () {
        const template = document.querySelector("template");
        const clone = document.importNode(template.content, true).firstElementChild;
        const songNumber = clone.querySelector(".song-number");
        const songTitle = clone.querySelector(".song-title");
        const songArtist = clone.querySelector(".song-artist");
        const songPlayed = clone.querySelector(".song-played");
        const songDuration = clone.querySelector(".song-duration");

        songNumber.innerText = this.number;
        songTitle.innerText = this.title;
        songArtist.innerText = this.artist;
        songPlayed.innerText = this.played;
        songDuration.innerText = this.duration;

        target.append(clone);
    }
}

// QUESTA E SOLO UNA PROVA, PUO ESSERE USATA PER TESTARE RAPIDAMENTE IL FUNZIONAMENTO DELLA CLASSE
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);
// new Song("1","Ciao Roma","Pinguini Tattici Nucleari","si","si",target);