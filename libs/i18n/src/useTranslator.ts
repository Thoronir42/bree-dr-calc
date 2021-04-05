import {inject} from "vue"
import Translator from "./Translator";

type I18nPartial = {t: Translator['translate']}

export const useTranslator = () => inject<Translator>('i18n.translator')
export const useI18n = () => inject<I18nPartial>('i18n.partial')
