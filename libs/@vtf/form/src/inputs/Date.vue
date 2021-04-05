<template>
  <input v-model="inputValue" class="form-control" type="date"/>
</template>

<script>
import {inject} from "vue";

export default {
  setup() {
    return {
      inputValue: inject('inputValue')
    }
  },
}
</script>
