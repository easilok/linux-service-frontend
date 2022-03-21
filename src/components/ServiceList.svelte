<script lang="ts">

  import { onMount } from 'svelte';

  import ServiceItem from './ServiceItem.svelte';

  import type { SystemdUnitList, SystemdUnitResponse, SystemdEventDetails } from '../types/index';

  let serviceList:SystemdUnitList[] = [];
  
  let filteredServiceList:SystemdUnitList[] = [];
  let filterUnit: string = "";

  /* let API_URL = 'http://localhost:3000/' */
  let API_URL = ''
  // eslint-disable-next-line
  /* const API_URL = process.env.API_URL || ''; */
  /* console.log(__myapp.env); */

  onMount(() => {
    fetch(API_URL + 'api/systemd/units')
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

  function restartServiceHandler(event:CustomEvent<SystemdEventDetails>): void {
    console.log(event);
    if (event.detail.name) {
      fetch(API_URL + 'api/systemd/unit/restart', {
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

  function stopServiceHandler(event:CustomEvent<SystemdEventDetails>): void {
    console.log(event);
    if (event.detail.name) {
      fetch(API_URL + 'api/systemd/unit/stop', {
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

  function startServiceHandler(event:CustomEvent<SystemdEventDetails>): void {
    console.log(event);
    if (event.detail.name) {
      fetch(API_URL + 'api/systemd/unit/start', {
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

<section class="service-list my-4">
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

<style>
.service-list {
  display: grid;
  width: 100%;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(150px, 300px));
}
</style>
