<template>
    <div>
        <div v-for="(order) in orders" :key="order._id" class="card mt-5">
            <div class="card-header" style="background-color: #73C6D9;">
                <div class="d-flex justify-content-between">
                    Trạng thái:
                    <span :class="{
                        'text-dark': order.status === 'Đang đợi duyệt',
                        'text-dark': order.status === 'Đang mượn',
                        'text-dark': order.status === 'Đã trả',
                        'text-danger': order.status === 'Đã hủy' || order.status === 'Quá hạn trả'
                    }">{{ order.status }}</span>
                </div>                
            </div>
            
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tựa sách</th>
                            <th scope="col">Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(book, bookIndex) in order.books" :key="book.bookId">
                            <td>{{ bookIndex + 1 }}</td>
                            <td>{{ book.title }}</td>
                            <td>{{ book.quantity }}</td>
                        </tr>
                    </tbody>
                </table>

                <p >Ngày mượn: {{ order.ngayMuon }}</p>
                <p >Ngày trả: {{ order.ngayTra }}</p>
                <div class="d-flex ">
                    <router-link v-if="order.status === 'Đang đợi duyệt'" to="#" class="btn btn-sm btn-primary mt-1  "
                        @click="submit(order._id)">
                         Hủy
                    </router-link>
                    <template v-else>
                        <button class="btn btn-sm btn-primary mt-1 " disabled> Hủy </button>
                    </template>
                </div>
            </div>
            
        </div>
    </div>
</template>



<script>
import OrderService from "@/services/order.service";

export default {
    props: {
        orders: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async submit(id) {
            if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
                const submitData = {
                    status: "Đã hủy"
                };
                const check = await OrderService.update(id, submitData);
                if (check) {
                    alert("Đã hủy thành công!");
                    window.location.reload();
                }
            }
        }

    },
};
</script>
