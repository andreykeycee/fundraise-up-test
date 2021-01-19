<template>
  <div class="donate-widget">
    <div class="donate-widget__presets">
      <div
        class="donate-widget__preset-button"
        v-for="(preset, index) in presets"
        :class="{ active: assertButtonActive(preset) }"
        :key="index"
        @click="setPresetToValue(preset)"
      >
        {{ presetText(preset) }}
      </div>
    </div>

    <div class="donate-widget__input-container">
      <currency-dropdown
        class="donate-widget__currency-dropdown"
        v-model="selectedCurrency"
        :currencies="currencyCodes"
        @select-currency="selectedCurrency = $event"
      />
      <div class="donate-widget__symbol">{{ currencySymbol }}</div>
      <input class="donate-widget__input" v-model="donateValue" ref="input"/>
    </div>

    <div class="donate-widget__donate-button" @click="sendDonate">
      DONATE
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Currency, CurrencyCode } from '~/types'
import CurrencyDropdown from '~/components/CurrencyDropdown.vue'
import { castToNumeric, formatToLocale, formatValue } from '~/helpers'

@Component({
  components: { CurrencyDropdown }
})
export default class DonateWidget extends Vue {
  $refs!: {
    input: HTMLInputElement
  }

  get presets () {
    return this.$store.getters.currentPresets
  }

  get presetText () {
    return getPresetText(this.$store.getters.currentCurrency)
  }

  get currencyCodes () {
    return this.$store.state.currencies.map((c: Currency) => c.code)
  }

  get currencySymbol () {
    return this.$store.getters.currentCurrency.symbol
  }

  get assertButtonActive () {
    return (preset: number) => preset === +castToNumeric(this.donateValue)
  }

  get donateValue () {
    return formatToLocale(this.$store.state.donateValue)
  }
  set donateValue (rawValue: string | number) {
    this.$refs.input.value = formatValue(rawValue)
    this.$store.dispatch('setDonateValue', +castToNumeric(String(rawValue)))
  }

  get selectedCurrency () {
    return this.$store.state.currentCurrencyCode
  }
  set selectedCurrency (code: CurrencyCode) {
    this.$store.dispatch('setCurrency', code)
  }

  setPresetToValue (preset: number) {
    this.donateValue = preset
  }

  async sendDonate () {
    try {
      await this.$store.dispatch('sendDonate')
      alert('Thank you for your donation!')
    } catch (e) {
      console.error(e)
    }
  }
}

const getPresetText = ({ code, symbol }: Currency) => (preset: number) => {
  const formattedPreset = formatToLocale(preset)

  return code === 'RUB'
    ? `${formattedPreset}${symbol}`
    : `${symbol}${formattedPreset}`
}
</script>

<style lang="sass" scoped>
.donate-widget
  background: aliceblue
  width: 350px
  padding: 20px

  &__presets
    display: grid
    grid-template-columns: repeat(3,  1fr)
    grid-gap: 4px

  &__preset-button
    border: 1px solid #526488
    border-radius: 3px
    background: white
    padding: 6px 12px
    font-weight: 500
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    &:hover, &.active
      background: #526488
      color: white

  &__input-container
    position: relative
    margin-top: 20px

  &__symbol
    position: absolute
    top: 9px
    left: 8px
    font-weight: 500
    font-size: 18px

  &__input
    height: 42px
    width: 100%
    font-size: 20px
    font-weight: 600
    color: #526488
    padding-left: 20px
    padding-right: 50px

  &__currency-dropdown
    position: absolute
    right: 0
    top: 6px

  &__donate-button
    cursor: pointer
    padding: 8px 0
    background: #526488
    border-radius: 3px
    display: flex
    align-items: center
    justify-content: center
    font-size: 20px
    font-weight: 500
    color: white
    margin-top: 20px
</style>
