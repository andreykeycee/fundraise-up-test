import { Currency, CurrencyCode } from '~/types'
import { applyExchangeRate } from '~/helpers'

type State = {
  presets: number[]
  donateValue: number
  currentCurrencyCode: CurrencyCode
  currencies: Currency[]
}

export const state = (): State => ({
  presets: [40, 100, 200, 1000, 2500, 5000],
  donateValue: 40,
  currentCurrencyCode: 'USD',
  currencies: [
    { name: 'US Dollar', code: 'USD', symbol: '$', rate: 1 },
    { name: 'Euro', code: 'EUR', symbol: '€', rate: 0.897597 },
    { name: 'British Pound', code: 'GBP', symbol: '£', rate: 0.81755 },
    { name: 'Russian Ruble', code: 'RUB', symbol: '₽', rate: 63.461993 }
  ]
})

export const getters = {
  currencyByCode: (state: State) => (code: CurrencyCode) => {
    return state.currencies.find((c: Currency) => c.code === code)
  },

  currentCurrency: (state: State, getters: any) => {
    return getters.currencyByCode(state.currentCurrencyCode)
  },

  currentPresets: (state: State, getters: any) => {
    const currentCurrency = getters.currentCurrency
    return applyExchangeRate(state.presets, currentCurrency)
  }
}

export const actions = {
  setCurrency: ({ commit, dispatch, getters }: any, code: CurrencyCode) => {
    commit('SET', { key: 'currentCurrencyCode', value: code })
    dispatch('setDonateValue', getters.currentPresets[0])
  },

  setDonateValue: ({ commit }: any, value: number) => {
    commit('SET', { key: 'donateValue', value })
  },

  sendDonate: async ({ state }: any) => {
    const { donateValue, currentCurrencyCode } = state

    const body = JSON.stringify({
      amount: donateValue,
      currency: currentCurrencyCode
    })

    const res = await fetch('http://localhost:4000/donate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    })
    if (!res.ok) {
      throw new Error('unexpected error')
    }
  }
}

export const mutations = {
  SET: <K extends keyof State> (state: State, { key, value }: {
    key: K,
    value: State[K]
  }) => {
    state[key] = value
  }
}
