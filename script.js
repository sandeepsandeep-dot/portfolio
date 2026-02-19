const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index => (
  frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg
);

// Preload images
const images = [];
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

canvas.width = 1158;
canvas.height = 770;

const updateImage = index => {
  context.drawImage(images[index], 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

// Initial draw
images[0].onload = () => updateImage(1);

// --- CHATBOT LOGIC ---
const resumeData = `
Name: Sandeep S. Role: Frontend Developer. 
Education: BE ECE at Govt College of Engineering Tirunelveli (2023-2027), CGPA 7.19. 
Skills: HTML, CSS, Javascript, Communication, Management. 
Contact: 9345707585, sandeepvj2005@gmail.com.
[cite_start]Location: Valapady, Salem. [cite: 1-31]
`;

document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input').value;
    const chatBody = document.getElementById('chat-body');
    
    if(!input) return;

    chatBody.innerHTML += <div><b>You:</b> ${input}</div>;
    document.getElementById('user-input').value = '';

    // Instructions for Gemini API (Conceptual)
    const systemPrompt = "You are an assistant. Answer ONLY using this resume info: " + resumeData;
    
    // Note: You need a real API key to fetch from Gemini.
    // This is a placeholder for where the API logic goes.
    [cite_start]chatBody.innerHTML += <div><b>Bot:</b> (Integrating Gemini 2.5 Flash...) Sandeep is a Frontend Developer with skills in HTML and JS. [cite: 2, 19, 26]</div>;
});
