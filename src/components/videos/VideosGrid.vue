<template>
  <v-container grid-list-md style="min-height: 20em;" >
    <v-tabs v-model="tab" class="mb-2">
      <v-tab href="#viewCount">Most Viewed</v-tab>
      <v-tab href="#date">Most Recent</v-tab>
    </v-tabs>
    <v-layout wrap row v-if="!error">
      <v-flex xs12 sm6 md4 lg4 v-for="video in videos" :key="video.etag">
        <v-card style="height:100%">
          <v-img :src="video.snippet.thumbnails.medium.url" height="200px">
            <v-container fill-height fluid pa-2>
              <v-layout fill-height>
                <v-flex xs12>
                  <span class="headline card-title" style v-html="video.snippet.title"></span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-text>{{video.snippet.description}}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4 v-for="n in 3" :key="`4${n}`" v-show="loading">
        <LoadingCard />
      </v-flex>
    </v-layout>
    <v-alert v-if="error && !loading" :value="true" type="error">This is a error alert.</v-alert>
    <v-btn block color="secondary" dark @click="loadVideos(true)" v-if="pageToken">Load more</v-btn>
  </v-container>
</template>

<script>
import { getVideos } from "../../services/youtube";
import LoadingCard from "../common/LoadingCard";

export default {
  components: {
    LoadingCard
  },
  data() {
    return {
      tab: "viewCount",
      loading: false,
      error: null,
      videos: [],
      pageToken: null
    };
  },
  methods: {
    async loadVideos(more) {
      try {
        this.loading = true;
        if (!more) this.videos = [];
        const response = await getVideos(this.tab, this.pageToken);
        this.videos = [...this.videos, ...response.data.items];
        this.pageToken = response.data.nextPageToken;
      } catch (e) {
        this.error =
          "There was a problem loading videos please try refeashing the page";
      } finally {
        this.loading = false;
      }
    }
  },
  watch: {
    tab: {
      immediate: true,
      handler() {
        this.pageToken = null;
        this.loadVideos();
      }
    }
  }
};
</script>

<style>
.card-title {
  background-color: black;
  color: white;
  line-height: 28px !important;
}
</style>
