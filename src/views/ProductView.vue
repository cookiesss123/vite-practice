<template>
     <div class="container py-3 d-flex flex-column">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <RouterLink to="/carts" class="breadcrumb-item">購物車</RouterLink>
                <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
            </ol>
        </nav>
        <div class="row">
            <div class="col-8">
                <h2>{{ product.title }}</h2>
                <p class="mb-0">{{ product.content }}</p>
                <p class="mb-0">{{ product.description }}</p>
                <img :src="product.imageUrl" alt="">
                <br>
                <img v-for="pic in product.imagesUrl" :key="pic" :src="pic" alt="" width="200">
            </div>
            <div class="col-4">
                <del>原價 {{ product.origin_price }} 元</del>
                <h5>現在只要 {{ product.price }} 元</h5>
                <hr>
                <button type="button" class="btn btn-outline-danger" @click="addCart(product.id)">加到購物車</button>
            </div>
        </div>

    </div>
</template>
<script>
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      product: []
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`)
        .then(res => {
          console.log(res.data.product)
          this.product = res.data.product
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
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
