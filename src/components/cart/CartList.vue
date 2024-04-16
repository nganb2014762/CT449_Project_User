<template>
    <section class="h-100 h-custom mb-5">
        <div class="container h-100 ">
            <div class="row d-flex justify-content-center align-items-center h-80">
                <div class="col">
                    <div class="card-body p-4 ">
                        <!-- Danh sách sản phẩm -->
                        <div class="col-lg-9 mb-5  ">

                            <div v-if="products.length === 0" class="text-center my-5">
                                <h4>Chưa có sản phẩm nào</h4>
                            </div>
                            <!-- Nếu có sản phẩm trong giỏ hàng -->
                            <div v-else>
                                <div v-for="(product, index) in products" :key="product._id"
                                    :class="{ active: index === activeIndex }" class="card mb-2">
                                    <div class="card-body" style="background-color: #D4DCE8;">
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                                <div>
                                                    <img :src="product.imageUrl"
                                                        class="img-fluid rounded-3 d-none d-sm-block"
                                                        alt="Shopping item" style="width: 65px;" />
                                                </div>
                                                <div class="ms-3">
                                                    <h5><router-link :to="'/product/' + product._id"
                                                            class="text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                                            {{ product.title }}
                                                        </router-link>
                                                    </h5>
                                                    <p class="small mb-0">{{ product.author }}</p>
                                                    <p class="small mb-0">{{ product.nxb }}</p>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row align-items-center justify-content-between">
                                                <!-- Hiển thị "Số lượng" và số lượng sản phẩm -->
                                                <h6 class="fw-normal mb-0 me-3">Số lượng:</h6>
                                                <div class="row" style="width: 100px;">
                                                    <h5 class="fw-normal mb-0">{{ product.quantity }}</h5>
                                                </div>
                                                <!-- Nút xóa sản phẩm -->
                                                <button class="btn ml-3 btn-danger"
                                                    @click="deleteProduct(product._id)">Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Thông tin giỏ hàng -->
                        <div class="col-lg-9">
                            <div class="card  text-dark rounded-3">
                                <div class="card-body" style="background-color: #73C6D9;">
                                    <div class="d-flex justify-content-center align-items-center mb-4">
                                        <h5 class="mb-0 ">Đăng ký mượn</h5>
                                    </div>
                                    <form class="mt-4" @submit.prevent="submitForm">
                                        <!-- Nếu có sản phẩm trong giỏ hàng -->
                                        <div v-if="products.length > 0">
                                            
                                            <div class="form-group mb-4">
                                                <label for="ngayMuon" class="form-label">Ngày mượn</label>
                                                <input type="date" id="ngayMuon" class="form-control form-control-lg"
                                                    v-model="ngayMuon" required>
                                            </div>
                                            <div class="form-group mb-4">
                                                <label for="ngayTra" class="form-label">Ngày trả</label>
                                                <input type="date" id="ngayTra" class="form-control form-control-lg"
                                                    v-model="ngayTra" required>
                                            </div>
                                            <!-- Nút submit -->
                                            <button type="submit" class="btn btn-primary w-100 btn-block btn-lg">
                                                Đăng ký mượn 
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import Cookies from 'js-cookie';
export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        return {
            userId: Cookies.get("userId"),
            name: Cookies.get("userName"),
            ngayMuon: '',
            ngayTra: '',
            bookTitle: '',
            bookId: '',
            bookQuantity: 0,
            books: []
        };
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async deleteProduct(productId) {
            const userId = Cookies.get("userId");
            const bookId = productId;
            await CartService.delete(userId, bookId);
            alert("Xóa sản phẩm khỏi giỏ hàng thành công!");
            window.location.reload();
        },
        addBookToLoan() {
            this.products.forEach(product => {
                this.books.push({
                    title: product.title,
                    bookId: product._id,
                    quantity: product.quantity
                });
            });
        },
        async submitForm() {
            this.addBookToLoan();

            // Tạo đối tượng loanInfo để lưu thông tin mượn sách
            const loanInfo = {
                userId: this.userId,
                name: this.name,
                ngayMuon: this.ngayMuon,
                ngayTra: this.ngayTra,
                books: this.books
            };

            // Gửi thông tin mượn sách đi xử lý
            try {
                await OrderService.add(loanInfo);
                await CartService.deleteCart(this.userId);
                alert("Vui lòng chờ duyệt!");
                window.location.reload();
            } catch (error) {
                console.error("Lỗi khi thêm vào giỏ hàng:", error);
                alert("Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau!");
            }
        }
    }
};
</script>


<style scoped>
.card_product {
    position: relative;
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
