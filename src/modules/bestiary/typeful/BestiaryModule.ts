import {PropertyType, TypefulModule} from "@vtf-typeful"
import {useI18n} from "@i18n"

import localCollection from "@/modules/appCollections/localCollection"
import * as gender from "./gender.type"
import {BreedingStation} from "@/modules/bestiary/model/Bestiary"
import {createBeastListItem} from "@/modules/bestiary/model/beastItemsSource"
import beastsStore from "@/modules/bestiary/store/beastsStore"

const fetchTypes: { [baseType: string]: (variant: string) => PropertyType } = {
  coatType: (variant: string): PropertyType => ({
    type: "select",
    itemsSource: variant + ':coatType',
  }),
  coatPaint: (variant: string): PropertyType => ({
    type: "select",
    itemsSource: variant + ':coatPaint',
  }),

}

const module: TypefulModule = {
  types: {
    gender: {
      type: "btnSelect",
      options: gender.options.map((option) => ({
        value: option.value,
        label: 'bestiary.beast.gender.' + option.value,
      })),
      translateLabels: true,
    },
    geneticGrade: {
      type: "text",
    },
    behaviorGrade: {
      type: "text",
    },
    healthGrade: {
      type: "text",
    },
    bonity: {
      type: "text",
    },

    'relation.beast': {
      type: "select",
      itemsSource: "relation:beast",
      valueKey: 'id',
      createItemLabel: (beast: any) => {
        const i18n = useI18n()!
        const gender = beast.gender ? (i18n.t('bestiary.beast.gender.' + beast.gender)) : ''
        const station = beastsStore.getters.breedingStationName(beast.breedingStation) || ' von ???'

        return beast.name + ' ' + station + (gender ? ' ' + gender : '')
      },
    },
    'relation.breedingStation': {
      type: "select",
      itemsSource: "bestiary:breedingStation",
      valueKey: 'id',
      createItemLabel: (station: BreedingStation) => station.name + ' [' + station.country + ']',
    }
  },
  getPropertyType: (type, variant) => {
    if (type in fetchTypes && variant) {
      return fetchTypes[type](variant)
    }
    const types = module.types!
    if (type in types) {
      return types[type]
    }

    return undefined
  },
  registerItemSources(collections) {
    collections.addCollectionEntry('relation:beast', localCollection(() => beastsStore.state.beastList, createBeastListItem))
    collections.addCollectionEntry('bestiary:beast', localCollection(() => beastsStore.state.beastList, (i) => (i)))
    collections.addCollectionEntry('bestiary:breedingStation', localCollection(() => beastsStore.state.breedingStations, (i) => (i)))
  },
}

export default module
