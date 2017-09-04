Require("data/locations");

var chataQuest = function () {
    var locations = locationList();
    return {
        type: "linear",
        tasks: [
            {
                type: "text",
                title: '<span class="blink">Startuji...</span>',
                text:
                "Baron...<br />Nevím jestli je to jeho jméno, nebo jen titul, ale vím, že mu nikdo jinak neřekne. Jdeme mu po krku už skoro půl roku... " +
                "No, jdeme - šli jsme. Bert a já.<br/>" +
                "Není to ani měsíc, co nás málem dostal, Bert to radši vzdal a zdekoval se. Ani se mu nemůžu divit - chybělo málo a přišel o nohy. <br />" +
                "Tak jsem na to sám.<br />" +
                "Nejhorší je, že se proti němu bojí kdokoli jít. A to na centrále odměnu na jeho hlavu navyšovali už asi čtyřikrát - furt nic, jen my dva... jen já...<br />" +
                "Shánět informace je makačka, nikdo se mnou nemluví přímo. Ještě že používaj bezdrátový mrtvý schránky s mizerným zabezpečením - dá se zjistit co plánujou a kam se přesouvaj." +
                "Zjistil jsem, že Baron má schůzku s W (nějakej podružnej pašerák, ale Baron mu podle všeho věří) někde tady v okolí. Podle jedný mrtvý schránky se mají sejít tady u nějaký borovice." +
                "Musím se po ní podívat venku. <br />" +
                "Trochu se bojím, že Baron ví, že po něm jdu, ale snad neví že už ho skoro mám.",
                button: "jo jsem venku a GPS se snad chytne"
            }, {
                type: "search",
                title: "Borovice",
                text: "Prohledej místo první schůzky Barona s W.",
                point: locations.GetPoint("Borovice na zahradě"),
                precision: 3
            }, {
                type: "scanner",
                text: 'Jdou po mně, ale snad jsem je setřásl.<br />Potkáme se na rozcestí u mostu.<br />- Baron',
                button: 'porozhlédni se u mostu'
            }, {
                type: "search",
                title: "Most",
                text: "Baron se měl s někým setkat u mostu, pojďme se tam podívat...",
                point: locations.GetPoint("mostek (baterka schovaná v trubce?)"),
                precision: 10
            }, {
                type: "scanner",
                text: 'neni tu bezpecno<br />prijd na starou vyhlidku<br />- W',
                button: 'pokračuj po cestě'
            }, {
                type: "search",
                title: "břízky",
                text: "Stará vyhlídka, to znám - tam jsou srostlé tři stromy a za úplňků se tam slejzali pašeráci...",
                point: locations.GetPoint("tři břízky"),
                precision: 10
            }, {
                type: "scanner",
                text: 'balik je v lese na sever ocad, je tam pekne tvrda zeme - zlomil jsem pri kopani lopatu<br />davej bacha, pry mas stiny<br />-W',
                button: 'pokračovat'
            }, {
                type: "scanner",
                text: 'O moje stíny se nestarej, jednoho už jsem se zbavil, druhej půjde za chvíli.<br />Balík vyzvednu.<br />- Baron',
                button: 'najdi "balíček"'
            }, {
                type: "search",
                title: "zlomený rýč",
                text: "Někde poblíž si Baron a W předávali zásilku, kurnik, jediné vodítko je les na severu a zlomený rýč. Musím to najít a doufat, že tam nechali nějaké stopy...",
                point: locations.GetPoint("zapíchnutý rýč"),
                precision: 5
            }, {
                type: "scanner",
                text: '<span class="error">failed</span>',
                button: 'pokračuj'
            }, {
                type: "text",
                title: "úkryt",
                text:
                "Tady na místě nic není.<br />" +
                "Ale kopat v takovýhle půdě musela bejt celkem dřina, určitě to zabralo víc než den. Což znamená, že tu někde museli přespávat!",
                button: "najdi pašerácký úkryt"
            }, {
                type: "hidden_search",
                title: "úkryt",
                text: "Pašeráci sice přespí kdekoli, když potřebujou, ale jakmile je jen trochu možnost, jdou zalézt někam pod střechu, někde tu musí být nějaký vhodný úkryt. Zkusme ho najít.",
                point: locations.GetPoint("posed mezi loukama"),
                precision: 20
            }, {
                type: "scanner",
                text: 'jo, prej nestarej se o moje stiny - kamarade, niceho ses nezbavil! Ta nula, cos ji prejel a ten jeji partak, to jsou nicky! <br />Po tobe jdou tajny, magore!<br />Mel by ses nekam uklidit.<br />- W',
                button: 'pokračuj'
            }, {
                type: "text",
                title: "úkryt",
                text:
                "Hmmm. Tolik k mému egu. A to jsem si myslel, jak mu šlapeme na paty a oni po něm jdou i agenti. No, nevím jestli se jim mám plést pod nohy, ale zas ta odměna...<br />" +
                "Každopádně - Baron tu přespával, a odcházel celkem narychlo. Moc toho s sebou neměl - nemohl cestovat daleko.<br />" +
                "Jediná lokalita, co přichází v úvahu, je malá stanová osada na východ odtud",
                button: "najdi stanovou osadu"
            }, {
                type: "search",
                title: "osada",
                text: "Hledáme stanovou osadu, kam se mohl Baron zdekovat před tajnejma.",
                point: locations.GetPoint("Lovecká chata"),
                precision: 20
            }, {
                type: "text",
                title: "osada",
                text:
                "Boha jeho, co se tu stalo?<br />Tady vždycky stávaly spousty stanů a kypělo to tu životem... A teď ani noha.<br /><br />" +
                "Za tím musí být agenti, asi bych se jim fakt neměl plést moc do cesty. Kdybych tak věděl, co se tady stalo... Ale, vlastně, neměli pašeráci kousek odtud mrtvou schránku? U nějaké studánky? Snad tam budou nějaký informace...",
                button: "najít data"
            }, {
                type: "search",
                title: "studánka",
                text: "Musím u studánky najít informace co se tu stalo",
                point: locations.GetPoint("studánka u lovecké chaty"),
                precision: 20
            }, {
                type: "scanner",
                text: "Ten debil Baron je s sebou pritahl snad vsechny. " +
                "Asi deset agentu vycistilo celou osadu. Balicek je nastesti v bezpeci - narozdil od Barona, toho uz asi nikdo nikdy neuvidi. Sebrali ho." +
                "A spolu s nim vsechny, co byli v osade, nastesti jsem stihl zdrhnout.<br />- W<br /><br />P.s.: balicek ulozim na bezpecnem miste",
                button: 'pokračuj'
            }, {
                type: "text",
                title: "bezpečné místo",
                text: "Dobře, tak na odměnu za Barona si můžu nechat zajít chuť. Jestli ho opravdu mají agenti... Brrr. Skoro bych ho až litoval.<br />" +
                "Ale ten balíček by mohl být zajímavý způsob jak se zahojit. S W jsem se kdysi setkal, celou dobu vyprávěl o své oblíbené skále v nějakém borovém háji, že prý se tam cítí bezpečně jako nikde.<br />" +
                "Moc bych na to nevsázel, ale zkusit to můžu, ne?",
                button: "pokračuj"
            }, {
                type: "search",
                title: "bezpečné místo",
                text: "W se rád zdržoval u nějaké skály v borovém háji, snad se tam dozvím něco nového.",
                point: locations.GetPoint("velká skalka v Borovičkách"),
                precision: 20
            }, {
                type: "scanner",
                text: "Zacali tu smejdit agenti, neni tu bezpecno. Presunu balicek na puvodni misto setkani<br />-W",
                button: 'pokračuj'
            }, {
                type: "text",
                title: "místo setkání",
                text: "Jo, tak balíček tu byl. Ale už tu není. Sakra, to je jako honit se za vlastním ocasem... Místo původního setkání... co tím sakra myslí?",
                button: "pokračovat",
            }, {
                type: "hidden_search",
                title: "místo setkání",
                text: "W přenesl balíček z borového háje někam jinam. Na místo, o kterém mluví jako o &bdquo;původním místu setkání&ldquo;.<br />Musím ho někde najít...",
                point: locations.GetPoint("Borovice na zahradě"),
                precision: 3
            }, {
                type: "finish",
                title: "místo setkání",
                text: "Jasně! Tady se přece měli potkat poprvé! Někde tady ten balíček musí být!"
            }
        ]
    };
}