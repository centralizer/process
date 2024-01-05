import * as ytdl from "ytdl-core";
import * as fs from "fs";

export const youtubeDownloader = async (sourcId: string, id: string) => {
  const file = `${"12345"}..audio.mp4`;
  const stream = fs.createWriteStream(file);

  const response = ytdl(`http://www.youtube.com/watch?v=${"MjB4-5HLW7g"}`, {
    quality: 18,
  }).pipe(stream);

  await new Promise((resolve, reject) => {
    response.on("finish", resolve);
    response.on("error", reject);
  });

  return {
    file: file,
    response: response,
  };
};