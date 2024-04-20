// Ensure the DOM is loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
  const arr = ["#ffcece", "ffc1c8", "ffe3b0", "8ed6ff"]
  //select a random color from the array
  const randomColor = arr[Math.floor(Math.random() * arr.length)]

  const root = document.documentElement
  root.style.setProperty("--pastel", `#${randomColor}`)

  let initialTouchY: number | null = null
  let initialColorjoyPercentage: number = 50 // Default start percentage for --colorjoy
  let initialBrightenPercentage: number = 75 // Default start at the middle of its range 50-100%

  const updateCSSVariables = (event: TouchEvent) => {
    if (event.touches.length === 0) return // Exit if no touches are detected

    const clientY = event.touches[0].clientY
    if (initialTouchY === null) {
      // Check if it's the first touch
      initialTouchY = clientY
      // Fetch the current values for --colorjoy and --brighten
      initialColorjoyPercentage = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--colorjoy"
        )
      )
      initialBrightenPercentage = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--brighten"
        )
      )
    }

    const deltaY = clientY - initialTouchY // Calculate the vertical movement difference
    const height = window.innerHeight
    const adjustment = (deltaY / (0.3 * height)) * 100 // Calculate the percentage adjustment based on 30vh range

    // Calculate new percentage for --colorjoy
    let newColorjoyPercentage = initialColorjoyPercentage - adjustment
    newColorjoyPercentage = Math.max(0, Math.min(100, newColorjoyPercentage)) // Clamp the value between 0 and 100

    // Calculate new percentage for --brighten at double the speed
    let newBrightenPercentage = initialBrightenPercentage - 2 * adjustment
    newBrightenPercentage = Math.max(50, Math.min(100, newBrightenPercentage)) // Clamp the value between 50 and 100

    const root = document.documentElement
    root.style.setProperty("--colorjoy", `${newColorjoyPercentage.toFixed(2)}%`)
    root.style.setProperty("--brighten", `${newBrightenPercentage.toFixed(0)}%`)

    console.log(
      `--colorjoy set to: ${newColorjoyPercentage.toFixed(
        2
      )}%, --brighten set to: ${newBrightenPercentage.toFixed(0)}%`
    )
  }

  const handleTouchEnd = () => {
    initialTouchY = null // Reset initial touch Y when the touch ends
  }

  // Attach touch event listeners to the document
  document.addEventListener("touchmove", updateCSSVariables)
  document.addEventListener("touchend", handleTouchEnd)
  document.addEventListener("touchcancel", handleTouchEnd) // Also consider touch cancel events
})
