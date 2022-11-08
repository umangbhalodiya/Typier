import easy_en from "./easy_en.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";

export const shuffleWord = (maxWord, language) => {

  let shuffledWord;
  switch (language) {
    case "en":
      shuffledWord = en.slice(0);
      break;
    case "es":
      shuffledWord = es.slice(0);
      break;
    case "fr":
      shuffledWord = fr.slice(0);
      break;
    default:
      shuffledWord = easy_en.slice(0);
      break;
  }
  for (let i = shuffledWord.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = shuffledWord[i];
    shuffledWord[i] = shuffledWord[j];
    shuffledWord[j] = temp;
  }
  return shuffledWord.slice(0, maxWord);
};
