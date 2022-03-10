<template>
  <div
    class="row p-3 selectable"
    data-bs-toggle="modal"
    data-bs-target="#post-modal"
    @click="setActive"
  >
    <div class="col-5 bg-light text-dark">
      <h2>{{ post.title }}</h2>
    </div>
  </div>
</template>


<script>
import { postsService } from "../services/PostsService";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      setActive() {
        postsService.setActive(props.post);
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>