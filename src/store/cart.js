import {writable, get} from 'svelte/store';

export let cart = writable([]);
export let showCart = writable();
