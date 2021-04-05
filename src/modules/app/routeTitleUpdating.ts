import {RouteLocationNormalized, useRouter} from "vue-router"
import {useI18n} from "@i18n"
import appStore from "@app/store/appStore"

export default {
  install() {
    const router = useRouter()
    const i18n = useI18n()!

    const getRouteTitle = (pageTitle?: string) => {
      let title = appStore.state.appName

      if (pageTitle) {
        title += ' | ' + i18n.t(pageTitle)
      }

      return title
    }
    const updateTitle = (to: RouteLocationNormalized) => {
      document.title = getRouteTitle(to.meta.title as string | undefined)
    }

    router.afterEach(updateTitle)

    return {
      updateTitle
    }
  },
}
