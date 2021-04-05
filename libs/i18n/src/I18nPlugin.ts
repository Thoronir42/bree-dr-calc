import Translator, {Dictionary} from "./Translator";

type I18nPluginOptions = {
  initialDictionaries: Dictionary[],
}

export default {
  install(vue: any, opts?: I18nPluginOptions) {
    const translator = new Translator()
    opts?.initialDictionaries?.forEach((d) => translator.extendDictionary(d))

    vue.provide('i18n.translator', translator)
    vue.provide('i18n.partial', {t: translator.translate.bind(translator)})
  }
}
