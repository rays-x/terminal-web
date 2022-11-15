import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type Bundle = {
  __typename?: 'Bundle';
  /** BNB price, in USD */
  bnbPrice: Scalars['BigDecimal'];
  id: Scalars['ID'];
};

export type Bundle_Filter = {
  bnbPrice?: InputMaybe<Scalars['BigDecimal']>;
  bnbPrice_gt?: InputMaybe<Scalars['BigDecimal']>;
  bnbPrice_gte?: InputMaybe<Scalars['BigDecimal']>;
  bnbPrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  bnbPrice_lt?: InputMaybe<Scalars['BigDecimal']>;
  bnbPrice_lte?: InputMaybe<Scalars['BigDecimal']>;
  bnbPrice_not?: InputMaybe<Scalars['BigDecimal']>;
  bnbPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Bundle_OrderBy {
  BnbPrice = 'bnbPrice',
  Id = 'id'
}

export type Burn = {
  __typename?: 'Burn';
  amount0?: Maybe<Scalars['BigDecimal']>;
  amount1?: Maybe<Scalars['BigDecimal']>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  feeTo?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  logIndex?: Maybe<Scalars['BigInt']>;
  needsComplete: Scalars['Boolean'];
  pair: Pair;
  sender?: Maybe<Scalars['String']>;
  timestamp: Scalars['BigInt'];
  to?: Maybe<Scalars['String']>;
  token0: Token;
  token1: Token;
  transaction: Transaction;
};

export type Burn_Filter = {
  amount0?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeTo?: InputMaybe<Scalars['String']>;
  feeTo_contains?: InputMaybe<Scalars['String']>;
  feeTo_ends_with?: InputMaybe<Scalars['String']>;
  feeTo_gt?: InputMaybe<Scalars['String']>;
  feeTo_gte?: InputMaybe<Scalars['String']>;
  feeTo_in?: InputMaybe<Array<Scalars['String']>>;
  feeTo_lt?: InputMaybe<Scalars['String']>;
  feeTo_lte?: InputMaybe<Scalars['String']>;
  feeTo_not?: InputMaybe<Scalars['String']>;
  feeTo_not_contains?: InputMaybe<Scalars['String']>;
  feeTo_not_ends_with?: InputMaybe<Scalars['String']>;
  feeTo_not_in?: InputMaybe<Array<Scalars['String']>>;
  feeTo_not_starts_with?: InputMaybe<Scalars['String']>;
  feeTo_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  needsComplete?: InputMaybe<Scalars['Boolean']>;
  needsComplete_in?: InputMaybe<Array<Scalars['Boolean']>>;
  needsComplete_not?: InputMaybe<Scalars['Boolean']>;
  needsComplete_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['String']>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  token0?: InputMaybe<Scalars['String']>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Burn_OrderBy {
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  AmountUsd = 'amountUSD',
  FeeLiquidity = 'feeLiquidity',
  FeeTo = 'feeTo',
  Id = 'id',
  Liquidity = 'liquidity',
  LogIndex = 'logIndex',
  NeedsComplete = 'needsComplete',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Token0 = 'token0',
  Token1 = 'token1',
  Transaction = 'transaction'
}

export type Mint = {
  __typename?: 'Mint';
  amount0?: Maybe<Scalars['BigDecimal']>;
  amount1?: Maybe<Scalars['BigDecimal']>;
  amountUSD?: Maybe<Scalars['BigDecimal']>;
  feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  feeTo?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  logIndex?: Maybe<Scalars['BigInt']>;
  pair: Pair;
  sender?: Maybe<Scalars['String']>;
  timestamp: Scalars['BigInt'];
  to: Scalars['String'];
  token0: Token;
  token1: Token;
  transaction: Transaction;
};

export type Mint_Filter = {
  amount0?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  feeLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  feeTo?: InputMaybe<Scalars['String']>;
  feeTo_contains?: InputMaybe<Scalars['String']>;
  feeTo_ends_with?: InputMaybe<Scalars['String']>;
  feeTo_gt?: InputMaybe<Scalars['String']>;
  feeTo_gte?: InputMaybe<Scalars['String']>;
  feeTo_in?: InputMaybe<Array<Scalars['String']>>;
  feeTo_lt?: InputMaybe<Scalars['String']>;
  feeTo_lte?: InputMaybe<Scalars['String']>;
  feeTo_not?: InputMaybe<Scalars['String']>;
  feeTo_not_contains?: InputMaybe<Scalars['String']>;
  feeTo_not_ends_with?: InputMaybe<Scalars['String']>;
  feeTo_not_in?: InputMaybe<Array<Scalars['String']>>;
  feeTo_not_starts_with?: InputMaybe<Scalars['String']>;
  feeTo_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['String']>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  token0?: InputMaybe<Scalars['String']>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Mint_OrderBy {
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  AmountUsd = 'amountUSD',
  FeeLiquidity = 'feeLiquidity',
  FeeTo = 'feeTo',
  Id = 'id',
  Liquidity = 'liquidity',
  LogIndex = 'logIndex',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Token0 = 'token0',
  Token1 = 'token1',
  Transaction = 'transaction'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Pair = {
  __typename?: 'Pair';
  block: Scalars['BigInt'];
  burns: Array<Burn>;
  id: Scalars['ID'];
  mints: Array<Mint>;
  name: Scalars['String'];
  pairHourData: Array<PairHourData>;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveBNB: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  swaps: Array<Swap>;
  timestamp: Scalars['BigInt'];
  token0: Token;
  token0Price: Scalars['BigDecimal'];
  token1: Token;
  token1Price: Scalars['BigDecimal'];
  totalSupply: Scalars['BigDecimal'];
  totalTransactions: Scalars['BigInt'];
  trackedReserveBNB: Scalars['BigDecimal'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
  volumeToken0: Scalars['BigDecimal'];
  volumeToken1: Scalars['BigDecimal'];
  volumeUSD: Scalars['BigDecimal'];
};


export type PairBurnsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};


export type PairMintsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};


export type PairPairHourDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairHourData_Filter>;
};


export type PairSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};

export type PairDayData = {
  __typename?: 'PairDayData';
  dailyTxns: Scalars['BigInt'];
  dailyVolumeToken0: Scalars['BigDecimal'];
  dailyVolumeToken1: Scalars['BigDecimal'];
  dailyVolumeUSD: Scalars['BigDecimal'];
  date: Scalars['Int'];
  id: Scalars['ID'];
  pairAddress: Pair;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  token0: Token;
  token1: Token;
  totalSupply: Scalars['BigDecimal'];
};

export type PairDayData_Filter = {
  dailyTxns?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_gt?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_gte?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dailyTxns_lt?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_lte?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_not?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dailyVolumeToken0?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_gt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_gte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeToken0_lt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_lte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_not?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeToken1?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_gt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_gte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeToken1_lt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_lte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_not?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pairAddress?: InputMaybe<Scalars['String']>;
  pairAddress_contains?: InputMaybe<Scalars['String']>;
  pairAddress_ends_with?: InputMaybe<Scalars['String']>;
  pairAddress_gt?: InputMaybe<Scalars['String']>;
  pairAddress_gte?: InputMaybe<Scalars['String']>;
  pairAddress_in?: InputMaybe<Array<Scalars['String']>>;
  pairAddress_lt?: InputMaybe<Scalars['String']>;
  pairAddress_lte?: InputMaybe<Scalars['String']>;
  pairAddress_not?: InputMaybe<Scalars['String']>;
  pairAddress_not_contains?: InputMaybe<Scalars['String']>;
  pairAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  pairAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  pairAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  pairAddress_starts_with?: InputMaybe<Scalars['String']>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token0?: InputMaybe<Scalars['String']>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum PairDayData_OrderBy {
  DailyTxns = 'dailyTxns',
  DailyVolumeToken0 = 'dailyVolumeToken0',
  DailyVolumeToken1 = 'dailyVolumeToken1',
  DailyVolumeUsd = 'dailyVolumeUSD',
  Date = 'date',
  Id = 'id',
  PairAddress = 'pairAddress',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveUsd = 'reserveUSD',
  Token0 = 'token0',
  Token1 = 'token1',
  TotalSupply = 'totalSupply'
}

export type PairHourData = {
  __typename?: 'PairHourData';
  hourStartUnix: Scalars['Int'];
  hourlyTxns: Scalars['BigInt'];
  hourlyVolumeToken0: Scalars['BigDecimal'];
  hourlyVolumeToken1: Scalars['BigDecimal'];
  hourlyVolumeUSD: Scalars['BigDecimal'];
  id: Scalars['ID'];
  pair: Pair;
  reserve0: Scalars['BigDecimal'];
  reserve1: Scalars['BigDecimal'];
  reserveUSD: Scalars['BigDecimal'];
  totalSupply: Scalars['BigDecimal'];
};

export type PairHourData_Filter = {
  hourStartUnix?: InputMaybe<Scalars['Int']>;
  hourStartUnix_gt?: InputMaybe<Scalars['Int']>;
  hourStartUnix_gte?: InputMaybe<Scalars['Int']>;
  hourStartUnix_in?: InputMaybe<Array<Scalars['Int']>>;
  hourStartUnix_lt?: InputMaybe<Scalars['Int']>;
  hourStartUnix_lte?: InputMaybe<Scalars['Int']>;
  hourStartUnix_not?: InputMaybe<Scalars['Int']>;
  hourStartUnix_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hourlyTxns?: InputMaybe<Scalars['BigInt']>;
  hourlyTxns_gt?: InputMaybe<Scalars['BigInt']>;
  hourlyTxns_gte?: InputMaybe<Scalars['BigInt']>;
  hourlyTxns_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hourlyTxns_lt?: InputMaybe<Scalars['BigInt']>;
  hourlyTxns_lte?: InputMaybe<Scalars['BigInt']>;
  hourlyTxns_not?: InputMaybe<Scalars['BigInt']>;
  hourlyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hourlyVolumeToken0?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_gt?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_gte?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  hourlyVolumeToken0_lt?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_lte?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_not?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  hourlyVolumeToken1?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_gt?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_gte?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  hourlyVolumeToken1_lt?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_lte?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_not?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  hourlyVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  hourlyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  hourlyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum PairHourData_OrderBy {
  HourStartUnix = 'hourStartUnix',
  HourlyTxns = 'hourlyTxns',
  HourlyVolumeToken0 = 'hourlyVolumeToken0',
  HourlyVolumeToken1 = 'hourlyVolumeToken1',
  HourlyVolumeUsd = 'hourlyVolumeUSD',
  Id = 'id',
  Pair = 'pair',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveUsd = 'reserveUSD',
  TotalSupply = 'totalSupply'
}

export type Pair_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  reserve0?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveBNB?: InputMaybe<Scalars['BigDecimal']>;
  reserveBNB_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveBNB_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveBNB_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveBNB_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveBNB_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveBNB_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveBNB_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token0?: InputMaybe<Scalars['String']>;
  token0Price?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1Price?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalTransactions?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransactions_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_not?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  trackedReserveBNB?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveBNB_gt?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveBNB_gte?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveBNB_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  trackedReserveBNB_lt?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveBNB_lte?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveBNB_not?: InputMaybe<Scalars['BigDecimal']>;
  trackedReserveBNB_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Pair_OrderBy {
  Block = 'block',
  Burns = 'burns',
  Id = 'id',
  Mints = 'mints',
  Name = 'name',
  PairHourData = 'pairHourData',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveBnb = 'reserveBNB',
  ReserveUsd = 'reserveUSD',
  Swaps = 'swaps',
  Timestamp = 'timestamp',
  Token0 = 'token0',
  Token0Price = 'token0Price',
  Token1 = 'token1',
  Token1Price = 'token1Price',
  TotalSupply = 'totalSupply',
  TotalTransactions = 'totalTransactions',
  TrackedReserveBnb = 'trackedReserveBNB',
  UntrackedVolumeUsd = 'untrackedVolumeUSD',
  VolumeToken0 = 'volumeToken0',
  VolumeToken1 = 'volumeToken1',
  VolumeUsd = 'volumeUSD'
}

export type PancakeDayData = {
  __typename?: 'PancakeDayData';
  dailyVolumeBNB: Scalars['BigDecimal'];
  dailyVolumeUSD: Scalars['BigDecimal'];
  dailyVolumeUntracked: Scalars['BigDecimal'];
  date: Scalars['Int'];
  id: Scalars['ID'];
  totalLiquidityBNB: Scalars['BigDecimal'];
  totalLiquidityUSD: Scalars['BigDecimal'];
  totalTransactions: Scalars['BigInt'];
  totalVolumeBNB: Scalars['BigDecimal'];
  totalVolumeUSD: Scalars['BigDecimal'];
};

export type PancakeDayData_Filter = {
  dailyVolumeBNB?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_gt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_gte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeBNB_lt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_lte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_not?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUntracked?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_gt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_gte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUntracked_lt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_lte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_not?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUntracked_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalLiquidityBNB?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityBNB_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalTransactions?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransactions_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_not?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolumeBNB?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeBNB_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum PancakeDayData_OrderBy {
  DailyVolumeBnb = 'dailyVolumeBNB',
  DailyVolumeUsd = 'dailyVolumeUSD',
  DailyVolumeUntracked = 'dailyVolumeUntracked',
  Date = 'date',
  Id = 'id',
  TotalLiquidityBnb = 'totalLiquidityBNB',
  TotalLiquidityUsd = 'totalLiquidityUSD',
  TotalTransactions = 'totalTransactions',
  TotalVolumeBnb = 'totalVolumeBNB',
  TotalVolumeUsd = 'totalVolumeUSD'
}

export type PancakeFactory = {
  __typename?: 'PancakeFactory';
  id: Scalars['ID'];
  totalLiquidityBNB: Scalars['BigDecimal'];
  totalLiquidityUSD: Scalars['BigDecimal'];
  /** Total of pairs */
  totalPairs: Scalars['BigInt'];
  /** Total of transactions */
  totalTransactions: Scalars['BigInt'];
  totalVolumeBNB: Scalars['BigDecimal'];
  totalVolumeUSD: Scalars['BigDecimal'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
};

export type PancakeFactory_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  totalLiquidityBNB?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityBNB_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalPairs?: InputMaybe<Scalars['BigInt']>;
  totalPairs_gt?: InputMaybe<Scalars['BigInt']>;
  totalPairs_gte?: InputMaybe<Scalars['BigInt']>;
  totalPairs_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPairs_lt?: InputMaybe<Scalars['BigInt']>;
  totalPairs_lte?: InputMaybe<Scalars['BigInt']>;
  totalPairs_not?: InputMaybe<Scalars['BigInt']>;
  totalPairs_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransactions?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransactions_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_not?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolumeBNB?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeBNB_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeBNB_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum PancakeFactory_OrderBy {
  Id = 'id',
  TotalLiquidityBnb = 'totalLiquidityBNB',
  TotalLiquidityUsd = 'totalLiquidityUSD',
  TotalPairs = 'totalPairs',
  TotalTransactions = 'totalTransactions',
  TotalVolumeBnb = 'totalVolumeBNB',
  TotalVolumeUsd = 'totalVolumeUSD',
  UntrackedVolumeUsd = 'untrackedVolumeUSD'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  pair?: Maybe<Pair>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairs: Array<Pair>;
  pancakeDayData?: Maybe<PancakeDayData>;
  pancakeDayDatas: Array<PancakeDayData>;
  pancakeFactories: Array<PancakeFactory>;
  pancakeFactory?: Maybe<PancakeFactory>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryBundleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryBundlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bundle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Bundle_Filter>;
};


export type QueryBurnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryBurnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};


export type QueryMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};


export type QueryPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPairDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPairDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairDayData_Filter>;
};


export type QueryPairHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPairHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairHourData_Filter>;
};


export type QueryPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};


