function showLocationMap(id, lat, lon) {

    let coords = [Number(lat), Number(lon)]

    let map =
        L.map(id, {
            zoomControl: true,
            attributionControl: false,
            boxZoom: false,
            doubleClickZoom: false,
            dragging: false,
            keyboard: false,
            //scrollWheelZoom: 'center',
            scrollWheelZoom: false,
            touchZoom: 'center',
            minZoom: 7,
            zoom: 18,
            center: coords
            //center: [<%=addressMetadata.LATITUDE %>, <%=addressMetadata.LONGITUDE %>]
        })

    L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg').addTo(map)

    L.marker(coords, {
        icon: L.icon({
            iconUrl: 'images/marker-icon-red.png', //https://github.com/pointhi/leaflet-color-markers
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })

    }).addTo(map);
}
