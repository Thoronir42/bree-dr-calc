import {TypefulModule} from "@vtf-typeful"
import {codeToRegionalString} from "../RegionalUtils"

import * as countries from "./countries"

const module: TypefulModule = {
  types: {
    country: {
      type: "select",
      itemsSource: "i18n:country",
      valueKey: "code",
      createItemLabel: (item: countries.CountryItem) => item.code + ' - ' + codeToRegionalString(item.code),
    },
  },
  registerItemSources(collections) {
    collections.addCollection('i18n:country', countries.createCollection({
      priorityCountries: ['CZ', 'SK', 'DE', 'PL', 'HU'],
    }))
  },
}

export default module
