import Vuex from 'vuex'
import Vue from 'vue'
import shop from "@/api/shop"

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //same as data
    products: []
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
      
    }
  },
  mutations :{
    setProducts (state, products) {
      state.products = products
      console.log(this.products)
    }
  }
})