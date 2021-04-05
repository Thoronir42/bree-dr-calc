<template>
  <div class="tf-filter">
    <div>Filtrování</div>
    <div class="add-filter">
      <label>{{ newFilterField.label }}</label>
      <div class="input-group">
        <DecInput type="select" v-bind="newFilterField" v-model="newFilter.value"/>
        <div class="input-group-append">
          <button class="btn btn-primary" @click="newFilter.add" :disabled="!newFilter.value">+</button>
        </div>
      </div>
    </div>

    <div class="active-fiters">
      <div class="filter" v-for="(filter, i) in filtering.value" :key="i">
        <span class="badge badge-pill badge-light text-danger" @click="filtering.removeFilter(i)">X</span>
        <span>{{ filter }}</span>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, reactive} from "vue"

import {DecInput, getField} from "@vtf-form"
import {Filtering} from "@vtf-collection"

export default defineComponent({
  components: {
    DecInput,
  },
  props: {
    filtering: {type: Object as PropType<Filtering>, required: true},
  },
  setup(props) {
    const newFilterField = getField('addFilter', {
      type: "select",
      options: props.filtering.fields,
      valueKey: 'path',
      createValueLabel: 'bestiary.beast.',
    }, {
      createFieldLabel: 'collections.filter.',
    })

    const newFilter = reactive({
      value: '',
      add: () => props.filtering.addFilter(newFilter.value),
    })


    return {
      newFilterField,
      newFilter,
    }
  },
})
</script>

<style lang="scss">
.tf-filter {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .active-filters {
    grid-column: span 2;
  }

}
</style>
