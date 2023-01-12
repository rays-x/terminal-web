import React, {useContext} from 'react';
import {CurrentCoinData} from '../../CoinPage';
import {SwapStyled} from './Swap-styled';
import Select from "react-select";
import './swap.css'
const BNB='';
const USDT='';
const USDC='';
const RAX='';
export const Swap = React.memo(() => {
  const currentCoinData = useContext(CurrentCoinData);

  const options = React.useMemo(
    () => [
      {
        value: "BUSD",
        address: '',
        label: (
          <span className="select2-selection__result">
              <img src={BNB} className="select2-selection__flag" />
              BUSD
            </span>
        ),
      },
      {
        value: "USDT",
        address: '',
        label: (
          <span className="select2-selection__result">
              <img src={USDT} className="select2-selection__flag" />
              USDT
            </span>
        ),
      },
      {
        value: "BNB",
        address: '',
        label: (
          <span className="select2-selection__result">
              <img src={BNB} className="select2-selection__flag" />
              BNB
            </span>
        ),
      },
      {
        value: "USDC",
        address: '',
        label: (
          <span className="select2-selection__result">
              <img src={USDC} className="select2-selection__flag" />
              USDC
            </span>
        ),
      },
    ],
    [],
  );
  const defaultToken = options[0];
  const [selectedToken, setSelectedToken] = React.useState<typeof options[number]>(defaultToken);
  const [amount, setAmount] = React.useState("0");
  const [raxAmount, setRaxAmount] = React.useState("0");

  React.useEffect(() => {
    for (const element of document.querySelectorAll(".js-address")) {
      const address = element.querySelector<HTMLInputElement>("[data-address]")?.value;
      if (!address) {
        continue;
      }
      const shortAddress = "".concat(address.slice(0, 5), "...").concat(address.slice(-3));
      const addressElement = element.querySelector("[data-shortaddress]");
      if (addressElement) {
        addressElement.textContent = shortAddress;
      }
    }
  }, []);
  React.useEffect(() => {
    const newAmount =
      selectedToken.value === "BNB"
        ? parseFloat(raxAmount) * 1
        : parseFloat(raxAmount) * 1;
    // if (checkAmountIsValid(newAmount.toFixed(2))) {
      setAmount(newAmount.toFixed(2));
    // }
  }, [selectedToken]);
  return (
    <SwapStyled.Container>
      <div className="sale__exchange">
        <div className="sale__field">
          <div className="sale__field-content">
            <div className="sale__field-select">
              <div className="select">
                <Select
                  name="token"
                  className="select__select"
                  defaultValue={defaultToken}
                  options={options}
                  isSearchable={false}
                  styles={{
                    valueContainer: provided => ({
                      ...provided,
                      padding: 0,
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    dropdownIndicator: provided => ({
                      ...provided,
                      padding: "4px",
                      color: "#fff !important",
                    }),
                    control: provided => ({
                      ...provided,
                      cursor: "pointer",
                      border: "none",
                      boxShadow: "none",
                      minHeight: 0,
                    }),
                    option: provided => ({
                      ...provided,
                      cursor: "pointer",
                    }),
                  }}
                  theme={theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      neutral5: "#0f1017",
                      neutral10: "#0f1017",
                      neutral0: "#0f1017",
                      primary25: "#5897fb",
                      primary: "#5897fb",
                    },
                  })}
                  onChange={newVal => setSelectedToken(newVal ?? options[0])}
                />
              </div>
            </div>
            <div className="sale__input-wrapper">
              <input
                name="coin"
                placeholder="0"
                className="sale__input"
                autoComplete="off"
                aria-autocomplete="none"
                value={amount}
                onChange={e => {
                  setAmount(e.target.value);
                  // if (!checkAmountIsValid(e.target.value)) return;
                  const newAmount =
                    selectedToken.value === "BNB"
                      ? parseFloat(e.target.value) / 1
                      : parseFloat(e.target.value) / 1;
                  setRaxAmount(newAmount.toFixed(2));
                }}
              />
            </div>
          </div>
        </div>
        <div className="sale__arrow-wrapper">
          <div className="sale__arrow"></div>
        </div>
        <div className="sale__field">
          <div className="sale__field-content">
            <div className="sale__field-select">
              <div className="select">
                <Select
                  name="token"
                  className="select__select"
                  defaultValue={defaultToken}
                  options={options}
                  isSearchable={false}
                  styles={{
                    valueContainer: provided => ({
                      ...provided,
                      padding: 0,
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    dropdownIndicator: provided => ({
                      ...provided,
                      padding: "4px",
                      color: "#fff !important",
                    }),
                    control: provided => ({
                      ...provided,
                      cursor: "pointer",
                      border: "none",
                      boxShadow: "none",
                      minHeight: 0,
                    }),
                    option: provided => ({
                      ...provided,
                      cursor: "pointer",
                    }),
                  }}
                  theme={theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      neutral5: "#0f1017",
                      neutral10: "#0f1017",
                      neutral0: "#0f1017",
                      primary25: "#5897fb",
                      primary: "#5897fb",
                    },
                  })}
                  onChange={newVal => setSelectedToken(newVal ?? options[0])}
                />
              </div>
            </div>
            <div className="sale__input-wrapper">
              <input
                name="coin"
                placeholder="0"
                className="sale__input"
                autoComplete="off"
                aria-autocomplete="none"
                value={amount}
                onChange={e => {
                  setAmount(e.target.value);
                  // if (!checkAmountIsValid(e.target.value)) return;
                  const newAmount =
                    selectedToken.value === "BNB"
                      ? parseFloat(e.target.value) / 1
                      : parseFloat(e.target.value) / 1;
                  setRaxAmount(newAmount.toFixed(2));
                }}
              />
            </div>
          </div>
        </div>
        <div className="sale__exchange-info">
          <div className="sale__exchange-item">
            <div className="sale__exchange-text">
              {/* <span className="sale__exchange-title">1 BNB =</span>{" "}
                                    {(1 / TOKEN_PRICE_IN_BNB).toFixed(0)} $RAX */}
              <span className="sale__exchange-title">MIN </span>{" "} $10{" "}
              <span className="sale__exchange-title">MAX </span>{" "} $20,000
            </div>
          </div>
          <div className="sale__exchange-item">
            <div className="sale__exchange-text">
              <span className="sale__exchange-title">1 USD =</span>{" "}
              {(1 / 1).toFixed(0)} $RAX
            </div>
          </div>
        </div>
      </div>
    </SwapStyled.Container>
  );
});
export default Swap;