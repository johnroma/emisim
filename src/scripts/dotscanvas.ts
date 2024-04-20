// Section 1: Canvas Setup
const canvas = document.querySelector("#dotcanvas") as HTMLCanvasElement
const c = canvas.getContext("2d")!
canvas.height = window.innerHeight
canvas.width = window.innerWidth

// Section 2: Event Listeners
window.addEventListener("resize", resizeCanvas)
window.addEventListener("mousemove", handleMouseMove)
window.addEventListener("touchmove", handleTouchMove)

function resizeCanvas() {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  initCanvas()
}

function handleMouseMove(event: MouseEvent) {
  updateMousePosition(event.x, event.y)
  drawCircles()
}

function handleTouchMove(event: TouchEvent) {
  const touch = event.touches[0]
  updateMousePosition(touch.clientX, touch.clientY)
  drawCircles()
}

function updateMousePosition(x: number, y: number) {
  mouse.x = x
  mouse.y = y
}

// Section 3: Mouse Position Interface
interface MousePosition {
  x: number | undefined
  y: number | undefined
}

const mouse: MousePosition = {
  x: undefined,
  y: undefined,
}

// Section 4: Circle Class Definition
class Circle {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    private vx: number,
    private vy: number,
    private rgb: string,
    public opacity: number,
    public birth: number,
    public life: number
  ) {}

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = `rgba(${this.rgb},${this.opacity})`
    c.fill()
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vx = -this.vx
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy
    }

    this.x += this.vx
    this.y += this.vy
    this.opacity = 1 - ((frame - this.birth) * 1) / this.life

    if (frame > this.birth + this.life) {
      const index = circleArray.findIndex((circle) => circle === this)
      if (index !== -1) {
        circleArray.splice(index, 1)
      }
    } else {
      this.draw()
    }
  }
}

// Section 5: Initialization and Animation
let circleArray: Circle[] = []
let frame = 0
const colorArray = [
  "255, 206, 206", // #ffcece
  "255, 193, 200", // #ffc1c8
  "255, 227, 176", // #ffe3b0
  "142, 214, 255", // #8ed6ff
]

function initCanvas() {
  circleArray = [] // Clear the array of circles
}

function drawCircles() {
  for (let i = 0; i < 6; i++) {
    const radius = Math.floor(Math.random() * 4) + 2
    const vx = Math.random() * 2 - 1
    const vy = Math.random() * 2 - 1
    const rgb = colorArray[Math.floor(Math.random() * colorArray.length)]
    const life = 100
    circleArray.push(
      new Circle(mouse.x!, mouse.y!, radius, vx, vy, rgb, 1, frame, life)
    )
  }
}

function animate() {
  requestAnimationFrame(animate)
  frame += 1
  c.clearRect(0, 0, canvas.width, canvas.height)
  circleArray.forEach((circle) => circle.update())
}

initCanvas()
animate()
