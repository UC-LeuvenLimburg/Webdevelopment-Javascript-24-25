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
        padding: { top: 50, left: 50, bottom: 50, right: 50 }
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

// for (campus of ucllCampi) {
//     getLocationData(campus)
//         .then((campuswithLocation) => {
//             var marker = new H.map.Marker(campuswithLocation.position, { icon: icon, data: campuswithLocation.naam });
            
//             marker.addEventListener('tap', function (evt) {
                
//                 // Create an info bubble at the Spire of Dublin location with the HTML content
//                 const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {content:evt.target.getData()});
                
//                 // Add the info bubble to the UI
//                 ui.addBubble(infoBubble);
//             });
                
//             group.addObject(marker);

//             // Zoom the map to fit the rectangle:
//             map.getViewModel().setLookAtData({ bounds: group.getBoundingBox() });
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// }

//for (campus of ucllCampi) {
    getLocationsData(ucllCampi)
        .then((campussenwithLocation) => {
            for (campus of campussenwithLocation) {
                var marker = new H.map.Marker(campus.position, { icon: icon, data: campus.naam });
            
                marker.addEventListener('tap', function (evt) {
                
                    // Create an info bubble at the Spire of Dublin location with the HTML content
                    const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {content:evt.target.getData()});
                
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