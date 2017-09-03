// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    Require("lib/clickable");
    Require("lib/quest");
    Require("lib/error_handler");
    Require("lib/geolocation");
    Require("lib/compass");
    Require("lib/locations");

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    var colors = [
        "#4f4",
        "#2d2",
        "#0b0",
        "#290",
        "#470",
        "#650",
        "#830",
        "#a22",
        "#c44",
        "#e66",
    ];

    function onDeviceReady() {
        try {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause.bind(this), false);
            document.addEventListener('resume', onResume.bind(this), false);

            var gpsStatus = document.getElementById("gps_status");
            var compassStatus = document.getElementById("compass_status");

            document.addEventListener("gps-signal-ok", function () {
                gpsStatus.style.backgroundColor = "#4f4";
                gpsStatus.setAttribute("failed", 0);
            });
            document.addEventListener("compass-signal-ok", function () {
                compassStatus.style.backgroundColor = "#4f4";
                compassStatus.setAttribute("failed", 0);
            });
            window.setInterval(function () {
                [compassStatus, gpsStatus].forEach(function (el, idx) {
                    var value = parseInt(el.getAttribute("failed"));
                    el.setAttribute("failed", value + 1);
                    var color = colors[colors.length - 1];
                    if (value < colors.length) {
                        color = colors[value];
                    }
                    el.style.backgroundColor = color;
                });
            }, 1000);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

            var gatherer = document.getElementById("pointgatherer");
            gatherer.style.display = "none";

            new Clickable(document.getElementById("title")).OnMultiClick(function () {
                document.getElementById("next").setAttribute("class", "");
                document.getElementById("prev").setAttribute("class", "");
            }, 5);


            new Clickable(document.getElementById("title")).OnMultiClick(function () {
                try {
                    navigator.geolocation.clearWatch(null);
                } catch (e) {
                    new ErrorHandler(e).Save();
                }
            }, 6);

            new Clickable(document.getElementById("status")).OnMultiClick(function () {
                ErrorHandler.Toggle();
            }, 5);

            new Clickable(document.getElementById("status")).OnMultiClick(function () {
                ErrorHandler.Clear();
            }, 7);

            new Clickable(gatherer).OnClick(function () { window.location.assign("point_gatherer.html"); });
            new Clickable(document.getElementById("map")).OnClick(function () { activeQuest.map(); });
            new Clickable(document.getElementById("next")).OnClick(function () { activeQuest.Next(); });
            new Clickable(document.getElementById("prev")).OnClick(function () { activeQuest.Previous(); });
            new Clickable(document.getElementById("restart")).OnClick(function () {
                navigator.notification.confirm(
                    "Fakt se chceš vrátit úplně na začátek?",
                    function (button) {
                        if (button == 1) {
                            activeQuest.Restart();
                        }
                    },
                    "Restartovat",
                    ["Ano", "NE!"]
                );
            });

            Location.Watch();
            compass.Watch();

            // quest.AddTask(new SearchTask(locations.GetPoint("doma"), 120, "Jdi domů", function () { navigator.notification.alert("Jsi doma!"); }));

            var quest = new LinearQuest();

            new TextTask(quest, '<span class="blink">Startuji...</span>',
                "Baron...<br />Nevím jestli je to jeho jméno, nebo jen titul, ale vím, že mu nikdo jinak neřekne. Jdeme mu po krku už skoro půl roku... " +
                "No, jdeme - šli jsme. Bert a já.<br/>" +
                "Není to ani měsíc, co nás málem dostal, Bert to radši vzdal a zdekoval se. Ani se mu nemůžu divit - chybělo málo a přišel o nohy. <br />" +
                "Tak jsem na to sám.<br />" +
                "Nejhorší je, že se proti němu bojí kdokoli jít. A to na centrále odměnu na jeho hlavu navyšovali už asi čtyřikrát - furt nic, jen my dva... jen já...<br />" +
                "Shánět informace je makačka, nikdo se mnou nemluví přímo. Ještě že používaj bezdrátový mrtvý schránky s mizerným zabezpečením - dá se zjistit co plánujou a kam se přesouvaj." +
                "Zjistil jsem, že Baron má schůzku s W (nějakej podružnej pašerák, ale Baron mu podle všeho věří) někde tady v okolí. Podle jedný mrtvý schránky se mají sejít tady u nějaký borovice." +
                "Musím se po ní podívat venku. <br />" +
                "Trochu se bojím, že Baron ví, že po něm jdu, ale snad neví že už ho skoro mám.",
                "jo jsem venku a GPS se snad chytne");
            new SearchTask(quest, "Borovice", "Prohledej místo první schůzky Barona s W.", locations.GetPoint("Borovice na zahradě"), 3, null);
            scannerTasks(quest, 'Jdou po mně, ale snad jsem je setřásl.<br />Potkáme se na rozcestí u mostu.<br />- Baron', 'porozhlédni se u mostu')
            new SearchTask(quest, "Most", "Baron se měl s někým setkat u mostu, pojďme se tam podívat...", locations.GetPoint("mostek (baterka schovaná v trubce?)"), 10, null);
            scannerTasks(quest, 'neni tu bezpecno<br />prijd na starou vyhlidku<br />- W', 'pokračuj po cestě');
            new SearchTask(quest, "břízky", "Stará vyhlídka, to znám - tam jsou srostlé tři stromy a za úplňků se tam slejzali pašeráci...", locations.GetPoint("tři břízky"), 10, null);
            scannerTasks(quest, 'balik je v lese na sever ocad, je tam pekne tvrda zeme - zlomil jsem pri kopani lopatu<br />davej bacha, pry mas stiny<br />-W', 'pokračovat');
            scannerTasks(quest, 'O moje stíny se nestarej, jednoho už jsem se zbavil, druhej půjde za chvíli.<br />Balík vyzvednu.<br />- Baron', 'najdi "balíček"');
            new SearchTask(quest, "zlomený rýč", "Někde poblíž si Baron a W předávali zásilku, kurnik, jediné vodítko je les na severu a zlomený rýč. Musím to najít a doufat, že tam nechali nějaké stopy...", locations.GetPoint("zapíchnutý rýč"), 5, null);
            scannerTasks(quest, '<span class="error">failed</span>', 'pokračuj');
            new TextTask(quest, "úkryt",
                "Tady na místě nic není.<br />" +
                "Ale kopat v takovýhle půdě musela bejt celkem dřina, určitě to zabralo víc než den. Což znamená, že tu někde museli přespávat!",
                "najdi pašerácký úkryt");
            new HiddenSearchTask(quest, "úkryt", "Pašeráci sice přespí kdekoli, když potřebujou, ale jakmile je jen trochu možnost, jdou zalézt někam pod střechu, někde tu musí být nějaký vhodný úkryt. Zkusme ho najít.", locations.GetPoint("posed mezi loukama"), 20, null);
            scannerTasks(quest, 'jo, prej nestarej se o moje stiny - kamarade, niceho ses nezbavil! Ta nula, cos ji prejel a ten jeji partak, to jsou nicky! <br />Po tobe jdou tajny, magore!<br />Mel by ses nekam uklidit.<br />- W', 'pokračuj');
            new TextTask(quest, "úkryt",
                "Hmmm. Tolik k mému egu. A to jsem si myslel, jak mu šlapeme na paty a oni po něm jdou i agenti. No, nevím jestli se jim mám plést pod nohy, ale zas ta odměna...<br />" +
                "Každopádně - Baron tu přespával, a odcházel celkem narychlo. Moc toho s sebou neměl - nemohl cestovat daleko.<br />" +
                "Jediná lokalita, co přichází v úvahu, je malá stanová osada na východ odtud",
                "najdi stanovou osadu"
            );
            new SearchTask(quest, "osada", "Hledáme stanovou osadu, kam se mohl Baron zdekovat před tajnejma.", locations.GetPoint("Lovecká chata"), 20, null);
            new TextTask(quest, "osada",
                "Boha jeho, co se tu stalo?<br />Tady vždycky stávaly spousty stanů a kypělo to tu životem... A teď ani noha.<br /><br />" +
                "Za tím musí být agenti, asi bych se jim fakt neměl plést moc do cesty. Kdybych tak věděl, co se tady stalo... Ale, vlastně, neměli pašeráci kousek odtud mrtvou schránku? U nějaké studánky? Snad tam budou nějaký informace...",
                "najít data");
            new SearchTask(quest, "studánka", "Musím u studánky najít informace co se tu stalo", locations.GetPoint("studánka u lovecké chaty"), 20, null);
            scannerTasks(quest, "Ten debil Baron je s sebou pritahl snad vsechny. " +
                "Asi deset agentu vycistilo celou osadu. Balicek je nastesti v bezpeci - narozdil od Barona, toho uz asi nikdo nikdy neuvidi. Sebrali ho." +
                "A spolu s nim vsechny, co byli v osade, nastesti jsem stihl zdrhnout.<br />- W<br /><br />P.s.: balicek ulozim na bezpecnem miste",
                'pokračuj');
            new TextTask(quest, "bezpečné místo",
                "Dobře, tak na odměnu za Barona si můžu nechat zajít chuť. Jestli ho opravdu mají agenti... Brrr. Skoro bych ho až litoval.<br />" +
                "Ale ten balíček by mohl být zajímavý způsob jak se zahojit. S W jsem se kdysi setkal, celou dobu vyprávěl o své oblíbené skále v nějakém borovém háji, že prý se tam cítí bezpečně jako nikde.<br />" +
                "Moc bych na to nevsázel, ale zkusit to můžu, ne?",
                "pokračuj");
            new SearchTask(quest, "bezpečné místo", "W se rád zdržoval u nějaké skály v borovém háji, snad se tam dozvím něco nového.", locations.GetPoint("velká skalka v Borovičkách"), 20, null);
            scannerTasks(quest, "Zacali tu smejdit agenti, neni tu bezpecno. Presunu balicek na puvodni misto setkani<br />-W",
                'pokračuj');
            new TextTask(quest, "místo setkání",
                "Jo, tak balíček tu byl. Ale už tu není. Sakra, to je jako honit se za vlastním ocasem... Místo původního setkání... co tím sakra myslí?",
                "pokračovat");
            new HiddenSearchTask(quest, "místo setkání",
                "W přenesl balíček z borového háje někam jinam. Na místo, o kterém mluví jako o &bdquo;původním místu setkání&ldquo;.<br />Musím ho někde najít...",
                locations.GetPoint("Borovice na zahradě"), 3, null);
            new FinishTask(quest, "místo setkání", "Jasně! Tady se přece měli potkat poprvé! Někde tady ten balíček musí být!");


            var travelQuest = new LinearQuest();
            new SearchTask(travelQuest, "bruntál", "", locations.GetPoint("bruntál"), 500, null);
            new SearchTask(travelQuest, "čenkovice", "", locations.GetPoint("čenkovice"), 500, null);
            new HiddenSearchTask(travelQuest, "mekáč", "", locations.GetPoint("mekáč"), 500, null);
            new SearchTask(travelQuest, "A Domů!", "", locations.GetPoint("doma"), 5, null);
            new FinishTask(quest, "Hotovo!", "Pecka, jsi doma!");

            var activeQuest = travelQuest;
            activeQuest.Continue();
        } catch (e) {
            new ErrorHandler(e).Save().ReThrow();
        }
    };

    function scannerTasks(quest, data, button) {
        new DelayTask(quest, "Scanner",
            '<div class="code blink">&gt; connecting to wireless storage...</div>',
            1000);
        new DelayTask(quest, "Scanner",
            '<div class="code blink">&gt; reading data</div>',
            900);
        new TextTask(quest, "Scanner",
            '<div class="code">&gt; dumping data<br />' +
            data +
            '</div>',
            button);
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
        try {
            Location.Stop();
            compass.Stop();
        } catch (e) {
            new ErrorHandler(e).Save().ReThrow();
        }
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
        try {
            Location.Watch();
            compass.Watch();
        } catch (e) {
            new ErrorHandler(e).Save().ReThrow();
        }
    };
})();