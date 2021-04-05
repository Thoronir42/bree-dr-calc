import {computed, defineComponent, h, inject, ComputedRef, provide} from "vue"
import {ModelObj} from "./types/ModelObj"
import inputRegistry from "../inputRegistry"

export default defineComponent({
  name: 'DecInput',
  props: {
    type: {type: String, default: 'text'},
    modelValue: {type: undefined},
  },
  setup(props, context) {

    const modelObj = props.modelValue !== undefined ? null : inject<ComputedRef<ModelObj>>('modelObj')
    const name = context.attrs.name as string

    const internalValue = computed({
      get() {
        if (modelObj?.value) {
          return modelObj.value[name]
        }

        return props.modelValue
      },
      set(value) {
        if (modelObj?.value) {
          modelObj.value[name] = value
        } else {
          context.emit("change:modelValue", value)
        }
      },
    })

    provide('inputValue', internalValue)

    return {
      internalValue
    }
  },
  render() {
    const component = inputRegistry.get(this.type)
    if (component) {
      return h(component, this.$attrs)
    }
    console.warn("Unknown field ", this.type, this.$attrs)

    return h('span', [
      h('span', ['name=' + this.$attrs.name]),
      ':',
      h('span', [
        this.internalValue as any,
      ])
    ])
  },
})
