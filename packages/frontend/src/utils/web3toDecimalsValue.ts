import {get} from 'lodash';
import {toFixedToken} from './diff';

export function web3toDecimalsValue(amount: string = '', decimals: number = 18) {
  const _amount = amount.replace('.', '0').replace(/^0+/, '');
  const steps = (decimals + 1) - _amount.length;
  const result = steps > 0 ? Array.from({length: steps}).reduce<string>(_ => `${_}0`, _amount) : _amount;
  return result.substring(0, (decimals + 1));
}

export function web3toDecimalsInputValue(value: string = '', decimals: number = 18) {
  const amount = String(value).split('').reduce((prev, next) => {
    const split = prev?.match(/[,.]/);
    const allow = split ? /[0-9]/.test(next) : /[0-9]|,|\./.test(next);
    return !allow ? prev : `${prev}${next}`;
  }, '');
  const steps = (decimals + 1) - amount.length;
  const result = steps > 0 ? Array.from({length: steps}).reduce<string>(_ => `${_}0`, amount) : amount;
  const userZeros = value.match(/0+$/)?.[0]?.length || 0;
  const _result = result.substring(0, (decimals + 1)).replace(/0+$/, userZeros ? Array.from({length: userZeros}).reduce<string>(_ => `${_}0`, '') : '');
  return _result.endsWith('.') && value.endsWith('.') ? _result : (
    _result.endsWith('.') ?
      _result.replace('.', '0')
      : _result
  );
}

export function web3ToZeros(tokenPrice: string | number) {
  const regex = String(tokenPrice).match(/.+\.0+[1-9]{1,2}(?<replace>.+)/);
  const replace = get(regex, 'groups.replace');
  if(replace) {
    tokenPrice = String(tokenPrice).replace(replace, '');
  } else {
    tokenPrice = toFixedToken(Number(tokenPrice), 2);
  }
  const zeros = get(String(tokenPrice).match(/.0+/), 0, []).length - 2;
  if(zeros > 1) {
    return String(tokenPrice).replace(/.0+/, `.0<span class="zeros">${zeros}</span>`);
  }
  return tokenPrice;
}