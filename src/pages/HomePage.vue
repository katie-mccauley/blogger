<template>
  <div class="container-fluid">
    <div class="home flex-grow-1 d-flex flex-column text-light">
      <div class="row px-5 mb-5 pb-5">
        <div v-for="p in posts" :key="p.id" class="col-md-6">
          <Post :post="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll();
      } catch (error) {
        logger.error(error);
      }
    });
    return {
      posts: computed(() => AppState.posts),
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
