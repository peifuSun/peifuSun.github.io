// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9zaGtpc2g1NSIsImEiOiJjbGVmZWcxbDEwcTN0M3BtanV2azhidXM5In0.wdLabVSNkLk-ImY41CuNeQ";
const map = new mapboxgl.Map({
  container: "map",
  // Replace YOUR_STYLE_URL with your style URL.
  style: "mapbox://styles/joshkish55/clefk81wg001001msb5os95x9"
});

map.on("mousemove", (event) => {
  const dataBox = document.getElementById("pd");
  
  const types = map.queryRenderedFeatures(event.point, {
    layers: ["cancer-rates-8esmzy"]
  });
  if(types.length>0){
     dataBox.innerHTML = `<div><h3>All Cancers: ${Math.round(types[0].properties.All_Cancer)}</h3>
   
    <h3>Breast Cancers: ${Math.round(types[0].properties.Breast_Can)}</h3>
    <h3>Colorectal Cancers: ${Math.round(types[0].properties.Colorectal)}</h3>
    <h3>Lung Cancers: ${Math.round(types[0].properties.Lung_Bronc)}</h3>
    <h3>Prostate Cancers: ${Math.round(types[0].properties.Prostate_C)}</h3>
    </div>`;
  dataBox.style.display ="initial";
  }else{
    dataBox.style.display ="none";
  }
 
});

map.on("load", () => {
  const layers = [
    "0-10",
    "10-20 ",
    "20-30 ",
    "30-40 ",
    "40-50 ",
    "50-60 ",
    "60-70 ",
    "70-80 ",
    "80-90 ",
    "90-100"
  ];
  const colors = [
    "#f7fcfd",
    "#e5f5f9",
    "#ccece6",
    "#99d8c9",
    "#66c2a4",
    "#41ae76",
    "#238b45",
    "#006d2c",
    "#00441b",
    "#00441f"
  ];
  // create legend
  const legend = document.getElementById("legend");
  layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement("div");
    const key = document.createElement("span");
    key.className = "legend-key";
    key.style.backgroundColor = color;
    const value = document.createElement("span");
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  });
});
const geocoder = new MapboxGeocoder({
 // Initialize the geocoder
 accessToken: mapboxgl.accessToken, // Set the access token
 mapboxgl: mapboxgl, // Set the mapbox-gl instance
 marker: false, // Do not use the default marker style
 placeholder: "Search for places in Illinois", // Placeholder text for the search bar
 proximity: {
 longitude: 87.827153,
 latitude: 42.368936
 } 
});
map.addControl(geocoder, "top-right");
map.addControl(new mapboxgl.NavigationControl(), "top-right");
map.addControl(
 new mapboxgl.GeolocateControl({
 positionOptions: {
 enableHighAccuracy: true
 },
 trackUserLocation: true,
 showUserHeading: true
 }),
 "top-right"
);
 map.addSource("hover", {
 type: "geojson",
 data: { type: "FeatureCollection", features: [] }
 });

 map.addSource("hover", {
 type: "geojson",
 data: { type: "FeatureCollection", features: [] }
 });
 map.addLayer({
 id: "dz-hover",
 type: "line",
 source: "hover",
 layout: {},
 paint: {
 "line-color": "black",
 "line-width": 4
}
});