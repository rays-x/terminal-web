import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { CurrentCoinData } from '../../CoinPage'
import { SwapStyled } from './Swap-styled'
import IconSwapArrow from '../../../../assets/icons/new/SwapArrow.svg'
import IconSwapSelectArrow from '../../../../assets/icons/new/SwapSelectArrow.svg'
import IconSwapSlippageButton from '../../../../assets/icons/new/SwapSlippageButton.svg'
import './swap.css'
import { AnimatedGradientButton } from '../../../../components/_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton'
import { useNetworkWallet } from '../../../../store/networkWallet'
import { web3ToZeros } from '../../../../utils/web3toDecimalsValue'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi'
import { TokenList } from './components/TokenList'
import { exchangeProviders } from './providers'
import { addressFormat } from '../../../../utils/addressFormat'
import { ThreeDots, TailSpin } from 'react-loader-spinner'
import { TokensState } from './types'
import {
  useAvailableTokens,
  useBalance,
  useEstimation,
  useSteps,
} from './hooks'
import { SettingsModal } from './components/Settings'
import { SwapSettings } from './components/Settings/types'
import { INIT_AMOUNT, SettingsConfig } from './constants'

export const Swap = memo(() => {
  const currentCoinData = useContext(CurrentCoinData)

  const [step, setStep] = useState<number>(0)

  const [settings, setSettings] = useState<SwapSettings>({
    slippage: SettingsConfig.slippages[0],
    deadlineMins: SettingsConfig.defaultDeadlineMins,
    maxHops: SettingsConfig.defaultMaxHops,
  })

  const [amountFrom, setAmountFrom] =
    useState<string>(INIT_AMOUNT)

  const [modalOpened, setModalOpened] = useState<
    'from' | 'to' | 'settings' | undefined
  >()

  const [modalSearch, setModalSearch] = useState<string>('')

  const [pair, setPair] = useState<TokensState>({
    from: undefined,
    to: undefined,
  })

  const refModal = useRef(null)
  const close = useCallback(() => {
    setModalOpened(undefined)
    setModalSearch('')
  }, [])

  const { network } = useNetworkWallet()
  const { address = '' } = useAccount()

  const switchTokens = useCallback(() => {
    setPair(({ from, to }) => ({
      from: to,
      to: from,
    }))
  }, [])

  const exchangeProvider = useMemo(
    () =>
      network ? exchangeProviders[network.id] : undefined,
    [network],
  )

  const {
    availableTokens,
    loading: loadingTokens,
    error: errorTokens,
  } = useAvailableTokens(exchangeProvider)

  useEffect(() => {
    if (!availableTokens) {
      return
    }

    const tokenAddress = currentCoinData?.platforms.find(
      ({ blockchain }) => blockchain.bqSlug === network?.id,
    )?.address

    setPair({
      from:
        availableTokens.tokens.find(
          (token) => token.address.toLowerCase() === tokenAddress,
        ) || availableTokens.tokens[0],
      to: availableTokens.tokens[1],
    })

    setStep(0)
  }, [
    exchangeProvider,
    availableTokens,
    currentCoinData,
    network?.id,
  ])

  const {
    balance,
    loading: loadingBalance,
    reload: reloadBalance,
  } = useBalance(exchangeProvider, pair.from, address)

  const {
    estimation,
    loading: loadingEstimation,
    error: errorEstimation,
    reload: reloadEstimation,
  } = useEstimation(
    pair,
    amountFrom,
    address,
    settings,
    exchangeProvider,
  )

  const isInitAmount = useMemo(
    () => !pair.from || !pair.to,
    [amountFrom],
  )

  const {
    txBody,
    loading: loadingSteps,
    error: errorSteps,
  } = useSteps(
    step,
    settings,
    exchangeProvider,
    estimation,
    address,
  )

  const { config } = usePrepareSendTransaction({
    request: txBody,
  })

  const {
    sendTransaction,
    data: sendedTxData,
    isError,
    isSuccess,
    isLoading,
    reset,
  } = useSendTransaction(config)

  useEffect(() => {
    if (isSuccess) {
      setStep((_step) => _step + 1)
    }
  }, [sendedTxData?.hash])

  const reload = useCallback(() => {
    reloadBalance()
    reloadEstimation()
  }, [reloadBalance, reloadEstimation])

  const resetData = useCallback(() => {
    setStep(0)
    reload()
    reset?.()
  }, [])

  const info = useMemo(
    () =>
      network && exchangeProviders[network.id]?.getInfo(),
    [exchangeProviders, network],
  )

  const loading =
    loadingSteps ||
    loadingTokens ||
    loadingEstimation ||
    isLoading

  const error = errorEstimation || errorTokens || errorSteps

  return (
    <SwapStyled.Container>
      <div className="sale__exchange">
        <div className="sale__exchange_header">
          <div className="sale__exchange_header_logo">
            <div className="sale__exchange_header_logo_title">
              Powered by
            </div>
            <div className="sale__exchange_header_logo_chain">
              {info ? (
                <div>
                  <span>{info.name}</span>
                  <img
                    width={14}
                    height={14}
                    src={info.logoURI}
                  />
                </div>
              ) : (
                'Network not supported'
              )}
            </div>
          </div>
          <div className="sale__exchange_header_heading">
            Swap
          </div>
          <div className="sale__exchange_header_items">
            <div
              className="sale__exchange_header_item"
              onClick={reload}
            >
              <span>Reload</span>
            </div>
            <div
              className="sale__exchange_header_item"
              onClick={() => {
                setModalOpened('settings')
              }}
            >
              <span className="sale__exchange_header_item_subtitle">
                Swap settings
              </span>
              <span
                className="sale__exchange_header_item_icon"
                style={{
                  backgroundImage: `url(${IconSwapSlippageButton})`,
                }}
              />
            </div>
          </div>
        </div>
        <div className="sale__exchange_body">
          <div className="sale__exchange_body_container">
            <div className="sale__field">
              <div className="sale__field-content">
                <div className="sale__field-select">
                  <div className="select">
                    <div
                      className="select__select"
                      onClick={() => setModalOpened('from')}
                    >
                      <span>
                        {pair.from?.symbol.toUpperCase()}
                      </span>
                      <span
                        className="select__select_arrow"
                        style={{
                          backgroundImage: `url(${IconSwapSelectArrow})`,
                        }}
                      />
                    </div>
                    {address && (
                      <div className="select__sub_select">
                        Address:{' '}
                        {addressFormat(address, 26)}
                      </div>
                    )}
                    <div className="select__sub_select">
                      <span>Balance:</span>
                      <div className="select__sub_select_balance">
                        <ThreeDots
                          width={18}
                          height={18}
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={loadingBalance}
                          color="white"
                        />
                        {!loadingBalance && (
                          <span>{balance}</span>
                        )}
                      </div>
                      <span
                        className="sale__link-info"
                        onClick={() => {
                          if (step === 0) {
                            setAmountFrom(balance)
                          }
                        }}
                      >
                        MAX
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sale__input-wrapper">
                  <input
                    name="coin"
                    placeholder="0"
                    className="sale__input"
                    autoComplete="off"
                    aria-autocomplete="none"
                    value={amountFrom}
                    onChange={({ target: { value } }) => {
                      setAmountFrom(value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sale__arrow-wrapper">
              {loading ? (
                <TailSpin
                  height="46"
                  width="46"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                <div
                  className="sale__swap_arrow"
                  onClick={switchTokens}
                  style={{
                    backgroundImage: `url(${IconSwapArrow})`,
                  }}
                />
              )}
            </div>
            <div className="sale__field">
              <div className="sale__field-content">
                <div
                  className="sale__field-select"
                  onClick={() => setModalOpened('to')}
                >
                  <div className="select">
                    <div className="select__select">
                      <span>
                        {pair.to?.symbol.toUpperCase()}
                      </span>
                      <span
                        className="select__select_arrow"
                        style={{
                          backgroundImage: `url(${IconSwapSelectArrow})`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="sale__input-wrapper">
                  <input
                    name="coin"
                    placeholder="0"
                    className="sale__input"
                    autoComplete="off"
                    aria-autocomplete="none"
                    value={
                      estimation?.quoteTokenAmount ||
                      INIT_AMOUNT
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sale__button">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const isReady =
                  mounted &&
                  authenticationStatus !== 'loading'
                const isConnected =
                  isReady &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus ===
                      'authenticated')

                return (() => {
                  if (!isConnected) {
                    return (
                      <AnimatedGradientButton
                        selected
                        onClick={openConnectModal}
                        width="100%"
                        height={51}
                      >
                        Connect Wallet
                      </AnimatedGradientButton>
                    )
                  }
                  if (chain.unsupported) {
                    return (
                      <AnimatedGradientButton
                        selected
                        onClick={openChainModal}
                        width="100%"
                        height={51}
                      >
                        Wrong network
                      </AnimatedGradientButton>
                    )
                  }

                  if (isInitAmount || loading) {
                    return (
                      <div>
                        <AnimatedGradientButton
                          disabled={true}
                          selected
                          onClick={() => {}}
                          width="100%"
                          height={51}
                        >
                          Review Order
                        </AnimatedGradientButton>
                        {account.balanceFormatted && (
                          <span className="sale__exchange-title">
                            Balance {account.displayBalance}
                          </span>
                        )}
                      </div>
                    )
                  }

                  if (isError || error) {
                    return (
                      <div>
                        <div
                          className={
                            'sale__input-retry_button'
                          }
                          onClick={resetData}
                        >
                          {error ? `${error} ` : ''}Retry.
                        </div>
                        {account.balanceFormatted && (
                          <span className="sale__exchange-title">
                            Balance {account.displayBalance}
                          </span>
                        )}
                      </div>
                    )
                  }

                  if (step < 2) {
                    return (
                      <div>
                        <AnimatedGradientButton
                          selected
                          onClick={() => {
                            if (!loading) {
                              sendTransaction?.()
                            }
                          }}
                          width="100%"
                          height={51}
                        >
                          {step === 1
                            ? 'Swap'
                            : `Enable ${pair.from?.symbol.toUpperCase()}`}
                        </AnimatedGradientButton>
                        {account.balanceFormatted && (
                          <span className="sale__exchange-title">
                            Balance {account.displayBalance}
                          </span>
                        )}
                      </div>
                    )
                  }

                  return (
                    <div>
                      <div
                        className={
                          'sale__input-success_button'
                        }
                        onClick={resetData}
                      >
                        Success
                      </div>
                      {account.balanceFormatted && (
                        <span className="sale__exchange-title">
                          Balance {account.displayBalance}
                        </span>
                      )}
                    </div>
                  )
                })()
              }}
            </ConnectButton.Custom>
          </div>
        </div>
        <div className="sale__exchange_footer">
          <div className="sale__exchange-info">
            <div className="sale__exchange-item">
              <div className="sale__exchange-text">
                {estimation && (
                  <>
                    <span className="sale__exchange-title">
                      Pools:
                    </span>{' '}
                    {estimation.swaps
                      .map(
                        (pool) =>
                          `${pool.baseSymbol}/${pool.quoteSymbol}`,
                      )
                      .join(' > ')}
                  </>
                )}
              </div>
            </div>
            <div className="sale__exchange-item">
              <div className="sale__exchange-text">
                {estimation?.price && (
                  <>
                    <span className="sale__exchange-title">
                      Price:
                    </span>{' '}
                    {web3ToZeros(estimation.price)}{' '}
                    {pair.to?.symbol}
                  </>
                )}
              </div>
            </div>
            <div className="sale__exchange-item">
              <div className="sale__exchange-text">
                {estimation?.guaranteedPrice && (
                  <>
                    <span className="sale__exchange-title">
                      Guaranteed Price:
                    </span>{' '}
                    {web3ToZeros(
                      estimation.guaranteedPrice,
                    )}{' '}
                    {pair.to?.symbol}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalOpened &&
        ['from', 'to'].includes(modalOpened) && (
          <div
            className="modal-select-token"
            ref={refModal}
            onClick={({ target }) => {
              if (target !== refModal.current) {
                return
              }
              close()
            }}
          >
            <div className="select-token">
              <div className="headline">
                <div className="headline-search">
                  <div className="name">Select a token</div>
                  <svg
                    onClick={close}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="rgb(152, 161, 192)"
                    cursor="pointer"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sc-7yzmni-0 ezZlS"
                  >
                    <line
                      x1="18"
                      y1="6"
                      x2="6"
                      y2="18"
                    ></line>
                    <line
                      x1="6"
                      y1="6"
                      x2="18"
                      y2="18"
                    ></line>
                  </svg>
                </div>
                <div className="search-field">
                  <input
                    onChange={({ target: { value } }) => {
                      setModalSearch(value)
                    }}
                    type="text"
                    className="token-search-input token-search-design"
                    placeholder="Search name or paste address"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
              </div>
              {availableTokens?.tokens && (
                <TokenList
                  search={modalSearch}
                  selectedTokenId={
                    pair[modalOpened as 'from' | 'to']
                      ?.id || ''
                  }
                  tokens={availableTokens.tokens}
                  onTokenUpdated={(id) => {
                    setPair((_tokens) => ({
                      ..._tokens,
                      [modalOpened]:
                        availableTokens.tokens.find(
                          (_t) => _t.id === id,
                        ),
                    }))
                    close()
                  }}
                />
              )}
            </div>
          </div>
        )}
      {modalOpened === 'settings' && (
        <div
          ref={refModal}
          className="modal-select-token"
          onClick={({ target }) => {
            if (target !== refModal.current) {
              return
            }
            close()
          }}
        >
          <div className="select-token">
            <div className="headline">Settings</div>
            <SettingsModal
              settings={settings}
              onChange={setSettings}
              config={SettingsConfig}
            />
          </div>
        </div>
      )}
    </SwapStyled.Container>
  )
})
export default Swap
