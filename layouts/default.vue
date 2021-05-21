<template>
  <v-app>
    <v-main>
      <v-app-bar
        fixed
        app
      >
        <v-spacer></v-spacer>
        <v-toolbar-title>LIFE CHAT</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
