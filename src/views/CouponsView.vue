<template>
  <div>
    <h1>優惠券</h1>
    <div class="d-flex">
      <button type="button" class="btn btn-primary ms-auto mx-5" @click="openModal('new')">建立新的優惠券</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }} %</td>
          <td>{{ new Date(coupon.due_date * 1000).getFullYear() }}/{{ new Date(coupon.due_date * 1000).getMonth() + 1 }}/{{ new Date(coupon.due_date * 1000).getDate() }}</td>
          <td :class="{'text-success':coupon.is_enabled, 'fw-bold':coupon.is_enabled}">{{`${coupon.is_enabled ? '啟用' : '未啟用'}`}}</td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-primary" @click="openModal(coupon.id)">編輯</button>
              <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteCoupon(coupon.id)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal ref="modal" :get-coupons="getCoupons" :id="couponId" :coupons="coupons" :open-modal="openModal"></CouponModal>
  </div>
</template>
<script>
import CouponModal from '../components/CouponModal.vue'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  components: {
    CouponModal
  },
  data () {
    return {
      coupons: [],
      couponId: ''
    }
  },
  methods: {
    getCoupons () {
      const loader = this.$loading.show()

      const token = document.cookie.replace(/(?:(?:^|.*;\s*)cookiesssToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/coupons`)
        .then(res => {
          console.log(res.data.coupons)
          this.coupons = res.data.coupons
          loader.hide()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    openModal (id) {
      this.couponId = id
      if (this.couponId === 'new') {
        this.$refs.modal.show()
      }
    },
    deleteCoupon (id) {
      // 不能重複用??? loading???
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/coupon/${id}`)
        .then(res => {
          //   渲染
          this.getCoupons()
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
          this.$refs.modal.hide()
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    }

  },
  mounted () {
    this.getCoupons()
  }
}
</script>
