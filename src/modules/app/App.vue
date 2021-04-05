<template>
  <div id="app">
    <Navbar :app-name="appName" :nav-links="navLinks"/>

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

<script>
import {computed} from "vue"
import {useI18n} from "@i18n"

import Navbar from "@/modules/app/layouts/Navbar";
import Footer from "@/modules/app/layouts/Footer";
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

    const navLinks = computed(() => {
      const links = [
        {to: {name: 'bestiary.BreedingStationsIndex'}, text: i18n.t('bestiary.view.BreedingStationsIndex')},
      ]
      if (userAuthenticated.value) {
        links.unshift({to: {name: 'bestiary.MyBeasts'}, text: i18n.t('bestiary.view.MyBeasts')})
      }

      return links
    })


    return {
      ...i18n,

      appName: appStore.state.appName,
      navLinks,
      userAuthenticated,
    }
  },
  mounted() {
    this.$el.classList.add('layout-simple')
  }
}
</script>
