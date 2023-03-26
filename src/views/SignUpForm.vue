<template>
  <div class="container">
    <h1>Sign Up</h1>
    <div class="lawform" v-if="!isChecked">
        <div>
            <h3>Allur 이용약관</h3><br>
            <h5>당사의 서비스는 한국어 작품 미러링을<br>목적으로 하며,<br>관리자의 취향에 따라 작성되었습니다. <br> 서비스는 Lubricity로 되어있는 밴드 및<br>기타 관리자와 연관된 플랫폼의 인원에<br>한정되어 공개됩니다.<br><br>이 웹사이트는 관리자 본인 또는 그로부터 허용을 받은 사용자들만 이용할 수 있습니다.<br>

            이 사이트는 성인용 작품을 포함하고 있으므로<br>만 18세 이상의 성인만 이용 가능합니다.<br>이 사이트를 이용하는 사용자들은 타인의 권리나 자유를 침해하거나, 타인의 명예를 훼손하는 행위, 불법적인 행위, 스팸메일 전송 등의 행위를 <br>하지 않아야 합니다.

            <br>이 사이트에서 제공되는 모든 콘텐츠와 자료는 그 저작권이 작품의 원저작자에게 있으며, 무단 배포 및 복제는 금지되어 있습니다. <br> 또한 개인정보는 관리자의 DB에 저장됩니다.<br>개인정보는 개인정보 보호정책에 따라 보호되며, 관련 법률과 규정을 준수합니다.

            <br><br>사용자분들께서는 적극적으로 이용하여<br>관리자의 취향을 이해하는 단계를<br>마련하시기 바랍니다.<br>이에 따라 서비스 이용약관에 동의하시는 것으로 간주됩니다.</h5><br>

            <input type="checkbox" id="agree" v-model="isChecked">
            <label for="agree">이용약관에 동의합니다.</label>
        </div>
    </div>

    <form action="" method="post">
      <div class="txt_field">
        <input type="email" v-model.trim="email" required>
        <span></span>
        <label for="">Email</label>
      </div>
      <div class="txt_field">
        <input type="password" id="password" v-model.trim="password" required>
        <span></span>
        <label for="">Password</label>
      </div>
      <div class="txt_field">
        <input type="password" id="confirmpassword" v-model.trim="confirmpassword" required>
        <span></span>
        <label for="">Confirm Password</label>
      </div>
      <div class="txt_field">
        <input type="text" v-model.trim="nickname" required>
        <span></span>
        <label for="">Nickname</label>
      </div>
      <div class="error-message" ref="errorMessage" v-html="errorMessage"></div>
      <input type="submit" value="회원가입" @click.prevent="handleSubmit">
      <div class="signup_link">
        이미 가입했어? <router-link to="/login">로그인</router-link>
      </div>
    </form>
    <email-confirm v-if="isModalOpen" :resend="resend"/>
  </div>
</template>

<script>
import EmailConfirm from '@/components/EmailConfirm.vue'
import axios from 'axios'

export default {
  components: {
    EmailConfirm
  },
  data () {
    return {
      email: '',
      password: '',
      confirmpassword: '',
      nickname: '',
      errorMessage: '',
      isModalOpen: false,
      isChecked: false,
      resend: false
    }
  },
  methods: {
    async handleSubmit (event) {
      event.preventDefault()
      const response = await axios.post('/users/signup', {
        email: this.email,
        password: this.password,
        confirmpass: this.confirmpassword,
        nickname: this.nickname
      })
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if (response.data === 'Success') {
        this.$refs.errorMessage.classList.remove('show')
        this.isModalOpen = true
        if (emailRegex.test(this.email)) {
          await axios.post('/users/email', {
            email: this.email
          })
        }
      } else {
        console.log(response.data)
        this.errorMessage = response.data
        this.$refs.errorMessage.classList.add('show')
      }
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
  border-radius: 20px;
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

.lawform {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.lawform div {
  background-color: #fff;
  padding: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
