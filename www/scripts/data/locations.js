Require("lib/point");

function locationList() {
    return {
        GetPoint: function (name) {
            var item = this.data.find(function (element) {
                return element["text"] == name;
            });
            if (item) {
                return new Point(item["position"]["coords"]["longitude"], item["position"]["coords"]["latitude"]);
            }
        },
        data: [
            {
                "position": {
                    "coords": {
                        "latitude": 49.989591,
                        "longitude": 17.4450033,
                        "accuracy": 0,
                    },
                    "timestamp": "2017-08-26T17:12:58.826Z"
                },
                "text": "bruntál",
                "time": 1503767580
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.01745,
                        "longitude": 16.6781068,
                        "accuracy": 0,
                    },
                    "timestamp": "2017-08-26T17:12:58.826Z"
                },
                "text": "čenkovice",
                "time": 1503767580
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.12105,
                        "longitude": 15.0756788,
                        "accuracy": 0,
                    },
                    "timestamp": "2017-08-26T17:12:58.826Z"
                },
                "text": "mekáč",
                "time": 1503767580
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.041001,
                        "longitude": 14.3212227,
                        "accuracy": 7,
                        "altitude": 471,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-26T17:12:58.826Z"
                },
                "text": "doma",
                "time": 1503767580
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21349540911615,
                        "longitude": 17.536071315407753,
                        "accuracy": 7,
                        "altitude": 471,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-26T17:12:58.826Z"
                },
                "text": "Borovice na zahradě",
                "time": 1503767580
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21305041387677,
                        "longitude": 17.534981332719326,
                        "accuracy": 9,
                        "altitude": 486,
                        "heading": 96.4,
                        "speed": 0.25,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-26T20:41:47.064Z"
                },
                "text": "mostek (baterka schovaná v trubce?)",
                "time": 1503780108
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21444440819323,
                        "longitude": 17.5363158993423,
                        "accuracy": 9,
                        "altitude": 519,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 19
                    },
                    "timestamp": "2017-08-26T20:45:40.080Z"
                },
                "text": "studna (Kropkovic)",
                "time": 1503780345
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.2149501722306,
                        "longitude": 17.5354368891567,
                        "accuracy": 9,
                        "altitude": 496,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 19
                    },
                    "timestamp": "2017-08-26T20:53:43.090Z"
                },
                "text": "tři břízky",
                "time": 1503780824
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.212651351466775,
                        "longitude": 17.534512616693973,
                        "accuracy": 9,
                        "altitude": 477,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T08:49:47.904Z"
                },
                "text": "studna (naše)",
                "time": 1503823789
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21403545513749,
                        "longitude": 17.53543303348124,
                        "accuracy": 7,
                        "altitude": 498,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T08:55:17.911Z"
                },
                "text": "hrob na louce",
                "time": 1503824130
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21491387858987,
                        "longitude": 17.535181576386094,
                        "accuracy": 9,
                        "altitude": 498,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 19
                    },
                    "timestamp": "2017-08-27T09:00:41.896Z"
                },
                "text": "dědova obora - jáma (hrob?)",
                "time": 1503824461
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21641348488629,
                        "longitude": 17.535393638536334,
                        "accuracy": 9,
                        "altitude": 461,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 19
                    },
                    "timestamp": "2017-08-27T09:09:13.911Z"
                },
                "text": "zapíchnutý rýč",
                "time": 1503824960
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21681430749595,
                        "longitude": 17.535197837278247,
                        "accuracy": 9,
                        "altitude": 514,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 10
                    },
                    "timestamp": "2017-08-27T09:13:28.897Z"
                },
                "text": "jáma s hromadou u louky",
                "time": 1503825219
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21707464940846,
                        "longitude": 17.534742364659905,
                        "accuracy": 7,
                        "altitude": 509,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T09:15:38.894Z"
                },
                "text": "posed mezi loukama",
                "time": 1503825340
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21861004643142,
                        "longitude": 17.53892577253282,
                        "accuracy": 9,
                        "altitude": 496,
                        "heading": 52.4,
                        "speed": 0.27,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T09:25:53.900Z"
                },
                "text": "rozcestí nad mysliveckou chatou",
                "time": 1503825955
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21946173161268,
                        "longitude": 17.538847737014293,
                        "accuracy": 7,
                        "altitude": 483,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 19
                    },
                    "timestamp": "2017-08-27T09:30:23.912Z"
                },
                "text": "posed za rozcestím nad loveckou chatou",
                "time": 1503826224
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21983531303704,
                        "longitude": 17.53787853755057,
                        "accuracy": 9,
                        "altitude": 467,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 10
                    },
                    "timestamp": "2017-08-27T09:34:38.905Z"
                },
                "text": "vyschlý potok mezi posedy (černé hřiby tu rostly)",
                "time": 1503826493
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.22004745900631,
                        "longitude": 17.537395991384983,
                        "accuracy": 7,
                        "altitude": 463,
                        "heading": 98.5,
                        "speed": 0.2,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T09:36:31.898Z"
                },
                "text": "posed za vyschlým potokem",
                "time": 1503826592
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.22012314759195,
                        "longitude": 17.53654950298369,
                        "accuracy": 9,
                        "altitude": 464,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T09:38:05.891Z"
                },
                "text": "návrat na cestu k lovecké chatě (je tu pařez)",
                "time": 1503826696
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.22098656743765,
                        "longitude": 17.535714330151677,
                        "accuracy": 9,
                        "altitude": 470,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T09:40:38.912Z"
                },
                "text": "křižovatka před babí horou",
                "time": 1503826841
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.221444219350815,
                        "longitude": 17.535013016313314,
                        "accuracy": 7,
                        "altitude": 481,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T09:43:43.895Z"
                },
                "text": "velký rozštípnutý pařez",
                "time": 1503827025
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21873099729419,
                        "longitude": 17.536438023671508,
                        "accuracy": 9,
                        "altitude": 488,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T09:53:28.889Z"
                },
                "text": "studánka u lovecké chaty",
                "time": 1503827614
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21780228242278,
                        "longitude": 17.538323616608977,
                        "accuracy": 7,
                        "altitude": 489,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 10
                    },
                    "timestamp": "2017-08-27T09:56:55.916Z"
                },
                "text": "křižovatka u Lovecké chaty",
                "time": 1503827815
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21745476871729,
                        "longitude": 17.539128698408603,
                        "accuracy": 7,
                        "altitude": 483,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T09:58:47.890Z"
                },
                "text": "Lovecká chata",
                "time": 1503827927
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.216636611148715,
                        "longitude": 17.539072204381227,
                        "accuracy": 9,
                        "altitude": 479,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T10:02:32.899Z"
                },
                "text": "\"obětiště\" u lovecké chaty",
                "time": 1503828155
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21677172742784,
                        "longitude": 17.538192523643374,
                        "accuracy": 7,
                        "altitude": 494,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 10
                    },
                    "timestamp": "2017-08-27T10:07:30.894Z"
                },
                "text": "\"prehistorická osada\" u Lovecké chaty, ohrada, dřevené \"týpý\", kamenný oltář a kamenná ohrádka",
                "time": 1503828469
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21483073011041,
                        "longitude": 17.535707876086235,
                        "accuracy": 7,
                        "altitude": 497,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 10
                    },
                    "timestamp": "2017-08-27T10:24:54.880Z"
                },
                "text": "kamenný mužik u dědovy ohrady ",
                "time": 1503829503
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21454758942127,
                        "longitude": 17.534619150683284,
                        "accuracy": 9,
                        "altitude": 508,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T10:28:16.901Z"
                },
                "text": "oběšencův dub",
                "time": 1503829697
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.212692925706506,
                        "longitude": 17.5298142246902,
                        "accuracy": 9,
                        "altitude": 603,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 19
                    },
                    "timestamp": "2017-08-27T10:43:11.877Z"
                },
                "text": "Jedle v Borovičkách",
                "time": 1503830593
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.21288956515491,
                        "longitude": 17.52945950254798,
                        "accuracy": 9,
                        "altitude": 586,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 29
                    },
                    "timestamp": "2017-08-27T10:48:03.868Z"
                },
                "text": "velká skalka v Borovičkách",
                "time": 1503830885
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.214004861190915,
                        "longitude": 17.52915406599641,
                        "accuracy": 7,
                        "altitude": 600,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T10:54:19.897Z"
                },
                "text": "vyhlídkový kopeček nad borovičkami",
                "time": 1503831270
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.214097732678056,
                        "longitude": 17.52331933937967,
                        "accuracy": 7,
                        "altitude": 608,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 10
                    },
                    "timestamp": "2017-08-27T11:17:10.327Z"
                },
                "text": "rozcestí \"nad Artmanovem\"",
                "time": 1503832636
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.213472694158554,
                        "longitude": 17.526173377409577,
                        "accuracy": 9,
                        "altitude": 578,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 14
                    },
                    "timestamp": "2017-08-27T11:21:34.330Z"
                },
                "text": "posezení u boroviček",
                "time": 1503832894
            },
            {
                "position": {
                    "coords": {
                        "latitude": 50.213349647819996,
                        "longitude": 17.536009959876537,
                        "accuracy": 7,
                        "altitude": 497,
                        "heading": null,
                        "speed": 0,
                        "altitudeAccuracy": 29
                    },
                    "timestamp": "2017-08-27T14:29:30.283Z"
                },
                "text": "chata vchod",
                "time": 1503844171
            }
        ]
    }
}