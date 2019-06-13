console.log("client side javascript is run");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')


const fetchWeather = (address) => {
  fetch("/weather?address="+address).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error
        // console.log(data.error);
      } else {
        messageOne.textContent =data.location
        messageTwo.textContent =data.forecast
        // console.log(data.location, data.forecast);
      }
      // console.log(data)
    });
  }
  )};



weatherform.addEventListener("submit", e => {
  e.preventDefault();
  messageOne.textContent= 'Loading...'
  messageTwo.textContent=''
  const location = search.value;
  fetchWeather(location)
  console.log(location);
});
