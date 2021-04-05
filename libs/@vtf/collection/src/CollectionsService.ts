import {FilterOptions} from "./filtering";
import {SortOptions} from "./sorting";
import {CollectionEntry, CollectionPortion, CollectionRetrieveFn} from "./Collection";
import {Pagination} from "./pagination";

type CollectionRegistry = Map<string, CollectionEntry>

export default class CollectionsService {
  private readonly registry: CollectionRegistry

  constructor(registry?: CollectionRegistry) {
    this.registry = registry || new Map()
  }

  public addCollection(name: string, retrieve: CollectionRetrieveFn, searchParam?: string): this {
    this.addCollectionEntry(name, {retrieve, searchParam})
    return this
  }

  public addCollectionEntry(name: string, entry: CollectionEntry): this {
    if (this.registry.has(name)) {
      console.warn(`Collection ${name} was overwritten`)
    }
    this.registry.set(name, entry)
    return this
  }

  public fetchItems<T>(sourceName: string, search?: string, filter?: FilterOptions, sort?: SortOptions): T[] | Promise<T[]> {
    const normalize = (result: CollectionPortion<T> | T[]): T[] => {
      if (!result) {
        console.warn("No result on item source", sourceName)
        return []
      }
      if (Array.isArray(result)) {
        return result
      }

      return result.items
    }

    const result = this.fetchFromItemSource<T>(sourceName, search, filter, sort)

    if (result instanceof Promise) {
      return result.then(normalize)
    }

    return normalize(result.items)
  }

  public fetchCollection<T>(
    sourceName: string, search?: string,
    filter?: FilterOptions,
    sort?: SortOptions,
    pagination?: Pagination
  ): CollectionPortion<T> | Promise<CollectionPortion<T>> {
    const normalize = (result: CollectionPortion<T> | T[]): CollectionPortion<T> => {
      if (!result) {
        console.warn("No result on item source", sourceName)
        return {items: []}
      }
      if (Array.isArray(result)) {
        return {
          items: result,
        }
      }
      return result
    }

    const result = this.fetchFromItemSource<T>(sourceName, search, filter, sort, pagination)

    if (result instanceof Promise) {
      return result.then(normalize)
    }

    return normalize(result)
  }

  private fetchFromItemSource<T>(sourceName: string, search?: string, filter?: FilterOptions, sort?: SortOptions, pagination?: Pagination) {
    const entry = this.registry.get(sourceName) as CollectionEntry<T>
    if (!entry) {
      throw new Error(`Items source '${sourceName}' does not exist`)
    }

    if (search) {
      if (entry.searchParam) {
        if (!filter) {
          filter = []
        }
        filter.push(['like', entry.searchParam, search])
      } else {
        console.warn("Search passed to an items collection without searchParam, sourceName: " + sourceName)
      }
    }

    return entry.retrieve(filter, sort, pagination)
  }
}
