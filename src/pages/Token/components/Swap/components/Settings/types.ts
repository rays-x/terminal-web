export interface SwapSettings {
  slippage: number
  deadlineMins: number
  maxHops: number
}

export interface SwapSettingsProps {
  config: { slippages: number[] }
  settings: SwapSettings;
  onChange: (cb: (settings: SwapSettings) => SwapSettings) => void;
}
