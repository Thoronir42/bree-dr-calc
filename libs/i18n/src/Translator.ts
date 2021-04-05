export type Dictionary = { [term: string]: string }

export default class Translator {
  private readonly dictionary: Map<string, string>

  constructor() {
    this.dictionary = new Map()
  }

  public extendDictionary(terms: Dictionary): this {
    for (const key in terms) {
      this.dictionary.set(key, terms[key])
    }

    return this
  }

  public translate(term: string, vars?: { [name: string]: any }): string | undefined {
    let translation = this.dictionary.get(term)
    if (!translation) {
      console.warn(`Term '${term}' is not defined`)
      return undefined
    }

    if (vars) {
      for (const name in vars) {
        translation = translation.replace('{' + name + '}', vars[name])
      }
    }

    return translation
  }

}
