<template>
    <div class="container mt-5 mb-5">
        <h4 class="text-center ">Chi tiết</h4>
        <div class="row d-flex justify-content-center mt-3">
            <div class="col-md-8">
                
                    <div class="card">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="mt-5 mb-5">
                                    <div class="text-center">
                                        <img :src="productLocal.imageUrl" width="250" height="300" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-7">
                                <div class="product p-4">
                                    <div class="mt-4 mb-3">
                                        <h5 class="text-uppercase text-center mb-5">{{ productLocal.title }}</h5>
                                        <div class="price d-flex flex-row align-items-center">
                                            <p>Tác giả: <span>{{ productLocal.author }}</span></p>
                                        </div>
                                        <div class="price d-flex flex-row align-items-center">
                                            <p>Nhà xuất bản: <span>{{ productLocal.nxb }}</span></p>
                                        </div>
                                        <div class="price d-flex flex-row align-items-center">
                                            <p>Năm xuất bản: <span>{{ productLocal.namxb }}</span></p>
                                        </div>
                                        <div class="price d-flex flex-row align-items-center">
                                            <p>Số quyển còn lại: <span>{{ productLocal.quantity }}</span></p>
                                        </div>
                                    </div>

                                    <div class="quantity-control mb-3">
                                        
                                        <button class="btn btn-sm btn-icon r" @click="decreaseQuantity">
                                            <i class="fa fa-minus"></i>
                                        </button>
                                        <span class="mx-2">{{ quantity }}</span>
                                        <button class="btn btn-sm btn-icon " @click="increaseQuantity">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                        <button class="btn btn-primary  mr-2 px-4" @click="addToCart">Thêm
                                        vào giỏ hàng</button>
                                    </div>

                                    

                                </div>
                            </div>
                        </div>
                    </div>
                

            </div>
        </div>
    </div>
</template>

<script>
import { Form } from "vee-validate";
import CartService from "@/services/cart.service";
import Cookies from 'js-cookie';

export default {
    components: {
        Form,
    },
    props: {
        product: { type: Object, required: true }
    },
    data() {
        return {
            productLocal: this.product,
            check: false,
            quantity: 1,
        };
    },
    // async mounted() {
    //     await this.checkFavorite();
    // },
    methods: {
        // async checkFavorite() {
        //     const id = Cookies.get("userId");
        //     const userFavorites = await FavoriteService.get(id);
        //     this.check = userFavorites.bookId.includes(this.product._id);
        // },
        // async changeFavorite() {
        //     const id = Cookies.get("userId");
        //     const bookId = this.product._id;
        //     const userFavorites = await FavoriteService.get(id);
        //     const check = userFavorites.bookId.includes(this.product._id);
        //     if (check === true) {
        //         await FavoriteService.delete(id, bookId);
        //     } else {
        //         await FavoriteService.add(id, bookId);
        //     }
        //     await this.checkFavorite();
        // },
        async addToCart() {
            const quantity = this.quantity;
            const userId = Cookies.get("userId");
            const bookId = this.product._id;

            const books = [{ bookId, quantity }];
            const cartData = { userId, books };

            try {
                const check = await CartService.add(cartData);
                if (check) {
                    alert("Thêm vào giỏ hàng thành công!");
                }
            } catch (error) {
                console.error("Lỗi khi thêm vào giỏ hàng:", error);
                alert("Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau!");
            }
        },

        increaseQuantity() {
            this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        }
    },
};
</script>

<style>
.custom-card {
    height: 530px;
    /* Điều chỉnh chiều cao của card theo nhu cầu của bạn */
    /* Các thuộc tính CSS khác cho phần tử card */
}
</style>