import getNested from "lodash/get"

import {FilterArgument, FilterCondition, FilterOptions} from "@vtf-collection"

type FilterTypeEvaluator = (value: any, argument: FilterArgument) => boolean
const filterTypeEvaluators: {[type: string]: FilterTypeEvaluator} = {
  '=': (value, argument) => value === argument,
  '~=': (value, argument) => value == argument,
  '>': (value, argument) => value > argument,
  '>=': (value, argument) => value >= argument,
  '<': (value, argument) => value < argument,
  '<=': (value, argument) => value <= argument,
  'in': (value, argument) => {
    if (!Array.isArray(argument)) {
      console.warn("Filter argument is not an array")
      return false
    }
    return argument.includes(value)
  }
}

export function evaluateFilterCondition<T>(item: T, condition: FilterCondition): boolean {
  const value = getNested(item, condition[1])

  const evaluator = filterTypeEvaluators[condition[0]]
  if (!evaluator) {
    console.warn("No evaluator for condition type ", condition[0])
    return false
  }

  return evaluator(value, condition[2])
}

export function matchFilterFn<T>(filter: FilterOptions): (item: T) => boolean {
  return (item: T) => filter.every((condition) => {
    let expectResolution = true

    if (condition[0] === '!') {
      expectResolution = false
      condition = condition[1]
    }


    return evaluateFilterCondition(item, condition) === expectResolution
  })
}
