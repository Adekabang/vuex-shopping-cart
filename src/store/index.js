import Vuex from 'vuex'
import Vue from 'vue'

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
    fetchProducts () {

    }
  },
  mutations :{
    setProducts (state, products) {
      state.products = products
      console.log(this.products)
    }
  }
})