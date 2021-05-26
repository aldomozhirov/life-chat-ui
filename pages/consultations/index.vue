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
            :loading="loading"
            loading-text="Загрузка... Пожалуйста, подождите"
            class="elevation-1"
            @click:row="onTableRowClick"
          >
            <template v-slot:item.patient="{ item }">
              <v-list-item two-line>
                <v-list-item-avatar>
                  <img :src="item.patient.avatar_href" alt="avatar"/>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{item.patient.first_name}} {{item.patient.last_name}}</v-list-item-title>
                  <v-list-item-subtitle>{{item.last_message.text}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                label
                text-color="white"
                small
                :color="item.status.color"
              >
                {{ item.status.text }}
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
import getStatusTagProps from '../../utils/getStatusTagProps';
import { mapActions } from 'vuex';
import moment from 'moment';

moment.locale('ru');

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
        { text: 'Дата создания', value: 'created_at' },
        { text: 'Статус', value: 'status' },
        { text: 'Запланированная консультация', value: 'scheduled_on' },
        { text: 'Стоимость', value: 'total_cost' },
      ],
      loading: false
    }
  },
  async created() {
    this.loading = true;
    await this.load();
    this.loading = false;
  },
  computed: {
    consultations () {
      return this.$store.state.consultations.list.map(item => {
        return {
          ...item,
          created_at: moment.unix(item.created_at).calendar(),
          scheduled_on: moment.unix(item.scheduled_on).calendar(),
          status: getStatusTagProps(item.status),
          total_cost: `${item.total_cost} руб.`
        }
      })
    }
  },
  methods: {
    onTableRowClick (e) {
      this.$router.push(`consultations/${e.id}`);
    },
    ...mapActions({
      load: 'consultations/load'
    }),
  },
}
</script>
