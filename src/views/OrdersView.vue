<template>
  <div>
    <h1>訂單列表</h1>
    <table class="table">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ `${new Date(order.create_at * 1000).getFullYear()}/${new Date(order.create_at * 1000).getMonth() + 1}/${new Date(order.create_at * 1000).getDate()}` }}</td>
          <td>{{ order.user.email }}</td>
          <td >
            <p v-for="item in order.products" :key="item.id" class="mb-0">
              {{ item.product.title }} 數量：{{item.qty}} {{item.product.unit}}
            </p>
          </td>
          <td>{{ numberComma(order.total) }}</td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="pay" v-model="order.is_paid" @change="this.$refs.modal.updateOrder(order)">
              <label class="form-check-label" for="pay">{{`${order.is_paid ? '已付款': '未付款'}`}}</label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-primary" @click="openModal(order.id)">檢視</button>
              <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteOrder(order.id)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <OrderModal ref="modal" :number-comma="numberComma" :id="orderId" :orders="orders" :get-orders="getOrders" :open-modal="openModal"></OrderModal>
  </div>
  </template>
<script>
import OrderModal from '../components/OrderModal.vue'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  components: {
    OrderModal
  },
  data () {
    return {
      orders: [],
      orderId: ''
    }
  },
  methods: {
    // 千分位 https://tools.wingzero.tw/article/sn/269
    numberComma (num) {
      const comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
      return num.toString().replace(comma, ',')
    },
    getOrders () {
      const loader = this.$loading.show()

      const token = document.cookie.replace(/(?:(?:^|.*;\s*)cookiesssToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/orders`)
        .then(res => {
          console.log(res.data.orders)
          this.orders = res.data.orders
          loader.hide()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    openModal (id) {
      this.orderId = id
    },
    // 刪除
    deleteOrder (id) {
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/order/${id}`)
        .then(res => {
          console.log(res.data.message)
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
          this.getOrders()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getOrders()
    // this.update()
  }
}
</script>
