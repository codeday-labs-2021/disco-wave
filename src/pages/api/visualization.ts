import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'
import { sin, circle } from './util/canvas'

export default class Visualization extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 10 })
    this.theme = ['#18FF2A', '#7718FF', '#06C5FE', '#FF4242', '#18FF2A']
  }

  hooks () {
    this.sync.on('bar', beat => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
    })
  }

  paint ({ ctx, height, width, now }) {
    const bar = interpolateBasis([0, this.sync.volume * 10, 0])(this.sync.bar.progress)
    const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress)
    ctx.fillStyle = 'rgba(0, 0, 0, .08)'
    ctx.fillRect(0, 0, width, height)
    ctx.lineWidth = bar 
    ctx.strokeStyle = interpolateRgb(this.lastColor, this.nextColor)(this.sync.bar.progress)
    sin(ctx, now / 50, height / 2, this.sync.volume * 50, 100)
    ctx.stroke()
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.beginPath()
    ctx.lineWidth = beat
    circle(ctx, width / 2, height / 2, this.sync.volume * height / 5 + beat / 10)
    ctx.stroke()
    ctx.fill()
  }
}