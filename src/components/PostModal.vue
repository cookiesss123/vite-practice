<template>
    <div class="modal fade" ref="postModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
            <div class="modal-header bg-dark">
                <h5 class="modal-title text-white" id="exampleModalLabel">新增貼文</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-4">
                        <div class="row row-cols-1 gy-3">
                            <div class="col">
                                <label for="title" class="form-label">標題</label>
                                <input type="text" class="form-control" placeholder="請輸入標題" v-model="tempArticle.title">
                            </div>
                            <div class="col">
                                <label for="title" class="form-label">圖片網址</label>
                                <input type="text" class="form-control mb-2" placeholder="請輸入圖片網址" v-model="tempArticle.imageUrl">
                                <img :src="tempArticle.imageUrl" width="350" alt="">
                            </div>
                            <div class="col">
                                <label for="title" class="form-label">作者</label>
                                <input type="text" class="form-control" placeholder="請輸入作者" v-model="tempArticle.author">
                            </div>
                            <div class="col">
                                <label for="title" class="form-label">文章建立日期</label>
                                <input type="date" class="form-control" v-model="create_at">
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="row row-cols-1 gy-3">
                            <div class="col">
                                <label for="label">標籤</label><br>
                                <div class="d-flex row">
                                    <div class="input-group mb-3 w-25 col-3" v-for="(item,index) in tempArticle.tag" :key="item">
                                        <input type="text" class="form-control" v-model="tempArticle.tag[index]">
                                        <button class="btn btn-outline-danger me-2" type="button" @click="tempArticle.tag.splice(index, 1)">
                                            <i class="bi bi-x"></i>
                                        </button>
                                    </div>
                                    <!-- 沒tag陣列 -->
                                    <button v-if="!tempArticle.tag" type="button" class="btn btn-outline-primary h-100 col-2" @click="addTag">新增標籤</button>
                                    <!-- 有tag陣列 -->
                                    <button v-if="tempArticle.tag" type="button" class="btn btn-outline-primary h-100 col-2" @click="tempArticle.tag.push('')">新增標籤</button>
                                </div>
                            </div>
                            <div class="col">
                                <label for="label">文章描述</label>
                                <input type="text" class="form-control" placeholder="請輸入文章描述" v-model="tempArticle.description">
                            </div>
                            <div class="col">
                                <ckeditor
                                :editor="editor"
                                :config="editorConfig"
                                v-model="tempArticle.content"
                                ></ckeditor>
                            </div>
                            <div class="col">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="public" :v-true="1" :v-false="0" v-model="tempArticle.isPublic">
                                    <label class="form-check-label" for="public">
                                        是否公開
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateArticle">確認</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  props: ['id', 'openModal', 'getPosts'],
  data () {
    return {
      myModal: {},
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'typing', 'bold', 'italic', '|', 'link']
      },
      tempArticle: {
        tag: []
      },
      status: 'edit',
      create_at: ''
    }
  },
  methods: {
    show () {
      this.myModal.show()
    },
    hide () {
      this.myModal.hide()
    },
    addTag () {
      this.tempArticle.tag = []
      this.tempArticle.tag.push('')
    },
    updateArticle () {
      let method = 'put'
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`
      // 這是新增的嗎??
      this.create_at = new Date(this.create_at).getTime() / 1000
      this.tempArticle.create_at = this.create_at
      if (this.status === 'new') {
        method = 'post'
        url = `${VITE_URL}/api/${VITE_PATH}/admin/article`
      }
      this.$http[method](url, { data: this.tempArticle })
        .then(res => {
          console.log(res.data.message)
          this.getPosts()
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
  watch: {
    id () {
      if (this.id !== 'new' && this.id !== '') {
        this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/article/${this.id}`)
          .then(res => {
            console.log(res.data.article)
            this.tempArticle = res.data.article
            // 為甚麼要改時間會錯啊啊啊
            const dateAndTime = new Date(this.tempArticle.create_at * 1000)
              .toISOString().split('T')
            //   中括號甚麼用處????????? 解構 但這好像不能用
            this.create_at = dateAndTime[0]
            this.show()
            this.status = 'edit'
            this.openModal('')
          }).catch(err => {
            console.log(err.response.data.message)
          })
      } else if (this.id === 'new') {
        this.tempArticle = {
          tag: []
        }
        this.show()
        this.status = 'new'
        this.openModal('')
      }
    }
  },
  mounted () {
    this.myModal = new Modal(this.$refs.postModal)
    // this.show()
  }
}
</script>
<style>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>
