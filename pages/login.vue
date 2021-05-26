<template>
  <v-container>
    <v-layout wrap>
      <v-flex sm12 md6 offset-md3>
        <v-card elevation="4" light tag="section">
          <v-card-title>
            <v-layout align-center justify-space-between>
              <h3 class="headline">
                LIFE CHAT
              </h3>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>Войдите с помощью имени пользователя и пароля:</p>
            <v-form>
              <v-text-field
                outline
                label="Имя пользователя"
                type="text"
                v-model="login.username"></v-text-field>
              <v-text-field
                outline
                hide-details
                label="Пароль"
                type="password"
                v-model="login.password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
            <v-btn color="info" plain>
              Забыли пароль?
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info"
                   :large="$vuetify.breakpoint.smAndUp"
                   class="mr-4"
                   @click="userLogin"
            >
              <v-icon left color="white">mdi-lock</v-icon>
              Войти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex sm12 md6 offset-md3>
        <v-layout align-center justify-space-between>
          <p class="caption my-3">
            <a href="#">Privacy Policy</a>
            |
            <a href="#">Terms of Service</a>
          </p>
          <p class="caption my-3">Powered by <a href="#">StaffCircle</a></p>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    darkTheme: true,
    login: {
      password: '',
      username: ''
    }
  }),
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.v-btn, .v-card {
  border-radius: 4px;
}
.v-card__title {
  text-transform: uppercase;
}
</style>
