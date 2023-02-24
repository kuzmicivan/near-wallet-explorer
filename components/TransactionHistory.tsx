import { FunctionComponent } from "react";
import { TRANSACTION_PROPERTIES, TRANSACTIONS } from "@/constants/constants";

interface Transaction {
    amount: string,
    signer_id: string,
    receiver_id: string,
    status: boolean
}

interface Props {
    transactions: Transaction[]
}

const TransactionHistory: FunctionComponent<Props> = ({ transactions }) => {
    return (
        <section className="mx-2 my-2 flex flex-col text-slate-300 rounded-md bg-zinc-800 w-max">
            <h1 className="px-8 py-4 bg-purple-900 rounded mt-4 mx-8 w-52 text-center h-8 flex items-center shadow-md">
                {TRANSACTIONS}
            </h1>
            <table className="table-auto bg-zinc-900 rounded mx-8 my-4 shadow-md">
                <thead>
                    <tr>
                        {TRANSACTION_PROPERTIES.map((prop) => {
                            return (
                            <th key={prop.PROPERTY} className="text-center px-8">{prop.PROPERTY}</th>
                        )})}
                    </tr>   
                </thead> 
                <tbody>
                {transactions ? (transactions.map((transaction) => {
                    return (
                        <tr key={transaction.amount} className="border-t border-zinc-800">
                            <td className="text-center px-8">{transaction.amount}</td>
                            <td className="text-center px-8">{transaction.signer_id}</td>
                            <td className="text-center px-8">{transaction.receiver_id}</td>
                            <td className="flex justify-center items-center px-8 py-2">
                                <span className={`bg-${transaction.status ? 'green' : 'red'}-500 h-2 w-2 rounded-full shadow-md`}></span>
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