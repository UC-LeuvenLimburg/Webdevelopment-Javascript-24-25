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

var markerPosities = [
    { title: "UCLL - Campus Diepenbeek", position: { lat: 50.92906, lng: 5.39559 } },
    { title: "UCLL - Campus Proximus", position: { lat: 50.84625, lng: 4.72748 } }];

for (markerPositie of markerPosities) {
    // Create a marker using the previously instantiated icon:
    var marker = new H.map.Marker(markerPositie.position, { icon: icon, data: markerPositie.title});
    //marker.setData(markerPositie.title);

    // Add event listeners:
    marker.addEventListener('tap', function (evt) {
        // Log 'tap' and 'mouse' events:
        console.log(evt.type, evt.currentPointer.type);
        console.log(markerPositie.position, markerPositie.title);
        console.log(evt.target.getGeometry());
        console.log(evt.target.getData());

        // Create an info bubble at the Spire of Dublin location with the HTML content
        const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {content:evt.target.getData()});

        // Add the info bubble to the UI
        ui.addBubble(infoBubble);
    });

    // Add the marker to the group (which causes 
    // it to be displayed on the map)
    group.addObject(marker);
}

// Zoom the map to fit the rectangle:
map.getViewModel().setLookAtData({ bounds: group.getBoundingBox() });




