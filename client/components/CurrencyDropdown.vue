<template>
  <div class="currency-dropdown">
    <div class="currency-dropdown__selected" @click="toggleDropdown">
      <div class="currency-dropdown__selected-text">{{ value }}</div>
      <div
        class="currency-dropdown__arrow"
        :class="{ active: doShowDropdown}"
      />
    </div>

    <div class="currency-dropdown__list" v-if="doShowDropdown">
      <div
        class="currency-dropdown__list-item"
        v-for="(code, index) in currencies"
        :key="index"
        @click="selectItem(code)"
      >
        {{ code }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CurrencyCode } from '~/types'

@Component
export default class CurrencyDropdown extends Vue {
  @Prop({ default: 'USD'})
  value!: CurrencyCode

  @Prop({ default: () => [] })
  currencies!: CurrencyCode[]

  doShowDropdown: boolean = false

  toggleDropdown () {
    this.doShowDropdown = !this.doShowDropdown
  }

  selectItem (code: CurrencyCode) {
    this.$emit('select-currency', code)
    this.toggleDropdown()
  }
}
</script>

<style lang="sass" scoped>
.currency-dropdown
  &__selected
    display: flex
    align-items: center
    padding: 4px
    cursor: pointer

  &__selected-text
    font-weight: 500
    margin-right: 2px

  &__arrow
    width: 0
    height: 0
    border-style: solid
    border-color: #526488 transparent transparent transparent
    border-width: 4px 4px 0 4px
    transition: all .2s ease-in-out

    &.active
      transform: rotate(180deg)

  &__list
    padding: 4px 0
    background: white
    border: 1px solid #526488
    border-radius: 3px

  &__list-item
    padding: 0 4px
    &:hover
      cursor: pointer
      background: #526488
      color: white
</style>
