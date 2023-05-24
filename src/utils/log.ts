import * as moment from 'moment'

export const log = (...args: any[]) => {
  console.log(moment().format('YYYY-MM-DD HH:mm:ss '), ...args)
}
