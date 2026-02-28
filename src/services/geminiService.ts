import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const gubiChat = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const model = "gemini-3-flash-preview";
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `Sen Gmax uygulamasının akıllı asistanı Gubi'sin. 
        Mavi, sevimli, güler yüzlü bir robotsun. 
        Kullanıcın bir diyabet hastası. 
        Görevin ona duygusal destek vermek, verilerini yorumlamak ve diyabet yönetiminde yardımcı olmak.
        Her zaman nazik, destekleyici ve neşeli olmalısın.
        Cevapların kısa, öz ve samimi (sen diliyle) olmalı.
        Eğer kullanıcı çok düşük şeker (hipoglisemi) belirtileri gösteriyorsa hemen 15g karbonhidrat almasını ve gerekirse acil durum butonunu kullanmasını hatırlat.
        Tüm cevapların Türkçe olmalı.`,
      }
    });

    return response.text || "Üzgünüm, şu an cevap veremiyorum. Ama her zaman yanındayım!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Bağlantımda bir sorun oluştu, ama merak etme, ben buradayım!";
  }
};