export type QueryPancakeDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPancakeDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PancakeDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PancakeDayData_Filter>;
};


export type QueryPancakeFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PancakeFactory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PancakeFactory_Filter>;
};


export type QueryPancakeFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QuerySwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QuerySwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryTokenDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryTokenDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TokenDayData_Filter>;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};


export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Transaction_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  pair?: Maybe<Pair>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairs: Array<Pair>;
  pancakeDayData?: Maybe<PancakeDayData>;
  pancakeDayDatas: Array<PancakeDayData>;
  pancakeFactories: Array<PancakeFactory>;
  pancakeFactory?: Maybe<PancakeFactory>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenDayData?: Maybe<TokenDayData>;
  tokenDayDatas: Array<TokenDayData>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionBundleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionBundlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bundle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Bundle_Filter>;
};


export type SubscriptionBurnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionBurnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};


export type SubscriptionMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};


export type SubscriptionPairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPairDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPairDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairDayData_Filter>;
};


export type SubscriptionPairHourDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPairHourDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairHourData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairHourData_Filter>;
};


export type SubscriptionPairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};


export type SubscriptionPancakeDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPancakeDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PancakeDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PancakeDayData_Filter>;
};


export type SubscriptionPancakeFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PancakeFactory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PancakeFactory_Filter>;
};


