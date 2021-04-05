<template>
  <div class="beast-pairing">
    <h1>{{ t('bestiary.view.Pairing') }}</h1>

    <p>
      Párování se počítá pro zvolené šelmy pro jejich předky až do {{ maxCalculationLevel }}. generace. Po zvolení
      šelem se vypočte Wrightův Koeficient a ve spodní části stránky bude možné procházet podrobnosti párování.
    </p>

    <div class="row row-pairing">
      <div class="col-md beast-selection">
        <DecFormInput v-model="pairing.mother" v-bind="pairingFields.mother"/>
      </div>

      <div class="text-center">
        <div :class="[
          'wright-coefficient',
           pairing.mother && 'left-ready',
           pairing.father && 'right-ready',
         ]">
          <span v-if="pairing.mother && pairing.father" class="value">
            <template v-if="wrightCoefficientPct === -1">...</template>
            <template v-else>{{ wrightCoefficientPct.toPrecision(8) }} %</template>
          </span>
          <span v-else>{{ (pairing.mother ? 1 : 0) + (pairing.father ? 1 : 0) }} / 2</span>
        </div>
      </div>

      <div class="col-md beast-selection">
        <DecFormInput v-model="pairing.father" v-bind="pairingFields.father"/>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header">
        <h2>Detaily párování</h2>
        <p>
          Všechny zohledněné šelmy náleží do jednoho z rodokmentů. Každý z těchto rodokmenů se skládá z jedinečných pozic
          označených číselně. V těcho pozicích se vyskytují předchůdci zvolených šelem.<br/>
          Například pozice #2 náleží matce zvolené šelmy a pozice #7 náleží otci otcova otce.
        </p>

        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item" v-for="tab in visualisationTabs" :key="tab.name">
            <a href="#" :class="['nav-link', activeTab === tab.name && 'active']"
               @click.prevent="showTab(tab.name)">{{ t('bestiary.pairing.tab.' + tab.name) }}</a>
          </li>
        </ul>
      </div>

      <div class="card-body">
        <template v-if="activeTab === 'explanation'">
          <MultiOccurrence :max-calculation-level="maxCalculationLevel" :occurrences="beastMultiPresence"/>
        </template>
        <template v-else-if="activeTab === 'lineage'">
          <div class="row">
            <div class="col-md-6">
              <DecFormInput v-model="pairing.maxGenerations" v-bind="pairingFields.maxGenerations"/>
            </div>
            <div class="col-md-6">
              <DecFormInput v-model="pairing.walkOrder" v-bind="pairingFields.walkOrder"
                            @change:model-value="pairing.walkOrder = $event"/>
            </div>
          </div>

          <h3>Matčin rodokmen</h3>
          <AncestryTree v-if="ancestorTrees.mother" :ancestry-tree="ancestorTrees.mother"
                        :expand-levels="pairing.maxGenerations" :walk-relations="walkRelations"
                        root-node-relation="mother"/>

          <h3>Otcův rodokmen</h3>
          <AncestryTree v-if="ancestorTrees.father" :ancestry-tree="ancestorTrees.father"
                        :expand-levels="pairing.maxGenerations" :walk-relations="walkRelations"
                        root-node-relation="father"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {computed, reactive, ref, watch} from "vue"
import {getFields, DecFormInput} from "@vtf-form"
import {useI18n} from "@i18n"

import beastSchema from "../typeful/beast.schema.json"
import * as beastStore from "../store/beastsStore"
import BeastFamilyTree from "../model/BeastFamilyTree"
import * as WrightCalculation from "@/modules/bestiary/utils/WrightCalculation";
import {Beast} from "@/modules/bestiary/model/Bestiary";

import AncestryTree from "@/modules/bestiary/components/AncestryTree.vue";
import MultiOccurrence from "@/modules/bestiary/components/MultiOccurrence.vue";

