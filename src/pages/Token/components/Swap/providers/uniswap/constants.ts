export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

export const MAX_FEE_PER_GAS = 5 * 10 * 1000000000
export const MAX_PRIORITY_FEE_PER_GAS = 5 * 10 * 1000000000
export const GAS_LIMIT = 2 * 1000 * 1000;