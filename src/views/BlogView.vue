<template>
    <div class="container">
        <h1>BLog</h1>
        <div class="row row-cols-2">
            <div class="col" v-for="article in articles" :key="article.id">
                <div class="card">
                    <img :src="article.imageUrl" alt="" class="img-fluid card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ article.title }}
                        </h5>
                        <p class="card-text">{{ article.description }}</p>
                    </div>
                    <div class="card-footer">
                        <RouterLink :to="`/post/${article.id}`" class="btn btn-outline-primary">文章頁面</RouterLink>
                    </div>
                </div>
            </div>
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
      articles: []
    }
  },
  methods: {
    getPosts () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)cookiesssToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/articles`)
        .then(res => {
          console.log(res.data.articles)
          this.articles = res.data.articles
        }).catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>
