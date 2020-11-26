const searchInput = document.querySelector('#searchInput')
const searchIpAddress = document.getElementById('search-ip')
const locationDetails =  document.querySelector('#location');
const ipAddress =  document.getElementById('ip')
const timezone = document.getElementById('time')
const isp = document.getElementById('isp')
const errorMessage = document.querySelector('.error-message')
mapboxgl.accessToken ='pk.eyJ1IjoiaGFmaXphIiwiYSI6ImNraHluYjR2dzAyaWkyc3FremhmdTllaWcifQ.itynqPiSI6o64x9K0oCMxg';

let displayMap=(lng,lat)=>{
    console.log("called")
    let mapItem = new mapboxgl.Map({
        container: 'mapItem', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [lng,lat], // starting position [72.5714,23.0225]
        zoom: 10 // starting zoom
       });
    let marker = new mapboxgl.Marker()
       .setLngLat([lng,lat])
       .addTo(mapItem);
}


   //Fetching IP address
   function findAddress(){
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_lNRHxoKFiAub0vZ3bCg4shBxoX6XE&ipAddress =${searchInput.value},
            https://geo.ipify.org/api/v1?apiKey=at_lNRHxoKFiAub0vZ3bCg4shBxoX6XE&domain=${searchInput.value}`)
    .then((res)=> res.json())
    .then((data)=> {                
       if(data.code == 422 || data.code == 400){
           errorMessage.textContent = data.messages
       }else{
            errorMessage.textContent=''    
            locationDetails.innerHTML=`${data.location.city},${data.location.country}, ${data.location.postalCode}`
            ipAddress.innerHTML = data.ip
            timezone.innerHTML = `UTC ${data.location.timezone}`   
            isp.innerHTML = data.isp;
            displayMap(data.location.lng,data.location.lat);                
       }
        searchInput.value = ''
    }) 
}
   //Event Listeners
   searchInput.addEventListener('search',searchIP)

   function searchIP(e){
       if(searchInput.value==''){
           errorMessage.textContent='*error'
       }
       else{
           errorMessage.textContent=''
           findAddress()
       }
       e.preventDefault()
   }
   findAddress()



















// //MAP INIT
// let displayMap = (lat,lng) =>{       
//     let container = L.DomUtil.get('mapItem', {
//         zoomControl: false,
//         zoom : 30
//     })
//     if (container != null) {
//         container._leaflet_id = null;
//     }
//     let mymap = L.map('mapItem').setView([lat,lng], 16);
//     mymap.zoomControl.setPosition('bottomright');
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
//     }).addTo(mymap);
    
//     let myIcon = L.icon({
//         iconUrl: './images/icon-location.svg',
//         iconAnchor: [lat, lng]
//     });
//     let marker = L.marker([lat, lng], { icon: myIcon }).addTo(mymap);
// }

// //FETCHING THE IP, DOMAIN OR EMAIL ADDRESS
// function findAddress(){
//     fetch(`https://geo.ipify.org/api/v1?apiKey=at_lNRHxoKFiAub0vZ3bCg4shBxoX6XE&ipAddress =${searchInput.value},
//             https://geo.ipify.org/api/v1?apiKey=at_lNRHxoKFiAub0vZ3bCg4shBxoX6XE&domain=${searchInput.value}`)
//     .then((res)=> res.json())
//     .then((data)=> {                
//        if(data.code == 422 || data.code == 400){
//            //errorMessage.textContent = data.messages
//        }else{
//             console.log(data)      
//             errorMessage.textContent= ' '    
//             locationDetails.innerText= `${data.location.city},  ${data.location.country}, ${data.location.postalCode}`
//             ipAddress.innerText = data.ip
//             timezone.innerText = `UTC ${data.location.timezone}`   
//             isp.innerText = data.isp;
//             displayMap(data.location.lat, data.location.lng);                
//        }
//         searchInput.value = ''
//     }) 
// }

// // EVENT LISTENERS
// searchInput.addEventListener('search', searchIp);
// searchIpAddress.addEventListener('click', searchIp);

// function searchIp(e){        
//     if(searchInput.value == ''){
//         errorMessage.textContent = '*error'      
//     }else{
//         errorMessage.textContent = ''  
//         findAddress()              
//     }           
//     e.preventDefault()
// }  
// findAddress()   








