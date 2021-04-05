import {inject} from "vue"
import CollectionsService from "./CollectionsService"

export * from "./filtering"
export * from "./sorting"
export * from "./pagination"
export * from "./Collection"

export {createFiltering} from "./filtering"
export {createSorting} from "./sorting"
export {createPagination} from "./pagination"

export {default as CollectionsService} from "./CollectionsService"
export {default as collectionPage} from "./partials/collectionPage"

export const useCollections = () => inject<CollectionsService>('vtf-collections')!
