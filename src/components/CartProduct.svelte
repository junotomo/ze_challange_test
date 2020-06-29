<script>
  import {cart} from '../store/cart.js'

  export let product
  let disabled = false

  const add = () => {
    product.quantity++
    $cart = $cart
    if (product.quantity === 0) disabled = false
  }

  const subtract = () => {
    product.quantity--
    $cart = $cart
    if (product.quantity < 1) remove()
  }

  const remove = () => {
    $cart = $cart.filter( item => product.id !== item.id)
  }
</script>
<div class="product">
  <div class="product_img_container">
    <img class="product_img" src="{product.images[0].url}" alt="">
  </div>
  <div class="product_info_container">
    <div class="product_header">
      <span>{product.title}</span>
      <button  class="product_remove" on:click={remove}></button>
    </div>
    <span class="product_price">R${product.productVariants[0].price}</span>
    <div class="product_counter">
     <button class="product_counter_btn" on:click={add}>+</button>
        <span>{product.quantity}</span>
      <button class="product_counter_btn" on:click={subtract} {disabled}>-</button>
    </div>
  </div>
</div>
<style>
.product{
  display: grid;
  grid-template-columns: 80px 1fr;
  background-color: #fafafa;
  padding: 1em;
}
.product_img{
  height: 80px;
}
.product_header{
  display: grid;
  grid-template-columns: 200px 50px;
  text-align: left;
  font-size: 13px;
}
.product_price{
  font-size: 14px;
  font-weight: bold;
  display: flex;
  margin: 5px;
}
.product_counter{
  background: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  padding: 5px;
  border-radius: 5px;

}
.product_counter_btn{
  font-size: 1.5em;
  color: #6c6c79;
}
button{
  border: none;
  background: none;
}

button:focus{
  border: none;
  background: none;
  outline: none;
}

.product_remove{
  background: url(/assets/remove.svg) no-repeat;
  background-position: center;
  border: none;
  height: 35px;
background-size: 30px;
}
</style>
