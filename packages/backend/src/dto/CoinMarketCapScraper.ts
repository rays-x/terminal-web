import {IsArray, IsEnum, IsNumberString, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

enum TokensSortBy {
  marketCap = 'marketCap',
  symbol = 'symbol',
  liquidity = 'liquidity',
  volume = 'volume',
  volumeChangePercentage24h = 'volumeChangePercentage24h',
  circulatingSupply = 'circulatingSupply',
  price = 'price',
  priceChangePercentage1h = 'priceChangePercentage1h',
  priceChangePercentage24h = 'priceChangePercentage24h',
}

export enum TokensSortOrder {
  asc = 'asc',
  desc = 'desc',
}

export enum TokensSwap {
  uniswap = 'uniswap',
  pancakeswap = 'pancakeswap',
}

export class QueryTokensDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  search?: string;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional()
  limit?: string = '20';

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional()
  offset?: string = '0';

  @IsOptional()
  @IsEnum(TokensSortBy)
  @ApiPropertyOptional({
    enum: TokensSortBy
  })
  sortBy?: TokensSortBy = TokensSortBy.marketCap;

  @IsOptional()
  @IsEnum(TokensSortOrder)
  @ApiPropertyOptional({
    enum: TokensSortOrder
  })
  sortOrder?: TokensSortOrder = TokensSortOrder.desc;
}

export class QueryPairsInfoDto {
  @IsString({
    each: true
  })
  @ApiProperty({
    isArray: true
  })
  pairs!: string[];
  @IsString()
  @ApiProperty()
  platform!: string;
}

export class QueryPairListDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  ethAddress?: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  btcAddress?: string;
}

export class QueryTransactionsDto {
  @IsOptional()
  @IsArray()
  @IsString({
    each: true
  })
  @ApiPropertyOptional({
    type: String,
    isArray: true
  })
  btcPairs!: string[];
  @IsOptional()
  @IsArray()
  @IsString({
    each: true
  })
  @ApiPropertyOptional({
    type: String,
    isArray: true
  })
  ethPairs!: string[];
}

export class ParamTokensDto {
  @IsEnum(TokensSwap)
  @ApiProperty({
    enum: TokensSwap,
    default: TokensSwap.uniswap
  })
  swap?: TokensSwap = TokensSwap.uniswap;
}

interface Transaction {
  time: string;
  type: string;
  priceUsd: string;
  priceQuote: string;
  amount: string;
  totalUsd: string;
  totalQuote: string;
  txn: string;
}

interface Data {
  transactions: Transaction[];
  lastId: string;
}

interface Status {
  timestamp: Date;
  error_code: string;
  error_message: string;
  elapsed: string;
  credit_count: number;
}

export interface TransactionsResponse {
  data: Data;
  status: Status;
}
