import { Currency } from '~/types'

export const applyExchangeRate = (presets: number[], currency: Currency) => {
  const rate = currency.rate || 0
  const flooredRate = rate < 1
    ? Math.floor(rate * 10) / 10
    : rate >= 1 && rate < 10
      ? Math.floor(rate)
      : Math.floor(rate / 10) * 10

  return presets.map(preset => Math.floor((preset * flooredRate) / 10) * 10)
}

export const formatValue = (value: string | number) => {
  const replaced = castToNumeric(String(value))
  return formatToLocale(replaced)
}

export const castToNumeric = (rawValue: string) => {
  return rawValue.replace(/\D+/g, '')
}

export const formatToLocale = (rawValue: string | number) => {
  return Number(rawValue).toLocaleString('en-US')
}
