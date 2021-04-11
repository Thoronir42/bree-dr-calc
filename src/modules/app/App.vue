<template>
  <div id="app" :class="layoutClass">
    <Navbar :app-name="appName" :nav-links="navLinks" v-if="userAuthenticated"/>

    <main class="container">
      <router-view/>
    </main>

    <Footer class="card">
      <template #links>
        <router-link :to="{name: 'app.About'}">{{ t('app.view.About') }}</router-link>
      </template>
    </Footer>
  </div>
</template>

<script lang="ts">
import {computed} from "vue"
import {useRoute} from "vue-router"
import {useI18n} from "@i18n"

import Navbar from "./layouts/Navbar.vue";
import Footer from "./layouts/Footer.vue";
import appStore from "@/modules/app/store/appStore";
import authStore from "@/modules/auth/store/authStore";

import routeTitleUpdating from "./routeTitleUpdating"

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    routeTitleUpdating.install()
    const userAuthenticated = computed(() => authStore.getters.isLoggedIn())
    const i18n = useI18n()
    const route = useRoute()

    const navLinks = computed(() => {
      const links = []

      if (userAuthenticated.value) {
        links.push({to: {name: 'bestiary.MyBeasts'}, text: i18n.t('bestiary.view.MyBeasts')})
        links.push({to: {name: 'bestiary.BreedingStationsIndex'}, text: i18n.t('bestiary.view.BreedingStationsIndex')})
      }

      return links
    })

    const layoutClass = computed(() => {
      let cls = 'layout-simple'
      if (route.meta.layoutMode) {
        cls += ' ' + route.meta.layoutMode
      }
      return cls
    })

    return {
      ...i18n,

      layoutClass,

      appName: appStore.state.appName,
      navLinks,
      userAuthenticated,
    }
  },
}
</script>
