import ModuleRegistry, {TypefulModule} from "./ModuleRegistry";

export type PropertyType = any

export type FieldObj<T extends object> = T & {
  type: string,
  label?: string,
  createValueLabel?: boolean | string | ((itemValue: any) => string),
  createItemLabel?: (item: any) => string
  [k: string]: any,
}
export type PreparedField<T extends object> = FieldObj<T> & {
  name: string,
}


export function transformModuleField<T extends object>(field: Readonly<FieldObj<T>>): FieldObj<T> {
  const moduleSeparator = field.type.indexOf(':')

  if (moduleSeparator === -1) {
    return {...field}
  }

  const moduleName = field.type.substring(0, moduleSeparator)
  const typeName = field.type.substring(moduleSeparator + 1)

  const module = ModuleRegistry.get(moduleName)
  if (!module) {
    throw new Error("No module " + moduleName)
  }

  const registeredType = getPropertyType(module, typeName)

  if (!registeredType) {
    throw new Error("No type " + field.type)
  }

  return {
    ...field,
    ...registeredType,
  }
}

function getPropertyType(module: TypefulModule, type: string): PropertyType {
  if (module.getPropertyType) {
    const variantSeparator = type.indexOf('.')
    const baseType = variantSeparator === -1 ? type : type.substring(0, variantSeparator)
    const typeVariant = variantSeparator === -1 ? undefined : type.substring(variantSeparator + 1)

    return module.getPropertyType(baseType, typeVariant)
  }

  return module.types && module.types[type]
}
