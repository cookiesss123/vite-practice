<template>
    <div class="container py-3 d-flex flex-column">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <RouterLink to="/blog" class="breadcrumb-item">部落格列表</RouterLink>
                <li class="breadcrumb-item active" aria-current="page">{{article.title}}</li>
            </ol>
        </nav>
        <div class="col-10 align-self-center">
            <h2>{{ article.title }}</h2>
            <p class="text-muted">{{ new Date(article.create_at * 1000).toLocaleString().split(' ')[0] }} - 作者：{{ article.author }}</p>
            <img :src="article.imageUrl" alt="">
            <p v-html="article.content"></p>
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
      article: {}
    }
  },
  methods: {
    getArticle () {
      console.log(this.$route.params.id)
      const { id } = this.$route.params
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/article/${id}`)
        .then(res => {
          console.log(res.data.article)
          this.article = res.data.article
        }).catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getArticle()
  }

}
</script>
