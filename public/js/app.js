console.log("Client side javascript file is loaded");

// fetch('http://localhost:3000/weather?address=Lahore').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.temperature)
//             console.log(data.rain)
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const weatherLocation = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = "Weather Forcast"


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const endpoint = 'http://localhost:3000/weather?address=' + weatherLocation.value;

        console.log(endpoint);
        fetch(endpoint).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageTwo.textContent = "It is "+data.temperature+data.unit+" in "+data.location+" and there are "+data.rain+"% chances of rain"
                    console.log(data.location)
                    console.log(data.temperature)
                    console.log(data.rain)
                }
            })
        })
   
})