import Head from 'next/head'
import { NextPage } from 'next'
import { useState } from 'react'
import TransactionHistory from '@/components/TransactionHistory'
import Balance from '@/components/Balance'
import Stat from '@/components/Stat'
import { getAccount, checkAccount } from '@/lib/near'
import { HOME_TITLE, HOME_TITLE_1, HOME_TITLE_2, PLACEHOLDER, FIND, CLEAR, STATS, ERROR } from '@/constants/constants'

const HomePage: NextPage = () => {
  const [accountId, setAccountId] = useState("");
  const [nearBalance, setNearBalance] = useState("");
  const [usdBalance, setUsdBalance] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);

  const clear = async () => {
    setAccountId("");
    setVisible(false);
    setError(false),
    setNearBalance("");
    setUsdBalance("")
    setTransactions([]);
  }

  const handleAccount = async () => {
    setVisible(false)
    setTransactions([])
    setError(false) 
    if(await checkAccount(accountId)) { 
      const { near, usd, transactionList} = await getAccount(accountId); 
      setNearBalance(near);
      setUsdBalance(usd ? usd : "");
      setTransactions(transactionList)
      setVisible(true);
      setError(false)
    } else {
      setVisible(false)
      setTransactions([])
      setError(true)
    }
  } 

  return (
    <>
      <Head>
        <title>{HOME_TITLE}</title>
      </Head>
        <main className='flex flex-col items-center gap-6 grow'>
        <div className='flex flex-col items-center bg-zinc-800 mt-20 w-96 rounded-md shadow-xl'>
          <h1 className='font-bold py-4 text-2xl text-purple-800'>
            {HOME_TITLE_1} <span className='text-slate-400'>{HOME_TITLE_2}</span>
          </h1>
          <input 
            className='rounded-md text-center shadow-xl h-10 w-80 mb-6 text-slate-300 bg-gray-600'
            type='text'
            placeholder={PLACEHOLDER}
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
          {(error) && (
            <p className='text-red-500 bg-inherit mb-7'>{ERROR}</p>
          )}
          <div className='flex justify-around'>
          <button className='bg-purple-900 text-slate-300 w-28 h-10 rounded-md shadow-xl hover:bg-purple-800 mb-4 mx-4'
            onClick={handleAccount}
            >
            {FIND}
          </button>
          <button className='bg-purple-900 text-slate-300 w-28 h-10 rounded-md shadow-xl hover:bg-purple-800 mb-4 mx-4'
            onClick={clear}
            >
            {CLEAR}
          </button>
          </div>
        </div>
        {visible &&  (
          <section className='flex flex-col items-center gap-4'>
            <div className='flex gap-4 items-center flex-col lg:flex-row '>
              <Balance label={STATS.BALANCE} usdValue={usdBalance} nearValue={nearBalance} />
              <Stat label={STATS.TRANSACTIONS} value={transactions.length.toString()} />
            </div> 
            <TransactionHistory transactions={transactions} accountId={accountId} />
          </section>
        )}
        </main>
    </>
  )
}

export default HomePage;