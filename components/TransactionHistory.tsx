import { FunctionComponent } from "react";
import { TRANSACTION_PROPERTIES, TRANSACTIONS } from "@/constants/constants";
import Link from "next/link";
import { TransactionStatus } from "@/constants/types";
import { getTransferAmount } from "@/lib/near";
import { checkStatus } from "@/lib/status"

type TransactionHistoryProps = {
    transactions: TransactionStatus[],
    accountId: string
}

const TransactionHistory: FunctionComponent<TransactionHistoryProps> = ({ transactions, accountId }) => {
    return (
        <section className="mx-2 my-2 flex flex-col text-slate-300 rounded-md bg-zinc-800 w-max">
            <h1 className="px-7 py-4 bg-purple-900 rounded mt-4 mx-8 w-52 h-8 flex justify-center items-center shadow-md">
                {TRANSACTIONS}
            </h1>
            <table className="table-auto bg-zinc-900 rounded mx-8 my-4 shadow-md">
                <thead>
                    <tr>
                        {TRANSACTION_PROPERTIES.map((prop) => {
                            return (
                            <th key={prop.PROPERTY} 
                                className={`text-center px-8 
                                ${prop.PROPERTY === 'S' ? 'invisible' : '' }
                                ${prop.PROPERTY === 'AMOUNT' ? 'hidden sm:table-cell' : '' }
                                ${prop.PROPERTY === 'FROM' ? 'hidden lg:table-cell' : '' }
                                ${prop.PROPERTY === 'TO' ? 'hidden lg:table-cell' : '' }`}>
                                {prop.PROPERTY}
                            </th>
                        )})}
                    </tr>   
                </thead> 
                <tbody>
                {transactions ? (transactions.map((transaction, i) => {
                    return (
                        <tr key={`${transaction.transaction.hash }${i}`} className="border-t border-zinc-800">
                            <td className="text-center px-8 hover:text-white">
                                
                                <Link href={{
                                    pathname: `/transactions/${transaction.transaction.hash}`,
                                    query: {
                                        accountId: accountId,
                                        hash: transaction.transaction.hash,
                                    }
                                }}>
                                    {transaction.transaction.hash.slice(0,20)}...
                                </Link>
                            </td>
                            <td className="text-center px-8 hidden lg:table-cell">{transaction.transaction.signer_id}</td>
                            <td className="text-center px-8 hidden lg:table-cell">{transaction.transaction.receiver_id}</td>
                            <td className="text-center px-8 hidden sm:table-cell">{getTransferAmount(transaction)} Ⓝ</td>
                            <td className="flex justify-center items-center px-8 py-2 ">
                                {checkStatus(transaction.status) === 'Success' &&
                                    <span className='bg-green-500 h-2 w-2 rounded-full shadow-md'></span>
                                }
                                {checkStatus(transaction.status) === 'Error' &&
                                    <span className='bg-red-500 h-2 w-2 rounded-full shadow-md'></span>
                                }
                                {checkStatus(transaction.status) === 'Unknown' &&
                                    <span className='bg-yellow-500 h-2 w-2 rounded-full shadow-md'></span>
                                }
                            </td> 
                        </tr>
                    )
                })) : (
                    <tr className="border-t border-zinc-800">
                        {TRANSACTION_PROPERTIES.map((prop) => {
                            return (
                            <th key={`Blank ${prop.PROPERTY}`} className="text-center px-8">-</th>
                        )})}
                    </tr>
                )}
                </tbody>
            </table>
        </section>
    )
}

export default TransactionHistory;