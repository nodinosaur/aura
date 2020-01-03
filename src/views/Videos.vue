<template>
  <v-content class="pa-0">
    <v-container fluid class="mt-2 mb-0">
      <v-layout wrap align-center justify-center row fill-height class="my-0">
        <v-flex xs12 md10 class="mb-0">
          <p class="google-font mb-0 mt-0" style="font-size:200%;color:#616161">Videos</p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid class="grey lighten-5">
      <v-layout wrap align-center justify-center row fill-height class="my-0">
        <v-flex xs12 md10 class="mb-0">
          <v-tabs class="mb-2" v-model="selectedTab">
            <template v-for="tab in tabs">
              <v-tab :key="`${tab.id}-tab`" :href="`#${tab.id}`">{{tab.displayName}}</v-tab>
              <v-tab-item :key="`${tab.id}-tab-item`" :value="tab.id">
                <component v-bind:is="tab.component" :id="tab.id" :isActive="selectedTab === tab.id"></component>
              </v-tab-item>
            </template>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import LoadingCard from "../components/common/LoadingCard";
import VideosGrid from "@/components/videos/VideosGrid";

export default {
  data() {
    return {
      selectedTab: '#date',
      tabs: [
        {
          id: "date",
          displayName: "Most Recent",
          component: VideosGrid
        },
        {
          id: "playlist",
          displayName: "Playlists",
          component: LoadingCard
        }
      ]
    };
  }
};
</script>

<style>
</style>
