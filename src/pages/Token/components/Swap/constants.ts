export const INIT_AMOUNT = '0.00'

export const SettingsConfig = {
  slippages: [0.25, 0.5, 1, 3].map((slippage) => slippage / 100),
  defaultDeadlineMins: 5,
  defaultMaxHops: 2,
}
