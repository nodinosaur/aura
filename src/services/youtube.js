import { env } from "../config/key";
import axios from "axios";

const service = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/"
});

export const getVideos = (order, nextPage) =>
  service.get("search", {
    params: {
      part: "snippet",
      channelId: env.YOUTUBE_CHANNEL_ID,
      maxResults: 6,
      type: "video",
      order,
      pageToken: nextPage,
      key: env.YOUTUBE_API_KEY
    }
  });
