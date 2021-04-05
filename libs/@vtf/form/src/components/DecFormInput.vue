<template>
  <div class="form-group dc-fi">
    <label>
      <span>{{ $attrs.label }}</span>
      <slot name="labelAction"/>
    </label>
    <DecInput v-bind="$attrs"/>
  </div>
</template>
<script>
import DecInput from "./DecInput";

export default {
  inheritAttrs: false,
  components: {
    DecInput,
  },
}
</script>

<style lang="scss">
.form-group {
  .btn-group {
    display: flex;
  }
}

.dc-fi {
  > label {
    display: flex;
    justify-content: space-between;
  }
}
</style>
