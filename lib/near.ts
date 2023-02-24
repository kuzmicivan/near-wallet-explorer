import { connect, utils, Account } from 'near-api-js';
import { calculateUsdBalance } from './coinGecko';

const config = { 
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
};

async function initNear() {
  const nearConnection = await connect(config)
  return nearConnection;
}

// async function getWalletConnection() {
//   const near = await initNear()
//   const wallet = new WalletConnection(near, 'near-wallet-explorer')
//   return {
//     wallet,
//     near,
//   }
// }


export async function getAccount(accountId: string) {
  let accountError = false;
  try {
    const nearConnection = await initNear();
    const account = await nearConnection.account(accountId)
    let { near, usd} = await getBalance(account)
    return { near, usd, accountError };
  } catch (err) {
    console.log(err);
    accountError = true;
    const near = "", usd = "";
    return {near, usd, accountError}
  }
}

export async function getBalance(account: Account) {
  const balance = await account.getAccountBalance();
  const { total } = balance;
  const near = yoctoToNear(total);
  const usd = await calculateUsdBalance(near);
  return { near, usd };
}

export function yoctoToNear(yoctoAmount: string): string {
  const nearAmount = Number(utils.format.formatNearAmount(yoctoAmount)).toFixed(5).toString()
  return nearAmount;
}
