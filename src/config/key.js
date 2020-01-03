export const MeetupAPI = {
  urlname: "FlutterLDN" // CHAPTER_URL_NAME
};

// For urlname: extract the urlname from meetup chapter link-> https://meetup.com/FlutterLDN

export const env =  Object.entries(process.env).reduce((acc, [key, value]) => {
  // remove VUE_APP prefix to make for easier use
  acc[key.replace('VUE_APP_', '')] = value;
  return acc;
}, {});
