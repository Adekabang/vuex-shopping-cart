import Vuex from 'vuex'
import Vue from 'vue'
import shop from "@/api/shop"

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //same as data
    products: [],
    cart: [],
    checkoutStatus: null
  },
  getters: { //same as properties
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    },
    cartProducts(state){
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal(state, getters){
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    },
    productIsInStock(){
      return(product) => {
        return product.inventory > 0
      }
    }
  },
  actions: { //same as methods
    fetchProducts ({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      });
    },
    addProductToCart ({state, getters, commit}, product){
      if(getters.productIsInStock(product)){
        const cartItem = state.cart.find(item => item.id === product.id)
        if(!cartItem){
          commit('pushProductToCart', product.id)
        }else{
          commit('increamenItemQuantity',cartItem)
        }
        commit('decreamentProductInventory', product)
      }
    },
    checkout({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    }
  },
  mutations :{
    setProducts (state, products) {
      state.products = products
    },
    pushProductToCart(state, productId){
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    increamenItemQuantity(state,cartItem){
      cartItem.quantity++
    },
    decreamentProductInventory(state, product){
      product.inventory--
    },
    setCheckoutStatus(state, status){
      state.checkoutStatus = status
    },
    emptyCart(state) {
      state.cart = []
    }
  }
})