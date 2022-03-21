<script lang="ts">

export let checked: boolean;
export let label: string;
export let id = Math.random().toString();

</script>

<input type="checkbox" id="check_{id}" 
  class="checkbox" {checked} on:change>
<label for="check_{id}" class="switch" >{label}</label>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  transition: all 0.3s;
}
.switch::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius:50%;
  background-color: white;
  top: 3px;
  left: 1px;
  transition: all 0.3s;
}

.checkbox:checked + .switch::after {
  left : 30px;
}
.checkbox:checked + .switch {
  background-color: #7983ff;
}
.checkbox {
  display : none;
}
</style>
