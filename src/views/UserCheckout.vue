<template>
    <div class="container py-5">
        <table class="table">
            <thead>
                <tr>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in order.products" :key="item.id">
                    <td>{{ item.product.title }}</td>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">{{ item.final_total }}</td>
                </tr>
                <tr>
                    <td></td>
                    <td class="text-end">總計</td>
                    <td class="text-end">{{ order.total}}</td>
                </tr>
            </tbody>
        </table>
        <table class="table">
            <tbody>
                <tr>
                    <td class="fw-bold">Email</td>
                    <td v-if="order.user">{{ order.user.email }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="fw-bold">姓名</td>
                    <td v-if="order.user">{{ order.user.name }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="fw-bold">收件人電話</td>
                    <td v-if="order.user">{{ order.user.tel }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="fw-bold">收件人地址</td>
                    <td v-if="order.user">{{ order.user.address }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="fw-bold">付款狀態</td>
                    <td :class="{'text-success':order.is_paid}">{{ `${order.is_paid ? '已付款' : '尚未付款'}` }}</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex">
            <button v-if="!order.is_paid" type="button" class="ms-auto btn btn-danger" @click="payOrder">確認付款去</button>
        </div>
    </div>
</template>
<script>
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      order: {}
    }
  },
  methods: {
    getCheck () {
      const { id } = this.$route.params
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/order/${id}`)
        .then(res => {
        //   console.log(res.data.message)
          console.log(res.data.order)
          this.order = res.data.order
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    payOrder () {
      const { id } = this.$route.params
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/pay/${id}`)
        .then(res => {
          console.log(res.data.message)
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
          this.getCheck()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getCheck()
  }
}
</script>
