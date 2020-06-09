import { mutate, query } from "@/api/graphQLClient"

export default {
  namespace: "Magento",
  state: {
    createEmptyCart: ""
  },
  reducers: {
    saveMagentoInfo(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    * createEmptyCart({ payload }, { call, put, select }) { /*create cart*/
      const infoQL = `{
                createEmptyCart
            } 
 `
      const res = yield call(mutate, infoQL)
      yield put({
        type: "saveMagentoInfo",
        payload: res.data
      })
      const { FormContent } = yield select()
      yield put({
        type: "addSimpleProductsToCart",
        payload: { cartId: res.data.createEmptyCart, ...FormContent }
      })
      yield put({
        type: "setCustormerPlan",
        payload: { cartId: res.data.createEmptyCart, ...FormContent }
      })
      return res
    },
    * addSimpleProductsToCart({ payload }, { call, put }) { /**/
      const infoQL = `{
  addSimpleProductsToCart(
    input: {
      cart_id: "${payload.cartId}"
      cart_items: [
        {
          data: {
            quantity: 1
            sku: "001-002-1760"
          }
        }
      ]
    }
  ) {
    cart {
      items {
        id
        product {
          sku
          stock_status
        }
        quantity
      }
    }
  }
}
 
 `
      const res = yield call(mutate, infoQL)

      return res
    },
    * setCustormerPlan({ payload }, { call, put }) { /*Solicita tu plan WOM en línea*/
      const infoQL = `{
                setCustomerPlan(input:{
                   cart_id:"${payload.cartId}"
                   ci:"${payload.ci}"
                   rut:"${payload.rut}"
                   email:"${payload.email}"
                   first_name:"${payload.name}" 
                   last_name:"${payload.lastName}"
                   phone:"${payload.phone}"
                   origin_plan_type:"${payload.planType}"
                   ${payload.phoneToMigrate && `phone_to_migrate:"${payload.phoneToMigrate}"`}
                   previous_carrier:"${payload.previousCarrier || "defalut"}"  
                }){
                cart{
                   email
                }
              }
            } 
 `
      const res = yield call(mutate, infoQL)
      console.log(res)
      return res
    },
    * setShippingMethodsOnCart({ payload }, { call, put, select }) { /*pickup on store or send*/
      const infoQL = `{
          setShippingMethodsOnCart(input: {
            cart_id:"${payload.cartId}"
            shipping_methods:[{
              carrier_code:"${payload.dispatchType==="Despacho a domicilio"?"freeshipping":""}"
              method_code:"${payload.dispatchType==="Despacho a domicilio"?"freeshipping":""}"
            }]
          }){
            cart{
              shipping_addresses{
              firstname
            }
          }
        }
      }
 `
      console.log(infoQL)
      const res = yield call(mutate, infoQL)
      console.log(res)
      return res
    },
    * setShippingAddressOnCart({ data }, { call, put,select }) { /**/
      const { FormContent, Magento } = yield select()
      const payload = { cartId: Magento.createEmptyCart, ...FormContent }
      const infoQL = `{
  setShippingAddressesOnCart(
    input: {
      cart_id: "${payload.cartId}"
      shipping_addresses: [
        {
          address: {
            firstname: "${payload.name}"
            lastname: "${payload.lastName}"
            street: ["${payload.dispatchAddress}","${payload.dispatchAddressNum}"]
            city: "${payload.dispatchComuna}"
            region: "${payload.dispatchRegion}"
            comuna: "${payload.dispatchComuna}"
            postcode: "90210"
            country_code: "US"
            telephone: "${payload.phone}"
            save_in_address_book: false
          }
        }
      ]
    }
  ) {
    cart {
      shipping_addresses {
        firstname
        lastname 
        street
        city
         
      }
    }
  }
} 
 `
      const res = yield call(mutate, infoQL)
      yield put({
        type: "setBillingAddressOnCart",
        payload
      })
      yield put({
        type: "setShippingMethodsOnCart",
        payload
      })
      return res
    },
    * setBillingAddressOnCart({ payload }, { call, put }) { /**/
      const infoQL = `{
  setBillingAddressOnCart(
    input: {
      cart_id: "${payload.cartId}"
      billing_address: 
        {
          address: {
            firstname: "${payload.name}"
            lastname: "${payload.lastName}"
            street: ["${payload.dispatchAddress}","${payload.dispatchAddressNum}"]
            city: "${payload.dispatchComuna}"
            region: "${payload.dispatchRegion}"
            comuna: "${payload.dispatchComuna}"
            postcode: "90210"
            country_code: "US"
            telephone: "${payload.phone}"
            save_in_address_book: false
          }
        }
      
    }
  ) {
    cart {
      billing_address {
        firstname
        lastname 
        street
        city 
      }
    }
  }
} 
 `

      const res = yield call(mutate, infoQL)
      return res
    },
    * setPaymentMethodAndPlaceOrder({ payload }, { call,select }){
      const {  Magento } = yield select()
      const infoQL = `{
        setPaymentMethodAndPlaceOrder(
           input:{
              cart_id:"${Magento.createEmptyCart}"
              payment_method:{
                code:"free"
              }
           }
        ){
            order {
              order_id
            }
        }
       }`
      console.log(infoQL)
      const res = yield call(mutate, infoQL)

      return res
    },
    * getCart({ payload }, { call,select,put }) { /*function for template,*/
      const {  Magento ,FormContent} = yield select()
      console.log(FormContent.rut)
      const infoQL = `{
      cart(
        cart_id:"${Magento.createEmptyCart}"
        rut:"${ FormContent.rut}"
      ){
        first_name
        last_name
        customer_plan{
          phone
          rut
        } 
         email
      }
      }`
      const res = yield call(query, infoQL)
      if(res.error){
        throw res
      }
      console.log(res)
      yield put({
        type:"FormContent/setFormData",
        payload:{
          name:res.data.cart.first_name,
          lastName:res.data.cart.last_name,
          email:res.data.cart.email,
          phone:res.data.cart.customer_plan.phone
        }
      })
      yield put({
        type:"ValidationContent/setValidationData",
        payload:{
          name:res.data.cart.first_name,
          lastName:res.data.cart.last_name,
          email:res.data.cart.email,
          phone:res.data.cart.customer_plan.phone
        }
      })
      return res
    }

  },
  subscriptions: {}
}
