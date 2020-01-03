<template>
  <v-card flat v-if="show" class="ma-1 pa-1 my-0 elevation-0 loading-card">
    <v-card-title class="mb-0" style="flex: 1;">
      <div>
        <p class="google-font mb-2 animate-shimmer" style="color:#424242;width:200px;height:20px;"></p>
        <p
          class="google-font mt-2 mb-1 animate-shimmer"
          style="color:#424242;width:150%;height:80px;"
        ></p>
        <p
          class="google-font mt-1 mb-0 animate-shimmer"
          style="color:#424242;width:100px;height:20px;"
        ></p>
        <p
          class="google-font mt-1 mb-0 animate-shimmer"
          style="color:#424242;width:100px;height:20px;"
        ></p>
        <p
          class="google-font mt-1 mb-0 animate-shimmer"
          style="color:#424242;width:100px;height:20px;"
        ></p>
      </div>
    </v-card-title>

    <v-card-actions class="mt-0">
      <v-spacer></v-spacer>
      <span class="animate-shimmer" style="color:#424242;width:60px;height:25px;"></span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
.loading-card {
  border-radius:7px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
