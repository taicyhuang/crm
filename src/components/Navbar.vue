<template>
    <div>
        <nav
            class="navbar-box w-48 bg-white fixed h-full p-5 shadow-sm lg:block"
            v-if="open"
        >

            <router-link :to="{ name: 'ProductList' }" class="block mb-2"
            >產品上傳</router-link
            >

        </nav>
        <div class="overlary block lg:hidden" v-if="open"></div>
    </div>
</template>
<script>
export default {
    props: ["open"]
};
</script>
<style lang="scss" scoped>
.navbar-box {
    z-index: 30;
}
.overlary {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.6);
}
</style>
