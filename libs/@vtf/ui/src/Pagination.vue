<template>

  <nav aria-label="Stránkování">
    <ul class="pagination justify-content-center">
      <li :class="['page-item', prevDisabled && 'disabled']">
        <a class="page-link" href="#" aria-label="Předcházející" @click.prevent="goTo(page - 1)">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Předcházející</span>
        </a>
      </li>

      <li class="page-item" v-if="pageFrom > minPage">
        <a href="#" class="page-link" @click="goTo(minPage)">1</a>
      </li>

      <li :class="['page-item', pageFrom + n - 1 === page && 'active']" v-for="n in (pageTo - pageFrom + 1)" :key="pageFrom + n">
        <a class="page-link" href="#"
           @click.prevent="goTo(pageFrom + n - 1)">{{ pageFrom + n - 1 }}</a>
      </li>

      <li class="page-item" v-if="pageTo < maxPage">
        <a href="#" class="page-link" @click="goTo(maxPage)">{{ maxPage }}</a>
      </li>

      <li :class="['page-item', nextDisabled && 'disabled']">
        <a class="page-link" href="#" aria-label="Nadcházející" @click.prevent="goTo(page + 1)">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Nadcházející</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";

export default defineComponent({
  props: {
    page: {type: Number, required: true},
    maxPage: {type: Number, required: true},
    minPage: {type: Number, default: 1},
    displayRange: {type: Number, default: 2},
  },
  setup(props, context) {
    const prevDisabled = computed(() => props.page <= props.minPage)
    const nextDisabled = computed(() => props.page >= props.maxPage)

    const pageFromTarget = computed(() => props.page - props.displayRange)
    const pageToTarget = computed(() => props.page + props.displayRange)
    const targetLinkCount = computed(() => props.displayRange * 2 + 1)

    const pageFrom = computed(() => {
      const cappedTarget = Math.min(props.maxPage - targetLinkCount.value, pageFromTarget.value)
      return Math.max(props.minPage, cappedTarget)
    })

    const pageTo = computed(() => {
      const cappedTarget = Math.max(props.minPage + targetLinkCount.value, pageToTarget.value)
      return Math.min(props.maxPage, cappedTarget)
    })

    return {
      prevDisabled,
      nextDisabled,
      pageFrom,
      pageTo,

      goTo(page: number) {
        context.emit('update:page', page)
      },
    }
  },
})
</script>
