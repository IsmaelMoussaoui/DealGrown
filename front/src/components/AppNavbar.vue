<template>
  <nav class="navbar">
    <div class="navbar-left">
      <span @click="redirectToHome">
        DealGrown<span v-if="isAdmin"> Admin</span>
      </span>
    </div>

    <div class="navbar-right">
      <div v-if="isConnected">
        <div class="dropdown">
          <button class="dropbtn">{{ username }} ▼</button>
          <div class="dropdown-content">
            <a href="#">Mon compte</a>
            <a href="#">Mes annonces</a>
            <a href="#" @click="logout">Déconnexion</a>
          </div>
        </div>
      </div>
      <div v-else>
        <button @click="showLoginModal = true">Connexion</button>
      </div>
    </div>

    <!-- Modal de connexion -->
    <div v-if="showLoginModal" class="modal">
      <div class="modal-content">
        <span @click="showLoginModal = false" class="close">&times;</span>
        <h2>Connexion</h2>
        <!-- Formulaire de connexion -->
        <form @submit.prevent="login">
          <input type="text" v-model="username" placeholder="Nom d'utilisateur">
          <input type="password" v-model="password" placeholder="Mot de passe">
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    console.log('Token from localStorage:', localStorage.getItem('token'));
    return {
      isAdmin: false,
      isConnected: !!localStorage.getItem('token'),  // Vérifiez si le token est dans le localStorage
      username: localStorage.getItem('username') || 'NomUtilisateur',
      password: '',  // pour le formulaire de connexion
      showLoginModal: false  // pour afficher ou masquer le modal de connexion

    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);  // Stockez le token dans le localStorage
          localStorage.setItem('username', this.username);
          this.isConnected = true;
          this.showLoginModal = false;
          console.log('After login isConnected:', this.isConnected);

        } else {
          console.log('After login isConnected:', this.isConnected);

          // Gérer les erreurs de connexion
          console.error("Erreur lors de la connexion:", data.message);
        }
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
      }
    },
    logout() {
      localStorage.removeItem('token');  // Supprimez le token du localStorage
      this.username = 'NomUtilisateur';
      this.isConnected = false;
      console.log('After logout isConnected:', this.isConnected);

    },
    async redirectToHome() {
      try {
        const response = await fetch("http://localhost:3000/api/checkUserRole", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();
        if (data.role === 'admin') {
          await this.$router.push('/dashboard');
        } else {
          await this.$router.push('/');
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du rôle de l'utilisateur:", error);
        await this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  color: white;
}

.navbar a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.close {
  float: right;
  cursor: pointer;
}

</style>
