import React, {useContext} from 'react';
import {CurrentCoinData} from '../../CoinPage';
import {SwapStyled} from './Swap-styled';
import IconSwapArrow from '../../../../assets/icons/new/SwapArrow.svg';
import IconSwapSelectArrow from '../../../../assets/icons/new/SwapSelectArrow.svg';
import IconSwapSlippageButton from '../../../../assets/icons/new/SwapSlippageButton.svg';
import './swap.css';
import {
  AnimatedGradientButton
} from '../../../../components/_old/ui/Buttons/AnimatedGradientButton/AnimatedGradientButton';
import {useNetworkWallet} from '../../../../store/networkWallet';
import {useLazyFetch} from '../../../../hooks/useFetch';
import {get} from 'lodash';
import {FixedSizeList as List} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {web3toDecimalsInputValue, web3ToZeros} from '../../../../utils/web3toDecimalsValue';
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {SwapTokens0xPriceResponse} from '../../../../types/api/SwapTokens0xResponse';
import {useAccount, usePrepareSendTransaction, useSendTransaction} from 'wagmi';
import {fromTokenUnitAmount, toTokenUnitAmount} from '@0x/utils';


const INIT_AMOUNT = '0.00';
type TokensState = {
  last?: 'from' | 'to'
  from?: {
    id: string
    symbol: string
    address: string
    decimals: number
    amount: string
    balance: string
  }
  to?: {
    id: string
    symbol: string
    address: string
    decimals: number
    amount: string
    balance: string
  }
}
export const Swap = React.memo(() => {
  const currentCoinData = useContext(CurrentCoinData);
  const [modalOpened, setModalOpened] = React.useState<'from' | 'to'>(undefined);
  const [search, setSearch] = React.useState<string>(undefined);
  const [swapData, setSwapData] = React.useState({
    price: undefined,
    guaranteedPrice: undefined
  });
  const [tokens, setTokens] = React.useState<TokensState>({
    last: undefined,
    from: undefined,
    to: undefined
  });
  const [amountFrom, setAmountFrom] = React.useState<string>();
  const [amountTo, setAmountTo] = React.useState<string>();
  const refModal = React.useRef(null);
  const close = React.useCallback(() => {
    setModalOpened(undefined);
    setSearch(undefined);
  }, []);
  const {network} = useNetworkWallet();
  const {address} = useAccount();
  const [{data}, getTokens] = useLazyFetch<SwapTokensResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/swap/tokens`,
    withCredentials: false
  });
  const [{data: dataPrice, error: errorPrice}, getPrice] = useLazyFetch<SwapTokens0xPriceResponse>({
    withCredentials: false
  });
  const platform = React.useMemo(() => {
    return currentCoinData.platforms.find(({id}) => id === network.id);
  }, [currentCoinData.id, network]);
  const setAmount = React.useCallback((type: 'from' | 'to', amount) => {
    setTokens((prev) => {
      if(type !== prev.last) {
        switch(prev.last) {
          case 'to': {
            if(amountFrom) {
              setAmountFrom(undefined);
            }
            break;
          }
          case 'from': {
            if(amountTo) {
              setAmountTo(undefined);
            }
            break;
          }
        }
      }
      return {
        ...prev,
        [type]: {
          ...prev[type],
          amount
        },
        last: type
      };
    });
  }, [amountFrom, amountTo]);
  const switchTokens = React.useCallback(() => {
    setTokens(({last, from, to}) => ({
      last,
      from: to,
      to: from
    }));
  }, []);
  const list = React.useMemo(() => {
    return data?.tokens
    .filter(({address, name, symbol}) => {
      return search ? `${address}${name}${symbol}`.toLowerCase().includes(search?.toLowerCase()) : true;
    }) || [];
  }, [data, search]);
  const Row = React.useCallback(({index, style}) => {
    const token = list[index];
    const selected = token.id === tokens[modalOpened]?.id;
    return (
      <div className="token-item"
           onClick={() => {
             setTokens((prev) => ({
               ...prev,
               [modalOpened]: {
                 ...prev[modalOpened],
                 id: token.id,
                 symbol: token.symbol,
                 address: token.address,
                 decimals: token.decimals
               }
             }));
             close();
           }}
           key={token.id}
           style={selected ? {
             ...style,
             opacity: '0.4',
             pointerEvents: 'none'
           } : style}
      >
        <div className="logo-of-token"
             style={{
               backgroundImage: `url(${token.logoURI})`
             }}
        />
        <div className="token-item-text-wrapper">
          <div className="token-item-text-title">
            {token.name}
          </div>
          <div className="token-item-text-subtitle">
            {token.symbol}
          </div>
        </div>
        <div className="token-item-balance">
        </div>
        {
          selected && (
            <div className="token-item-checkbox">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   className="sc-1e2o00j-0 bFBqfA">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )
        }
      </div>
    );
  }, [list, modalOpened]);
  const checkIfInitAmount = React.useCallback(() => {
    return (!tokens.from || !tokens.to)
      ? true
      : tokens?.from.amount === INIT_AMOUNT && tokens?.to.amount === INIT_AMOUNT;
  }, [tokens]);
  const isInitAmount = React.useMemo(() => checkIfInitAmount(), [tokens]);
  const {config} = usePrepareSendTransaction({
    request: {
      from: address,
      to: get(dataPrice, 'to'),
      value: get(dataPrice, 'value'),
      data: get(dataPrice, 'data'),
      gasLimit: get(dataPrice, 'gas'),
      gasPrice: get(dataPrice, 'gasPrice'),
    }
  });
  const {sendTransaction} = useSendTransaction(config);
  React.useEffect(() => {
    getTokens({
      params: {
        chain: network.id
      }
    }).catch();
  }, [network]);
  React.useEffect(() => {
    if(!data) {
      return;
    }
    const filtered = platform ? data.tokens.filter(({
                                                      id
                                                    }) => id !== currentCoinData.id) : data.tokens;
    const [from, to] = [{
      id: platform ? currentCoinData.id : get(filtered, '0.id'),
      symbol: platform ? currentCoinData.index : get(filtered, '0.symbol'),
      address: platform ? platform.address : get(filtered, '0.address'),
      decimals: platform ? platform.decimals : get(filtered, '0.decimals'),
      amount: '0.00',
      balance: ''
    }, {
      id: platform ? get(filtered, '0.id') : get(filtered, '1.id'),
      symbol: platform ? get(filtered, '0.symbol') : get(filtered, '1.symbol'),
      address: platform ? get(filtered, '0.address') : get(filtered, '1.address'),
      decimals: platform ? get(filtered, '0.decimals') : get(filtered, '1.decimals'),
      amount: '0.00',
      balance: ''
    }];
    setTokens({from, to});
  }, [data]);
  React.useEffect(() => {
    if(
      !network
      || checkIfInitAmount()
    ) {
      return;
    }
    getPrice({
      url: `${network.swapApi}/swap/v1/quote`,
      params: {
        affiliateAddress: '0x86003b044f70dac0abc80ac8957305b6370893ed',
        ...((() => {
          switch(tokens.last) {
            case 'to': {
              return {
                buyAmount: fromTokenUnitAmount(tokens.to?.amount, tokens.from?.decimals)
              };
            }
            case 'from':
            default: {
              return {
                sellAmount: fromTokenUnitAmount(tokens.from?.amount, tokens.from?.decimals)
              };
            }
          }
        })()),
        buyToken: tokens.to?.address,
        includePriceComparisons: false,
        intentOnFilling: true,
        sellToken: tokens.from?.address,
        skipValidation: false,
        slippagePercentage: 0.005,
        takerAddress: address,
      }
    })
    .catch((e) => console.error(e));
  }, [network, tokens, isInitAmount]);
  React.useEffect(() => {
    if(errorPrice) {
      return setSwapData({
        price: undefined,
        guaranteedPrice: undefined
      });
    }
    if(!dataPrice) {
      return;
    }
    setSwapData({
      price: dataPrice.price,
      guaranteedPrice: dataPrice.guaranteedPrice
    });
    switch(tokens.last) {
      case 'to': {
        setAmountFrom(toTokenUnitAmount(dataPrice.sellAmount, tokens.from?.decimals).toString());
        break;
      }
      case 'from': {
        setAmountTo(toTokenUnitAmount(dataPrice.buyAmount, tokens.to?.decimals).toString());
        break;
      }
    }
  }, [dataPrice, errorPrice]);
  return (
    <SwapStyled.Container>
      <div className="sale__exchange">
        <div className="sale__exchange_header">
          <div className="sale__exchange_header_logo">
            <div className="sale__exchange_header_logo_title">Powered by</div>
            <div className="sale__exchange_header_logo_chain">
              {network?.label}
            </div>
          </div>
          <div className="sale__exchange_header_heading">Swap</div>
          <div className="sale__exchange_header_slippage">
            <span className="sale__exchange_header_slippage_title">Slippage:&nbsp;</span>
            <span className="sale__exchange_header_slippage_subtitle">Auto</span>
            <span className="sale__exchange_header_slippage_icon"
                  style={{
                    backgroundImage: `url(${IconSwapSlippageButton})`
                  }}
            />
          </div>
        </div>
        <div className="sale__exchange_body">
          <div className="sale__exchange_body_container">
            <div className="sale__field">
              <div className="sale__field-content">
                <div className="sale__field-select" onClick={() => setModalOpened('from')}>
                  <div className="select">
                    <div className="select__select"
                    >
                      <span>{tokens.from?.symbol}</span>
                      <span className="select__select_arrow"
                            style={{
                              backgroundImage: `url(${IconSwapSelectArrow})`
                            }}
                      />
                    </div>
                    {tokens.from?.balance && (
                      <div className="select__sub_select">
                        Balance: {tokens.from?.balance}
                      </div>
                    )}
                  </div>
                </div>
                <div className="sale__input-wrapper">
                  <input
                    name="coin"
                    placeholder="0"
                    className="sale__input"
                    autoComplete="off"
                    aria-autocomplete="none"
                    value={amountFrom || tokens.from?.amount || ''}
                    onChange={({target: {value}}) => {
                      setAmount('from', web3toDecimalsInputValue(value, tokens.from?.decimals));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sale__arrow-wrapper" onClick={switchTokens}>
              <div className="sale__swap_arrow"
                   style={{
                     backgroundImage: `url(${IconSwapArrow})`
                   }}
              />
            </div>
            <div className="sale__field">
              <div className="sale__field-content">
                <div className="sale__field-select" onClick={() => setModalOpened('to')}>
                  <div className="select">
                    <div className="select__select">
                      <span>{tokens.to?.symbol}</span>
                      <span className="select__select_arrow"
                            style={{
                              backgroundImage: `url(${IconSwapSelectArrow})`
                            }}
                      />
                    </div>
                    {tokens.to?.balance && (
                      <div className="select__sub_select">
                        Balance: {tokens.to?.balance}
                      </div>
                    )}
                  </div>
                </div>
                <div className="sale__input-wrapper">
                  <input
                    name="coin"
                    placeholder="0"
                    className="sale__input"
                    autoComplete="off"
                    aria-autocomplete="none"
                    value={amountTo || tokens.to?.amount || ''}
                    onChange={({target: {value}}) => {
                      setAmount('to', web3toDecimalsInputValue(value, tokens.to?.decimals));
                    }}
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
                  mounted
                }) => {
                const isReady = mounted && authenticationStatus !== 'loading';
                const isConnected =
                  isReady &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');
                return (() => {
                  if(!isConnected) {
                    return (
                      <AnimatedGradientButton
                        selected
                        onClick={openConnectModal}
                        width="100%"
                        height={51}
                      >
                        Connect Wallet
                      </AnimatedGradientButton>
                    );
                  }
                  if(chain.unsupported) {
                    return (
                      <AnimatedGradientButton
                        selected
                        onClick={openChainModal}
                        width="100%"
                        height={51}
                      >
                        Wrong network
                      </AnimatedGradientButton>
                    );
                  }
                  if(errorPrice) {
                    return (
                      <AnimatedGradientButton
                        selected
                        onClick={() => {
                        }}
                        width="100%"
                        height={51}
                      >
                        {
                          get(errorPrice, 'response.data.validationErrors.0.reason')
                          || get(errorPrice, 'response.data.values.message')
                          || get(errorPrice, 'response.data.reason')
                          || 'error'
                        }
                      </AnimatedGradientButton>
                    );
                  }
                  if(isInitAmount) {
                    return (
                      <AnimatedGradientButton
                        disabled={true}
                        selected
                        onClick={() => {
                        }}
                        width="100%"
                        height={51}
                      >
                        Review Order
                      </AnimatedGradientButton>
                    );
                  }
                  return (
                    <AnimatedGradientButton
                      selected
                      onClick={() => {
                        sendTransaction();
                      }}
                      width="100%"
                      height={51}
                    >
                      Swap
                    </AnimatedGradientButton>
                  );
                })();
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
                    <span
                      className="sale__exchange-title">Price:</span> {web3ToZeros(swapData.price)} {tokens.to?.symbol}
                  </>
                )}
              </div>
            </div>
            <div className="sale__exchange-item">
              <div className="sale__exchange-text">
                {swapData?.guaranteedPrice && (
                  <>
                    <span
                      className="sale__exchange-title">Guaranteed Price:</span> {web3ToZeros(swapData.guaranteedPrice)} {tokens.to?.symbol}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalOpened && (
        <div className="modal-select-token"
             ref={refModal}
             onClick={({target}) => {
               if(target !== refModal.current) {
                 return;
               }
               close();
             }}
        >
          <div className="select-token">
            <div className="headline">
              <div className="headline-search">
                <div className="name">Select a token</div>
                <svg
                  onClick={close}
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  color="rgb(152, 161, 192)" cursor="pointer"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="sc-7yzmni-0 ezZlS">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <div className="search-field">
                <input
                  onChange={({target: {value}}) => {
                    setSearch(value);
                  }}
                  type="text"
                  className="token-search-input token-search-design"
                  placeholder="Search name or paste address"
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </div>
            <div className="list-of-tokens">
              <AutoSizer>
                {({height, width}) => (
                  <List
                    width={width}
                    height={height}
                    itemCount={list.length}
                    itemSize={56}
                  >
                    {Row}
                  </List>
                )}
              </AutoSizer>
            </div>
          </div>
        </div>
      )}
    </SwapStyled.Container>
  );
});
export default Swap;