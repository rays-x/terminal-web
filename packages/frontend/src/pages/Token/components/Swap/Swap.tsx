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
import Web3 from 'web3';

type TokensState = {
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
  const refModal = React.useRef(null);
  // const [listRef, {height}] = useElementSize();
  const close = React.useCallback(() => {
    setModalOpened(undefined);
    setSearch(undefined);
  }, []);
  const {network} = useNetworkWallet();
  const [{data}, getTokens] = useLazyFetch<SwapTokensResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/swap/tokens`,
    withCredentials: false
  });
  const platform = React.useMemo(() => {
    return currentCoinData.platforms.find(({id}) => id === network.id);
  }, [currentCoinData.id, network]);
  React.useEffect(() => {
    getTokens({
      params: {
        chain: network.id
      }
    }).catch();
  }, [network]);
  React.useEffect(() => {
    if (!data) {
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
  const [tokens, setTokens] = React.useState<TokensState>({
    from: undefined,
    to: undefined
  });
  const setAmount = React.useCallback((type: 'from' | 'to', amount) => {
    setTokens((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        amount
      }
    }));
  }, []);
  const switchTokens = React.useCallback(() => {
    setTokens(({from, to}) => ({
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
                 address: token.address
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
  console.log('fromt', tokens.from?.amount, tokens.from?.decimals);
  console.log('fromtparse', tokens.from?.amount ? Web3.utils.toWei(`${tokens.from?.amount}`, tokens.from?.decimals).toString() : undefined);
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
                    value={tokens.from?.amount || ''}
                    onChange={({target: {value: ev}}) => {
                      const value = String(ev).split('').reduce((prev, next) => {
                        const split = prev?.match(/[,.]/);
                        const allow = split ? /[0-9]/.test(next) : /[0-9]|,|\./.test(next);
                        return !allow ? prev : `${prev}${next}`;
                      }, '');
                      try {
                        setAmount('from', value.endsWith('.')
                          ? value
                          : FixedNumber.fromString(value).round(tokens?.from.decimals).toString());
                      } catch (e) {
                        setAmount('from', FixedNumber.fromString('0.00').round(tokens?.from.decimals).toString());
                      }
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
                    value={tokens.to?.amount || ''}
                    onChange={({target: {value: ev}}) => {
                      const value = String(ev).split('').reduce((prev, next) => {
                        const split = prev?.match(/[,.]/);
                        const allow = split ? /[0-9]/.test(next) : /[0-9]|,|\./.test(next);
                        return !allow ? prev : `${prev}${next}`;
                      }, '');
                      try {
                        setAmount('to', value.endsWith('.')
                          ? value
                          : FixedNumber.fromString(value).round(tokens?.to.decimals).toString());
                      } catch (e) {
                        setAmount('to', FixedNumber.fromString('0.00').round(tokens?.to.decimals).toString());
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sale__button">
            <AnimatedGradientButton
              selected
              onClick={() => {
              }}
              width="100%"
              height={51}
            >
              Connect Wallet
            </AnimatedGradientButton>
          </div>
        </div>
        <div className="sale__exchange_footer">
          <div className="sale__exchange-info">
            <div className="sale__exchange-item">
              <div className="sale__exchange-text">
                <span className="sale__exchange-title">Price:</span> 10 {tokens.to?.symbol}
              </div>
            </div>
            <div className="sale__exchange-item">
              <div className="sale__exchange-text">
                <span className="sale__exchange-title">Guaranteed Price:</span> 10 {tokens.to?.symbol}
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalOpened && (
        <div className="modal-select-token"
             ref={refModal}
             onClick={({target}) => {
               if (target !== refModal.current) {
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