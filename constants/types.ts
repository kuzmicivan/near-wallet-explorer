export type Arg = {
    args_base64: string,
    args_json: JSON,
    deposit: string,
    gas: Number,
    method_name: string,
  }
  
export type Transaction = {
    actions: ActionType[],
    hash: string,
    nonce: Number,
    public_key: string,
    receiver_id: string,
    signature: string,
    signer_id: string,
}

export type Status = {
    SuccesValue: SuccessValue,
    Failure: Failure,
    Unknown: Unknown,
}

export type Failure = {
    Failure: Object
}

export type SuccessValue = {
    SuccesValue: string
}

export type Unknown = {
    Unknown: string
}

export type TransactionStatus = {
    receipt_outcome: Receipts_Outcome[],
    status: Object;
    transaction: Transaction,
    transaction_outcome: Transaction_Outcome,
}

export type Receipts_Outcome = {
    block_hash: string,
    id: string,
    outcome: Outcome,
}

export type Outcome = {
    executor_id: string,
    gas_burnt: number,
    status: Object;
    tokens_burnt: string,
}

export type Transaction_Outcome = {
    block_hash: string,
    id: string,
    outcome: Outcome,
}

export type TransferAction = {
    Transfer: {
      deposit: string;
    }
  } 
  
export type FunctionCallAction = {
    FunctionCall: {
      method_name: string;
      args: string;
      gas: number;
      deposit: string;
    }
  }

export type ActionType = TransferAction | FunctionCallAction;