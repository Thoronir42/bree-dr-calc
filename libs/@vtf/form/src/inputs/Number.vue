<template>
  <div v-if="format === 'percent'" class="input-group">
    <input v-bind="$attrs" v-model.number="valuePct" class="form-control" type="number">
    <div class="input-group-append">
      <span class="input-group-text">%</span>
    </div>
  </div>
  <input v-else v-bind="$attrs" v-model.number="inputValue" class="form-control" type="number"/>
</template>

<script>

import {computed, inject} from "vue";

export default {
  props: {
    format: String,
  },
  setup() {
    const inputValue = inject('inputValue')
    const valuePct = computed({
        get() {
          return (inputValue.value ?? 0) * 100
        },
        set(value) {
          inputValue.value = value / 100
        }
      }
    )
    return {
      inputValue,
      valuePct,
    }
  },
}
</script>
