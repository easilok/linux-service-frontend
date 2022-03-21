<script lang="ts">

export let alternate = false;
export let className = "";

</script>

<style>

.card {
/* height: 72.4999990240649px; */
/* width: 208.6666689440314px; */
  border-radius: 10px;
  background-color: var(--card-color);
  color: #ffffff;
  padding: .5rem;
}

.card.alt {
  background-color: var(--body-color);
}
</style>

<div class="card {className}" class:alt={alternate}>
  <slot />
</div>
