import axios from "axios";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: `.env.local`, override: true });

const text =
  "高難度ローグライトゲーム、Noitaの開発会社はどこにあるでしょうか？";
const url =
  "https://texttospeech.googleapis.com/v1/text:synthesize?key=" +
  process.env.API_KEY;

console.log(url);

const request = {
  input: { text: text },
  voice: { languageCode: "ja-JP", ssmlGender: "NEUTRAL" },
  audioConfig: {
    audioEncoding: "MP3",
  },
};

const getAudio = async () => {
  const res = await axios.post(url, request);
  const { data, status } = res;
  console.log(data);

  const outputFile = "output.mp3";

  const audioContent = data.audioContent;
  const audioContentBuffer = Buffer.from(audioContent, "base64");
  fs.writeFileSync(outputFile, audioContentBuffer);
};

getAudio();
