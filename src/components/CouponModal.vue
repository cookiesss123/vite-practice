<template>
    <div class="modal fade" ref="couponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">新增優惠券</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row gy-3">
                <div class="col-12">
                    <label for="title" class="form-label mb-0">標題</label>
                    <input type="text" id="title" class="form-control" placeholder="請輸入標題" v-model="tempCoupon.title">
                </div>
                <div class="col-12">
                    <label for="code" class="form-label mb-0">優惠碼</label>
                    <input type="text" id="code" class="form-control" placeholder="請輸入優惠碼" v-model="tempCoupon.code">
                </div>
                <div class="col-12">
                    <label for="due_date" class="form-label mb-0">到期日</label>
                    <input type="date" id="due_date" class="form-control" v-model="due_date">
                </div>
                <div class="col-12">
                    <label for="percent" class="form-label mb-0">折扣百分比</label>
                    <input type="number" id="percent" class="form-control" placeholder="請輸入折扣百分比" v-model="tempCoupon.percent">
                </div>
                <div class="col-12">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="is_enabled" :true-value="1"
                     :false-value="0" v-model="tempCoupon.is_enabled">
                    <label class="form-check-label" for="is_enabled">
                        是否啟用
                    </label>
                </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button v-if="id === 'new'" type="button" class="btn btn-primary" @click="addCoupon">新增優惠券</button>
          <button v-if="id !== 'new'" type="button" class="btn btn-primary" @click="updateCoupon">編輯優惠券</button>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  props: ['getCoupons', 'id', 'coupons', 'openModal'],
  data () {
    return {
      myModal: {},
      tempCoupon: {},
      due_date: ''
    }
  },
  methods: {
    show () {
      this.myModal.show()
    },
    hide () {
      this.myModal.hide()
    },
    // 新增優惠券
    addCoupon () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)cookiesssToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      //   得到 10碼 時間戳 new Date(日期).getTime()
      this.due_date = new Date(this.due_date).getTime() / 1000
      this.tempCoupon.due_date = this.due_date
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/admin/coupon`, { data: this.tempCoupon })
        .then(res => {
          //   渲染
          this.getCoupons()
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
          this.hide()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    updateCoupon () {
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`, { data: this.tempCoupon })
        .then(res => {
          //   渲染
          this.getCoupons()
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
          this.hide()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  watch: {
    id () {
      // 修改
      console.log('id 改變了')
      if (this.id !== 'new' && this.id !== '') {
        this.tempCoupon = this.coupons.filter(item => {
          return item.id === this.id
        })
        this.tempCoupon = { ...this.tempCoupon[0] }

        const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
          .toISOString().split('T')
        //   中括號甚麼用處????????? 解構 但這好像不能用
        this.due_date = dateAndTime[0]
        console.log(this.tempCoupon)
        this.show()
        this.openModal('')
      }
    }
  },
  mounted () {
    this.myModal = new Modal(this.$refs.couponModal)
  }
}
</script>
