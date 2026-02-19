const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = (index) =>
  `frames/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const images = [];
let loadedImages = 0;
let animationFrame = 0;

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
    loadedImages++;
    if (loadedImages === 1) {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };
  images.push(img);
}

// Render frame
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    images[animationFrame],
    0,
    0,
    canvas.width,
    canvas.height
  );
}

// Scroll animation
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll =
    document.body.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  animationFrame = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(render);
});

