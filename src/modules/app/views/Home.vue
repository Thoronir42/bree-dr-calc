<template>
  <div :class="['home', userAuthenticated && 'home-full']">
    <template v-if="!userAuthenticated">
      <h1>{{ appName }}</h1>
      <p>
        Vítejte v aplikaci sloužící pro evidenci šelem a plánování připouštění.
        Na stránce <router-link :to="{name: 'app.About'}">{{ t('app.view.About') }}</router-link> se můžete dočíst
        podrobnosti ohledně vzniku a provozu aplikace.
      </p>

      <p>
        Aplikace aktuálně podporuje <b class="text-warning">lokální</b> režim, tedy režim ve kterém jsou data ukládána
        pouze ve vašem prohlížeči.
      </p>

      <div class="start-actions">
        <router-link :to="{name: 'auth.SignIn'}" class="btn btn-outline-warning font-weight-bold">Vytvořit lokální účet</router-link>
        <button class="btn btn-secondary" @click.prevent="beginDemo">Vytvořit demo účet</button>
      </div>
    </template>

    <template v-else>
      <h1>Vítejte zpět</h1>
      <p>
        Právě máte uloženo <router-link :to="{name: 'bestiary.MyBeasts'}">{{ bestiarySummary.beastCount }} šelem</router-link>
        v <router-link :to="{name: 'bestiary.BreedingStationsIndex'}">{{ bestiarySummary.stationCount }} stanicích</router-link>.
      </p>

      <hr/>

      <p>
        Aplikaci nyní můžete začít používat jako rejstřík šelem a chovatelských stanic skrze sekce navigační lišty
        na vrchu stránky.
        <br/>
        Většina údajů je nepoviná avšak je doporučeno vyplnit jméno šelmy a přiřadit ji k předem uložené
        chovatelské stanici. Díky tomu bude jednodušší šelmy volit jako předchůdce anebo kandidáty pro připouštění.
      </p>

      <p>
        V aplikaci se dále nachází <router-link :to="{name: 'bestiary.Pairing'}">plánovač připouštění</router-link>,
        který za pomoci uložených šelem propočte Wrightův Koeficient a případně další údaje.
        <br/>
        Pro přesné výsledky je nutné pro šelmy nastavit jejich předky a koeficient genetického zatížení, které
        do výpočtu vstupují.
      </p>

    </template>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive} from 'vue';

import appStore from "@app/store/appStore"

import authStore from "@/modules/auth/store/authStore"
import beastsStore from "@/modules/bestiary/store/beastsStore"
import demoStore from "@/modules/demo/store/demoStore"
import {useI18n} from "@i18n"

export default defineComponent({
  setup() {
    const i18n = useI18n()

    const bestiarySummary = reactive({
      beastCount: computed(() => beastsStore.state.beastList.length),
      stationCount: computed(() => beastsStore.state.breedingStations.length)
    })
    const userAuthenticated = computed(() => authStore.getters.isLoggedIn())

    return {
      ...i18n,

      appName: appStore.state.appName,
      userAuthenticated,
      beginDemo: () => {
        demoStore.actions.initDemoData()
      },
      bestiarySummary,
    }
  },
});
</script>

<style lang="scss">
.home {
  max-width: 666px;
}
.home-full {
  flex: 1;
}
.start-actions {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-inline-end: -0.5em;
  > * {
    margin-inline-end: 0.5em;
  }

}
</style>
