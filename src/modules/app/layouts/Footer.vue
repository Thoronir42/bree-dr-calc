<template>
  <footer class="app-footer fixed-bottom">
    <template v-if="isLoggedIn">
      <router-link :to="{name: 'auth.AuthInfo'}">Režim: <b class="app-connection-notice text-warning">Lokální</b></router-link>
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

export default {
  setup() {
    const isLoggedIn = computed(() => authStore.getters.isLoggedIn())

    return {
      isLoggedIn,
    }
  },
}
</script>
