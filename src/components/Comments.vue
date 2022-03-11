<template>
  <div class="component">{{ comments }}</div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import { commentsService } from "../services/CommentsService";
import { AppState } from "../AppState";
export default {
  setup() {
    onMounted(async () => {
      try {
        await commentsService.getAll();
      } catch (error) {
        logger.error(error);
      }
    });
    return {
      comments: computed(() => AppState.comments),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>