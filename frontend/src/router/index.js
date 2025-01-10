import { createRouter, createWebHistory } from 'vue-router';
import AdminPage from '../components/AdminPage.vue';
import HomePage from '@/components/HomePage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
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
