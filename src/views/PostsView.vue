<template>
  <div>
    <h1>貼文</h1>
    <div class="d-flex">
      <button class="btn btn-primary ms-auto mx-5" type="button" @click="openModal('new')">建立新的頁面</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>標題</th>
          <th>作者</th>
          <th>描述</th>
          <th>建立時間</th>
          <th>是否公開</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ new Date(article.create_at * 1000).toLocaleString().split(' ')[0] }}</td>
          <td :class="{'text-success':article.isPublic, 'fw-bold':article.isPublic}">{{ `${article.isPublic ? '已上架' : '未上架'} ` }}</td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-primary" @click="openModal(article.id)">編輯</button>
              <button type="button" class="btn btn-sm btn-outline-danger">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PostModal :id="articleId" :open-modal="openModal" :get-posts="getPosts"></PostModal>
  </div>
</template>
<script>
import PostModal from '../components/PostModal.vue'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  components: {
    PostModal
  },
  data () {
    return {
      articles: [],
      articleId: ''
    }
  },
  methods: {
    getPosts () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)cookiesssToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/articles`)
        .then(res => {
          console.log(res.data.articles)
          this.articles = res.data.articles
        }).catch(err => {
          console.log(err.response.data.message)
        })
    },
    openModal (id) {
      this.articleId = id
      // if (this.id === 'new') {
      // }
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>
