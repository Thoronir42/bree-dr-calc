<template>
  <div class="sign-in">
    <div class="card">
      <div class="card-header">
        <h1>{{ t('auth.view.SignIn') }}</h1>
      </div>

      <div class="card-body">
        <DecForm :on-submit="onSubmit">
          <DecFormInput v-bind="decFields.userName"/>
        </DecForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router"
import {useI18n} from "@i18n"
import {DecForm, DecFormInput, getFields} from "@vtf-form"

import authStore from "@/modules/auth/store/authStore.ts"


export default {
  components: {
    DecFormInput,
    DecForm,
  },
  setup() {
    const $router = useRouter()
    const i18n = useI18n()

    const decFields = ref(getFields({
      userName: {type: "text"},
    }, {
      createFieldLabel: 'auth.signIn.'
    }))

    return {
      ...i18n,
      decFields,
      onSubmit: (values: any) => {
        authStore.actions.logIn(values.userName)
        $router.push("/")
      },
    }
  },
}
</script>
