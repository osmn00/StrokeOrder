export const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  speechSynthesis.speak(utterance);
};