import {createApp} from 'vue'
import App from './modules/app/App.vue'

import './modules/app/sass/bdcApp.scss'
import './modules/app/sass/bdcBootstrap.scss'

import 'tippy.js/dist/tippy.css'

import TippyDirective from "@/modules/app/directives/TippyDirective"
import I18nPlugin from "@i18n/I18nPlugin"
import {TypefulPlugin} from "@vtf-typeful"

const i18nOptions = {
  initialDictionaries: [
    require("@/modules/app/localization/app.cs_CZ.json"),
    require("@/../libs/@vtf/collection/localization/collection.cs_CZ.json"),
    require("@/modules/auth/localization/auth.cs_CZ"),
    require("@/modules/bestiary/localization/bestiary.cs_CZ.json"),
    require("@/modules/bestiary-dachshund/localization/dachshund.cs_CZ.json"),
  ]
}

const typefulModules = {
  i18n: require("@/../libs/i18n/src/typeful/I18nModule").default,
  bestiary: require("@/modules/bestiary/typeful/BestiaryModule").default,
  dachshund: require("@/modules/bestiary-dachshund/typeful/DachshundModule").default,
}

createApp(App)
  .directive('tippy', TippyDirective)
  .use(I18nPlugin, i18nOptions)
  .use(TypefulPlugin, {modules: typefulModules})
  .use(require("./modules/app/router").default)
  .mount('body')
