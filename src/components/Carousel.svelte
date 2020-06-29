<script>
  import Carousel from '@beyonk/svelte-carousel'
  import { onDestroy } from 'svelte';

</script>
<Carousel class="home_carousel" perPage={1} autoplay={2500} duration={700}>
  <div class="slide-content slide">
    <img class="slide_image" src="./assets/alone.jpg" alt="">
    <span class="slide_subtitle">Para chamar em casa</span>
  </div>
  <div class="slide-content slide">
    <img class="slide_image"src="./assets/movie-night.jpg" alt="">
    <span class="slide_subtitle">Na maratona comos amigos</span>
  </div>
  <div class="slide-content slide">
    <img class="slide_image" src="./assets/wine.jpg" alt="">
    <span class="slide_subtitle">Em momento de celebrações </span>
  </div>
  <div class="slide-content slide_logo">
    <img class="slide_image" src="./assets/logo.png" alt="">
    <span class="slide_subtitle">Para facilitar você a curtir seus momentos</span>
  </div>
</Carousel>

<style>
  .home_carousel{
    background-color: #333;
  }
  .slide_image{
    height: 600px;
    padding: 40px;
  }
  .slide{
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: hsla(0, 0%, 20%, 0.8);
  }
  .slide_logo{
    background: #333;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .slide_subtitle{
    font-size: 4em;
    color: white;
    margin: auto;
  }
</style>
