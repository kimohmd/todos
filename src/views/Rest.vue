<template>
<div>
  <h1>Bitcoin Price Index</h1>
   <section v-if="errored">
    <p>Nous sommes désolés, nous ne sommes pas en mesure de récupérer ces informations pour le moment. Veuillez réessayer ultérieurement.</p>
  </section>
  <section v-else>
    <div v-if="loading">Chargement...</div>

  <div v-else v-for="currency in info"  :key="currency">
    {{ currency.description }}:
    <span >
      <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
    </span>
  </div>
  </section>

</div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  filters: {
  currencydecimal (value: number) {
    return value.toFixed(2)
  }
},
})
export default class Rest extends Vue {
    info: any = null;
    loading= true;
    errored= false;
    mounted(){
      axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response.data.bpi))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)

    }

}
</script>



