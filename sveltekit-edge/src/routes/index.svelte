<script lang="ts">
	import { enhance } from '$lib/enhance';
	import type { Visit } from '$lib/types';
	import { slide } from 'svelte/transition';
	export let visited: Visit[];
	export let current_city: string;
	export let signed = false;

	const cities = visited.map((v) => v.city.split(', '));
	const countries = [...new Set(cities.map((c) => c[1]))].sort();
</script>

<h1>SvelteKit Edge Guest Book</h1>

{#if signed}
	<p>Thanks for signing the guest book!</p>
{:else}
	<p>
		We see you're from {current_city}. Would you like to sign the guest book?
	</p>
	<form
		action="/"
		method="post"
		use:enhance={{
			result: () => {
				signed = true;
			}
		}}
	>
		<button>I was here</button>
	</form>
{/if}

{#if visited.length > 0}
	<p>
		This page has been visited by guests from {visited.length} cities and {countries.length} countries.
	</p>
	<div class="grid">
		<div class="flow">
			<h2>Cities</h2>
			<ul>
				{#each visited as visit (visit.city)}
					<li in:slide>{visit.city} ({visit.count})</li>
				{/each}
			</ul>
		</div>
		<div class="flow">
			<h2>Countries</h2>
			<ul>
				{#each countries as country (country)}
					<li in:slide>{country}</li>
				{/each}
			</ul>
		</div>
	</div>
{:else}
	<p>No one has signed the guest book yet.</p>
{/if}

<style>
	.grid {
		display: grid;
		align-items: baseline;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}
</style>
