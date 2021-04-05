import {CollectionsService} from "@vtf-collection"
import TypefulModuleRegistry, {TypefulModule} from "./ModuleRegistry"

export const collections = new CollectionsService()
export const modules = TypefulModuleRegistry

type TypefulPluginOptions = {
  modules: { [name: string]: TypefulModule },
}

export default {
  install(vue: any, opts: TypefulPluginOptions) {
    Object.entries(opts.modules).forEach(([name, module]) => {
      module.registerItemSources?.(collections)
      modules.set(name, module)
    })

    vue.provide('vtf-collections', collections)
  }
}
