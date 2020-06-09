export default {
  namespace: "ValidationContent",
  state: {
    rutS: false,
    ciS: false,
    nameS: false,
    lastNameS: false,
    phoneS: false,
    emailS: false,
    phoneToMigrateS: false,
    originCompanyS: false,
    originPlanTypeS: false,
    previousCarrierS:false,
    contractRegionS:false,
    contractComunaS:false,
    dispatchRegionS:false,
    dispatchComunaS:false,
    contractAddressS:false,
    contractAddressNumS:false,
    dispatchAddressS:false,
    dispatchAddressNumS:false,
  },
  reducers: {
    setValidationData(state, { payload}) {
      const newObj = {}
      Object.keys(payload).map((key)=>{
        if(key.slice(key.length-1,key.length)!=='S'){
          newObj[key+'S'] = payload[key]
        }

      })
      return {
        ...state,
        ...newObj
      }
    }
  }
}
