import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/Login",
        name: "Login",
        meta: { requireAuth: false },
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { requireAuth: true },
        children: [
            {
                path: "/product",
                name: "ProductList",
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ "../views/products/List.vue"
                    ),
            },
            {
                path: "productadd",
                name: "productAdd",
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ "../views/products/Add.vue"
                    ),
            },
        ],
    },
    {
        path: "*",
        redirect: "/login",
    },
    // {
    //     path: "/",
    //     name: "Home",
    //     component: Home,
    // },
    // {
    //     path: "/about",
    //     name: "About",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>·
    //         import(/* webpackChunkName: "about" */ "../views/About.vue"),
    // },
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, form, next) => {
    const isLogin = localStorage.getItem("token") == "ImLogin";
    if (isLogin) {
        next();
    } else {
        if (to.path === "/login") {
            next("/product");
        } else {
            next();
        }
    }
});
export default router;
