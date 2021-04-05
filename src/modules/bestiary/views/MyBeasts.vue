<template>
  <div class="beast-index">
    <div class="heading mb-2">
      <h1>{{ t('bestiary.view.MyBeasts') }}</h1>
      <router-link :to="{name: 'bestiary.NewBeast'}" class="btn btn-primary ml-auto">{{
          t('bestiary.actions.createBeast')
        }}
      </router-link>
      <router-link :to="{name: 'bestiary.Pairing'}" class="btn btn-outline-primary ml-2">{{
          t('bestiary.view.Pairing')
        }}
      </router-link>
    </div>

    <div class="list-options">
      <ComposableFilter :filtering="filtering"/>
      <b>Řazení</b><br/>
      <a href="#" @click="sorting.toggleSort('general.name')">Podle jména: {{ sorting.sortDirectionLabel('general.name') }}</a>
    </div>

    <div class="beast-listing">
      <div v-for="beast in beastList" :key="beast.id" class="card card-beast">
        <span class="gender">{{ t('bestiary.beast.gender.' + (beast.general.gender || '?')) }}</span>

        <div class="beast-text">
          <span class="full-name">
            <span class="name">{{ beast.general.name }}</span>
            <span class="station">&nbsp;{{
                breedingStationName(beast.general.breedingStation) || 'Neznámá stanice'
              }}</span>
          </span>
          <span class="evidence-code">{{ beast.general.evidenceCode || 'Bez evidenčního čísla' }}</span>
        </div>

        <router-link :to="{name: 'bestiary.BeastDetail', params: {beastId: beast.id}}"
                     class="btn btn-sm btn-light ml-auto">Upravit
        </router-link>
        <button :class="['btn btn-sm', deleteId === beast.id ? 'btn-outline-danger' : 'btn-outline-warning']"
                @click="deleteBeast(beast.id)"
        >Odebrat
        </button>
      </div>
    </div>
    <Pagination v-model:page="pagination.value.page" :max-page="pagination.value.totalPages" class="mt-2"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from "vue"
import {useI18n} from "@i18n"
import {createSorting, createFiltering, createPagination, collectionPage, useCollections} from "@vtf-collection"
import ComposableFilter from "@vtf-ui/ComposableFilter.vue"
import Pagination from "@vtf-ui/Pagination.vue"

import * as beastsStore from "../store/beastsStore"
import {Beast} from "../model/Bestiary"


export default defineComponent({
  components: {
    ComposableFilter,
    Pagination,
  },
  props: {
    ...collectionPage.props,
  },
  setup(props) {
    const deleteId = ref<string | null>(null)
    const i18n = useI18n()
    const collections = useCollections()

    const filtering = createFiltering([
      {
        path: 'general.gender',
        label: 'bestiary.beast.general.gender',
        defaultValue: 'm'
      },
    ])

    const sorting = createSorting([
      {path: 'general.name'},
    ])
    sorting.toggleSort('general.name')

    const pagination = createPagination()
    watch(() => props.page, (page) => pagination.value.page = page)

    const beastList = ref([] as Beast[])
    watch([filtering.value, sorting.value, pagination.value], ([filtering, sort, pagination]) => {
      const collection = collections.fetchCollection<Beast>('bestiary:beast', undefined, filtering, sort, pagination)
      if (collection instanceof Promise) {
        console.warn("Whoops")
        return
      }
      beastList.value = collection.items
      pagination.totalPages = collection.pagination?.totalPages ?? pagination.totalPages

    }, {immediate: true})

    return {
      ...i18n,

      beastList,
      filtering,
      sorting,
      pagination,

      breedingStationName: beastsStore.getters.breedingStationName,

      deleteId,
      deleteBeast(id: string) {
        if (deleteId.value !== id) {
          deleteId.value = id
          return
        }
        beastsStore.actions.deleteBeast(id)
      },
    }
  },
})
</script>

<style lang="scss">
.beast-index {
  .heading {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

.card-beast {
  padding: 0.5em;

  display: flex;
  flex-direction: row;
  align-items: center;

  &:not(:first-child) {
    margin-top: 0.5em;
  }

  > *:not(:last-child) {
    margin-right: 0.5em;
  }

  .gender {
    padding: 0.5em;
  }

  .beast-text {
    display: flex;
    flex-direction: column;
  }

  .full-name {
    font-weight: bold;
  }

  .evidence-code {
    color: dimgray;
  }
}
</style>
