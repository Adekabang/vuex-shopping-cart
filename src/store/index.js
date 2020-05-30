import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  states: { //same as data
    products: []
  },
  getters: { //same as properties
    productsCount () {

    }
  },
  actions: { //same as methods
    fetchProducts () {

    }
  },
  mutations :{
    setProducts (state, products) {
      state.products = products
    }
  }
})