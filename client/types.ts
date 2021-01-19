export type CurrencyCode = 'USD'
| 'EUR'
| 'GBP'
| 'RUB'

export type Currency = {
  name: string
  code: CurrencyCode
  symbol: string
  rate: number
}
