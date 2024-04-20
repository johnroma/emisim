const canvas = document.querySelector("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const c = canvas.getContext("2d")

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth

  initCanvas()
})

const mouse = {
  x: undefined,
  y: undefined,
}

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x
  mouse.y = event.y
  drawCircles()
})

window.addEventListener("touchmove", (event) => {
  const touch = event.touches[0]
  mouse.x = touch.clientX
  mouse.y = touch.clientY
  drawCircles()
})

class Circle {
  constructor(x, y, radius, vx, vy, rgb, opacity, birth, life) {
    this.x = x
    this.y = y
    this.radius = radius
    this.minRadius = radius
    this.vx = vx
    this.vy = vy
    this.birth = birth
    this.life = life
    this.opacity = opacity
    this.rgb = rgb
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
    c.fillStyle = `rgba(${this.rgb},${this.opacity})`
    c.fill()
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.vx = -this.vx
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.vy = -this.vy
    }

    this.x += this.vx
    this.y += this.vy

    this.opacity = 1 - ((frame - this.birth) * 1) / this.life

    if (frame > this.birth + this.life) {
      const index = circleArray.findIndex(
        (circle) => circle.birth === this.birth && circle.life === this.life
      )
      if (index !== -1) {
        circleArray.splice(index, 1)
      }
    } else {
      this.draw()
    }
  }
}

let circleArray = []

function initCanvas() {
  circleArray = []
}

const colorArray = [
  "29, 145, 252",
  "223, 9, 3",
  "90, 54, 192",
  "165, 201, 63",
  "343, 81, 45",
  "112, 174, 210",
]

function drawCircles() {
  for (let i = 0; i < 6; i++) {
    const radius = Math.floor(Math.random() * 4) + 2
    const vx = Math.random() * 2 - 1
    const vy = Math.random() * 2 - 1
    const spawnFrame = frame
    const rgb = colorArray[Math.floor(Math.random() * colorArray.length)]
    const life = 100
    circleArray.push(
      new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, spawnFrame, life)
    )
  }
}

let frame = 0
function animate() {
  requestAnimationFrame(animate)
  frame += 1
  c.clearRect(0, 0, innerWidth, innerHeight)
  for (const circle of circleArray) {
    circle.update()
  }
}

initCanvas()
animate()
