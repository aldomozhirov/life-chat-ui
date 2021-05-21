<template>
  <v-container>
    <v-card flat>
      <v-card-title class="display-1 mt-5 mb-5">
        Консультации
      </v-card-title>
      <v-card-text>
          <v-data-table
            :headers="headers"
            :items="consultations"
            :items-per-page="5"
            class="elevation-1"
            @click:row="onTableRowClick"
          >
            <template v-slot:item.patient="{ item }">
              <v-list-item two-line>
                <v-list-item-avatar>
                  <img :src="item.patient.avatar" alt="avatar"/>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{item.patient.firstName}} {{item.patient.lastName}}</v-list-item-title>
                  <v-list-item-subtitle>{{item.patient.lastMessage}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                label
                text-color="white"
                small
                :color="getStatusTagProps(item.status).color"
              >
                {{ getStatusTagProps(item.status).text }}
              </v-chip>
            </template>
          </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Logo from '@/components/Logo.vue'
import VuetifyLogo from '@/components/VuetifyLogo.vue'

export default {
  layout: 'app',
  components: {
    Logo,
    VuetifyLogo
  },
  data () {
    return {
      headers: [
        {
          text: 'Диалоги',
          align: 'start',
          sortable: false,
          value: 'patient',
          width: '20%'
        },
        { text: 'Дата создания', value: 'createdAt' },
        { text: 'Статус', value: 'status' },
        { text: 'Запланированная консультация', value: 'scheduled' },
        { text: 'Стоимость', value: 'cost' },
      ],
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
    }
  },
  methods: {
    getStatusTagProps (status) {
      switch (status) {
        case 'NEW':
          return {color: 'blue', text: 'Новая'}
        case 'POSTPONED':
          return {color: 'yellow', text: 'Отложена'}
        case 'COMPLETED':
          return {color: 'green', text: 'Завершена'}
        default:
          return {color: 'blue', text: 'Неизвестно'}
      }
    },
    onTableRowClick (e) {
      this.$router.push(`consultations/${e.guid}`);
    }
  },
}
</script>
