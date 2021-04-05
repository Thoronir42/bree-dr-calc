import orderBy from "lodash/orderBy"

import {Pagination, CollectionEntry} from "@vtf-collection"
import {matchFilterFn} from "./localCollection/filtering"

export default function localCollection<T, TOut>(getItems: () => T[], transformItem: (i: T) => TOut): CollectionEntry<TOut> {
  return {
    retrieve: ((filter, sort, pagination) => {
      let items = getItems()
      if (filter) {
        items = items.filter(matchFilterFn(filter))
      }

      if (sort) {
        const iteratees = sort.map((s) => s[0])
        const orders = sort.map((s) => s[1])
        items = orderBy(items, iteratees, orders)
      }

      const perPage = pagination?.perPage || 20
      const paginationRes: Pagination = {
        page: pagination?.page || 1,
        perPage,
        totalPages: Math.ceil(items.length / perPage),
      }

      const start = (paginationRes.page - 1) * perPage
      items = items.slice(start, start + perPage)

      return {
        items: items.map(transformItem),
        filter: filter,
        sort: sort,
        pagination: paginationRes,
      }
    })
  }
}
