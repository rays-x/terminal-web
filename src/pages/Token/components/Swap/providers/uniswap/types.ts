import { ContractInterface } from "ethers";

export interface ContractAddresses {
    v3SwapRouterAddress: string;
    quoterAddress: string;
    poolDeployerAddress: string;
}

export interface NetworkParams {
    chainId: number;
    rpcUrl: string;
}

export interface Abis {
    quoterAbi: ContractInterface
}