<script>
   import { onMount } from 'svelte'
   import { createEventDispatcher } from 'svelte'
   import {location} from '../store/schema.js'
   import {cart, showCart} from '../store/cart.js'
   
   let api = 'AIzaSyB__cGgalczo3__i6oJJOHyawKHpGw_Y4Y'
   let locatorSection
   let input
   let autocomplete

   const dispatch = createEventDispatcher()

   onMount(async () => {
     locatorSection = document.getElementById("locator-input-section")
     input = document.getElementById("autocomplete")
     autocomplete = new google.maps.places.Autocomplete(input)
   })

  const getUserAddress = (lat, long) => {
    const timeStamp = new Date().toISOString()
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${api}`,
      {method: 'GET'}
    )
    .then( resp => resp.json())
    .then(data =>{
      console.log(data.results[0].formatted_address)
      input.value = data.results[0].formatted_address
      dispatch('change', input.value)
    })
    fetch('https://api.code-challenge.ze.delivery/public/graphql',{
       method: 'POST',
       headers: { 'Content-Type': 'application/json' , 'Accept': 'application/json'},
       body: JSON.stringify({
        query: location,
        variables: {
          "algorithm": "NEAREST",
          "lat":String(lat),
          "long": String(long),
          "now": String(timeStamp)
        },
        })
    })
    .then( resp => resp.json())
    .then(data =>console.log(data))
  }

  const locatorButtonPressed = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      getUserAddress(position.coords.latitude, position.coords.longitude)
    },
    function (error) {
      alert("O locator foi recusado adicionar endereço manualmente.")
    })
   }

const open = () => {
  $showCart = true
}
</script>
<header class="header">
  <div class="header_container" id="locator-input-section">
    <img  class="header_logo" src="./assets/small-logo.png" alt="">
    <button  class="addres_btn" on:click={locatorButtonPressed}></button>
    <input class="address_input" type="text" placeholder="Adicione o endereço" id="autocomplete" />
  </div>
  {#if $cart.length > 0}
    <button class="cart_icon" on:click={open}></button>
  {/if}
</header>

<style>
  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #333;
    padding: 1em;
  }
  .header_container{
    margin: auto;
    display: grid;
    grid-template-columns: 60px 45px 1fr;
  }
  .header_logo{
    height: 48px;
    width: 48px;
  }
  .address_input{
    min-width: 450px;
    border-radius: 0px 5px 5px 0px;
    border: none;
  }
  .addres_btn{
    background: url(/assets/ico_location.svg) no-repeat;
    background-position: center;
    background-color: white;
    border: none;
    border-radius: 5px 0px 0px 5px;
  }
  input:focus{
    outline: none;
  }
  button:focus{
    outline: none;
  }

  .cart_icon{
    background: url(/assets/add_cart.svg) no-repeat;
    background-position: center;
    border: none;
    outline:none;
    background-color: white;
    height: 50px;
    width: 50px;
    border-radius: 50px;
  }
</style>
