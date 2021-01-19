<template>
  <donate-widget />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DonateWidget from '~/components/DonateWidget.vue'

@Component({
  components: { DonateWidget }
})
export default class IndexPage extends Vue {}
</script>

<style>
</style>
