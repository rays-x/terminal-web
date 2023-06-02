import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import web3Utils from 'web3-utils'
import { CurrentCoinData } from '../../CoinPage'
import { SwapStyled } from './Swap-styled'
import IconSwapArrow from '../../../../assets/icons/new/SwapArrow.svg'
import IconSwapSelectArrow from '../../../../assets/icons/new/SwapSelectArrow.svg'
import IconSwapSlippageButton from '../../../../assets/icons/new/SwapSlippageButton.svg'
import './swap.css'
import { AnimatedGradientButton } from '../../../../components/_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton'
import { useNetworkWallet } from '../../../../store/networkWallet'
import { useLazyFetch } from '../../../../hooks/useFetch'
import { debounce, get } from 'lodash'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import {
  web3toDecimalsInputValue,
  web3ToZeros,
} from '../../../../utils/web3toDecimalsValue'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SwapTokens0xPriceResponse } from '../../../../types/api/SwapTokens0xResponse'
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi'
import {
  fromTokenUnitAmount,
  toTokenUnitAmount,
} from '@0x/utils'
import {
  AvailableTokens,
  ExchangeProvider,
  TokenInfo,
  TransactionRequestWithRecipient,
} from './providers/interface'
import { TokenList } from './components/TokenList'
import { exchangeProviders } from './providers'
import { addressFormat } from '../../../../utils/addressFormat'
import { TailSpin } from 'react-loader-spinner'

const INIT_AMOUNT = '0.00'
const DEBOUNCE_TIMEOUT = 1500

interface TokensState {
  from?: TokenInfo
  to?: TokenInfo
}

