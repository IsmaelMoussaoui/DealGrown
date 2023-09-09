import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import HelloWorld from "@/components/HelloWorld.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/dashboard',
        component: AdminDashboard,
        beforeEnter: async (to, from, next) => {
            try {
                const response = await fetch("http://localhost:3000/api/checkUserRole", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const data = await response.json();
                if (data.role === 'admin') {
                    next();
                } else {
                    next('/');
                }
            } catch (error) {
                console.error("Erreur lors de la vérification du rôle de l'utilisateur:", error);
                next('/');
            }
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