export type SubscriptionPancakeFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionSwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionSwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionTokenDayDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionTokenDayDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TokenDayData_Filter>;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};


export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Transaction_Filter>;
};

export type Swap = {
  __typename?: 'Swap';
  amount0In: Scalars['BigDecimal'];
  amount0Out: Scalars['BigDecimal'];
  amount1In: Scalars['BigDecimal'];
  amount1Out: Scalars['BigDecimal'];
  amountUSD: Scalars['BigDecimal'];
  from: Scalars['String'];
  id: Scalars['ID'];
  logIndex?: Maybe<Scalars['BigInt']>;
  pair: Pair;
  sender: Scalars['String'];
  timestamp: Scalars['BigInt'];
  to: Scalars['String'];
  token0: Token;
  token1: Token;
  transaction: Transaction;
};

export type Swap_Filter = {
  amount0In?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0In_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0In_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0Out?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount0Out_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_not?: InputMaybe<Scalars['BigDecimal']>;
  amount0Out_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1In?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1In_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1In_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1Out?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount1Out_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_not?: InputMaybe<Scalars['BigDecimal']>;
  amount1Out_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  from?: InputMaybe<Scalars['String']>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['String']>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  token0?: InputMaybe<Scalars['String']>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Swap_OrderBy {
  Amount0In = 'amount0In',
  Amount0Out = 'amount0Out',
  Amount1In = 'amount1In',
  Amount1Out = 'amount1Out',
  AmountUsd = 'amountUSD',
  From = 'from',
  Id = 'id',
  LogIndex = 'logIndex',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Token0 = 'token0',
  Token1 = 'token1',
  Transaction = 'transaction'
}

export type Token = {
  __typename?: 'Token';
  /** Decimals */
  decimals: Scalars['BigInt'];
  derivedBNB?: Maybe<Scalars['BigDecimal']>;
  derivedUSD?: Maybe<Scalars['BigDecimal']>;
  id: Scalars['ID'];
  /** Name */
  name: Scalars['String'];
  pairBase: Array<Pair>;
  pairDayDataBase: Array<PairDayData>;
  pairDayDataQuote: Array<PairDayData>;
  pairQuote: Array<Pair>;
  /** Symbol */
  symbol: Scalars['String'];
  tokenDayData: Array<TokenDayData>;
  totalLiquidity: Scalars['BigDecimal'];
  totalTransactions: Scalars['BigInt'];
  tradeVolume: Scalars['BigDecimal'];
  tradeVolumeUSD: Scalars['BigDecimal'];
  untrackedVolumeUSD: Scalars['BigDecimal'];
};


export type TokenPairBaseArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};


export type TokenPairDayDataBaseArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairDayData_Filter>;
};


export type TokenPairDayDataQuoteArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PairDayData_Filter>;
};


export type TokenPairQuoteArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pair_Filter>;
};


export type TokenTokenDayDataArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDayData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TokenDayData_Filter>;
};

export type TokenDayData = {
  __typename?: 'TokenDayData';
  dailyTxns: Scalars['BigInt'];
  dailyVolumeBNB: Scalars['BigDecimal'];
  dailyVolumeToken: Scalars['BigDecimal'];
  dailyVolumeUSD: Scalars['BigDecimal'];
  date: Scalars['Int'];
  id: Scalars['ID'];
  priceUSD: Scalars['BigDecimal'];
  token: Token;
  totalLiquidityBNB: Scalars['BigDecimal'];
  totalLiquidityToken: Scalars['BigDecimal'];
  totalLiquidityUSD: Scalars['BigDecimal'];
};

export type TokenDayData_Filter = {
  dailyTxns?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_gt?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_gte?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dailyTxns_lt?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_lte?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_not?: InputMaybe<Scalars['BigInt']>;
  dailyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dailyVolumeBNB?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_gt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_gte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeBNB_lt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_lte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_not?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeBNB_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeToken?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken_gt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken_gte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeToken_lt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken_lte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken_not?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeToken_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  priceUSD?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token?: InputMaybe<Scalars['String']>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  totalLiquidityBNB?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityBNB_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityBNB_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityToken?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityToken_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityToken_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityToken_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityToken_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityToken_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityToken_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityToken_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum TokenDayData_OrderBy {
  DailyTxns = 'dailyTxns',
  DailyVolumeBnb = 'dailyVolumeBNB',
  DailyVolumeToken = 'dailyVolumeToken',
  DailyVolumeUsd = 'dailyVolumeUSD',
  Date = 'date',
  Id = 'id',
  PriceUsd = 'priceUSD',
  Token = 'token',
  TotalLiquidityBnb = 'totalLiquidityBNB',
  TotalLiquidityToken = 'totalLiquidityToken',
  TotalLiquidityUsd = 'totalLiquidityUSD'
}

export type Token_Filter = {
  decimals?: InputMaybe<Scalars['BigInt']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_lt?: InputMaybe<Scalars['BigInt']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']>;
  decimals_not?: InputMaybe<Scalars['BigInt']>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  derivedBNB?: InputMaybe<Scalars['BigDecimal']>;
  derivedBNB_gt?: InputMaybe<Scalars['BigDecimal']>;
  derivedBNB_gte?: InputMaybe<Scalars['BigDecimal']>;
  derivedBNB_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  derivedBNB_lt?: InputMaybe<Scalars['BigDecimal']>;
  derivedBNB_lte?: InputMaybe<Scalars['BigDecimal']>;
  derivedBNB_not?: InputMaybe<Scalars['BigDecimal']>;
  derivedBNB_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  derivedUSD?: InputMaybe<Scalars['BigDecimal']>;
  derivedUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  derivedUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  derivedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  derivedUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  derivedUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  derivedUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  derivedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  totalLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalTransactions?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransactions_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_not?: InputMaybe<Scalars['BigInt']>;
  totalTransactions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tradeVolume?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tradeVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tradeVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tradeVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  tradeVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Token_OrderBy {
  Decimals = 'decimals',
  DerivedBnb = 'derivedBNB',
  DerivedUsd = 'derivedUSD',
  Id = 'id',
  Name = 'name',
  PairBase = 'pairBase',
  PairDayDataBase = 'pairDayDataBase',
  PairDayDataQuote = 'pairDayDataQuote',
  PairQuote = 'pairQuote',
  Symbol = 'symbol',
  TokenDayData = 'tokenDayData',
  TotalLiquidity = 'totalLiquidity',
  TotalTransactions = 'totalTransactions',
  TradeVolume = 'tradeVolume',
  TradeVolumeUsd = 'tradeVolumeUSD',
  UntrackedVolumeUsd = 'untrackedVolumeUSD'
}

export type Transaction = {
  __typename?: 'Transaction';
  block: Scalars['BigInt'];
  burns: Array<Maybe<Burn>>;
  id: Scalars['ID'];
  mints: Array<Maybe<Mint>>;
  swaps: Array<Maybe<Swap>>;
  timestamp: Scalars['BigInt'];
};


export type TransactionBurnsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};


export type TransactionMintsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};


