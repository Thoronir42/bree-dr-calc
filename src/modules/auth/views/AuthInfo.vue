<template>
  <div class="auth-page">
    <h1>{{ t('auth.view.AuthInfo') }}</h1>

    <p>Právě zde máte uloženy tyto údaje:</p>
    <dl class="definitions">
      <dt>Uživatel</dt>
      <dd style="grid-column: span 3">{{ userName }}</dd>
      <dt>Celkem šelem</dt>
      <dd>{{ resetSummary.beastCount }}</dd>
      <dt>Celkem chovatelských stanic</dt>
      <dd>{{ resetSummary.breedingStations }}</dd>
    </dl>

    <div class="card">
      <div class="card-body">
        <p>
          Pokud si přejete všechny údaje smazat, vyplňte <b>{{ confirmationText }}</b> do následujícího formuláře.
        </p>

        <div class="input-group">
          <DecInput v-model="confirmation" type="text"></DecInput>
          <div class="input-group-append">
            <div :class="['btn btn-danger', !deleteEnabled && 'disabled']" @click="resetData">Smazat</div>
          </div>
        </div>
      </div>
    </div>

    <h2 class="mt-4">Upozornění o datech</h2>
    <p>
      Právě pracujete s <b class="text-warning">Lokálním</b> účtem. Všechny údaje jsou uloženy pouze na vašem disku a
      neukládají se nikde na internetu.<br/>
      Jelikož jsou data ukládána lokálně, máte k nim přístup přístup pouze v tomto zařízení a pouze v tomto prohlížeči.
    </p>
  </div>
</template>

<script lang="ts">
import {computed, ref} from "vue"
import {useRouter} from "vue-router"
import {useI18n} from "@i18n"
import {DecInput} from "@vtf-form"

import authStore from "../store/authStore"
import beastsStore from "@/modules/bestiary/store/beastsStore.ts"

export default {
  components: {
    DecInput,
  },
  setup() {
    const $router = useRouter()
    const i18n = useI18n()

    const confirmation = ref('')
    const confirmationText = ref('Smazat všechna data')
    const deleteEnabled = computed(() => confirmation.value.toLowerCase() === confirmationText.value.toLowerCase())

    const resetSummary = computed(() => ({
      beastCount: beastsStore.state.beastList.length,
      breedingStations: beastsStore.state.breedingStations.length,
    }))

    return {
      ...i18n,
      userName: authStore.state.userName,

      confirmation,
      confirmationText,
      deleteEnabled,
      resetSummary,

      resetData: () => {
        if (!deleteEnabled.value) {
          return
        }
        authStore.actions.logOut()
        beastsStore.resetUserData()
        $router.push({name: "app.Home"})
      },
    }
  },
}
</script>
