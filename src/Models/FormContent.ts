export default {
  namespace: "FormContent",
  state: {
    selectedPlan: "15gb",
    planType: "",
    rut: "",
    ci: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    phoneToMigrate: "",
    originPlanType: "",
    previousCarrier: "",
    dispatchRegion: "",
    dispatchComuna: "",
    dispatchAddress: "",
    dispatchAddressNum: "",
    contractRegion: "",
    contractComuna: "",
    contractAddress: "",
    contractAddressNum: "",
    dispatchType: "",
    successFlow: false,
    isProcesed: false,
    storeInfo: {},
    beSameWithDispatch: false
  },
  reducers: {
    setFormData(state, { payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
