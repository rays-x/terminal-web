interface Token {
  id: string;
  name: string;
  symbol: string;
  logoURI: string;
  address: string;
  decimals: number;
}

interface SwapTokensResponse {
  tokens: Token[];
  tokensCount: number;
}