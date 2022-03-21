<script lang="ts">

import { createEventDispatcher } from 'svelte';

import { PauseCircleIcon, PlayCircleIcon, RefreshCwIcon } from 'svelte-feather-icons';
import Card from './UI/Card.svelte';
import Toggle from './UI/Toggle.svelte';

const IconSize = '24';

const dispatch = createEventDispatcher();

export let name: string;
export let state: string;
export let active: string;
export let description: string = "";

let enable = state === 'loaded' || state === 'enabled';

let cardColorClass = "border-gray-300";

if (active === 'active') {
  cardColorClass = "border-green-700"
} else if (active === 'failed') {
  cardColorClass = "border-red-700"
}

const enableToggleHandler = (event) => {
  console.log(event);
  dispatch("enable", {name: name, enable: enable})
}

const restartClickHandler = (event) => {
  console.log("restart", event);
  dispatch("restart", {name: name})
}

const stopClickHandler = (event) => {
  console.log("stop", event);
  dispatch("stop", {name: name})
}

const startClickHandler = (event) => {
  console.log("start", event);
  dispatch("start", {name: name})
}

</script>

<article class="p-2 service-item">
  <Card>
    <div class="service-item__content" 
        class:failed="{active === 'failed'}"
        class:running="{active === 'active'}">
      <h4 class="title" title="{name}">{name.replace(".service","")}</h4>
      <h5 class="description" title="{description}">{description}</h5>
      <div class="service-item__enabled">
        <Toggle label="" on:change="{enableToggleHandler}"
          bind:checked={enable} 
        />
      </div>
      <div class="service-item__actions">
        {#if active === 'active'}
          <div on:click="{stopClickHandler}">
            <PauseCircleIcon size={IconSize} class="service-item__icon-failed"/>
          </div>
          <div on:click="{restartClickHandler}">
            <RefreshCwIcon size={IconSize} class="service-item__icon-success"/>
          </div>
        {:else}
          <div on:click="{startClickHandler}">
            <PlayCircleIcon size={IconSize} class="service-item__icon-success"/>
          </div>
        {/if}
      </div>
    </div>
  </Card>
</article>

<style>
.service-item {
  width: 25%;
  text-align: left;
}

.service-item__content {
  /* display: flex; */
  /* flex-direction: column; */
  /* width: 100%; */
  /* height: 200px; */
  border-top: 4px var(--text-alt-color) solid;
  padding-top: .25rem;
  height: 90px;
  position: relative;
  overflow: hidden;
}

.service-item:hover {
  transform: scale(1.1);
}

.running {
  border-top: 4px var(--btn-green-color) solid;
}

.failed {
  border-top: 4px var(--btn-red-color) solid;
}

.service-item span, 
.service-item h4, 
.service-item h5 {
  overflow: hidden;
  text-overflow: ellipsis;
}

.service-item__enabled,
.service-item__actions {
 position: absolute;
}

.service-item__enabled {
 /* top: 0px; */
 bottom: -5px;
 left: 0px;
 cursor: pointer;
}

.service-item__actions {
 bottom: 0px;
 right: 0px;
 display: flex;
}

:global(.service-item__actions > *) {
  margin-left: .5rem;
}

.title {
  display: block;
  white-space: nowrap;
  font-style: italic;
}

.description {
  display: block;
  white-space: nowrap;
  font-size: .8rem;
  color: var(--text-alt-color)
}

:global(.service-item__icon-success),
:global(.service-item__icon-failed),
:global(.service-item__icon-std) {
  cursor: pointer;
}

:global(.service-item__icon-success:hover) {
  color: var(--btn-green-color);
}

:global(.service-item__icon-failed:hover) {
  color: var(--btn-red-color);
}

:global(.service-item__icon-std:hover) {
  color: var(--text-alt-color);
}

</style>
