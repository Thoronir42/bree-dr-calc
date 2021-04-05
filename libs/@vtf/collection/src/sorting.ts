import {reactive} from "vue"
import {useI18n} from "@i18n"

import {PropExpression} from "./expressions"

type SortDirection = 'asc'|'desc'
export type SortOptions = [PropExpression, SortDirection][]

type SortField = {
  path: string,
}

export const createSorting = (fields: SortField[]) => {
  const i18n = useI18n()!

  const value = reactive([

  ] as SortOptions)

  return {
    fields,
    value,
    sortDirectionLabel: (field: string) => {
      const index = value.findIndex((f) => f[0] === field)
      const sortDirection = index === -1 ? 'none' : value[index][1]
      return i18n.t('collections.sortDirection.' + sortDirection)
    },

    toggleSort(path: string) {
      const index = value.findIndex((sort) => sort[0] === path)
      if (index === -1) {
        value.push([path, 'asc'])
        return
      }
      if (value[index][1] === 'asc') {
        value[index][1] = 'desc'
      } else {
        value.splice(index, 1)
      }
    },
  }
}
