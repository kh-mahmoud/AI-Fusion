# 🤖 AI-Fusion

🌟 AI Models Documentation 🌟

AI-Fusion is a powerful AI module that integrates multiple AI models, including Google's Gemini models, Meta's LLaMA, and DeepSeek AI. It provides various AI functionalities for:

✅ Text Generation – Chatbots, AI responses <br/>
🎨 Image Processing – Recognition, Generation <br/>
🎥 Video Analysis – Summarization, Keyframe Extraction <br/>
👨‍💻 Code Understanding – AI-assisted coding in Python <br/>
📄 Document Processing – PDF Analysis, Embeddings <br/>

---

# 🛠️ Available AI Models  

<details open>
  <summary> 🔹 Google Gemini Models (Text, Image, and Video Processing)</summary>
  <ul style="margin-left: 20px;">
    <li>✅ <b>geminiFlash</b> → High-speed AI text generation (Gemini-2.0-Flash)</li>
    <li>🎨 <b>geminiFlashImage</b> → Fast image recognition (Gemini-2.0-Flash)</li>
    <li>📝 <b>geminitextstream</b> → AI-powered streaming text generation</li>
    <li>💬 <b>geminichat</b> → AI chatbot capabilities</li>
    <li>🖼️ <b>generateImage</b> → AI-based image generation</li>
    <li>🖌 <b>imagevision</b> → Image recognition (Gemini-1.5-Pro)</li>
    <li>🎥 <b>videovision</b> → Video analysis and keyframe detection</li>
    <li>📺 <b>youtubesummarizer</b> → Summarizes YouTube videos</li>
    <li>👨‍💻 <b>codertool</b> → AI-powered coding assistant</li>
    <li>🔍 <b>embed</b> → Generates vector embeddings for text</li>
    <li>📄 <b>pdfreader</b> → Extracts and analyzes text from PDFs</li>
    <li>🚀 <b>gemini_experimental</b> → Latest experimental AI features (Gemini-2.5-Pro-Exp)</li>
    <li>🎭 <b>gemini_experimental_image</b> → Experimental AI image vision (Gemini-2.5-Pro-Exp-Image)</li>
  </ul>
</details>  

<details open>
  <summary>🔹 Meta LLaMA Model (Advanced Language Understanding)</summary>
  <ul>
    <li>🧠 <b>meta_llama</b> → LLaMA model for generative AI and chat-based tasks</li>
  </ul>
</details>  

<details open>
  <summary>🔹 DeepSeek Model</summary>
  <ul>
    <li>🤖 <b style="margin-left: 20px">deep_run</b> → DeepSeek-R1, a powerful AI for deep text generation</li>
  </div>
</details>  
    
---
# ⚡ Quick Start Guide
### Clone the Repository  

```bash
git clone https://github.com/kh-mahmoud/AI-Fusion.git
cd AI-Fusion
```
### 📦 Install Dependencies 
```bash
npm install
```

### 🔑 Configure Environment Variables
Create a .env file in the root directory and add the following: <br/>

-- # Gemini Api  <br/>
`GEMENI_API_KEY = your_key_here`  <br/>

-- # Openrouter Api  <br/>
`API_KEY = your_key_here `<br/>

-- # Github marketplace  <br/>
`TOKEN = your_key_here  `  <br/>


# 📌 Usage :

choose your model :

```bash
    import {geminiFlash, geminiFlashImage, geminitextstream, geminichat, generateImage, 
    imagevision, videovision, youtubesummarizer, codertool, embed, pdfreader, 
    gemini_experimental, gemini_experimental_image 
    } from "./Gemini/index.js"
    import { meta_llama } from "./LLama/index.js"
    import { deep_run } from "./DeepSeek_R1/index.js"
```

```bash
  await geminiFlash("Generate a short story about AI.")  // Text generation (accepts prompt)
  await meta_llama("What is the capital of France?")  // LLaMA AI chat (accepts prompt)
  await deep_run("Explain the concept of deep learning.") // DeepSeek AI processing (accepts prompt)
 ```

  // Some models accept both prompt and URL:
  
```bash
  await imagevision("Describe the content of this image.", "https://example.com/image.jpg") // Image recognition (accepts prompt and URL)
  await videovision("Analyze this video.", "https://example.com/video.mp4")  // Video analysis (accepts prompt and URL)
  await youtubesummarizer("Summarize the key points.", "https://youtube.com/example_video") // YouTube video summarization (accepts prompt and URL)
  await pdfreader("Extract text from this PDF.", "https://example.com/sample.pdf") // PDF analysis (accepts prompt and URL)
 ```

# 🚀 Launch
```bash
node index.js
```



 
  **Note:** Some models require only the `prompt` parameter, while others may require both `prompt` and `url`. For more details, check the model code.




