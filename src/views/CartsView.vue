<template>
    <div class="container">
        <h1>購物車</h1>
        <table class="table" style="vertical-align: middle;">
            <thead>
                <tr>
                    <th>圖片</th>
                    <th>商品名稱</th>
                    <th>價格</th>
                    <th>功能</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td style="width: 200px;">
                        <div :style="{'background-image':`url(${product.imageUrl})`}" style="height: 100px; background-position: center; background-size: cover;">
                        </div>
                    </td>
                    <td>
                        <RouterLink to="/login"> {{ product.title }}</RouterLink>
                    </td>
                    <td>
                        <del>
                            原價 {{product.origin_price}} 元
                        </del>
                        <h5>現在只要 {{product.price}} 元</h5>
                    </td>
                    <td>
                        <div class="btn-group">
                            <RouterLink :to="`/product/${product.id}`" class="btn btn-sm btn-outline-secondary">查看更多</RouterLink>
                            <button type="button" class="btn btn-sm btn-outline-danger" @click="addCart(product.id)">加到購物車</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex">
            <button type="button" class="btn btn-outline-danger ms-auto" @click="deleteAll">清空購物車</button>
        </div>
        <table class="table" style="vertical-align: middle;">
            <thead>
                <tr>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                    <td>
                        <button type="button" class="btn btn-outline-danger ms-auto py-1 px-2" @click="deleteCart(item.id)"><i class="bi bi-x"></i></button>
                    </td>
                    <td>
                        <p class="mb-0">{{ item.product.title }}</p>
                        <p class="mb-0 text-success" v-if="item.coupon">已套用優惠券【{{ item.coupon.title }}】</p>
                    </td>
                    <td style="width: 150px;">
                        <div class="input-group mb-3">
                            <select name="" id="" class="form-select" v-model="item.qty" @change="updateCartItem(item)">
                                <option v-for="number in 20" :key="number + 3453534" :value="number">
                                    {{ number }}
                                </option>
                            </select>
                            <span class="input-group-text" id="basic-addon2">/{{ item.product.unit }}</span>
                        </div>
                    </td>
                    <td class="text-end">
                        <p>原價：{{ item.total }}</p>
                        <p v-if="item.coupon"><span class="text-success">折扣價：</span>{{ item.final_total }}</p>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-end">總計</td>
                    <td class="text-end">{{cart.total}}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                    <td></td>
                    <td></td>
                    <td class="text-end">折扣價：</td>
                    <td class="text-end text-success">{{cart.final_total}}</td>
                </tr>
            </tbody>
        </table>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="code">
            <button class="btn btn-outline-secondary" type="button" @click="useCoupon">套用優惠碼</button>
        </div>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  components: {
    RouterLink
  },
  data () {
    return {
      cart: {},
      products: [],
      code: ''
    }
  },
  methods: {
    getCarts () {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then(res => {
          console.log(res.data.data)
          this.cart = res.data.data
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    getProducts () {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/products/all`)
        .then(res => {
          console.log(res.data.products)
          this.products = res.data.products
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    addCart (productId, qty = 1) {
      const data = {
        product_id: productId,
        qty
      }
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data })
        .then(res => {
        //   console.log(res.data.message)
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
          this.getCarts()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    deleteCart (id) {
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/cart/${id}`)
        .then(res => {
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
          this.getCarts()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    deleteAll () {
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then(res => {
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
          this.getCarts()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    useCoupon () {
      const data = {
        code: this.code
      }
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/coupon`, { data })
        .then(res => {
          console.log(res.data)
          this.getCarts()

          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
        }).catch(err => {
          console.log(err.response.data.message)
          this.$swal({
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1000
          })
        })
    },
    updateCartItem (item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`, { data })
        .then(res => {
          this.$swal({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000
          })
          this.getCarts()
        }).catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getCarts()
    this.getProducts()
  }
}
</script>
