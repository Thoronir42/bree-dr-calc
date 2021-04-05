import {TypefulModule} from "@vtf-typeful/ModuleRegistry";
import fetchingCollection from "@/modules/appCollections/fetchingCollection"

const module: TypefulModule = {
  types: {
    sizeVariant: {
      type: "select",
      itemsSource: "dachshund:sizeVariant",
      createValueLabel: "dachshund.sizeVariant.",
    }
  },
  registerItemSources(collections) {
    collections.addCollectionEntry('dachshund:sizeVariant', fetchingCollection('/api/dachshund/size-variant.json'))
    collections.addCollectionEntry('dachshund:coatType', fetchingCollection('/api/dachshund/coat-type.json'))
    collections.addCollectionEntry('dachshund:coatPaint', fetchingCollection('/api/dachshund/coat-paint.json'))
  },
}

export default module
