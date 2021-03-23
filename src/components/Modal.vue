<template>
  <div
    id="modal-root-wrap"
    v-if="this.$store.state.modal_active"
    class="window-overflow"
  >
    <div id="modal-wrap" class="modal-window">
      <header class="modal-header">
        <h5 class="modal-title">please confirm</h5>
        <span class="close"></span>
      </header>
      <div class="modal-body">{{ this.$store.state.modal_message }}</div>
      <footer class="modal-footer">
        <button @click="deactivateModal" class="button button-alt small">
          cancel
        </button>
        <button
          v-for="(option, name) in this.$store.state.modal_callbacks"
          :key="name"
          @click="option"
          class="button small"
        >
          {{ name }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deactivateModal() {
      this.$store.commit("modal", [false, "", {}]);
    },
  },
};
</script>

<style>
</style>