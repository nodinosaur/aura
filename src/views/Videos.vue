<template>
  <v-content class="pa-0">
    <v-container fluid class="mt-2 mb-0">
      <v-layout wrap align-center justify-center row fill-height class="my-0">
        <v-flex xs12 md10 class="mb-0">
          <p
            class="google-font mb-0 mt-0"
            style="font-size:200%;color:#616161"
          >Videos</p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid class="grey lighten-5">
      <VideosGrid />
    </v-container>

    <v-container fluid class>
      <v-layout wrap align-center justify-center row fill-height>
        <v-flex xs12 md10 class>
          <!-- <pastEvents /> -->
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import VideosGrid from "@/components/videos/VideosGrid";

export default {
  components: { VideosGrid }
};
</script>

<style>
</style>
