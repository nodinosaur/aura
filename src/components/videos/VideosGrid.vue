<template>
  <v-container grid-list-md fluid>
    <v-layout wrap row>
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
          <v-card-text>{{video.snippet.description | trimText}}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4 v-for="n in 3" :key="`4${n}`" v-show="loading">
        <LoadingCard />
      </v-flex>
    </v-layout>
    <v-layout row v-if="pageToken">
      <v-btn block color="secondary" dark @click="load(true)">Load more</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
import { getInstance } from "../../services/youtube";
import LoadingCard from "../common/LoadingCard";

export default {
  data() {
    return {
      videos: [],
      loading: false,
      error: null,
      pageToken: null
    };
  },
  props: {
    id: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    }
  },
  filters: {
    trimText(v) {
      const limit = 315;
      if (v.length > limit) {
        return `${v.substring(0, limit).trim()}...`;
      }
      return v;
    }
  },
  components: { LoadingCard },
  mounted() {
    this.load();
  },
  methods: {
    async load(more) {
      this.loading = true;
      if (!more) {
        this.videos = [];
        this.pageToken = null;
      }
      try {
        const { getChannelUploads } = await getInstance();
        const { data } = await getChannelUploads(this.pageToken);
        this.videos = [...this.videos, ...data.items];
        this.pageToken = data.nextPageToken;
      } catch (e) {
        this.error =
          "There was a problem loading videos please try refeashing the page";
      } finally {
        this.loading = false;
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
