import Head from 'next/head'
import { NextPage } from 'next'
import { useState } from 'react'
import TransactionHistory from '@/components/TransactionHistory'
import Stat from '@/components/Stat'
import { getAccount } from '@/lib/near'
import { HOME_TITLE, PLACEHOLDER, BUTTON, STATS, ERROR } from '@/constants/constants'

const HomePage: NextPage = () => {
  const [accountId, setAccountId] = useState("");
  const [nearBalance, setNearBalance] = useState("");
  const [usdBalance, setUsdBalance] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const handleAccount = async () => {
    const { near, usd, accountError} = await getAccount(accountId);  
    if(!accountError) { 
      setNearBalance(near);
      setUsdBalance(usd ? usd : "");
      setVisible(true);
      setError(false)
    } else {
      setVisible(false)
      setError(true)
    }
  }  
  
  const transactions = [
    {
      amount: '12331',
      signer_id: 'FATFZ UHUH',
      receiver_id: 'UHUIH UIHUHI',
      status: true,
    },
    {
      amount: '123381',
      signer_id: 'FATFZ UHUH',
      receiver_id: 'UHUIH UIHUHI',
      status: false,
    }
  ]

  return (
    <>
      <Head>
        <title>{HOME_TITLE}</title>
      </Head>
      <main className='flex flex-col items-center gap-6 h-screen bg-black'>
        <section className='flex flex-col items-center bg-zinc-800 mt-20 w-96 rounded-md shadow-xl'>
          <h1 className='font-bold py-4 text-2xl text-purple-900'>
            {HOME_TITLE}
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
          <button className='bg-purple-900 text-slate-300 w-28 h-10 rounded-md shadow-xl hover:bg-purple-800 mb-4'
            onClick={handleAccount}>
            {BUTTON}
          </button>
        </section>
        {visible &&  (
          <section className='flex flex-col items-center gap-4'>
            <div className='flex gap-4'>
              <Stat label={STATS.BALANCE} value={usdBalance} />
              <Stat label={STATS.TRANSACTIONS} value={transactions.length.toString()} />
            </div> 
            <TransactionHistory transactions={transactions} />
          </section>
        )}
      </main>
    </>
  )
}

export default HomePage;