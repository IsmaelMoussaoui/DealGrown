<template>
  <div>
    <header>
      <h1>DealGrown Analytics</h1>
    </header>

    <nav>
      <!-- Liens de navigation ou menu latéral ici -->
    </nav>

    <section class="metrics">
      <div class="card">
        <h3>Total Visitors</h3>
        <p>{{ totalVisitors }}</p>
      </div>
      <div class="card">
        <h3>Nombre d'achats par lien affilié</h3>
        <p>{{ totalAffiliedLinkBuy }}</p>
      </div>
      <!-- Ajoutez d'autres cartes pour d'autres métriques -->
      <div class="card">
        <DoughnutChart />
      </div>
    </section>

    <section class="charts">
      <!-- Insérez d'autres graphiques ici si nécessaire -->
    </section>

    <section class="details-table">
      <!-- Tableau avec des détails spécifiques ici -->
    </section>
  </div>
</template>

<script>
import DoughnutChart from '../components/DoughnutChart.vue'  // Assurez-vous que le chemin est correct

export default {
  components: {
    DoughnutChart
  },
  data() {
    return {
      totalVisitors: 12000,  // Exemple de donnée, vous devrez récupérer ces données depuis une API ou une autre source
      totalAffiliedLinkBuy: 48000      // Exemple de donnée
    };
  }
}
</script>

<style scoped>
/* Styles de base pour le tableau de bord */
header {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem;
}
/* Ajoutez d'autres styles selon vos besoins */
</style>
