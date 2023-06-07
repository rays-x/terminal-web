import React, { MouseEventHandler, memo } from 'react'
import { TokenInfo } from '../../providers/interface'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'

interface Props {
  tokens: TokenInfo[]
  search: string
  selectedTokenId: string
  onTokenUpdated: (id: string) => unknown
}

export const TokenList = memo(
  ({
    tokens,
    search,
    selectedTokenId,
    onTokenUpdated,
  }: Props) => {
    const list = React.useMemo(() => {
      return (
        tokens.filter(({ address, name, symbol }) => {
          return search
            ? `${address}${name}${symbol}`
                .toLowerCase()
                .includes(search?.toLowerCase())
            : true
        }) || []
      )
    }, [tokens, search])

    const Row = React.useCallback(
      ({ index, style }) => {
        const token = list[index]
        const selected = token.id === selectedTokenId

        return (
          <div
            className="token-item"
            onClick={() => {
              onTokenUpdated(token.id)
              close()
            }}
            key={token.id}
            style={
              selected
                ? {
                    ...style,
                    opacity: '0.4',
                    pointerEvents: 'none',
                  }
                : style
            }
          >
            <div
              className="logo-of-token"
              style={{
                backgroundImage: `url(${token.logoURI})`,
              }}
            />
            <div className="token-item-text-wrapper">
              <div>
                <span className="token-item-text-title">
                  {token.name}
                </span>
              </div>
              <div className="token-item-text-subtitle">
                <span className="token-item-text-title-symbol">
                  {token.symbol}
                </span>
                <span>From {token.source}</span>
              </div>
            </div>
            <div className="token-item-balance"></div>
            {selected && (
              <div className="token-item-checkbox">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sc-1e2o00j-0 bFBqfA"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </div>
        )
      },
      [list],
    )

    return (
      <div className="list-of-tokens">
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              width={width}
              height={height}
              itemCount={list.length}
              itemSize={56}
            >
              {Row}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    )
  },
)
