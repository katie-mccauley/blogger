
<template>
  <form
    class="row bg-grey darken-20 justify-content-center elevation-3 p-2 m-5"
  >
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Blog title</label>
      <input
        v-model="state.editable.title"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-md-8 mb-2">
      <label for="" class="form-label">cover image</label>
      <input
        v-model="state.editable.imgUrl"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-12 mb-2">
      <label for="" class="form-label">Body</label>
      <textarea
        v-model="state.editable.body"
        required
        type="text"
        class="form-control"
        placeholder=""
        aria-describedby="helpId"
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button
        v-if="!state.editable.id"
        @click="createPost"
        class="btn btn-primary"
      >
        create
      </button>
      <button v-else @click="editPost" class="btn btn-primary">edit</button>
    </div>
  </form>
</template>


<script>
import { reactive } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async createPost() {
        try {
          await postsService.createPost(state.editable);
          state.editable = {};
          router.push({ name: "Home" });
        } catch (error) {
          logger.error(error);
        }
      },
      async editPost() {
        try {
          await postsService.editPost(state.editable);
          Modal.getOrCreateInstance(
            document.getElementById("form-modal")
          ).hide();
        } catch (error) {
          logger.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>