<template>
  <DecFieldset class="form-row" legend="Detaily jezevčíka" model-section="dachshund">
    <div class="col-md-3">
      <DecFormInput v-bind="dachshundFields.sizeVariant"></DecFormInput>
    </div>
    <div class="col-md-3">
      <DecFormInput v-bind="dachshundFields.coatType"></DecFormInput>
    </div>
    <div class="col-md-3">
      <DecFormInput v-bind="dachshundFields.coatPaint"></DecFormInput>
    </div>
    <div class="col-md-3">
      <DecFormInput v-bind="dachshundFields.geneticGrades" disabled></DecFormInput>
    </div>
    <div class="col-md-3">
      <DecFormInput v-bind="dachshundFields.behaviorGrades" disabled></DecFormInput>
    </div>
    <div class="col-md-3">
      <DecFormInput v-bind="dachshundFields.healthGrades" disabled></DecFormInput>
    </div>
    <div class="col-md-3">
      <DecFormInput v-bind="dachshundFields.bonity" disabled></DecFormInput>
    </div>
  </DecFieldset>
</template>

<script lang="ts">
import {DecFieldset, DecFormInput, getFields} from "@vtf-form"
import dachshundSchema from "@/modules/bestiary-dachshund/typeful/dachshund.schema.json"

export default {
  components: {
    DecFieldset,
    DecFormInput,
  },
  data() {
    const dachshundFields = getFields(dachshundSchema, {
      createFieldLabel: 'dachshund.field.',
    })

    return {
      dachshundFields,
    }
  },
}
</script>
