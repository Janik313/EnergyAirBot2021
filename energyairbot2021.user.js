// ==UserScript==
// @name         Energy Air 2021 Game Bot
// @namespace    https://github.com/Janik313/EnergyAirBot2021/blob/master/energyairbot2021.user.js
// @version      0.8
// @description  Win tickets for the Energy Air 2021 automatically
// @author       Janik313: https://github.com/Janik313
// @match        *game.energy.ch/*
// @run-at       document-end
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==

const desiredPrice = "tickets" // Set what you would like to win. (tickets|partner-price)


const questions = {
"Was war das Erste, was Künstler Knackeboul nach seinem Auftritt 2014 Backstage gemacht hat?":"Mit seinem Mami ein kühles Bier getrunken",
"In welchen Farben tritt das Energy Air Logo jährlich für das Sommerfinale auf?":"Blau und Weiss",
"Wie kannst du deine Gewinnchancen bei Ticketverlosungen für Energy Events verdoppeln?":"Wenn man in Zürich, Basel oder Bern wohnt",
"Wer war der Überraschungsact am Energy Air 2018?":"Lo &amp; Leduc",
"Wie heisst der offizielle Instagram-Account des Energy Air?":"@energyair_official",
"Was passiert, wenn es am Energy Air regnet?":"Der Event findet trotzdem statt",
"Mit welcher Zusatzoption hast du die Möglichkeit, direkt vor der Bühne zu stehen?":"XTRA Circle",
"Wie heisst die aktuelle Kampagne gegen Hass im Internet, welche Swisscom mit Energy lanciert hat?":"Mute the hate",
"Welche Stadt gehört seit August auch zur Energy Familie und wird am Energy Air vertreten sein?":"Luzern",
"Wie heisst die Tram- und Bushaltestelle, welche sich direkt neben dem Stadion Wankdorf befindet?":"Wankdorf Center",
"Mit welchem ESC-Hit rockte Luca Hänni am letzten Energy Air die Bühne?":"She Got Me",
"Wo kannst du, unter anderem, Energy Air Tickets gewinnen?":"Am Sender bei Radio Energy",
"Welche Musikerin wurde am Energy Air 2018 von einer 9-jährige Besucherin auf der Bühne gecovert?":"Namika",
"In welcher Location findet das Energy Air 2021 unter freiem Himmel statt?":"Stadion Wankdorf",
"Was ist das perfekte Openair-Outfit?":"Egal, hauptsache du kannst darin tanzen",
"Womit erschienen die Energy Mein Morgen Moderatoren Moser und Schelker auf der Energy Air Bühne 2019?":"Mit Spielzeug-Pferden",
"Welcher Künstler musste am letzten Energy Air Backstage einen Part aus dem Dialektrapsong von Sandro vorrappen?":"Stress",
"Welcher Act feierte am letzten Energy Air mit einem neuen Song eine Weltpremiere?":"Aloe Blacc",
"Welcher Act war noch nie an einem Energy Air dabei?":"Cro",
"In wie vielen Ländern ist das Kleidergeschäft Tally Weijl vertreten?":"In 39 Ländern",
"Welchen Kleidungsstil verfolgt Tally Weijl grundsätzlich?":"Just in time (voll im Trend)",
"Wie alt muss man sein, um ohne erwachsene Begleitung am Energy Air teilzunehmen?":"14 Jahre",
"Wer war der allererste Act in der Geschichte des Energy Air?":"Bastian Baker",
"Wie wird TALLY WEiJL ausgesprochen?":"Talli Weil",
"In welcher beliebten Serie war Tally Weijl zu sehen?":"Gossip Girl",
"Was folgt am diesjährigen Energy Air als krönender Abschluss?":"Aftershowparty",
"Wie lange dauerte das Energy Air 2019?":"6 Stunden",
"Welche zwei Energy Kultfiguren mischten das Energy Air 2017 richtig auf?":"Tinu & Dänu",
"Von welcher Marke war das Motorrad, mit dem Loco Escrito am letzten Energy Air über die Bühne fuhr?":"Harley-Davidson",
"Wann ist die Ticketverlosung fürs Energy Air 2021 gestartet?":"Am 2. August 2021",
"In welchem Schweizer Kanton wurde Tally Weijl 1984 gegründet?":"Solothurn",
"Welches Schweizer DJ-Duo sorgte am Energy Air 2019 zu Beginn für reichlich Stimmung?":"Averdeck",
"Unter welchem Motto feiern wir am 4. September 2021 das Energy Air?":"We are back.",
"Mit welchem aufblasbaren Tier konnten zwei Auserwählte am letzten Energy Air über die ganze Meute crowdsurfen?":"Einhorn",
"Musikgrössen aus wie vielen Ländern waren am Energy Air 2019 dabei?":"Aus 7 Ländern",
"Nach welchem Kriterium wählt das Energy Team die Acts für das Energy Air aus?":"Musiker*innen aus der aktuellen Energy Playlist",
"In welchem Schweizer Kanton eröffnete Tally Weijl 1987 den ersten Store?":"Fribourg",
"Welche zwei Energy Kultfiguren mischten das Energy Air 2017 richtig auf?":"Tinu &amp; Dänu",
"Wie heisst die Initiative für mehr Respekt im Internet, welche Swisscom mit Energy lanciert hat und am Energy Air ihren grossen Höhepunkt feiert?":"Mute the Hate",
}

