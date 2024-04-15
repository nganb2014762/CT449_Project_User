import { createWebHistory, createRouter } from "vue-router";
// Auth
import Register from "@/pages/auth/RegisterPage.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";

// User
import Home from "@/pages/home/HomePage.vue";
import SearchPage from "@/pages/search/SearchPage.vue";
import FrofilePage from "@/pages/profile/ProfilePage.vue";
import ProductPage from "@/pages/product/ProductPage.vue";
import CartPage from "@/pages/cart/CartPage.vue";
import OrderPage from "@/pages/order/OrderPage.vue";
const routes = [
    //Auth
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
    },

    //User
    {
        path: "/",
        name: "home",
        component: Home,
    },
    
    {
        path: "/search/:query",
        name: "search",
        component: SearchPage,
    },
    {
        path: "/profile/:id",
        name: "profile",
        component: FrofilePage,
        props: true
    },
    {
        path: "/product/:id",
        name: "prodcut",
        component: ProductPage,
        props: true
    },
    
    {
        path: "/cartpage/:id",
        name: "cartpage",
        component: CartPage,
        props: true
    },
    {
        path: "/orderpage/:id",
        name: "orderpage",
        component: OrderPage,
        props: true
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/pages/NotFound.vue"),
    },
    
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;