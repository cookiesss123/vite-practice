<template>
     <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fs-5">
        <div class="container-fluid">
          <h1 class="navbar-brand text-primary">現在在後台</h1>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink to="/admin/products" class="nav-link">產品</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/admin/orders" class="nav-link">訂單</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/admin/coupons" class="nav-link">優惠券</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/admin/posts" class="nav-link">貼文</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/login" class="nav-link" @click.prevent="logout">登出</RouterLink>
              </li>
            </ul>
          </div>
          <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink to="/blog" class="nav-link">Blog</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/carts" class="nav-link">購物車</RouterLink>
              </li>
          </ul>
        </div>
      </nav>
      <RouterView></RouterView>
    </div>
</template>
<script>
import { RouterView, RouterLink } from 'vue-router'

export default {
  data () {
    return {
      logout () {
        document.cookie = `cookiesssToken=;expires=${new Date()}`
        this.$swal({
          title: '已登出',
          showConfirmButton: false,
          timer: 1000
        })
      }
    }
  },
  components: {
    RouterView,
    RouterLink
  }
}
</script>
