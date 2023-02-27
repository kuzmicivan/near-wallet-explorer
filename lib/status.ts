export const checkStatusColor = (status: Object) => {
    if(status.hasOwnProperty('SuccessValue')) {
        return 'bg-green-500';
    } else if(status.hasOwnProperty('Error')){
        return 'bg-red-500';
    } else if(status.hasOwnProperty('Unknown')) {
        return 'bg-yellow-500'
    }
}

export const checkStatus = (status: any) => {
    if(status) {
      if(status.hasOwnProperty('SuccessValue')) {
          return 'Success';
      } else if(status.hasOwnProperty('Error')){
          return 'Error';
      } else if(status.hasOwnProperty('Unknown')) {
          return 'Unknown'
      }
    }
  }