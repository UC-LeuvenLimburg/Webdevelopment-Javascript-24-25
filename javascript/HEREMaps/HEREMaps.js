// Initialize the platform object
var platform = new H.service.Platform({
    'apikey': 'lSwjTR9RzFA5C2M-gvJ099Nyq9Hejy_HFvyoR_4GDNo'
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) the map
var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
        zoom: 14,
        center: {lat: 50.92906, lng: 5.39559}
    });

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);

// Create the default UI:
const ui = H.ui.UI.createDefault(map, maptypes);

// Create a marker icon from an image URL:
var icon = new H.map.Icon('Logo_klein.png', {anchor: {x:20, y:20}});

// Create a marker using the previously instantiated icon:
var marker = new H.map.Marker({lat: 50.92906, lng: 5.39559}, { icon: icon });

// Add the marker to the map:
map.addObject(marker);

// Add event listeners:
marker.addEventListener('tap', function(evt) {
    // Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type);

    // Create an info bubble at the Spire of Dublin location with the HTML content
    const infoBubble = new H.ui.InfoBubble({lat: 50.92906, lng: 5.39559}, {
        content: '<div>' +
        '<h3>UCLL - Campus Diepenbeek</h3>' +
        '<p>Agoralaan 1, 3590 Diepenbeek</p>' +
        '</div>'
    });

    // Add the info bubble to the UI
    ui.addBubble(infoBubble);
});

