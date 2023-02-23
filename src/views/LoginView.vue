<template>
    <div class="d-flex flex-column align-items-center py-5">
        <h1 class="mb-5">登入</h1>
        <form action="" class="col-6" @submit.prevent="login">
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="user.username">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="user.password">
                <label for="floatingPassword">Password</label>
            </div>
            <div class="d-flex">
                <button type="submit" class="btn btn-primary ms-auto mt-4">登入</button>
            </div>
        </form>
    </div>
</template>
<script>
const { VITE_URL } = import.meta.env
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post(`${VITE_URL}/admin/signin`, this.user)
        .then(res => {
        //   console.log(res.data.message) 登入成功
          const { token, expired } = res.data
          document.cookie = `cookiesssToken=${token};expires=${new Date(expired)}`
          this.$router.push('/admin/products')
          this.$swal({
            icon: 'success',
            title: '登入成功',
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
    }

  }
}
</script>
