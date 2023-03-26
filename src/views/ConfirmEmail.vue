<template>
  <div class="container">
    <h1>이메일 인증 안내</h1>
    <div v-if="isConfirmed" class="email-verification__message">
      이메일 인증 완료! <br> 이제 리더한테 계정 풀어달라고 하고 기다려~
    </div>
    <div v-else-if="isExpired" class="email-verification__message">
      이메일이 만료됐어! <br> <router-link to="/login" style="text-decoration: none; color: black; font-weight: 800;"> 로그인 화면</router-link>에서 인증번호 다시 보내달라 해~
    </div>
  </div>
</template>

<style scope>
.email-verification {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
}

.email-verification__message {
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-size: x-large;
}

.email-verification__message--success {
  background-color: #c1e1c5;
  color: #008000;
}

.email-verification__message--error {
  background-color: #ffe1e1;
  color: #cc0000;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'EmailConfirm',
  props: {
    token: String
  },
  data () {
    return {
      isExpired: false,
      isConfirmed: false
    }
  },
  async mounted () {
    const response = await axios.post('/users/token', { token: this.token })
    switch (response.data.status) {
      case 'expired':
        this.isExpired = true
        break
      case 'confirmed':
        this.isConfirmed = true
        break
    }
  }
}
</script>
