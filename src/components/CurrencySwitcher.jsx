"use client"

import { useCurrency } from "../context/CurrencyContext"

const CurrencySwitcher = () => {
  const { currency, setCurrency, exchangeRates } = useCurrency()

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="currency" className="text-white text-sm">
        Currency:
      </label>
      <select
        id="currency"
        value={currency}
        onChange={handleCurrencyChange}
        className="border rounded-md p-1 bg-[#00603A] text-white border-white focus:outline-none focus:ring-1 focus:ring-white text-sm"
      >
        {Object.keys(exchangeRates).map((curr) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CurrencySwitcher
