import {FilterOptions} from "./filtering";
import {SortOptions} from "./sorting";
import {Pagination} from "./pagination";

export type CollectionRetrieveFn<T = any> = (
  filter?: FilterOptions,
  sort?: SortOptions,
  pagination?: Pagination
) => CollectionPortion<T> | Promise<CollectionPortion<T>>

export type CollectionEntry<T = any> = {
  retrieve: CollectionRetrieveFn<T>,
  searchParam?: string,
}

export type CollectionPortion<T> = {
  items: T[],

  filter?: FilterOptions,
  sort?: SortOptions,
  pagination?: Pagination,
}
