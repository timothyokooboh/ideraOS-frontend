<template>
  <v-app>
    <Navigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation"

export default {
  name: 'App',

  components: {
    Navigation
  },

  data: () => ({
    //
  }),

  created() {
    this.$store.dispatch("a_autoLogin")
  }
};
</script>
