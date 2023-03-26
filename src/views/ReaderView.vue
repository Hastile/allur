<template>
    <side-bar :maxPageNum="maxPageNum" @viewport="changeViewport" @select="pageMove" :selected="num"/>
    <div class="container">
        <!-- 책 페이지가 표시될 공간 -->
        <div class="page-container" v-bind:class="{ 'horizontal': horizontal }">
            <img :src="previousPageUrl" alt="" hidden>
            <img :src="nextPageUrl" alt="" hidden>
            <img :src="currentPageUrl" alt="">
        </div>

        <!-- 이전/다음 페이지 이동 버튼 -->
        <div class="nav-buttons">
          <div class="left" v-bind:class="{ 'hidden': num == 1 }">
            <router-link :to="{ name: 'Reader', params: { id, num: num - 1 } }"><i class='bx bx-chevron-left'></i></router-link>
          </div>
          <div class="right" v-bind:class="{ 'hidden': num == maxPageNum }">
            <router-link :to="{ name: 'Reader', params: { id, num: num + 1 } }"><i class='bx bx-chevron-right'></i></router-link>
          </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'ReaderView',
  components: {
    SideBar
  },
  data () {
    return {
      maxPageNum: 0,
      horizontal: false
    }
  },
  computed: {
    currentPageUrl () {
      // 현재 페이지 이미지 URL을 계산
      return `https://port-0-allur-b-6g2llfmbbu8x.sel3.cloudtype.app/image/${this.$route.params.id}/${this.$route.params.num}`
    },
    previousPageUrl () {
      // 이전 페이지 이미지 URL을 계산
      const num = parseInt(this.$route.params.num) - 1
      return num > 0 ? `https://port-0-allur-b-6g2llfmbbu8x.sel3.cloudtype.app/image/${this.$route.params.id}/${num}` : null
    },
    nextPageUrl () {
      // 다음 페이지 이미지 URL을 계산
      const num = parseInt(this.$route.params.num) + 1
      // 마지막 페이지에서는 다음 이미지를 로딩하지 않음
      return num <= this.maxPageNum ? `https://port-0-allur-b-6g2llfmbbu8x.sel3.cloudtype.app/image/${this.$route.params.id}/${num}` : null
    },
    id () {
      return parseInt(this.$route.params.id)
    },
    num () {
      return parseInt(this.$route.params.num)
    }
  },
  methods: {
    handleKeyup (event) {
      const key = event.key
      if (key === 'ArrowLeft' && parseInt(this.$route.params.num) > 0) {
        // 좌측 화살표 키 입력 시 이전 페이지로 이동
        this.$router.push({ name: 'Reader', params: { id: this.id, num: this.num - 1 } })
      } else if (key === 'ArrowRight' && parseInt(this.$route.params.num) < this.maxPageNum) {
        // 우측 화살표 키 입력 시 다음 페이지로 이동
        this.$router.push({ name: 'Reader', params: { id: this.id, num: this.num + 1 } })
      }
    },
    changeViewport (message) {
      this.horizontal = message === 'horizontal'
    },
    pageMove (message) {
      this.$router.push({ name: 'Reader', params: { id: this.id, num: message } })
    }
  },
  async created () {
    // 작품 ID와 페이지 번호를 라우터 파라미터에서 읽어옴
    const response = await axios.post('/reader', { id: this.id })
    this.maxPageNum = response.data.pages
    window.addEventListener('keyup', this.handleKeyup)
  },
  unmounted () {
    window.removeEventListener('keyup', this.handleKeyup)
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  visibility: hidden;
}
.container {
    /* 레이아웃 스타일 등 */
    width: 90vw;
    height: 90vh;
    position: relative;
}

.page-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.page-container img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.page-container.horizontal {
  overflow-y: scroll;
  z-index: 5;
}
.page-container.horizontal img{
  height: auto;
}

.nav-buttons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.nav-buttons .left,
.nav-buttons .right {
  width: 50%;
  height: 100%;
  transition: .5s ease;
}
.nav-buttons .left {
  display: flex;
  justify-content: flex-start;
}

.nav-buttons .right {
  display: flex;
  justify-content: flex-end;
}
.nav-buttons .left:hover,
.nav-buttons .right:hover {
  background-color: rgba(0, 0, 0, .3)
}
.nav-buttons .left {
  text-align: left;
}
.nav-buttons .right {
  text-align: right;
}
.nav-buttons a {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  text-decoration: none;
}

i {
    width: 100%;
    height: 100%;
    color: black;
    display: block;
    text-align: center;
    line-height: 100px;
    font-size: xx-large;
}

.hidden {
  visibility: hidden;
}

</style>
