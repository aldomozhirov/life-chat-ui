<template>
    <v-layout row no-gutters fill-height>

      <v-col cols="3" class="d-flex align-stretch">
        <v-list three-line>
          <template v-for="(item, index) in consultations">
            <v-list-item :key="index" nuxt :to="item.guid">
              <v-list-item-avatar>
                <v-img :src="item.patient.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{item.patient.firstName}} {{item.patient.lastName}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span class="text--primary">{{ item.patient.firstName }}</span> &mdash; {{ item.patient.lastMessage }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
          </template>
        </v-list>
      </v-col>

      <v-divider vertical/>

      <v-col class="d-flex flex-column">
        <v-row class="my-1 mx-2">
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg" alt="avatar"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                Ирина Ромашкина
              </v-list-item-title>
              <v-list-item-subtitle>
                Была в сети сегодня в 9:25
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn icon nuxt exact :to="{ name: 'consultations' }">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-row>

        <v-divider/>

        <v-row class="fill-height ma-0 pa-0">
          <v-col cols="7" class="d-flex flex-column align-end">
            <v-list three-line class="mt-auto" color="transparent">
              <template v-for="(item, index) in conversation">
                <v-list-item :key="index" class="ml-3 mr-3">
                  <v-list-item-avatar>
                    <v-img :src="item.from.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="mb-2">
                      <span class="text--primary">{{ item.from.firstName }} {{ item.from.lastName }}</span>
                      <span class="text--disabled ml-1">{{ formatSentAt(item.sentAt) }}</span>
                    </v-list-item-title>
                    <span class="text-body-2" style="white-space: pre-wrap;">{{ item.message }}</span>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
            <v-container>
              <v-textarea
                v-model="message"
                color="dark--grey"
                flat
                outlined
                auto-grow
                dense
                solo
                rows="1"
                prepend-icon="mdi-paperclip"
                append-outer-icon="mdi-send"
                label="Написать сообщение..."
                type="text"
                @click:append-outer="sendMessage"
                @keydown.enter.exact.prevent="sendMessage"
                @keydown.enter.shift.exact.prevent="newline"
              >
                <template v-slot:append>
                  <v-menu
                    top
                    open-on-hover
                    offset-y
                    :close-on-content-click="false"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-emoticon-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-emoji-picker @select="selectEmoji"/>
                  </v-menu>
                </template>
              </v-textarea>
            </v-container>
          </v-col>

          <v-divider vertical/>

          <v-col>
            <v-list dense color="transparent">
              <v-list-item>
                <v-list-item-content>Дата создания задачи</v-list-item-content>
                <v-list-item-content class="align-end">24.04.2021</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Дата первого обращения</v-list-item-content>
                <v-list-item-content class="align-end">24.04.2021</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Общая стоимость</v-list-item-content>
                <v-list-item-content class="align-end">0 рублей</v-list-item-content>
              </v-list-item>
              <v-list-group no-action>
                <template v-slot:activator>
                  <v-list-item-content>Новая консультация</v-list-item-content>
                </template>

                <v-list-item>
                  <v-list-item-content>Дата и время</v-list-item-content>
                  <v-list-item-content class="align-end">24.04.2021 17:00</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Статус</v-list-item-content>
                  <v-list-item-content class="align-end">Предоплачена</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Продолжительность</v-list-item-content>
                  <v-list-item-content class="align-end">Нет данных</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Стоимость</v-list-item-content>
                  <v-list-item-content class="align-end">Нет данных</v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-col>
        </v-row>
      </v-col>

    </v-layout>
</template>

<script>
const moment = require('moment');

export default {
  layout: 'app',
  name: "consultation",
  data: () => ({
    message: '',
    consultations: [
      {
        guid: '73b148ce-07e6-427a-8639-9ae2b21281d2',
        patient: {
          firstName: 'Ирина',
          lastName: 'Ромашкина',
          lastMessage: 'Здравствуйте! Очень срочно нужна ваша помощь, не знаю...',
          avatar: 'https://randomuser.me/api/portraits/women/81.jpg'
        },
        createdAt: '24.04.2021',
        status: 'NEW',
        scheduled: '29.04.2021',
        cost: '0 рублей',
      },
      {
        guid: '9205481b-54f4-4ea8-9e85-60119d17cc0c',
        patient: {
          firstName: 'Анна',
          lastName: 'Иванова',
          lastMessage: 'Спасибо вам большое за помощь снова, что бы я без...',
          avatar: 'https://randomuser.me/api/portraits/women/85.jpg'
        },
        createdAt: '10.04.2021',
        status: 'COMPLETED',
        scheduled: '24.04.2021',
        cost: '2450 рублей',
      },
    ],
    conversation: [
      {
        from: {
          firstName: 'Ирина',
          lastName: 'Ромашкина',
          avatar: 'https://randomuser.me/api/portraits/women/81.jpg'
        },
        message: 'Здравствуйте',
        sentAt: 1620328780
      },
      {
        from: {
          firstName: 'Ирина',
          lastName: 'Ромашкина',
          avatar: 'https://randomuser.me/api/portraits/women/81.jpg'
        },
        message: 'Добрый день! Очень надеюсь, что вы мне поможете с моим вопросом. Вчера я очень поругалась со своей сестрой из-за какой-то мелочи и не знаю, как с ней помириться. У нас такое случается постоянно и я очень устала от непонимания.\n\nНадеюсь, вы поможете мне разобраться в себе и моих проблемах, потому что у меня уже опускаются руки...',
        sentAt: 1620330799
      }
    ]
  }),
  methods: {
    sendMessage () {
      this.conversation.push({
        from: {
          firstName: 'Алексей',
          lastName: '',
          avatar: 'https://randomuser.me/api/portraits/women/83.jpg'
        },
        message: this.message,
        sentAt: Math.round(new Date().getTime() / 1000)
      });
      this.clearMessage()
    },
    clearMessage () {
      this.message = ''
    },
    newline () {
      this.message = `${this.message}\n`;
    },
    formatSentAt (value) {
      return moment.unix(value).format('HH:mm')
    },
    selectEmoji(emoji) {
      this.message = `${this.message}${emoji.data}`;
    }
  },
  async asyncData({ params, redirect }) {
    console.log(params.consultation);
  }
}
</script>

<style scoped>
::v-deep .v-input__append-inner{
  margin-top:3px !important;
  margin-right:0;
  padding:0 !important;
}
::v-deep .v-input__slot {
  padding-right:7px !important;
}
</style>
