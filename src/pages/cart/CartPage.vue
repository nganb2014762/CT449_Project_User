<template>
    <div class="container ">
        <h4 class="text-center ">Giỏ hàng</h4>
        <div class=" col-md-10 mx-auto">
            <CartList :products="cart" />
        </div>
    </div>
</template>


<script>
import CartList from "@/components/cart/CartList.vue";
import CartService from "@/services/cart.service";
import BookService from "@/services/product.service";
export default {
    components: {
        CartList,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            cart: [],
        };
    },
    methods: {
        async getProduct(id) {
            const array = [];
            try {
                const data = await CartService.get(id);
                // console.log(data)
                for (const id of data) {
                    // console.log(id.bookId)
                    const product = await BookService.get(id.bookId);
                    product.quantity = id.quantity;
                    array.push(product);
                }

                this.cart = array;
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        }
    },
    created() {
        this.getProduct(this.id);
    },
};
</script>