export default {
  components: {
    MultiOccurrence,
    AncestryTree,
    DecFormInput,
  },
  setup() {
    const i18n = useI18n()
    const maxCalculationLevel = 4

    const pairingFields = getFields({
      maxGenerations: {
        type: "number",
        min: 1,
        max: maxCalculationLevel,
        step: 1,
        label: 'bestiary.pairing.field.maxGenerations'
      },
      mother: beastSchema.lineage.schema.mother,
      father: beastSchema.lineage.schema.father,
      walkOrder: {
        type: "btnSelect",
        options: [
          {value: 'father,mother', label: 'Otec, Matka'},
          {value: 'mother,father', label: 'Matka, Otec'},
          {value: 'father', label: 'Otec'},
          {value: 'mother', label: 'Matka'},
        ],
        label: 'bestiary.pairing.field.walkOrder'
      }
    }, {
      createFieldLabel: 'bestiary.beast.lineage.',
    })

    const pairing = reactive({
      maxGenerations: 4,
      walkOrder: 'father,mother',
      mother: null as string | null,
      father: null as string | null,
    })

    const ancestorTrees = reactive({
      mother: null as BeastFamilyTree | null,
      father: null as BeastFamilyTree | null,
    })

    watch(() => pairing.mother, (m) => {
      ancestorTrees.mother = null
      if (m) {
        beastStore.actions.loadAncestors(m, 'raw', 4)
          .then((tree) => ancestorTrees.mother = tree)
          .catch((err) => console.error("Failed to load ancestor tree for father", err))
      }
    })

    watch(() => pairing.father, (f) => {
      ancestorTrees.father = null
      if (f) {
        beastStore.actions.loadAncestors(f, 'raw', 4)
          .then((tree) => (ancestorTrees.father = tree))
          .catch((err) => console.error("Failed to load ancestor tree for father", err))
      }
    })
    const walkRelations = computed(() => pairing.walkOrder.split(','))

    const beastMultiPresence = computed(() => {
      const trees = ancestorTrees as unknown as { [relation: string]: BeastFamilyTree }
      const presence = WrightCalculation.calculateSharedPresence(trees)
      if (!presence) {
        return null
      }

      const multiOccurringBeasts = WrightCalculation.aggregateMultiOccurrence(presence, getBeast)

      return WrightCalculation.filterCoveredPredecessors<Beast>(multiOccurringBeasts, trees)
    })
    const wrightCoefficient = computed(() => {
      if (!beastMultiPresence.value) {
        return -1
      }
      return WrightCalculation.evaluateWrightCoefficient(beastMultiPresence.value);
    })
    const wrightCoefficientPct = computed(() => {
      const wc = wrightCoefficient.value
      return wc === -1 ? -1 : wc * 100
    })

    const getBeast = (id: string): Beast => {
      const beast = ancestorTrees.mother?.getBeast(id) || ancestorTrees.father?.getBeast(id)
      if (!beast) {
        throw new Error("Beast not found " + beast)
      }
      return beast
    }

    const visualisationTabs = [
      {name: 'explanation'},
      {name: 'lineage'},
    ]
    const activeTab = ref('explanation')

    return {
      ...i18n,

      // Inputs
      maxCalculationLevel,
      pairingFields,
      pairing,

      // Calculation results
      wrightCoefficientPct,
      beastMultiPresence,

      // Pairing visualization
      visualisationTabs,
      activeTab,
      showTab: (tabName: string) => activeTab.value = tabName,

      // Tree visualisation
      ancestorTrees,
      walkRelations,
    }
  },
}
</script>

<style lang="scss">
.row-pairing {
  align-items: center;
}

.wright-coefficient {
  margin: 0 auto;

  width: 200px;
  height: 80px;
  display: grid;
  place-items: center;

  font-size: 16pt;
  font-weight: bold;

  border: transparent 6px dotted;
  background: #eee;
  border-radius: 12px;
  transition: border 0.3s ease;

  &.left-ready {
    border-left-color: #AED581;
  }

  &.right-ready {
    border-right-color: #AED581;
  }

  &.left-ready.right-ready {
    border-color: #AED581;
  }
}

</style>
