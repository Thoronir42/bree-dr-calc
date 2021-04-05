<template>
  <select v-model="inputValue" class="form-control">
    <option v-for="option in availableOptions" :key="option[valueKey]" :value="option[valueKey]">{{
        option.label
      }}
    </option>
  </select>
</template>

<script lang="ts">
import {defineComponent, inject, ref, watch} from "vue"
import {useCollections} from "@vtf-collection"

export default defineComponent({
  props: {
    options: {type: Array},
    itemsSource: {type: undefined},
    itemFilter: {type: Object},
    itemSort: {type: Object},
    createItemLabel: Function,
    valueKey: {type: String, default: 'value'},
  },

  setup(props) {
    const inputValue = inject('inputValue')
    const collections = useCollections()

    const availableOptions = ref([] as any[])

    const setItems = (items: any[]) => {
      if (props?.createItemLabel) {
        const createLabel = props.createItemLabel!
        items = items.map((item) => ({
          ...item,
          label: createLabel(item),
        }))
      }

      availableOptions.value = items
    }

    const initializeItemsSource = (itemSourceName: string) => {
      let result = collections.fetchItems(itemSourceName, '', props.itemFilter as any, props.itemSort as any)
      if (Array.isArray(result)) {
        setItems(result)
      } else {
        result.then((items) => setItems(items))
      }
    }

    if (props.options) {
      watch(() => props.options, (options) => setItems(options || []), {immediate: true})
    } else if (props.itemsSource) {
      initializeItemsSource(props.itemsSource as any)
    } else {
      console.warn("Unknown items source")
    }


    return {
      inputValue,
      availableOptions,
    }
  },
})
</script>
