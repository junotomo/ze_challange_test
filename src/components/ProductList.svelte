<script>
   import { onMount } from 'svelte'
   import { fade } from 'svelte/transition'
   import Cards from './Cards.svelte'
   import Cart from './Cart.svelte'
   import {defaultList, categoryList} from '../store/schema.js'
   import {showCart} from '../store/cart.js'
   let categories = []
   let products = []
   $showCart = false

   onMount(async () => {
     /* request para pegar todos os produtos*/
     fetch('https://api.code-challenge.ze.delivery/public/graphql',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Accept': 'application/json'},
        body: JSON.stringify({
         query: defaultList,
         variables: {
           "id": "532",
           "search": "",
           "categoryId": null,
         }
       })
     })
     .then( resp => resp.json())
     .then(data => products = data.data.poc.products)
     /* request para pegar todos as categorias*/
     fetch('https://api.code-challenge.ze.delivery/public/graphql',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Accept': 'application/json'},
        body: JSON.stringify({
         query: categoryList
       })
     })
     .then( resp => resp.json())
     .then(data => categories = data.data.allCategory)
   })
   /* pegar produtos da categoria selecionada*/
   const selectCategory = (category) => {
     fetch('https://api.code-challenge.ze.delivery/public/graphql',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Accept': 'application/json'},
        body: JSON.stringify({
         query: defaultList,
         variables: {
           "id": "532",
           "search": "",
           "categoryId": String(category),
         }
       })
     })
     .then( resp => resp.json())
     .then(data =>{console.log(data.data.poc.products)
       products = data.data.poc.products
     })
   }

   const closeCart = () => {
     $showCart = false
   }
</script>
  <div class="product_container">
    <header class="category_container">
    {#each categories as {title, id}}
      <button class="category_btn" on:click={selectCategory(id)}>{title}</button>
    {/each}
    </header>
    <section class="card_section">
    {#each products as product}
      <Cards content={product}/>
    {/each}
    </section>
  </div>
  {#if $showCart}
  <div transition:fade >
    <Cart  on:close={closeCart}/>
  </div>
  {/if}



<style>
.card_section{
  max-width: 1200px;
  display: grid;
  margin: auto;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1em;
}
.product_container{
  max-width: 1200px;
  margin: auto;
}
.category_container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 1em;
  margin: 1em auto;
}
.category_btn{
  padding: 1em;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;
  border-radius: 5px;
  outline: none;
  border: none;
}
</style>
