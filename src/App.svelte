<script>
	import Header from './components/Header.svelte'
	import Footer from './components/Footer.svelte'
	import Carousel from './components/Carousel.svelte'
	import ProductList from './components/ProductList.svelte'
 	let address
	const options = [Carousel, ProductList]
	let viewComponent = options[0]

	const changeAddress = (event) => {
		viewComponent = options[1]
		console.log(address)
	}
</script>

<main>
	<Header on:change={changeAddress}/>
	<svelte:component this={viewComponent}/>
	<!-- {#if address}
		<ProductList />
	{:else}
		<Carousel />
	{/if} -->
	<Footer />
</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
