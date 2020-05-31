import Vuex from 'vuex'
import Vue from 'vue'
import shop from "@/api/shop"

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //same as data
    products: [],
    cart: []
  },
  getters: { //same as properties
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
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
    addProductToCart (context, product){
      if(product.inventory > 0){
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if(!cartItem){
          context.commit('pushProductToCart', product.id)
        }else{
          context.commit('increamenItemQuantity',cartItem)
        }
        context.commit('decreamentProductInventory', product)
      }
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
    }
  }
})