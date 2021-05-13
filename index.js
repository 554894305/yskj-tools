import * as util from './tools/util'
import * as validation from './tools/validation'
import * as promise from './tools/promise'

let obj = Object.assign(util, validation, promise)

export default obj