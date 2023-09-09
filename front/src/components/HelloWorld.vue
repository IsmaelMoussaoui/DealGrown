<template>
  <div class="items-container">
    <div v-for="item in items" :key="item.id" class="item-card">
      <h3>{{ item.title }}</h3>
      <img :src="item.imageUrl" alt="Image of the ad" class="ad-image">
      <p>{{ truncateDescription(item.description) }}</p>
      <div class="ad-details">
        <span>Published at: {{ item.publishTime }}</span>
        <span>Merchant: {{ item.merchantName }}</span>
        <div class="author-info">
          <img :src="item.author.avatarUrl" alt="Author's avatar" class="author-avatar">
          <span>By: {{ item.author.username }}</span>
        </div>
      </div>
      <div class="votes">
        <button @click="upvote(item.id)">👍 {{ item.upvotes }}</button>
        <button @click="downvote(item.id)">👎 {{ item.downvotes }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:3000/api/deals");
      this.items = await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'API:", error);
    }
  },
  methods: {
    truncateDescription(description) {
      if (description.length > 190) {
        return description.substring(0, 190) + '...';
      }
      return description;
    },
    async upvote(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/deals/${id}/upvote`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Assurez-vous que la requête a réussi avant de mettre à jour l'interface utilisateur
        if (response.ok) {
          const item = this.items.find(item => item.id === id);
          if (item) {
            item.upvotes += 1;
          }
        } else {
          console.error("Erreur lors du vote positif");
        }
      } catch (error) {
        console.error("Erreur lors de l'appel à l'API:", error);
      }
    },

    async downvote(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/deals/${id}/downvote`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Assurez-vous que la requête a réussi avant de mettre à jour l'interface utilisateur
        if (response.ok) {
          const item = this.items.find(item => item.id === id);
          if (item) {
            item.downvotes += 1;
          }
        } else {
          console.error("Erreur lors du vote négatif");
        }
      } catch (error) {
        console.error("Erreur lors de l'appel à l'API:", error);
      }
    }
  }
}
</script>

<style scoped>
.items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;
  width: calc(33.333% - 1rem); /* pour un affichage en 3 colonnes */

  .votes {
    margin-top: 1rem;

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }

  .ad-image {
    max-width: 100%;
    margin: 1rem 0;
  }

  .ad-details {
    margin: 1rem 0;

    .author-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .author-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>