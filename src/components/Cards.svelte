<script>
  import {cart} from '../store/cart.js'
  export let content
  // console.log(content)

   const add = () => {
     for (let item of $cart) {
       if (item.id === content.id) {
         item.quantity++
         $cart = $cart
         return
       }
     }
     content.quantity = 1
     const alreadyExist = $cart.find(product => product.id === content.id)
     if(alreadyExist){

     }
     $cart = [...$cart, content]
     console.log($cart)
   }
</script>

<div class="card_container" on:click={add(content)}>
  <img  class="card_img" src="{content.images[0].url}" alt="">
  <span>{content.title}</span>
  <span>R$ {content.productVariants[0].price}</span>
</div>
<style>
.card_container{
  display: grid;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;
  border-radius: 5px;
}
.card_img{
 height: 80px;
 margin: auto;
}
.card_info{
  display: grid;
  grid-template-columns: 1fr 50px;
  padding: 5px;
}

</style>
