import { getTransactionInfo, getTransferAmount, checkTransaction, yoctoToNear } from "@/lib/near";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { TransactionStatus } from '@/constants/types';
import Head from "next/head";
import { HOME_TITLE, TRANSACTION, SINGLE_TRANSACTION_PROPERTIES, NEAR_EXPLORER } from "@/constants/constants";
import Link from "next/link";
import Label from "@/components/Label"
import Hash from "@/components/Hash"
import { checkStatus } from "@/lib/status"

const TransactionPage = () => {
  const router = useRouter();
  let { accountId, hash } = router.query
  const [transaction, setTransaction] = useState<TransactionStatus>()
  const [amount, setAmount] = useState("")
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      const transaction = await getTransactionInfo(accountId, hash)
      setTransaction(transaction);
      setAmount(getTransferAmount(transaction))
    };
    if(!router.isReady) return;
    (async() =>  {
      const check = await checkTransaction(hash, accountId)
      if(check && accountId && hash) {
        fetchTransaction()
        setReady(true);
      } else {
        router.push('/');
      }
    })()
    
  }, [accountId, hash])

  if (ready) {
    return (
      <>
        <Head>
          <title>{HOME_TITLE}</title>
        </Head>
        <section className="flex items-center justify-between text-slate-300 px-4 py-4">
          <button className="bg-purple-900 hover:bg-purple-800 rounded-full h-10 w-10 flex justify-center items-center shadow-2xl"
            onClick={() => 
              router.back()
          }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </button>
          <Link href={`https://explorer.near.org/transactions/${hash}`}>
          <p className="bg-purple-900 hover:bg-purple-800 font-bold text-slate-300 rounded-md h-10 w-52 flex items-center justify-center shadow-2xl">
            {NEAR_EXPLORER}
            </p>
            </Link>
        </section>
        <section className="text-slate-200 flex flex-col items-center">
          <div className="bg-zinc-800 mt-8 rounded-md shadow-xl">
              <h1 className="text-center text-2xl px-6 py-4  text-slate-400 ">
                {TRANSACTION} 
                <span className="text-xl text-slate-200 pl-2">
                  {`${transaction?.transaction.hash.slice(0, 23)}...`}
                </span>
              </h1>
              <div className="bg-zinc-900 w-fit rounded-md grid grid-cols-1 mx-4 mb-4 shadow-xl">
                <Label label={SINGLE_TRANSACTION_PROPERTIES.FROM} value={transaction?.transaction.signer_id} />
                <Label label={SINGLE_TRANSACTION_PROPERTIES.TO} value={transaction?.transaction.receiver_id} />
                <Label label={SINGLE_TRANSACTION_PROPERTIES.AMOUNT} value={`${amount} Ⓝ`} />
                <Label label={SINGLE_TRANSACTION_PROPERTIES.STATUS} value={checkStatus(transaction?.status)} />
                <Hash  label={SINGLE_TRANSACTION_PROPERTIES.HASH} value={transaction?.transaction.hash} />
                <Hash label={SINGLE_TRANSACTION_PROPERTIES.BLOCK_HASH} value={transaction?.transaction_outcome.block_hash} />
              </div>
            </div>          
        </section>
      </>
    ) 
  } else {
    return <div>...</div>
  }
}

export default TransactionPage