<script lang="ts">

  import { onMount } from 'svelte';

  import ServiceItem from './ServiceItem.svelte';

  import type {SystemdUnitList, SystemdUnitResponse} from '../types/index';

  let serviceList:SystemdUnitList[] = [];
  
  let filteredServiceList:SystemdUnitList[] = [];
  let filterUnit: string = "";

  onMount(() => {
    fetch('http://localhost:3000/api/systemd/units')
    .then(response => response.json())
    .then((list: SystemdUnitResponse) => {
      if (list.units) {
        serviceList = [...list.units];
      }
    })
    .catch(err => console.log(err))

  });

  $: if (filterUnit.length > 2)  {
   filteredServiceList = serviceList.filter(unit => unit.unit.includes(filterUnit));
  } else {
    filteredServiceList = serviceList;
  }

  function restartServiceHandler(event): void {
    console.log(event);
    if (event.detail.name) {
      fetch('http://localhost:3000/api/systemd/unit/restart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unit: event.detail.name
        })
      }) 
      .then(response => response.json())
      .then((resData) => {
        console.log(resData);
        location.reload();
      })
      .catch(err => console.log(err))
      }
  }

  function stopServiceHandler(event): void {
    console.log(event);
    if (event.detail.name) {
      fetch('http://localhost:3000/api/systemd/unit/stop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unit: event.detail.name
        })
      }) 
      .then(response => response.json())
      .then((resData) => {
        console.log(resData);
        location.reload();
      })
      .catch(err => console.log(err))
      }
  }

  function startServiceHandler(event): void {
    console.log(event);
    if (event.detail.name) {
      fetch('http://localhost:3000/api/systemd/unit/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unit: event.detail.name
        })
      }) 
      .then(response => response.json())
      .then((resData) => {
        console.log(resData);
        location.reload();
      })
      .catch(err => console.log(err))
      }
  }

</script>

<div>
  <input type="text" bind:value={filterUnit} />
</div>

<section class="flex flex-wrap my-4">
  {#each filteredServiceList as service}
    <ServiceItem
      name={service.unit}
      state={service.state}
      active={service.active}
      description={service.description}
      on:restart={restartServiceHandler}
      on:start={startServiceHandler}
      on:stop={stopServiceHandler}
    />
  {/each}
</section>
