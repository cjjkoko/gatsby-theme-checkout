import _ from "lodash"
import { API_ENDPOINTS } from "./httpUrl"
import { GraphQLClient } from "graphql-request"
import { isOrNotEmpty } from "@@/utils/StringUtils"


const client = () => {
  const headers = {
    // Authorization: `Bearer ${global.token}`
  }
  // console.log(global.token)
  return new GraphQLClient(API_ENDPOINTS, { headers })
}

const graphQL = async (requestPromise, timeout = 30000) => {
  let timeoutAction = null
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = (err) => {
      resolve({ error: 500, msg: !!err ? err : "timeout" })//为了让model抓到异常
    }
  })
  setTimeout(() => {
    timeoutAction()
  }, timeout)
  return Promise.race([requestPromise, timerPromise])
}

export async function query(queryStr, value) {
  return graphQL(new Promise(async (resolve, reject) => {
    const response = await client().rawRequest(queryStr, value).catch(error => {
      try {
        resolve({ error, data: error.response.data })//为了让model抓到异常
        // reject({ error: err.code, msg: error })
      } catch (e) {
        resolve({ error: 500, ...error.response })//为了让model抓到异常
        // reject({ error: 500, msg: error })
      }
    })
    if (isOrNotEmpty(response)) {
      resolve({ error: 500, ...response })
    }
    resolve(response)
  }))
}

export async function mutate(muateStr, value) {
  return graphQL(new Promise(async (resolve, reject) => {
    const response = await client().rawRequest(`mutation ${muateStr}`, value).catch(error => {
      console.log(error)
      try {
        resolve({ error, data: error.response.data })//为了让model抓到异常
        // reject({ error: err.code, msg: error })
      } catch (e) {
        resolve({ error: 500, ...error.response })//为了让model抓到异常
        // reject({ error: 500, msg: error })
      }
    })
    console.log('mutate',response)
    if (isOrNotEmpty(response)) {
      resolve({ error: 500, ...response })
    }
    resolve(response)
  }))
}

