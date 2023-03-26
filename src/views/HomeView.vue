<template>
  <side-bar/>
  <div class="container" ref="container" @scroll="checkScroll">
    <div class="item" v-for="n of title" :key="n" :class="n.type" @click="$router.push({ name: 'Reader', params: { id: n.id, num: 1 }})">
        <img :src="`https://port-0-allur-b-6g2llfmbbu8x.sel3.cloudtype.app/image/${n.id}/1`" alt="">
        <div class="info">
          <h2>{{ n.title }}</h2>
          <h3>{{ n.id }}</h3>
          <div class="details">
            <h3>작가 : </h3>
            <span>{{ artist.filter(i => parseInt(i.title_id) === parseInt(n.id)).map(i => i.artist).join(', ') }}</span>
            <h3>그룹 : </h3>
            <span>{{ group.filter(i => parseInt(i.title_id) === parseInt(n.id)).map(i => i.group).join(', ') }}</span>
            <h3>장르 : </h3>
            <span>{{ series.filter(i => parseInt(i.title_id) === parseInt(n.id)).map(i => i.series).join(', ') }}</span>
            <h3>캐릭터 : </h3>
            <span>{{ character.filter(i => parseInt(i.title_id) === parseInt(n.id)).map(i => i.character).join(', ') }}</span>
          </div>
          <div class="tags">
            <p v-for="m of tag.filter(i => parseInt(i.title_id) === parseInt(n.id) && i.name !== 'N/A')" :key="m" :class="m.prefix">{{ m.name }}</p>
          </div>
        </div>
      </div>
  </div>
  <div class="loader" ref="loader" v-show="loading" @click="fetchData(index)">추가로 더 불러오기</div>
</template>

<script>
import axios from 'axios'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'HomeView',
  components: {
    SideBar
  },
  data () {
    return {
      title: [],
      artist: [],
      group: [],
      series: [],
      character: [],
      tag: [],
      loading: false,
      index: 1
    }
  },
  async mounted () {
    await this.fetchData(this.index)
  },
  methods: {
    async fetchData (index) {
      this.loading = false
      const response = await axios.post('/', { limit: index })
      const { title, artist, group, series, character, tag } = response.data
      this.title.push(...title)
      this.artist.push(...artist)
      this.group.push(...group)
      this.series.push(...series)
      this.character.push(...character)
      this.tag.push(...tag)
      this.index += 1
    },
    checkScroll () {
      const container = this.$refs.container
      console.log(Math.round(container.scrollTop + container.clientHeight))
      console.log(container.scrollHeight)
      if (
        Math.round(container.scrollTop + container.clientHeight) >= container.scrollHeight &&
        !this.loading
      ) {
        this.loading = true
        console.log(this.loading)
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
h2, h3 {
  text-shadow:
  -1px -1px 0 white,
  1px -1px 0 white,
  -1px 1px 0 white,
  1px 1px 0 white;
}
span, p {
  background: white;
  border-radius: 30px;
  font-size: large;
  padding: 10px;
}
::-webkit-scrollbar {
  visibility: hidden;
}

.loader {
  text-align: center;
  width: 90vw;
  margin: auto;
  border-radius: 20px;
  padding: 10px 0;
  background: white;
  cursor: pointer;
}
.container {
  position: relative;
  width: 90vw;
  height: 90vh;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: minmax(300px, auto);
  gap: 20px;
  overflow-y: scroll;
}

.item {
  width: 100%;
  height: 100%;
  transition: .5s ease;
  border-radius: 30px;
  position: relative;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, .3);
}

.item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  position: relative;
}

.doujinshi {
  background: #cc9999;
  border: 5px solid #cc9999;
}
.manga {
  background: #cc99cc;
  border: 5px solid #cc99cc;
}

.artistcg {
  background: #99cccc;
  border: 5px solid #99cccc;
}
.gamecg {
  background: #9999cc;
  border: 5px solid #9999cc;
}

.info {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background: #133a4746;
  backdrop-filter: blur(10px);
  border-radius: 30px;
  opacity: 0;
  transition: .5s ease-in-out;
  overflow-y: auto;
  text-align: center;
}

.info:hover {
  opacity: 1;
}

.female {
  background: plum;
}
.male {
  background: skyblue;
}
</style>
