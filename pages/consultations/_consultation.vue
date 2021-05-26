<template>
    <v-layout row no-gutters fill-height>

      <v-col cols="3" class="d-flex align-stretch">
        <v-flex>
          <v-list three-line>
            <template v-for="(item, index) in consultations">
              <v-list-item :key="index" nuxt :to="item.id">
                <v-list-item-avatar>
                  <v-img :src="item.patient.avatar_href"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.patient.first_name }} {{ item.patient.last_name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <span class="text--primary">{{ item.patient.first_name }}</span> &mdash; {{ item.last_message.text }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider/>
            </template>
          </v-list>
        </v-flex>
      </v-col>

      <v-divider vertical/>

      <v-col class="d-flex flex-column">
        <v-row class="my-1 mx-2">
          <v-list-item v-if="current.patient">
            <v-list-item-avatar>
              <img :src="current.patient.avatar_href" alt="avatar"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ current.patient.first_name }} {{ current.patient.last_name }}
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
                <v-list-item-content class="align-end">{{ this.current.created_at }}</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Дата первого обращения</v-list-item-content>
                <v-list-item-content class="align-end">24.04.2021</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Статус</v-list-item-content>
                <v-list-item-content class="align-end">
                  <div>
                    <v-chip
                      label
                      text-color="white"
                      small
                      :color="current.status.color"
                    >
                      {{ current.status.text }}
                    </v-chip>
                  </div>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Продолжительность</v-list-item-content>
                <v-list-item-content class="align-end">Нет данных</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Стоимость</v-list-item-content>
                <v-list-item-content class="align-end">{{ this.current.total_cost }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-col>

    </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import getStatusTagProps from "@/utils/getStatusTagProps";

moment.locale('ru');

export default {
  layout: 'app',
  name: "consultation",
  data: () => ({
    message: '',
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
  computed: {
    consultations () {
      return this.$store.state.consultations.list;
    },
    current () {
      const item = { ...this.$store.state.consultations.item };
      item.created_at = moment.unix(item.created_at).calendar();
      item.scheduled_on = moment.unix(item.scheduled_on).calendar();
      item.status = getStatusTagProps(item.status);
      item.total_cost = `${item.total_cost} руб.`;
      return item;
    }
  },
  async created () {
    await this.load();
    await this.loadOne(this.$route.params.consultation);
  },
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
    },
    ...mapActions({
      load: 'consultations/load',
      loadOne: 'consultations/loadOne'
    }),
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
