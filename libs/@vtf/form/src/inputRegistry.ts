import TextInput from "./inputs/Text.vue";
import NumberInput from "./inputs/Number.vue";
import SelectInput from "./inputs/Select.vue";
import BtnSelectInput from "./inputs/BtnSelect.vue";
import DateInput from "./inputs/Date.vue";

// TODO: specify Vue component type
const inputRegistry: Map<string, any> = new Map()
inputRegistry.set('text', TextInput)
inputRegistry.set('number', NumberInput)
inputRegistry.set('select', SelectInput)
inputRegistry.set('btnSelect', BtnSelectInput)
inputRegistry.set('date', DateInput)

export default inputRegistry
