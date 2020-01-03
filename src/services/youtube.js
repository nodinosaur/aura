import { env } from "../config/key";
import {setup} from "axios-cache-adapter";
import localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';

let api = null;

const youtubeRequest = (route, params, method = "get") => api[method](route, { params: { ...params, key: env.YOUTUBE_API_KEY } });

const getChannelInfo = () =>
  youtubeRequest("channels", {
    part: "contentDetails",
    id: env.YOUTUBE_CHANNEL_ID
  });

const getPlayListItems = ({playlistId, maxResults, pageToken}) =>
  youtubeRequest("playlistItems", { playlistId, maxResults: maxResults || 6, part: "snippet", pageToken });

// Note that theses are ordered by date uploaded
export const getChannelUploads = async (pageToken) => {
  const {data: channel} = await getChannelInfo();
  const { contentDetails:{relatedPlaylists:{uploads:playlistId}} } = channel.items.pop();
  return getPlayListItems({playlistId, pageToken});
};


export const getInstance = async () => {
  if(!api) {
    await localforage.defineDriver(memoryDriver)
    // Create `localforage` instance
    const forageStore = localforage.createInstance({
      // List of drivers used
      driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
        memoryDriver._driver
      ],
      // Prefix all storage keys to prevent conflicts
      name: 'flutter-london-cache'
    })

    // Create `axios` instance with pre-configured `axios-cache-adapter` using a `localforage` store
    api = setup({
      // `axios` options
      baseURL: 'https://www.googleapis.com/youtube/v3/',
      cache: {
        maxAge: 15 * 60 * 1000,
        store: forageStore, // Pass `localforage` store to `axios-cache-adapter`
        exclude: { query: false }
      }
    })
  }

  return {
    getChannelUploads
  };
}
