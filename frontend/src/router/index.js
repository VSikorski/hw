import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '../components/WelcomePage.vue';
import AdminPage from '../components/AdminPage.vue';
import ExplorePage from '@/components/ExplorePage.vue';

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: WelcomePage
    }, 
    {
        path: '/explore',
        name: 'Explore',
        component: ExplorePage
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
