Require("lib/point");

var prahaQuest = function () {
    var locations = locationList();
    return {
        type: "linear",
        tasks: [
            {
                type: "text",
                title: '<span class="blink">Startuji...</span>',
                text: "Jdeme na procházku do Prahy!",
                button: "jo jsem venku a GPS se snad chytne"
            }, {
                type: "search",
                title: "Metro",
                text: "Jdeme na metro Luka!",
                point: new Point(14.3209798, 50.045281),
                precision: 10
            }, {
                type: "hidden_search",
                title: "Národní třída",
                text: "Jedeme na Národku",
                point: new Point(14.4177596, 50.081469),
                precision: 20
            }, {
                type: "search",
                title: "Pecka modelář",
                text: "A vyzvednout ten bazmek, co ho nepotřebuju",
                point: new Point(14.4153662, 50.081846),
                precision: 20
            }, {
                type: "search",
                title: "Zpátky na metro",
                text: "Jedeme na Národku",
                point: new Point(14.4177596, 50.081469),
                precision: 20
            }, {
                type: "hidden_search",
                title: "Metro",
                text: "Jedeme na Luka!",
                point: new Point(14.3209798, 50.045281),
                precision: 10
            }, {
                type: "search",
                title: "Domů",
                text: "hurá domů!",
                point: new Point(14.3212227, 50.041001),
                precision: 10
            }, {
                type: "finish",
                title: "Hotovo",
                text: "A jsme tu!"
            }
        ]
    };
}