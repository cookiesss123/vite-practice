<template>
  <div>
    <h1>產品列表</h1>
    <div class="d-flex">
      <button type="button" class="btn btn-primary ms-auto mx-5" @click="openModal('新增')">建立新的產品</button>
    </div>
  <!-- {{ products }} -->
  <table class="table">
    <thead>
      <tr>
        <th>分類</th>
        <th>產品名稱</th>
        <th>原價</th>
        <th>售價</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.origin_price }}</td>
        <td>{{ product.price }}</td>
        <td :class="{'text-success':product.is_enabled, 'fw-bold':product.is_enabled}">{{`${product.is_enabled ? '啟用' : '未啟用'}`}}</td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-primary" @click="openModal(product.id)">編輯</button>
            <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteProduct(product.id)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal ref="modal" :id="productId" :open-modal="openModal" :get-products="getProducts"></ProductModal>
  </div>

</template>

<script>
import ProductModal from '../components/ProductModal.vue'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  components: {
    ProductModal
  },
  data () {
    return {
      products: [],
      productId: ''
    }
  },
  methods: {
    getProducts () {
      const loader = this.$loading.show()
      // 為何都要再存一次???
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)cookiesssToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/products/all`)
        .then(res => {
          console.log(res.data.products)
          this.products = res.data.products
          loader.hide()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    openModal (id) {
      this.productId = id
      // console.log(this.productId)
      // 只有這裡重新渲染沒用 只會重開modal才更新到
      this.getProducts()
    },
    deleteProduct (id) {
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/product/${id}`)
        .then(res => {
          console.log(res.data.message)
          this.getProducts()
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 700
          })
        }).catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
