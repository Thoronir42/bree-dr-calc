<template>
  <footer class="app-footer fixed-bottom">
    <template v-if="isLoggedIn">
      <router-link :to="{name: 'auth.AuthInfo'}">{{ t('auth.accountTypeLabel') }}: <b class="app-connection-notice text-warning">{{ t('auth.accountType.local') }}</b></router-link>
      <i class="spacer"/>
    </template>

    <nav v-if="$slots.links">
      <slot name="links"/>
    </nav>
  </footer>
</template>

<script>
import authStore from "@/modules/auth/store/authStore";
import {computed} from "vue";
import {useI18n} from "@i18n";

export default {
  setup() {
    const i18n = useI18n()
    const isLoggedIn = computed(() => authStore.getters.isLoggedIn())

    return {
      ...i18n,
      isLoggedIn,
    }
  },
}
</script>
