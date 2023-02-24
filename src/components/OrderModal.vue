<template>
    <div class="modal fade" ref="orderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h5 class="modal-title text-white" id="exampleModalLabel">訂單細節</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body row">
        <div class="col-4">
            <h2>用戶資料</h2>
            <table class="table">
                <tbody>
                    <tr>
                        <td class="fw-bold">姓名</td>
                        <td>{{ tempOrder.user.name }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">Email</td>
                        <td>{{ tempOrder.user.email }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">電話</td>
                        <td>{{ tempOrder.user.tel }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">地址</td>
                        <td>{{ tempOrder.user.address }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-8">
            <h2>訂單細節</h2>
            <table class="table">
                <tbody>
                    <tr>
                        <td class="fw-bold">訂單編號</td>
                        <td>{{ tempOrder.id }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">下單時間</td>
                        <td>{{ new Date(tempOrder.create_at * 1000).toLocaleString().split(' ')[0] }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">付款時間</td>
                        <td>{{ new Date(tempOrder.paid_date * 1000).toLocaleString().split(' ')[0] }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">付款狀態</td>
                        <td :class="{'text-success': tempOrder.is_paid}">{{ `${tempOrder.is_paid ? '已付款' : '未付款'}` }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">總金額</td>
                        <td>{{ tempOrder.totala }}</td>
                    </tr>
                </tbody>
            </table>
            <h2>選購商品</h2>
            <table class="table">
                <tbody>
                    <tr v-for="item in tempOrder.products" :key="item.id">
                        <td>{{ item.product.title }}</td>
                        <td>{{ item.qty }} / {{ item.product.unit }}</td>
                        <td class="text-end">{{ item.final_total }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex">
                <div class="form-check ms-auto">
                    <input class="form-check-input" type="checkbox" value="" id="pay" v-true="1" v-false="0" v-model="tempOrder.is_paid">
                    <label class="form-check-label" for="pay">
                        {{ `${tempOrder.is_paid ? '已付款' : '未付款'}` }}
                    </label>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="updateOrder(this.tempOrder)">修改付款狀態</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  props: ['id', 'orders', 'getOrders', 'openModal', 'numberComma'],
  data () {
    return {
      myModal: {},
      tempOrder: {
        user: {}
      }
    }
  },
  methods: {
    show () {
      this.myModal.show()
    },
    hide () {
      this.myModal.hide()
    },
    updateOrder (order) {
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/admin/order/${order.id}`, { data: order })
        .then(res => {
          console.log(res.data.message)
          this.getOrders()
          this.hide()
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
        }).catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  mounted () {
    this.myModal = new Modal(this.$refs.orderModal)
    // this.show()
  },
  watch: {
    id () {
      if (this.id) {
        this.tempOrder = this.orders.filter(item => {
          return item.id === this.id
        })
        this.tempOrder = this.tempOrder[0]
        this.openModal('')
        this.show()
        console.log(this.tempOrder)
      }
    }
  }
}
</script>
