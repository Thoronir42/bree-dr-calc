import fetchingCollection from "@/modules/appCollections/fetchingCollection"

type CountryCode = string

export type CountryItem = { code: CountryCode }

type CountriesOptions = {
  priorityCountries?: CountryCode[],
}

export const createCollection = (options: CountriesOptions) => {
  const normalizeCollection = (items: CountryItem[]) => {
    const result = items.slice()
    const prioResult: any[] = []

    const priorityCountries = options?.priorityCountries

    priorityCountries?.forEach((code) => {
      const index = result.findIndex((item) => item.code === code)
      if (index === -1) {
        console.warn("Priority country not found", code)
        return
      }
      prioResult.push(...result.splice(index, 1))
    })

    return prioResult.concat(result)
  }

  return fetchingCollection('/api/i18n/countries.json', {
    normalizeCollection,
  })
}
