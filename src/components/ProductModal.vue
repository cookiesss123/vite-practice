<template>
<!-- Modal -->
<div class="modal fade" ref="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h5 class="modal-title text-white" id="exampleModalLabel">{{tempProduct.title}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form action="" class="row">
            <div class="col-4">
                <label for="imgUrl" class="form-label">
                    輸入圖片網址
                </label>
                <input type="text" class="form-control" v-model="tempProduct.imageUrl"><br>
                <!-- 或上傳圖片??? -->
                <img :src="tempProduct.imageUrl" alt="" width="300">
                <br>
                <br>
                <!-- tempProduct.imagesUrl 確保東西在 因為取得單一產品才會有 一開始不存在 -->
                <div v-for="(pic,index) in tempProduct.imagesUrl" :key="index + pic">
                    <!-- v-for 要用 實際位置控制 不能用 pic!!!!!!!!!!!!!!!! -->
                    <input type="text" class="form-control" v-model="tempProduct.imagesUrl[index]"><br>
                    <!-- 或上傳圖片??? -->
                    <img :src="pic" alt="" width="300">
                    <button type="button" class="btn btn-outline-danger" @click="tempProduct.imagesUrl.splice(index, 1)">移除</button>
                </div>
                <!-- 不是空字串 -->
                <div class="mt-3 d-flex" v-if="tempProduct.imagesUrl && tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] || tempProduct.imagesUrl && tempProduct.imagesUrl.length === 0 || !tempProduct.imagesUrl">
                    <button type="button" class="btn btn-outline-primary mx-auto w-100" @click="tempProduct.imagesUrl.push('')">新增圖片</button>
                </div>
            </div>
            <div class="col-8">
                <div class="row gy-3">
                    <div class="col-12">
                        <label for="title" class="form-label">
                        標題
                        </label>
                        <input type="text" id="title" class="form-control" v-model="tempProduct.title">
                    </div>
                    <div class="col-6">
                        <label for="category" class="form-label">分類</label>
                        <input type="text" id="category" class="form-control" v-model="tempProduct.category">
                    </div>
                    <div class="col-6">
                        <label for="unit" class="form-label">單位</label>
                        <input type="text" id="unit" class="form-control" v-model="tempProduct.unit">
                    </div>
                    <div class="col-6">
                        <label for="origin_price" class="form-label">原價</label>
                        <input type="text" id="origin_price" class="form-control" v-model.number="tempProduct.origin_price">
                    </div>
                    <div class="col-6">
                        <label for="price" class="form-label">售價</label>
                        <input type="text" id="price" class="form-control" v-model.number="tempProduct.price">
                    </div>
                    <div class="col-12">
                        <hr>
                        <label for="description" class="form-label">產品描述</label>
                        <textarea name="" id="description" class="form-control" cols="30" rows="10" v-model="tempProduct.description"></textarea>
                    </div>
                    <div class="col-12">
                        <label for="content" class="form-label">說明內容</label>
                        <textarea name="" id="content" class="form-control" cols="30" rows="10" v-model="tempProduct.content"></textarea>
                    </div>
                    <div class="col-12">
                        <div class="form-check">
                            <!--  true-value="1" false-value="0" 才能判斷!!!! -->
                            <input class="form-check-input" type="checkbox" :value="tempProduct.is_enabled" id="is_enabled" v-model="tempProduct.is_enabled" true-value="1" false-value="0">
                            <label class="form-check-label" for="is_enabled">
                                是否啟用
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        <button type="button" class="btn btn-primary" @click="updateProduct">確定編輯</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
// const { VITE_URL, VITE_PATH } = import.meta.env
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  props: ['id', 'openModal', 'getProducts'],
  data () {
    return {
      products: [],
      myModal: {},
      tempProduct: {
        imagesUrl: []
      }
      //   status: '編輯產品',
    }
  },
  methods: {
    show () {
      this.myModal.show()
    },
    hide () {
      this.myModal.hide()
    },
    updateProduct () { // 更新產品
      if (this.tempProduct.id) { // 更新
        this.$http.put(`${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
          .then(res => {
            console.log(res.data.message)
            // 重新渲染畫面
            this.getProducts()
            this.hide()
            this.$swal({
              icon: 'success',
              title: res.data.message,
              showConfirmButton: false,
              timer: 700
            })
          }).catch(err => {
            console.log(err.response.data.message)
          })
      } else if (!this.tempProduct.id) { // 新增
        this.$http.post(`${VITE_URL}/api/${VITE_PATH}/admin/product`, { data: this.tempProduct })
          .then(res => {
            console.log(res.data.message)
            this.getProducts()
            this.hide()
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
    }
  },
  watch: { // 不用 return 監聽單一個 改變此值或其他值的資料
    id () { // 監聽id 變化 id 有變化就找 tempProduct
      if (this.id !== '新增' && this.id) {
        this.tempProduct = Object.values(this.products).filter(item => {
          return item.id === this.id
        })
        // 淺層複製!!!!!!!!!!!!!!!!! 不然會錯!!!!!!!!!!
        this.tempProduct = { ...this.tempProduct[0] }

        this.show()

        // 關閉的時候清空
        this.openModal('')
      } else if (this.id === '新增') { // 新增
        this.tempProduct = {
          imagesUrl: []
        }
        this.show()
        console.log(this.id)
        this.openModal('')
      }
    }
  },
  mounted () {
    this.myModal = new Modal(this.$refs.productModal)
    this.getProducts()
  }
}
</script>
