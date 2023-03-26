<template>
    <div class="sidebar" v-bind:class="{ 'close': !sidebar }">
        <div class="profile"  @mouseover="showOverlay = !showOverlay" @mouseout="showOverlay = !showOverlay">
            <i class='bx bx-edit profile-overlay' v-bind:class="{ 'hover': showOverlay }" @click="$refs.fileInput.click()"></i>
            <input type="file" ref="fileInput" @change="OpenCropper" accept="image/*">
            <img :src="profileimg" class="profileimg"/>
            <h3>{{ $store.state.user.nickname }}</h3>
            <h4>{{ $store.state.user.email }}</h4>
        </div>
        <br>
        <div class="text">메뉴 바</div>
        <ul>
            <li><i class='bx bxs-dashboard' ></i><router-link :to="{ name: 'home' }">메인 화면</router-link></li>
            <li>검색창</li>
            <li v-if="$route.name == 'home'">
                <i class='bx bxs-paint' ></i>
                <router-link to="">작가 찾기</router-link>
                <ul>
                    <li v-for="n of Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).concat('123')" :key="n">{{ n }}</li>
                </ul>
            </li>
            <li v-if="$route.name == 'home'">
                <i class='bx bx-book-open' ></i>
                <router-link to="">장르 찾기</router-link>
                <ul>
                    <li v-for="n of Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).concat('123')" :key="n">{{ n }}</li>
                </ul>
            </li>
            <li v-if="$route.name == 'home'">
                <i class='bx bx-user'></i>
                <router-link to="">캐릭터 찾기</router-link>
                <ul>
                    <li v-for="n of Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).concat('123')" :key="n">{{ n }}</li>
                </ul>
            </li>
            <li v-if="$route.name == 'home'">
                <i class='bx bxs-purchase-tag' ></i>
                <router-link to="">태그 찾기</router-link>
                <ul>
                    <li v-for="n of Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).concat('123')" :key="n">{{ n }}</li>
                </ul>
            </li>
            <li v-if="$route.name == 'Reader'">
                <i class='bx bx-arrow-from-left'></i>
                <select v-model="selectedPageNum" v-if="maxPageNum>0">
                    <option v-for="num in maxPageNum" :key="num" :value="num">{{ num }}</option>
                </select>
            </li>
            <li v-if="$route.name == 'Reader'" @click="$emit('viewport', 'horizontal')">
                <i class='bx bx-expand-horizontal' ></i>가로로 채우기
            </li>
            <li v-if="$route.name == 'Reader'" @click="$emit('viewport', 'vertical')">
                <i class='bx bx-expand-vertical' ></i>세로로 채우기
            </li>
            <li v-if="$route.name == 'Reader'" @click="toggleFullscreen">
                <i v-if="!fullscreen" class="bx bx-fullscreen"></i>
                <i v-else class="bx bx-exit-fullscreen"></i>{{ fullscreen ? '전체화면 해제' : '전체화면' }}
            </li>

        </ul>
        <br>
        <div class="text">추가 설정</div>
        <ul>
            <li v-if="$route.name == 'home'">
                <i class='bx bx-user-plus' ></i>
                <router-link to="">캐릭터 신청</router-link>
            </li>
            <li v-if="$route.name == 'admin'">
                <router-link to="">번역기</router-link>
            </li>
            <li v-if="$route.name == 'admin'">
                <router-link to="">관리자 페이지</router-link>
            </li>
        </ul>
        <div class="sidebar-toggle" @click="sidebar = !sidebar; $store.dispatch('setSidebar', { sidebar })">
            <i v-if="sidebar" class='bx bxs-chevrons-left' ></i>
            <i v-else class='bx bxs-chevrons-right' ></i>
        </div>
        <image-cropper :image="imgfile"/>
    </div>
</template>

<script>
import ImageCropper from './ImageCropper.vue'

export default {
  components: {
    ImageCropper
  },
  props: {
    maxPageNum: {
      type: Number,
      default: 0
    },
    selected: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      selectedPageNum: this.selected,
      fullscreen: false,
      sidebar: true,
      profileimg: '',
      showOverlay: false,
      imgfile: '',
    }
  },
  watch: {
    selected(value) {
      this.selectedPageNum = value
    },
    selectedPageNum(value) {
      this.$emit('select', value)
    }
  },
  mounted () {
    this.sidebar = this.$store.state.sidebar
    !this.$store.state.user.profileimg ? this.profileimg = require('../assets/profile.webp') : this.profileimg = require(`../assets/${this.$store.state.user.profileimg}`)
  },
  methods: {
    toggleFullscreen () {
      this.fullscreen = !this.fullscreen
      const elem = document.documentElement
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        elem.requestFullscreen()
      }
    },
    OpenCropper (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imgfile = e.target.result
        this.cropper = new Cropper(this.imgfile, this.options)
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style scoped>
.sidebar {
    position: fixed;
    width: 250px;
    height: 100%;
    left: 0;
    background: #1b1b1b;
    box-shadow: 5px 10px 10px rgba(0, 0, 0, .3);
    z-index: 10;
    transition: .5s ease;
}

.sidebar.close {
    left: -250px;
}

.sidebar-toggle{
    position: absolute;
    top: 100%;
    left: 280px;
    background: black;
    color: white;
    padding: 30px;
    transform: translateY(-100%);
    border-radius: 100%;
    font-size: x-large;
    transition: .5s ease;
}
.profile input[type="file"] {
  display: none;
}
.profile {
    color: white;
    text-align: center;
    position: relative;
}

.profile h3 {

    font-size: 25px;
    margin-bottom: 0;
}

.profile h4 {
    margin-top: 0;
}
.profile-overlay {
  position: absolute;
  width: 152px;
  height: 152px;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.5s ease;
  border-radius: 100%;
}

.profile-overlay.hover {
  opacity: 1;
}

.profileimg {
    width: 150px;
    height: 150px;
    background: white;
    border-radius: 100%;
    margin: 20px auto;
}

.text {
    color: white;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    background: #1e1e1e;
    letter-spacing: 1px;
    line-height: 65px;
}

ul {
    background: #1b1b1b;
    height: 100%;
    width: 100%;
    list-style: none;
    padding: 0;

}

li {
    line-height: 60px;
    font-size: 18px;
    padding-left: 40px;
    font-weight: 500;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, .1);

    color: white;
}

li a {
    text-decoration: none;
    color: white;
}

li i {
    color: white;
    font-size: 1.5em;
    margin-right: 10px;
}
ul ul {
    position: static;
    display: none;
}

ul ul li {
    border-bottom: none;
    list-style: none;
    border-bottom: none;
}

li select {
  width: 50%;
  appearance: none;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 0.5em 1em;
  margin: 0;
  cursor: pointer;
  outline: none;
  font-family: 'Montserrat', sans-serif;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

li select:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

li select:focus {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  outline: none;
}

li select option {
  background-color: white;
  color: #333;
  font-size: 16px;
  padding: 0.5em 1em;
  margin: 0;
  cursor: pointer;
  outline: none;
  font-family: 'Montserrat', sans-serif;
}

li select option:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

</style>
