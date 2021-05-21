<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <v-spacer></v-spacer>
        <v-toolbar-title>LIFE CHAT</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <nuxt />
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "full"
}
</script>
