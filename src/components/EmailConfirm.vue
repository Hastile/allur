<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <div class="modal-header">
        <h3 v-if="!resend">Email 인증 안내</h3>
        <h3 v-if="resend">Email 재전송</h3>
      </div>
      <div class="modal-body" v-if="!resend">
        <p>이메일 인증 안내 메일이 전송됐어~</p>
        <p>꼭 메일함을 열어줘!</p>
      </div>
      <div class="modal-body" v-if="resend">
        <p>이메일을 다시 받고 싶어? 그럼 밑에 다시 적어줘!</p>
        <form @submit.prevent="submitForm">
        <div class="txt_field">
            <input type="email" v-model.trim="email" required>
            <span></span>
        </div>
        </form>
      </div>
      <div class="modal-footer" v-if="!resend">
        <button @click="closeModal">확인</button>
      </div>
      <div class="modal-footer" v-if="resend">
        <button @click="submitForm">확인</button>
        <button @click="closeModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: ''
    }
  },
  props: {
    resend: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal () {
      this.$parent.isModalOpen = false
      this.$router.push('/login')
    },
    async submitForm () {
      this.$emit('email-submitted', this.email)
    }
  }
}
</script>

<style scoped>
.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
}

.modal-content {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #4285f4;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: normal;
}

.modal-header button {
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.modal-body p {
  margin-bottom: 10px;
  font-size: 16px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background-color: #f7f7f7;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.modal-footer button {
  padding: 8px 16px;
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>
