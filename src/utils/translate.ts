// src/utils/translate.ts
import axios from 'axios';

export const translateText = async (text: string, targetLang: string) => {
  try {
    const res = await axios.post(
      'https://libretranslate.de/translate',  // public free endpoint
      {
        q: text,
        source: 'en',  // assuming default language is English
        target: targetLang,
        format: 'text'
      },
      {
        headers: { 'accept': 'application/json' }
      }
    );

    return res.data.translatedText;
  } catch (err) {
    console.error('Translation error:', err);
    return text; // fallback to original text
  }
};
