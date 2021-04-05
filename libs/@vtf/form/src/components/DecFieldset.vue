<template>
  <fieldset>
    <legend v-if="legend">{{ legend }}</legend>
    <slot/>
  </fieldset>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, inject, provide} from "vue";

export default defineComponent({
  name: "DecFieldset",
  props: {
    legend: {type: String},
    modelValue: {type: Object},
    modelSection: {type: String},
  },
  setup(props) {
    const modelObj = inject<ComputedRef>('modelObj')
    const provideModelObj = computed(() => {
      const obj = modelObj?.value || props.modelValue as any

      if (!obj) {
        console.error("DecFieldset does not have modelObj")
        return undefined
      }

      return props.modelSection ? obj[props.modelSection] : obj
    })
    provide('modelObj' , provideModelObj)
  },

})
</script>
