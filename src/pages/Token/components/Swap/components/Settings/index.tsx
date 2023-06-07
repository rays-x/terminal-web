import { memo } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { SwapSettings, SwapSettingsProps } from './types'

import './styles.scss'

export const SettingsModal = memo(
  ({ config, settings, onChange }: SwapSettingsProps) => {
    return (
      <div className="settings-modal">
        <div className="settings-modal_row">
          <div className="token-item-text-title">
            Slippage
          </div>
          <div>
            <ToggleGroup.Root
              type="single"
              className="ToggleGroup"
              value={settings.slippage.toString()}
              onValueChange={(value) =>
                onChange((settings: SwapSettings) => ({
                  ...settings,
                  slippage: Number.parseFloat(value),
                }))
              }
            >
              {config.slippages.map((slippage) => (
                <ToggleGroup.Item
                  className="ToggleGroupItem"
                  value={slippage.toString()}
                  aria-label="Left aligned"
                  key={slippage.toString()}
                >
                  {slippage}%
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          </div>
        </div>
        <div className="settings-modal_row">
          <div className="token-item-text-title">
            Deadline (minutes)
          </div>
          <div className="settings-modal_row_numeric">
            <input
              type="number"
              className="token-search-input token-search-design"
              placeholder="Minutes"
              autoComplete="off"
              value={settings.deadlineMins}
              onChange={({ target }) => {
                onChange((settings: SwapSettings) => ({
                  ...settings,
                  deadlineMins: Number.parseInt(
                    target.value,
                    10,
                  ),
                }))
              }}
            />
          </div>
        </div>
        <div className="settings-modal_row">
          <div className="token-item-text-title">
            Max hops
          </div>
          <div className="settings-modal_row_numeric">
            <input
              type="number"
              className="token-search-input token-search-design"
              placeholder="Minutes"
              autoComplete="off"
              value={settings.maxHops}
              onChange={({ target }) => {
                onChange((settings: SwapSettings) => ({
                  ...settings,
                  maxHops: Number.parseInt(
                    target.value,
                    10,
                  ),
                }))
              }}
            />
          </div>
        </div>
      </div>
    )
  },
)
