<template>
  <v-card flat tile>
    <v-card-title class="display-1 mt-5 mb-5">
      Регистрация
    </v-card-title>
    <v-card-text>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >
            1 шаг. Регистрация в ФНС
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            2 шаг. Данные налогоплательщика
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 3"
            step="3"
          >
            3 шаг. Платежные данные
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 4"
            step="4"
          >
            4 шаг. Привязка бота
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 5"
            step="5"
          >
            5 шаг. Последний шаг
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              class="mb-12"
              flat
            >
              <v-card-title class="text-h5">
                Зарегистрируйтесь в ФНС как самозанятый
              </v-card-title>
              <v-card-text>
                <div class="text--primary">
                  Перейдите на страницу <a href="https://himself-ktr.nalog.ru/">Кабинета налогоплательщика НПД</a> и зарегистрируйтесь
                </div>
              </v-card-text>
            </v-card>
            <v-card-text>
              <v-btn
                width="250"
                class="mt-1"
                color="primary"
                depressed
                tile
                @click="e1 = 2"
              >
                Далее
              </v-btn>
            </v-card-text>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card flat>
              <v-card-title class="text-h5">
                Введите свои данные налогоплательщика
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row justify="start">
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-text-field label="Фамилия"/>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-text-field label="Имя"/>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-text-field label="Отчество"/>
                    </v-col>
                  </v-row>
                  <v-row justify="start">
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-text-field label="E-mail"/>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-text-field label="Номер телефона"/>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-autocomplete
                        v-model="nationality"
                        :items="nationalities"
                        label="Национальность"
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-text-field label="ИНН физлица"/>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn
                  width="250"
                  class="mt-5"
                  color="primary"
                  depressed
                  tile
                  @click="e1 = 3"
                >
                  Далее
                </v-btn>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              width="40%"
              flat
            >
              <v-card-title class="text-h5">
                Укажите данные карты для получения платежей
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field label="Номер карты"/>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field label="Имя держателя карты"/>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field label="Срок действия"/>
                    </v-col>
                    <v-col>
                      <v-text-field label="CVC"/>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn
                  width="250"
                  class="mt-1"
                  color="primary"
                  depressed
                  tile
                  @click="e1 = 4"
                >
                  Далее
                </v-btn>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card flat>
              <v-card-title class="text-h5">
                Создайте и привяжите Telegram бота
              </v-card-title>
              <v-card-text width="30%">
                <div class="text--primary">
                  <ol>
                    <li>Создайте своего чат-бота с помощью <a href="https://t.me/BotFather">@BotFather</a></li>
                    <li>Придумайте Название и Username бота</li>
                    <li>Вставьте полученный токен:</li>
                  </ol>
                  <v-text-field
                    class="col-4 mt-4"
                    label="Токен Telegram бота"
                  />
                </div>
                <v-btn
                  width="250"
                  class="mt-1"
                  color="primary"
                  depressed
                  tile
                  @click="e1 = 5"
                >
                  Далее
                </v-btn>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="5">
            <v-card flat>
              <v-card-title class="text-h5">
                Введите свою часовую ставку и придумайте приветственное сообщение
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row class="col-3">
                    <v-text-field label="Часовая ставка, ₽"/>
                  </v-row>
                  <v-row class="col-7">
                    <v-textarea
                      outlined
                      label="Сообщение"
                      hint="Будет отправляться вашим клиентам в самом начале"
                    />
                  </v-row>
                </v-container>
                <v-btn
                  width="250"
                  class="mt-1"
                  color="primary"
                  depressed
                  tile
                  @click="e1 = 1"
                >
                  Далее
                </v-btn>
              </v-card-text>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'onboarding',
  data() {
    return {
      e1: 1,
      nationality: null,
      nationalities: [
        'Россия', 'Эстония', 'США'
      ]
    }
  }
}
</script>

<style scoped>

</style>
