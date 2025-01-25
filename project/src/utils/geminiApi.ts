import { GoogleGenerativeAI } from '@google/generative-ai';

// API anahtarını al
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY çevre değişkeni bulunamadı!');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-pro", // Model adını düzelttik
});

const generationConfig = {
  temperature: 0.7, // Daha tutarlı yanıtlar için düşürüldü
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 2048, // Token limitini düşürdük
};

export async function sendMessage(message: string): Promise<string> {
  if (!message.trim()) {
    throw new Error('Mesaj boş olamaz');
  }

  try {
    const prompt = `Sen bir hukuk asistanısın. Türkçe olarak yanıt ver. Soru: ${message}`;
    
    // Chat oturumu başlat
    const chat = model.startChat({
      generationConfig,
      history: [],
    });

    // Mesajı gönder ve yanıtı bekle
    const result = await chat.sendMessage(prompt);
    
    if (!result?.response) {
      throw new Error('API yanıt vermedi');
    }

    const text = await result.response.text();
    
    if (!text) {
      throw new Error('API boş yanıt döndü');
    }

    return text;

  } catch (error) {
    console.error('Gemini API Hatası:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        throw new Error('API anahtarı geçersiz. Lütfen doğru API anahtarını kullandığınızdan emin olun.');
      }
      
      if (error.message.includes('PERMISSION_DENIED')) {
        throw new Error('API erişim izni reddedildi. API anahtarınızın doğru ve aktif olduğundan emin olun.');
      }
      
      throw new Error(`API Hatası: ${error.message}`);
    }

    throw new Error('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
  }
}