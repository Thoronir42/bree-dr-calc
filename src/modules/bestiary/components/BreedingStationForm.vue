<template>
  <DecForm :model-value="station">
    <div class="form-row">
      <div class="col-md-6">
        <DecFormInput v-bind="stationFields.name"/>
      </div>
      <div class="col-md-2 col-sm-5">
        <DecFormInput v-bind="stationFields.country"/>
      </div>
      <div class="col-md-4 col-sm-7">
        <DecFormInput v-bind="stationFields.id" :disabled="isPersisted"/>
      </div>
    </div>
  </DecForm>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue"
import {DecForm, DecFormInput, getFields} from "@vtf-form"

import stationSchema from "../typeful/breedingStationSchema.json"

export default defineComponent({
  components: {
    DecFormInput,
    DecForm,
  },
  props: {
    station: {type: Object, required: true},
    isPersisted: {type: Boolean},
  },
  setup() {
    const stationFields = ref(getFields(stationSchema, {
      createFieldLabel: 'bestiary.station.field.',
    }))

    return {
      stationFields,
    }
  },
})
</script>
