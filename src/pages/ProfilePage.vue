<template>
  <div class="component">
    <div class="row">
      <div class="col-10 bg-primary text-light">
        <h1>{{ profile.name }}</h1>
        <p>{{ profile.email }}</p>
      </div>
    </div>
    <CreateForm v-if="account.id == profile.id" />
    <div class="row">
      <div class="col-4" v-for="p in posts" :key="p.id">
        <Post :post="p" />
        <i
          v-if="account.id == profile.id"
          data-bs-toggle="modal"
          data-bs-target="#edit-post"
          class="mdi mdi-pencil selectable"
        ></i>
      </div>
    </div>
    <Modal id="edit-post">
      <template #title>edit post </template>
      <template #body><CreateForm /></template>
    </Modal>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { profilesService } from "../services/ProfilesService";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
export default {
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
          await postsService.getAll({ creatorId: route.params.id });
        }
      } catch (error) {
        logger.error(error);
      }
    });
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>