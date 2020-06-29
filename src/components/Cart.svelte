<script>
  import Product from './CartProduct.svelte'
  import {cart} from '../store/cart.js'
  import { createEventDispatcher } from 'svelte'

  let cartItens = 0
  let sum = 0
  const dispatch = createEventDispatcher()
  $: {
    let counter = 0
    let temp = 0
    for (let item of $cart) {
      counter += item.quantity
      console.log(sum)
      temp += item.productVariants[0].price * item.quantity
    }
    cartItens = counter
    sum = temp
  }

  const close = () =>{
    dispatch('close')
  }
</script>

<div class="cart_container">
  <div class="cart_title">
    <span>Sacola</span>
    <button  class="cart_close_btn" on:click={close}>x</button>
  </div>
  {#if $cart}
    {#each $cart as product}
      <Product {product} />
    {/each}
  {/if}
  <div class="cart_sum">
    <div class="cart_product">
    <span style="text-align:left">Produtos:</span>
    <span style="text-align:right">{cartItens}</span>
    </div>
    <div class="cart_product">
      <span style="text-align:left">Total: </span>
      <span style="text-align:right">R$: {sum.toFixed(2)}</span>
    </div>
  </div>
</div>

<style>
.cart_container{
  position: fixed;
  height: 100%;
  top: 0px;
  background-color: #fafafa;
}
.cart_title{
  background: white;
  display: grid;
  grid-template-columns: 1fr 40px;
  padding: 10px 1em;
  font-size: 1.5em;
}
.cart_close_btn{
  background: url(/assets/close.png) no-repeat;
  background-position: center;
  border: none;
  height: 35px;
  background-size: 20px;
}
.cart_product{
  background: white;
  border-radius: 5px;
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.cart_sum{
  display: grid;
  padding: 1em;
  border-radius: 5px;
}
</style>
