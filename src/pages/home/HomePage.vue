
<template>
    <div class="container mt-5">

        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://bizweb.dktcdn.net/100/431/731/themes/827302/assets/cat-banner-2.jpg?1662783644706"
                        class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="https://salt.tikicdn.com/ts/brickv2og/5a/eb/43/b6757b308e0195aaad79d8dd19d88fc2.jpg"
                        class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="https://marketplace.canva.com/EAF4n2WuNKc/2/0/1600w/canva-h%E1%BB%93ng-pastel-%C4%91en-n%E1%BB%95i-b%E1%BA%ADt-c%E1%BB%ADa-h%C3%A0ng-s%C3%A1ch-banner-JUT8DwjmSUI.jpg"
                        class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="category-list mt-3">
            <div class="dropdown">
                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-bs-toggle="dropdown" aria-expanded="false" style="border: none;">
                    <i class="fas fa-filter"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li v-for="(nxb, index) in genres" :key="index">
                        <a class="dropdown-item" href="#" @click="toggleGenre(nxb)">{{ nxb }}</a>
                    </li>
                </ul>
            </div>

        </div>
        <div class="row">
            <!-- Danh sách sách phẩm -->
            <div class="mt-3 col-lg-12 col-md-8">
                <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts"
                    v-model:activeIndex="activeIndex" />

            </div>

        </div>
    </div>
</template>

<script>
import ProductList from "@/components/home/ProductList.vue";
import ProductService from "@/services/product.service";


export default {

    components: {
        ProductList,
    },
    data() {
        return {
            products: [],
            activeIndex: -1,
            selectedGenres: [],
            genres: [],
        };
    },
    computed: {
        filteredProducts() {
            if (!this.selectedGenres.length) return this.products;
            return this.products.filter(contact => this.selectedGenres.includes(contact.nxb));
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
                this.genres = this.extractGenres(this.products);
            } catch (error) {
                console.log(error);
            }
        },
        extractGenres(products) {
            const genresSet = new Set();
            products.forEach(contact => {
                genresSet.add(contact.nxb);
            });
            return Array.from(genresSet);
        },
        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
        },

        toggleGenre(nxb) {
            this.selectedGenres = [];
            this.selectedGenres.push(nxb);
        }
    },
    mounted() {
        this.refreshList();
    },

        
};

</script>

<style>
.category-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.category-item {
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s;
}

.category-item:hover {
    background-color: #f0f0f0;
}
.carousel-inner img {
        max-height: 400px; 
        width: auto; 
        margin: 0 auto; 
    }
</style>
