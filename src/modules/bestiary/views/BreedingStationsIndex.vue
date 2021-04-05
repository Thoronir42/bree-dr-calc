<template>
  <h1>{{ t('bestiary.view.BreedingStationsIndex') }}</h1>

  <div class="stations-listing">
    <div v-for="station in stations" :key="station.id" class="card card-station">
      <RegioFlag :code="station.country" class="flag"/>
      <div class="station-text">
        <div class="name">{{ station.name }}</div>
        <div class="id">{{ station.id }}</div>
      </div>
      <div class="actions">
        <div class="btn-group btn-group-vertical">
          <div class="btn btn-sm btn-outline-primary" @click="editStation(station.id)">Upravit</div>
          <div :class="[
            'btn btn-sm',
             deleteId === station.id ? 'btn-outline-danger' : 'btn-outline-warning'
             ]" @click="deleteStation(station.id)">Smazat</div>
        </div>

      </div>
    </div>

    <div v-if="!stations.length">
      Aktuálně zde nejsou žádné chovatelksé stanice
    </div>
  </div>

  <hr/>

  <div class="card">
    <div class="card-header">
      <button v-if="!stationWorkingCopy" class="btn btn-sm btn-primary" @click="newStation">Evidovat novou stanici
      </button>
      <button v-if="stationWorkingCopy" class="btn btn-sm btn-warning" @click="discardWorkingCopy">Zavřít</button>
    </div>

    <div v-if="stationWorkingCopy" class="card-body">
      <BreedingStationForm :is-persisted="stationIsPersisted" :station="stationWorkingCopy"/>
    </div>

    <div v-if="stationWorkingCopy" class="card-footer">
      <button class="btn btn-primary" @click="saveStation">Uložit</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue"
import {useI18n} from "@i18n"
import RegioFlag from "@i18n/components/RegioFlag"

import * as beastsStore from "../store/beastsStore"
import {BreedingStation} from "../model/Bestiary"
import BreedingStationForm from "../components/BreedingStationForm.vue"

export default defineComponent({
  components: {
    BreedingStationForm,
    RegioFlag,
  },
  setup() {
    const i18n = useI18n()

    const stations = beastsStore.state.breedingStations
    const stationWorkingCopy = ref<BreedingStation | null>(null)
    const stationIsPersisted = ref(false)
    const deleteId = ref(null as string|null)

    return {
      ...i18n,
      stations,

      stationWorkingCopy,
      stationIsPersisted,

      newStation: () => {
        stationWorkingCopy.value = {id: '', name: '', country: 'CZ'}
        stationIsPersisted.value = false
      },
      editStation: (id: string) => {
        const station = stations.find((s) => s.id === id)!
        stationWorkingCopy.value = {...station}
        stationIsPersisted.value = true
      },
      discardWorkingCopy: () => stationWorkingCopy.value = null,
      saveStation: () => {
        const station = stationWorkingCopy.value
        if (!station) {
          throw new Error("No station to be saved")
        }

        let savePromise = stationIsPersisted.value
          ? beastsStore.actions.updateStation(station)
          : beastsStore.actions.createNewStation(station)

        savePromise
          .then(() => {
            stationWorkingCopy.value = null
          })
          .catch((error) => console.error(error))
      },
      deleteId,
      deleteStation: (id: string) => {
        if (deleteId.value !== id) {
          deleteId.value = id;
          return
        }
        beastsStore.actions.deleteStation(id)
      }
    }
  },
})
</script>

<style lang="scss">
.stations-listing {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-right: -0.5em;

  .card-station {
    flex: 1 1 320px;

    margin-bottom: 0.5em;
    margin-right: 0.5em;
  }
}

.card-station {
  padding: 1em;

  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.5em;

  .flag {
    align-self: center;
    font-size: 16pt;
    margin: 0 0.25em;
  }

  .actions {
    min-width: 80px;

    .btn-group {
      width: 100%;
    }
  }

}
</style>