$(document).ready(function() {
  setInterval(function() {
    cache_clear()
  }, 30000);
});

function cache_clear() {
  window.location.reload(true);
  // window.location.reload(); use this if you do not remove cache
}

function titleIs (title, selector = 'h2') {
    return $(selector).html() === title
}

function currentQuestion () {
    return $('h3.question-text').html()
}

function nextQuestion () {
    $('button#next-question').trigger('click')
    setTimeout(makeAction, 500)
}

function answerQuestion () {
    let curr = currentQuestion()
    console.log(curr, questions[curr])
    $('#answers .answer-wrapper').each((i, el) => {
        console.log($(el).children('input'))
        if ($(el).children('label').html() === questions[curr]) {
            $(el).children('input').trigger('click')
        }
    })
    setTimeout(nextQuestion, 300) //speed
}

function makeAction () {
    if (titleIs('Verifiziere deine Handynummer !')) {
        console.log('STEP: Phone Number')
        $('form.send-code').submit(() => {
            setTimeout(makeAction, 1500)
        })
        return
    } else if (titleIs('Trage den Code ein, welchen du per SMS erhalten hast.')) {
        console.log('STEP: Validate Code')
        $('form.validate-code').submit(() => {
            setTimeout(makeAction, 1500)
        })
        return
    } else if (titleIs('Du hast die erste Hürde geschafft. <br> Um welchen Preis möchtest du spielen?', '.decision h3')) {
        console.log('STEP: Decision')
        $('.decision .' + (desiredPrice || 'tickets') + ' .button button.game-button').trigger('click')
        setTimeout(makeAction, 200)
    } else if (titleIs('Hinter welchem Logo verstecken sich die Tickets?', '.jumbotron h1')) {
        var rand = Math.floor(Math.random() * 12);

        $('.circle').eq(rand).children('img').trigger('click')
        setTimeout(makeAction, 1500)
    } else if (titleIs('Leider verloren', '.lose h1')) {
        $('.lose button.game-button').trigger('click')
        setTimeout(makeAction, 200)
    } else if ($('button#lose').length) {
        $('button#lose').trigger('click')
        console.clear()
        setTimeout(makeAction, 200)
    } else if (titleIs("Los geht's!", '.mobile-verification .jumbotron .title-verification')) {
        $('button.btn.btn-primary.game-button.btn-lg').trigger('click')
        setTimeout(makeAction, 200)
    } else if (titleIs("Melde dich an", '.mobile-verification .jumbotron .title-verification')) {
        console.log("titel")
        $('button.btn.btn-primary.game-button.btn-lg').trigger('click')
        setTimeout(makeAction, 200)
    } else {
        answerQuestion()
    }
}

(function() {
    'use strict';

    console.log('starting...')
    makeAction()
})();