export type TransactionSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};

export type Transaction_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burns?: InputMaybe<Array<Scalars['String']>>;
  burns_contains?: InputMaybe<Array<Scalars['String']>>;
  burns_not?: InputMaybe<Array<Scalars['String']>>;
  burns_not_contains?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  mints?: InputMaybe<Array<Scalars['String']>>;
  mints_contains?: InputMaybe<Array<Scalars['String']>>;
  mints_not?: InputMaybe<Array<Scalars['String']>>;
  mints_not_contains?: InputMaybe<Array<Scalars['String']>>;
  swaps?: InputMaybe<Array<Scalars['String']>>;
  swaps_contains?: InputMaybe<Array<Scalars['String']>>;
  swaps_not?: InputMaybe<Array<Scalars['String']>>;
  swaps_not_contains?: InputMaybe<Array<Scalars['String']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Transaction_OrderBy {
  Block = 'block',
  Burns = 'burns',
  Id = 'id',
  Mints = 'mints',
  Swaps = 'swaps',
  Timestamp = 'timestamp'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type TransactionsSwapsPancakeQueryVariables = Exact<{
  address?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type TransactionsSwapsPancakeQuery = { __typename?: 'Query', swaps: Array<{ __typename?: 'Swap', id: string, timestamp: any, from: string, amount0In: any, amount1In: any, amount0Out: any, amount1Out: any, amountUSD: any }> };

export type TransactionsMintsPancakeQueryVariables = Exact<{
  address?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type TransactionsMintsPancakeQuery = { __typename?: 'Query', mints: Array<{ __typename?: 'Mint', id: string, timestamp: any, sender?: string | null, to: string, amount0?: any | null, amount1?: any | null, amountUSD?: any | null }> };

export type TransactionsBurnsPancakeQueryVariables = Exact<{
  address?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type TransactionsBurnsPancakeQuery = { __typename?: 'Query', burns: Array<{ __typename?: 'Burn', id: string, timestamp: any, sender?: string | null, amount0?: any | null, amount1?: any | null, amountUSD?: any | null }> };


export const TransactionsSwapsPancakeDocument = gql`
    query transactionsSwapsPancake($address: [String!], $first: Int!, $skip: Int!) {
  swaps(
    skip: $skip
    first: $first
    orderBy: timestamp
    orderDirection: desc
    where: {pair_in: $address}
  ) {
    id
    timestamp
    from
    amount0In
    amount1In
    amount0Out
    amount1Out
    amountUSD
  }
}
    `;

/**
 * __useTransactionsSwapsPancakeQuery__
 *
 * To run a query within a React component, call `useTransactionsSwapsPancakeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsSwapsPancakeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsSwapsPancakeQuery({
 *   variables: {
 *      address: // value for 'address'
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useTransactionsSwapsPancakeQuery(baseOptions: Apollo.QueryHookOptions<TransactionsSwapsPancakeQuery, TransactionsSwapsPancakeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsSwapsPancakeQuery, TransactionsSwapsPancakeQueryVariables>(TransactionsSwapsPancakeDocument, options);
      }
export function useTransactionsSwapsPancakeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsSwapsPancakeQuery, TransactionsSwapsPancakeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsSwapsPancakeQuery, TransactionsSwapsPancakeQueryVariables>(TransactionsSwapsPancakeDocument, options);
        }
export type TransactionsSwapsPancakeQueryHookResult = ReturnType<typeof useTransactionsSwapsPancakeQuery>;
export type TransactionsSwapsPancakeLazyQueryHookResult = ReturnType<typeof useTransactionsSwapsPancakeLazyQuery>;
export type TransactionsSwapsPancakeQueryResult = Apollo.QueryResult<TransactionsSwapsPancakeQuery, TransactionsSwapsPancakeQueryVariables>;
export const TransactionsMintsPancakeDocument = gql`
    query transactionsMintsPancake($address: [String!], $first: Int!, $skip: Int!) {
  mints(
    skip: $skip
    first: $first
    orderBy: timestamp
    orderDirection: desc
    where: {pair_in: $address}
  ) {
    id
    timestamp
    sender
    to
    amount0
    amount1
    amountUSD
  }
}
    `;

/**
 * __useTransactionsMintsPancakeQuery__
 *
 * To run a query within a React component, call `useTransactionsMintsPancakeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsMintsPancakeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsMintsPancakeQuery({
 *   variables: {
 *      address: // value for 'address'
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useTransactionsMintsPancakeQuery(baseOptions: Apollo.QueryHookOptions<TransactionsMintsPancakeQuery, TransactionsMintsPancakeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsMintsPancakeQuery, TransactionsMintsPancakeQueryVariables>(TransactionsMintsPancakeDocument, options);
      }
export function useTransactionsMintsPancakeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsMintsPancakeQuery, TransactionsMintsPancakeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsMintsPancakeQuery, TransactionsMintsPancakeQueryVariables>(TransactionsMintsPancakeDocument, options);
        }
export type TransactionsMintsPancakeQueryHookResult = ReturnType<typeof useTransactionsMintsPancakeQuery>;
export type TransactionsMintsPancakeLazyQueryHookResult = ReturnType<typeof useTransactionsMintsPancakeLazyQuery>;
export type TransactionsMintsPancakeQueryResult = Apollo.QueryResult<TransactionsMintsPancakeQuery, TransactionsMintsPancakeQueryVariables>;
export const TransactionsBurnsPancakeDocument = gql`
    query transactionsBurnsPancake($address: [String!], $first: Int!, $skip: Int!) {
  burns(
    skip: $skip
    first: $first
    orderBy: timestamp
    orderDirection: desc
    where: {pair_in: $address}
  ) {
    id
    timestamp
    sender
    amount0
    amount1
    amountUSD
  }
}
    `;

/**
 * __useTransactionsBurnsPancakeQuery__
 *
 * To run a query within a React component, call `useTransactionsBurnsPancakeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsBurnsPancakeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsBurnsPancakeQuery({
 *   variables: {
 *      address: // value for 'address'
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useTransactionsBurnsPancakeQuery(baseOptions: Apollo.QueryHookOptions<TransactionsBurnsPancakeQuery, TransactionsBurnsPancakeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsBurnsPancakeQuery, TransactionsBurnsPancakeQueryVariables>(TransactionsBurnsPancakeDocument, options);
      }
export function useTransactionsBurnsPancakeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsBurnsPancakeQuery, TransactionsBurnsPancakeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsBurnsPancakeQuery, TransactionsBurnsPancakeQueryVariables>(TransactionsBurnsPancakeDocument, options);
        }
export type TransactionsBurnsPancakeQueryHookResult = ReturnType<typeof useTransactionsBurnsPancakeQuery>;
export type TransactionsBurnsPancakeLazyQueryHookResult = ReturnType<typeof useTransactionsBurnsPancakeLazyQuery>;
export type TransactionsBurnsPancakeQueryResult = Apollo.QueryResult<TransactionsBurnsPancakeQuery, TransactionsBurnsPancakeQueryVariables>;