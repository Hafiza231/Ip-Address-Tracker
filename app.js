const searchInput = document.getElementById('searchInput');
const searchIpAddress = document.getElementById('search-ip')
const locationDetails = document.querySelector('#location');
const ipAddress = document.getElementById('ip')
const timezone = document.getElementById('time')
const isp = document.getElementById('isp')
const errorMessage = document.querySelector('.error-message')
const form = document.querySelector('#form');
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFmaXphIiwiYSI6ImNraHluYjR2dzAyaWkyc3FremhmdTllaWcifQ.itynqPiSI6o64x9K0oCMxg';

let displayMap = (lng, lat) => {
    console.log("called")
    let mapItem = new mapboxgl.Map({
        container: 'mapItem', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [lng, lat], // starting position [72.5714,23.0225]
        zoom: 10 // starting zoom
    });
    let marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapItem);
}


//Fetching IP address
function findAddress() {
    console.log(searchInput.value);
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_lNRHxoKFiAub0vZ3bCg4shBxoX6XE&ipAddress =${searchInput.value},
            https://geo.ipify.org/api/v1?apiKey=at_lNRHxoKFiAub0vZ3bCg4shBxoX6XE&domain=${searchInput.value}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.code == 422 || data.code == 400) {
                errorMessage.textContent = data.messages
            } else {
                console.log(data);
                console.log(searchInput.value)
                errorMessage.textContent = ''
                locationDetails.innerHTML = `${data.location.city},${data.location.country}, ${data.location.postalCode}`
                ipAddress.innerHTML = data.ip
                timezone.innerHTML = `UTC ${data.location.timezone}`
                isp.innerHTML = data.isp;
                displayMap(data.location.lng, data.location.lat);
            }
            searchInput.value = ''
        })
}
//Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchIP();
})

function searchIP() {
    if (searchInput.value == '') {
        console.log(searchInput)
        errorMessage.textContent = '*error'
    }
    else {
        findAddress()
        errorMessage.textContent = ''
    }
}
findAddress()
