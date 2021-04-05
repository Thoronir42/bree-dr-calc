import {CollectionsService} from "@vtf-collection"
import {PropertyType} from "./EntityModel"

export type TypefulModule = {
  types?: { [name: string]: PropertyType },
  registerItemSources?(registry: CollectionsService): void,
  getPropertyType?: (type: string, variant?: string) => PropertyType,
}

export default new Map<string, TypefulModule>()