export const Swap = React.memo(() => {
  const [data, setData] = useState<AvailableTokens>()

  const [amountFrom, setAmountFrom] =
    useState<string>(INIT_AMOUNT)
  const [amountTo, setAmountTo] =
    useState<string>(INIT_AMOUNT)

  const [modalOpened, setModalOpened] = React.useState<
    'from' | 'to' | undefined
  >()

  const [search, setSearch] = React.useState<string>('')

  const [swapData, setSwapData] = React.useState({
    price: undefined,
    guaranteedPrice: undefined,
  })

  const [tokens, setTokens] = React.useState<TokensState>({
    from: undefined,
    to: undefined,
  })

  const refModal = React.useRef(null)
  const close = React.useCallback(() => {
    setModalOpened(undefined)
    setSearch('')
  }, [])
  const { network } = useNetworkWallet()
  const { address } = useAccount()
  const [balance, setBalance] =
    useState<string>(INIT_AMOUNT)

  useEffect(() => {
    ;(async () => {
      if (!network?.id || !exchangeProviders[network.id]) {
        return
      }

      setLoading(true)

      const availableTokens =
        // @ts-ignore
        await exchangeProviders[
          network.id
        ].getAvailableTokens()

      setData(availableTokens)

      setTokens({
        from: availableTokens.tokens[0],
        to: availableTokens.tokens[1],
      })

      setLoading(false)
    })()
  }, [network?.id])

  const switchTokens = React.useCallback(() => {
    setTokens(({ from, to }) => ({
      from: to,
      to: from,
    }))
  }, [])

  const [request, setRequest] = useState<
    TransactionRequestWithRecipient | undefined
  >()

  const [step, setStep] = useState<'prepare' | 'swap'>(
    'prepare',
  )

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!tokens.from || !network?.id || !address) {
      return
    }
    // @ts-ignore
    exchangeProviders[network.id]
      ?.getErc20TokenBalance(tokens.from, address)
      .then((balance) => setBalance(balance))
  }, [tokens.from?.address])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (
        !tokens.from ||
        !tokens.to ||
        !network?.id ||
        !address ||
        !Number.parseFloat(amountFrom)
      ) {
        return
      }

      setLoading(true)

      Promise.all([
        // @ts-ignore
        exchangeProviders[network.id]
          .estimate(tokens.from, tokens.to, amountFrom)
          .then(({ quoteTokenAmount }) =>
            setAmountTo(quoteTokenAmount),
          ),
        // @ts-ignore
        exchangeProviders[network.id]
          ?.prepareSwap(tokens.from, amountFrom, address)
          .then((res) => {
            setRequest(res)
          }),
        // @ts-ignore
        exchangeProviders[network.id]
          ?.getErc20TokenBalance(tokens.from, address)
          .then((balance) => setBalance(balance)),
      ]).finally(() => setLoading(false))
    }, DEBOUNCE_TIMEOUT)

    return () => clearTimeout(delayDebounceFn)
  }, [amountFrom, tokens.from?.address, tokens.to?.address])

  useEffect(() => {
    if (
      step === 'swap' &&
      tokens.from &&
      tokens.to &&
      address &&
      Number.parseFloat(amountFrom)
    ) {
      // @ts-ignore
      exchangeProviders[network.id]
        ?.swap(tokens.from, tokens.to, amountFrom, address)
        .then((res) => {
          setRequest(res)
        })
    }
  }, [step])

  const isInitAmount = React.useMemo(
    () =>
      !tokens.from || !tokens.to
        ? true
        : amountTo === INIT_AMOUNT,
    [amountFrom, amountTo],
  )

  const { config } = usePrepareSendTransaction({ request })

  const {
    sendTransaction,
    data: sendedTxData,
    isError,
  } = useSendTransaction(config)

  const info = useMemo(
    () =>
      network && exchangeProviders[network.id]?.getInfo(),
    [exchangeProviders, network],
  )

  return (
    <SwapStyled.Container>
      <div className="sale__exchange">
        <div className="sale__exchange_header">
          <div className="sale__exchange_header_logo">
            <div className="sale__exchange_header_logo_title">
              Powered by
            </div>
            <div className="sale__exchange_header_logo_chain">
              {info
                ? <div><span>{info.name}</span><img width={14} height={14} src={info.logoURI}/></div>
                : 'Network not supported'}
            </div>
          </div>
          <div className="sale__exchange_header_heading">
            Swap
          </div>
          <div className="sale__exchange_header_slippage">
            <span className="sale__exchange_header_slippage_title">
              Slippage:&nbsp;
            </span>
            <span className="sale__exchange_header_slippage_subtitle">
              Auto
            </span>
            <span
              className="sale__exchange_header_slippage_icon"
              style={{
                backgroundImage: `url(${IconSwapSlippageButton})`,
              }}
            />
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
                        {tokens.from?.symbol.toUpperCase()}
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
                      Balance: {balance}{' '}
                      <span
                        className="sale__link-info"
                        onClick={() => {
                          if (step === 'prepare') {
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
                        {tokens.to?.symbol.toUpperCase()}
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
                    value={amountTo}
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
                  if (isInitAmount) {
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
                  return (
                    <div>
                      <AnimatedGradientButton
                        selected
                        onClick={() => {
                          sendTransaction?.()
                          setStep((step) =>
                            step === 'swap'
                              ? 'prepare'
                              : 'swap',
                          )
                        }}
                        width="100%"
                        height={51}
                      >
                        {step === 'swap'
                          ? 'Swap'
                          : `Enable ${tokens.from?.symbol.toUpperCase()}`}
                      </AnimatedGradientButton>
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
                {swapData?.price && (
                  <>
                    <span className="sale__exchange-title">
                      Price:
                    </span>{' '}
                    {web3ToZeros(swapData.price)}{' '}
                    {tokens.to?.symbol}
                  </>
                )}
              </div>
            </div>
            <div className="sale__exchange-item">
              <div className="sale__exchange-text">
                {swapData?.guaranteedPrice && (
                  <>
                    <span className="sale__exchange-title">
                      Guaranteed Price:
                    </span>{' '}
                    {web3ToZeros(swapData.guaranteedPrice)}{' '}
                    {tokens.to?.symbol}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalOpened && (
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
                    setSearch(value)
                  }}
                  type="text"
                  className="token-search-input token-search-design"
                  placeholder="Search name or paste address"
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </div>
            {modalOpened && data?.tokens && (
              <TokenList
                search={search}
                selectedTokenId={
                  tokens[modalOpened]?.id || ''
                }
                tokens={data.tokens}
                onTokenUpdated={(id) => {
                  setTokens((_tokens) => ({
                    ..._tokens,
                    [modalOpened]: data.tokens.find(
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
    </SwapStyled.Container>
  )
})
export default Swap
