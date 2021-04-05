<template>
  <div class="btn-group btn-group-select">
    <label v-for="option in options"
           :key="option.value"
           :class="['btn', inputValue === option.value ? 'btn-primary' : 'btn-light']">
      <input v-model="inputValue" :value="option.value" type="radio"/>
      <span>{{ option.label }}</span>
    </label>
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  props: {
    options: {type: Array, required: true},
  },
  setup() {
    return {
      inputValue: inject('inputValue')
    }
  },
}
</script>

<style lang="scss">
.btn-group-select {
  input[type=radio], input[type=checkbox] {
    display: none;
  }
}
</style>
