// Initialize the platform object
var platform = new H.service.Platform({
    'apikey': ''
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) the map
var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
        zoom: 14,
        center: { lat: 50.92906, lng: 5.39559 },
        padding: { top: 50, left: 220, bottom: 50, right: 50 }
    });

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);

// Create the default UI:
const ui = H.ui.UI.createDefault(map, maptypes);

// Create a marker icon from an image URL:
var icon = new H.map.Icon('Logo_klein.png', { anchor: { x: 20, y: 20 } });

// Create a group that can hold map objects:
group = new H.map.Group();

// Add the group to the map object (created earlier):
map.addObject(group);

var campussenmetLocatie = [];
var campussenMetAfstand = [];

//for (campus of ucllCampi) {
    getLocationsData(ucllCampi)
        .then((campussenwithLocation) => {
            for (campus of campussenwithLocation) {
                campussenmetLocatie.push(campus);
                var marker = new H.map.Marker(campus.position, { icon: icon, data: campus.naam });
            
                marker.addEventListener('tap', function (evt) {
                    let campusTappedName = evt.target.getData();
                    let infoBubble = new H.ui.InfoBubble(evt.target.getGeometry());
                    if (campussenMetAfstand.length > 0) {
                        console.log(campusTappedName);
                        let campusTapped = campussenMetAfstand.find((element) => element.naam == campusTappedName);
                        console.log(campusTapped);
                        infoBubble.setContent(campusTappedName + "<br>Afstand: " + Math.round(campusTapped.distance/100)/10 + " km<br>Reistijd: " + Math.round(campusTapped.duration/60) + " min");
                    } else {
                    // Create an info bubble at the Spire of Dublin location with the HTML content
                     infoBubble.setContent(campusTappedName);
                    }
                    // Add the info bubble to the UI
                    ui.addBubble(infoBubble);
                });
                
                group.addObject(marker);
            }
            // Zoom the map to fit the rectangle:
            map.getViewModel().setLookAtData({ bounds: group.getBoundingBox() });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
//}

document.getElementById('showPosition').onclick = function () {
    let input = document.getElementById('startPoint').value;
    if (input != "") {
        let vertrek = {adres: input};
        getLocationData(vertrek)
            .then((locatie) => {
                console.log(locatie);
                var marker = new H.map.Marker(locatie.position);              
                group.addObject(marker);
                // Zoom the map to fit the rectangle:
                map.getViewModel().setLookAtData({ bounds: group.getBoundingBox() });
            
                if (campussenmetLocatie.length > 0) {
                    getDistances(locatie, campussenmetLocatie)
                    .then((campussenwithDistance) => {
                        console.log(campussenwithDistance);
                        for(campus of campussenwithDistance) {
                            campussenMetAfstand.push(campus);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }

            })
            .catch((error) => {
                 console.error('Error:', error);
            });
    } else {
        alert("Vul een adres in.");
    }
}

function getLocationData(campus) {
    return new Promise((resolve, reject) => {
        const url = "https://geocode.search.hereapi.com/v1/geocode?q=" + campus.adres + "&apiKey=";
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    reject("HTTP error: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                if (data.items.length > 0 && data.items[0].position) {
                    campus.position = data.items[0].position;
                    console.log(campus);
                    resolve(campus);
                } else  {
                    reject("No location data found");
                }
            })
            .catch((error) => {
                reject("Fetch error:" + error);
            });
    
    });
}

// async function getLocationData(campus) {
//     const url = "https://geocode.search.hereapi.com/v1/geocode?q=" + campus.adres + "&apiKey=";
//     try {
//         response = await fetch(url);
//         if (!response.ok) {
//             Throw.error("HTTP error: " + response.statusText);
//         }
//         data = await response.json();
//         if (data.items.length > 0 && data.items[0].position) {
//             campus.position = data.items[0].position;
//             console.log(campus);
//             return campus;
//         } else  {
//             Throw.error("No location data found");
//         }
//     } catch (error) {
//         Throw.error("Fetch error:" + error);
//     }
// }

// function getLocationsData(campussen) {
//     return Promise.all(campussen.map(campus => getLocationData(campus)));
// }

// function getLocationsData(campussen) {
//     return new Promise((resolve, reject) => {
//         const promises = campussen.map(campus => getLocationData(campus));
//         Promise.all(promises)
//             .then(results => resolve(results))
//             .catch(error => reject(error));
//     });
// }

function getLocationsData(campussen) {
    return new Promise((resolve, reject) => {
        let campussenMetLocation = [];
        for (let campus of campussen) {
            getLocationData(campus)
                .then((campuswithLocation) => {
                    campussenMetLocation.push(campuswithLocation);
                    if (campussenMetLocation.length === campussen.length) {
                        resolve(campussenMetLocation);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    });
}

function getDistance(vertrek, aankomst){
    return new Promise((resolve, reject) => {
        const url = "https://router.hereapi.com/v8/routes?transportMode=car&origin="+ vertrek.position.lat + "," + vertrek.position.lng + "&destination="+ aankomst.position.lat + "," + aankomst.position.lng + "&return=summary&apiKey="

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    reject("HTTP error: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                if (data.routes.length > 0 && data.routes[0].sections.length > 0 && data.routes[0].sections[0].summary) {
                    aankomst.duration = data.routes[0].sections[0].summary.duration;
                    aankomst.distance = data.routes[0].sections[0].summary.length;
                    resolve(aankomst);
                } else  {
                    reject("No route data found");
                }
            })
            .catch((error) => {
                reject("Fetch error:" + error);
            });
    });
}

function getDistances(vertrek, campussen){
    return new Promise((resolve, reject) => {
        let campussenMetDistance = [];
        for (let campus of campussen) {
            getDistance(vertrek, campus)
                 .then((campuswithDistance) => {
                     campussenMetDistance.push(campuswithDistance);
                     if (campussenMetDistance.length === campussen.length) {
                         resolve(campussenMetDistance);
                     }
                 })
                 .catch((error) => {
                     console.error('Error:', error);
                 });
        }
    });
}

// function getDistances(vertrek, campussen) {
//     return Promise.all(campussen.map(campus => getDistance(vertrek, campus)));
// }




// Om getDistance te testen:
// var markerPosities = [	
//     {title: "UCLL - Campus Diepenbeek" ,  position: {lat: 50.92906, lng: 5.39559}},
//     {title: "UCLL - Campus Proximus" , 	position: {lat: 50.84625, lng: 4.72748}}];

//         getDistance(markerPosities[0], markerPosities[1])
//         .then((aankomst) => {
//             console.log(aankomst);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });