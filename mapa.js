/* eslint-disable new-cap */
/* eslint-disable no-undef */
const map = L.map('korona_time_map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#a65628'];

const stopsGrp = new L.featureGroup();
Object.keys(coronaData).forEach((patient) => {
  const patCol = colors[Object.keys(coronaData).indexOf(patient)];
  const lineCoords = [];
  coronaData[patient].forEach((stop) => {
    const coos = [
      parseFloat(stop[4]) + Math.random() / 10,
      parseFloat(stop[3]) + Math.random() / 10,
    ];
    lineCoords.push(coos);
    const mrk = L.circleMarker(coos, {
      radius: 9,
      weight: 2,
      color: patCol,
      fillColor: patCol,
      fillOpacity: 0.3,
    });
    mrk.bindPopup(`<b>${patient}</b><br>${stop[0]}, ${stop[1].replace('2020', '')}<br>${stop[2]}`);
    mrk.on('mouseover', function(e) {
      this.openPopup();
    });
    mrk.on('mouseout', function(e) {
      this.closePopup();
    });
    mrk.addTo(stopsGrp);
  });
  L.polyline(lineCoords, { // spojnice
    weight: 3,
    color: patCol,
  }).addTo(stopsGrp);
});

stopsGrp.addTo(map);
map.fitBounds(stopsGrp.getBounds());
