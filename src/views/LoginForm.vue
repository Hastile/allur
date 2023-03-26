<template>
  <div class="container">
    <h1>Login</h1>
    <form action="" method="post">
      <div class="txt_field">
        <input type="text" v-model.trim="email" required>
        <span></span>
        <label for="">Username</label>
      </div>
      <div class="txt_field">
        <input type="password" v-model.trim="password" required>
        <span></span>
        <label for="">Password</label>
      </div>
      <div class="pass" id="findpassword">비밀번호 몰라?</div>
      <div class="pass" id="sendemail" @click="isModalOpen = true; resend = !resend">이메일 다시 받을래?</div>
      <div class="error-message" ref="errorMessage" v-html="errorMessage"></div>
      <input type="submit" value="로그인" @click.prevent="login">
      <div class="signup_link">
        여기가 <router-link to="/signup">처음</router-link>이라고?
      </div>
    </form>
    <email-confirm v-if="isModalOpen" :resend="resend" @email-submitted="handleEmailSubmitted($event)"/>
  </div>
</template>

<script>
import axios from 'axios'
import EmailConfirm from '@/components/EmailConfirm.vue'

export default {
  components: {
    EmailConfirm
  },
  data () {
    return {
      email: '',
      password: '',
      errorMessage: '',
      isModalOpen: false,
      resend: false
    }
  },
  methods: {
    async login () {
      const response = await axios.post('/users/login', {
        email: this.email,
        password: this.password
      })
      if (response.data.token !== undefined) {
        const { user, token } = response.data
        this.$refs.errorMessage.classList.remove('show')
        this.$store.dispatch('login', { user, token })
        this.$router.push('/')
      } else {
        this.errorMessage = response.data
        this.$refs.errorMessage.classList.add('show')
      }
    },
    async handleEmailSubmitted (email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      const response = await axios.post('/users/email', {
        email: email
      })

      if (emailRegex.test(email) && response.data) {
        this.resend = !this.resend
      } else {
        console.log('Email Not Existed or Already Confirmed')
      }
      // 이메일 처리 로직 추가
    }
  },
  created () {
    // 로그인 상태라면 홈으로 이동
    if (this.$store.state.user && this.$store.state.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
}

.error-message {
  display: none;
  position: absolute;
  top: -30px;
  left: 0;
  width: 100%;
  background-color: #ffcccc;
  color: #ff0000;
  padding: 10px 0 10px 0;
  border-radius: 5px;
  text-align: center;
}

.error-message.show {
  display: block;
}
</style>
