import { connect, utils, Account, providers } from 'near-api-js';
import { calculateUsdBalance } from './coinGecko';
import { Transaction, TransactionStatus } from '@/constants/types';

const config = { 
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
};

const initNear = async () => {
  const nearConnection = await connect(config)
  return nearConnection;
};

export const checkAccount = async (account_id: string) => {
  const nearConnection = await initNear();
  const account = await nearConnection.account(account_id)
  try {
    await account.state();
  } catch (err) {
    return false;
  }
  return true;

}

export const checkTransaction = async (hash: any, account_id: any ) => {
  try {
    let connInfo = { url: "https://archival-rpc.mainnet.near.org"}
    const provider = new providers.JsonRpcProvider(connInfo)
    const transactionInfo = await provider.txStatus(hash, account_id);
  } catch (err) {
    return false;
  }
  return true;
}

export const getAccount = async (account_id: string) => {
  const nearConnection = await initNear();
  const account = await nearConnection.account(account_id)
  let { near, usd} = await getBalance(account)
  const transactionList = await getTransactionsInfo(account_id)
  return { near, usd, transactionList };
  
};

export const getBalance = async (account: Account) => {
  const balance = await account.getAccountBalance();
  const { total } = balance;
  const near = yoctoToNear(total);
  const usd = await calculateUsdBalance(near);
  return { near, usd };
};

export const getTransactionsInfo = async (account_id: string): Promise<any[]> => {
  let connInfo = { url: "https://archival-rpc.mainnet.near.org"}
  const transactionsHashes: string[] = [];
  const transactionsInfo: any[] = []; 
  const data = await fetch(`https://api.kitwallet.app/account/${account_id}/activity`, {
    headers: {
      'X-requestor': 'near',
    },
  });
  const recentTransactions: Transaction[] = await data.json();
  recentTransactions.forEach(element =>transactionsHashes.push(element.hash)); 
  const provider = new providers.JsonRpcProvider(connInfo)
  for(let transactionHash of transactionsHashes) {
    transactionsInfo.push(await provider.txStatus(transactionHash, account_id))
  }
  return transactionsInfo; 
}

export const getTransactionInfo = async (account_id: any, hash: any): Promise<any> => {
  let connInfo = { url: "https://archival-rpc.mainnet.near.org"}
  const provider = new providers.JsonRpcProvider(connInfo)
  const transactionInfo = await provider.txStatus(hash, account_id);
  return transactionInfo; 
}

export const yoctoToNear = (yoctoAmount: any) => {
  const nearAmount = Number(utils.format.formatNearAmount(yoctoAmount)).toFixed(5).toString()
  return nearAmount;
};

export const getTransferAmount = (transaction: TransactionStatus) => {
  for(const action of transaction.transaction.actions) {
      if('Transfer' in action) {
          return yoctoToNear(action.Transfer.deposit)
      }
  }
  return "0";
}
