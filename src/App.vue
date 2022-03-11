<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <Modal id="post-modal">
      <template #title> {{ activePosts.title }} </template>
      <template #body> {{ activePosts.body }} </template>
      <template #footer>
        <div
          @click="goTo('Profile')"
          class="selectable d-flex align-items-center"
        >
          <p>{{ activePosts.creator?.name }}</p>
        </div>
        <div>
          <Comments />
        </div>
      </template>
    </Modal>
  </main>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
export default {
  name: "App",
  setup() {
    const router = useRouter();
    return {
      goTo(page) {
        Modal.getOrCreateInstance(document.getElementById("post-modal")).hide();
        router.push({
          name: page,
          params: { id: AppState.activePosts.creatorId },
        });
      },
      appState: computed(() => AppState),
      activePosts: computed(() => AppState.activePosts),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
