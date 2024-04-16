
<template>
    <div class="row">
        <div class="col-lg-3 col-md-8 col-sm-12 mb-4" v-for="(product, index) in products" :key="product._id">
            <router-link :to="'/product/' + product._id" class="card card_product" style="height: 400px; text-decoration: none;">
                <img :src="product.imageUrl" class="card-img-top mt-3 align-self-center d-flex " alt="Hình ảnh"
                    style="height: 200px; width: 200px; object-fit: contain;">
                <div class="card-body">
                    <h5 class="card-title text-center" style="height : 40%;">{{ product.title }}</h5>
                    <p class="card-text text-center">Tác giả: {{ product.author }}</p>                    
                    <p class="card-text text-center"> {{ product.nxb }}</p>
                    
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<style>
.card_product {
    position: relative;
    cursor: pointer; /* Biến con trỏ thành hình bàn tay khi di chuột vào thẻ */
}

.card_product::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 98%, 0);
    z-index: 1;
    transition: background-color 0.3s ease-in-out;
}

.card_product:hover::after {
    background-color: hsla(0, 4%, 29%, 0.35);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>

