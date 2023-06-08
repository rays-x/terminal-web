export const INIT_AMOUNT = '0.00'

export const SettingsConfig = {
  slippages: [0.25, 0.5, 1, 3].map(
    (slippage) => slippage / 100,
  ),
  defaultDeadlineMins: 5,
  defaultMaxHops: 2,
}

export const SAMPLE_ADDRESS =
  '0xA560d1094dB5B6F5f3c4e332b623C5e2134a2fB5'
