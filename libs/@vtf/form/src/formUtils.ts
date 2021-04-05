import {useI18n} from "@i18n"
import {transformModuleField, FieldObj, PreparedField} from "@vtf-typeful/EntityModel"


type FieldCompositionOptions = {
  /**
   *  Create label from name
   *
   *  true or label prefix
   */
  createFieldLabel?: boolean | string,
}

export function getField<T extends object>(name: string, field: Readonly<FieldObj<T>>, opts?: FieldCompositionOptions): PreparedField<T> {
  const i18n = useI18n()!
  const preparedField = {
    name,
    ...transformModuleField<T>(field),
  }

  if (opts?.createFieldLabel && !field.label) {
    preparedField.label = (typeof opts.createFieldLabel === "string" ? opts.createFieldLabel : '') + name
  }
  if (preparedField.label) {
    preparedField.label = i18n.t(preparedField.label)
  }

  if (preparedField?.createValueLabel) {
    const getItemValue = (item: any) => item[preparedField?.valueKey || 'value']
    if (preparedField?.createValueLabel === true) {
      preparedField.createItemLabel = (item: any) => i18n.t(getItemValue(item)) || ''
    } else if (typeof preparedField.createValueLabel === "string") {
      const prefix = preparedField.createValueLabel
      preparedField.createItemLabel = (item: any) => i18n.t(prefix + getItemValue(item)) || ''
    }
  }

  return preparedField
}

export function getFields<T extends {[name: string]: FieldObj<any>}>(fields: T, opts?: FieldCompositionOptions): PreparedField<T> {
  const preparedFields: any = {}
  Object.keys(fields).forEach((name) => preparedFields[name] = getField(name, fields[name], opts))

  return preparedFields
}
