import {reactive} from "vue";
import {PropExpression} from "./expressions";


type FilterType = '=' | '~=' | '>' | '<' | '>=' | '<=' | 'in' | 'like'
export type FilterArgument = any
type NegationCondition = ['!', FilterCondition]
export type FilterCondition = [FilterType, PropExpression, FilterArgument]

export type FilterOptions = (FilterCondition | NegationCondition)[]

type FilterField = {
  path: string,
  label: string,
  defaultValue?: any,
  options?: {value: any, label: string}[]
}

export const createFiltering = (fields: FilterField[]) => {
  const value = reactive([] as FilterOptions)

  return {
    fields,
    value,

    addFilter(path: string) {
      const field = fields.find((f) => f.path === path)
      const filterValue = field?.defaultValue
      value.push(["=", path, filterValue])
    },
    removeFilter(i: number) {
      value.splice(i, 1)
    },
  }
}

export type Filtering = ReturnType<typeof createFiltering>
