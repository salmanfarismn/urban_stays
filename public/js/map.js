function initMap(lat, lng) {
    let map = L.map('map').setView([lat, lng], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>${listing.title}</b><br>${listing.location}, ${listing.country}`).openPopup();
}