<template>
  <!-- <back-ground /> -->
  <router-view />
</template>

<style></style>

<script>
// import BackGround from '@/components/BackGround.vue'

export default {
  components: {
    // BackGround
  }
}
</script>

<style>
#app {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: black;
}

.container {
  background: white;

  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container h1 {
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid silver;
}

.container form {
  padding: 0 40px;
  box-sizing: border-box;
}

.txt_field {
  position: relative;
  margin: 30px 0;
}

.txt_field input {
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  border-bottom: 2px solid #adadad;
  transition: .5s ease;
}

.txt_field input:focus {
  border-bottom: 2px solid #2691d9;
}

.txt_field label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: .5s ease;
}

.txt_field input:focus~label,
.txt_field input:valid~label {
  top: -5px;
  color: #2691d9;
}

.pass {
  margin: -5px 0 20px 5px;
  color: #a6a6a6;
  cursor: pointer;
  text-align: center;
}

.pass:hover {
  text-decoration: underline;
}

input[type="submit"] {
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
}

input[type="submit"]:hover {
  border-color: #2691d9;
  transition: .5s ease;
}

.signup_link {
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
}

.signup_link a {
  color: #2691d9;
  text-decoration: none;
}

.signup_link a:hover {
  text-decoration: underline;
}
</style>
