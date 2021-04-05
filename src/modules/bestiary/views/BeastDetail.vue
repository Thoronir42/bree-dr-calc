<template>
  <div class="beast-detail">
    <h1>{{ t('bestiary.view.BeastDetail' + (beastId ? '' : '.new')) }}</h1>

    <div class="card">
      <div class="card-body">
        <BeastForm :beast="beast">
          <template v-slot:additionalSections>
            <DachshundFieldset/>
          </template>
        </BeastForm>
      </div>

      <div class="card-footer">
        <button class="btn btn-primary" type="submit" @click="saveBeast">Uložit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue"
import {useRouter} from "vue-router"
import {useI18n} from "@i18n"

import * as beastsStore from "../store/beastsStore"
import BeastForm from "../components/BeastForm.vue"
import {Beast} from "../model/Bestiary"
import DachshundFieldset from "@/modules/bestiary-dachshund/components/DachshundFieldset.vue"


export default defineComponent({
  components: {
    BeastForm,
    DachshundFieldset,
  },
  props: {
    beastId: {type: String},
  },
  setup(props) {
    const $router = useRouter()
    const i18n = useI18n()

    const beast = reactive({
      id: null as string | null,
      general: {},
      dachshund: {},
      lineage: {},
    })

    if (props.beastId) {
      beastsStore.actions.getBeast(props.beastId, 'raw')
        .then((loadedBeast) => {
          if (!loadedBeast) {
            throw new Error("Beast not found")
          }
          beast.id = loadedBeast.id
          beast.general = {...loadedBeast.general}
          beast.lineage = {...loadedBeast.lineage}
          beast.dachshund = {...(loadedBeast as any).dachshund}
        })
    }

    const saveBeast = () => {
      const b = beast as unknown as Beast
      const savePromise = props.beastId
        ? beastsStore.actions.updateBeast(b)
        : beastsStore.actions.addBeast(b)

      savePromise
        .then(() => {
          $router.push({name: "bestiary.MyBeasts"})
        })
        .catch((err) => console.error(err))
    }

    return {
      ...i18n,

      beast,
      saveBeast,
    }
  },
})
</script>
