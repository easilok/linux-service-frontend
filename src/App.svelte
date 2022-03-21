<script lang="ts">
  import ServiceList from './components/ServiceList.svelte';

  import './app.css';

</script>

<main>
	<h1>List of current services</h1>
	<ServiceList />
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2.5em;
		font-weight: 300;
	}

</style>

