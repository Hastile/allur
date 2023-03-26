<template>
    <div ref="p5Container"></div>
</template>

<script>
import p5 from 'p5'

export default {
  data () {
    return {
      rects: [],
      p5Instance: null
    }
  },
  mounted () {
    // eslint-disable-next-line new-cap
    this.p5Instance = new p5((p) => {
      class Rect {
        constructor () {
          this.pos = [rand(p.width), rand(p.height)]
          this.size = [rand(400), rand(200)]
          this.amt = this.size[1] / 200
          this.speed = (1 - this.amt) * 3 + 1
          this.hue = this.amt * 0.3 + 0.5
        }

        render () {
          p.fill(this.hue, 1, 1, p.pow(1 - this.amt, 2) * 0.4 + 0.1)
          for (const d of dirs) {
            // x-repeat
            pushpop(() => {
              p.translate(d[0] * p.width, d[1] * p.height)
              p.rect(...this.pos, ...this.size)
            })
          }
          this.pos[0] = (this.pos[0] + this.speed) % p.width
        }
      }

      const dirs = [
        [-1, 0],
        [0, 0],
        [1, 0]
      ]

      p.setup = () => {
        p.pixelDensity(1)
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.colorMode(p.HSB, 1, 1, 1)
        p.rectMode(p.CENTER)
        p.blendMode(p.ADD)
        p.stroke(1, 0.1)
        init()
      }

      const init = () => {
        this.rects = []
        for (let i = 0; i < 100; i++) this.rects.push(new Rect())
      }

      p.draw = () => {
        p.clear()
        this.rects.map((r) => r.render())
      }

      p.mouseClicked = () => {
        p.windowResized()
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
        init()
      }

      const rand = (x) => {
        return p.random(x)
      }

      const pushpop = (f) => {
        p.push()
        f()
        p.pop()
      }
    }, this.$refs.p5Container)
  },
  beforeUnmount () {
    if (this.p5Instance) {
      this.p5Instance.remove()
    }
  }
}
</script>

<style scoped>
div {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}
</style>
