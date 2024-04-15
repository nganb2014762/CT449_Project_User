<template>
    <nav class="navbar navbar-expand-lg" style="background-color: #73C6D9; border-bottom: 1px solid #dee2e6; color: black; font-weight: bold;">
        <div class="container-fluid">
            <!-- <a class="navbar-brand ms-3 me-5" href="/" style="font-weight: bold; font-size: larger;">My Library</a> -->
            <a class="navbar-brand ms-3 me-5" href="/">
                <img src="https://media.istockphoto.com/id/1338909550/vi/vec-to/m%E1%BB%9F-s%C3%A1ch-logo-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-cho-m%E1%BB%99t-hi%E1%BB%87u-s%C3%A1ch-ho%E1%BA%B7c-ki%E1%BB%83u-ch%E1%BB%AF-theo-phong-c%C3%A1ch-t%E1%BB%91i-thi%E1%BB%83u-c%E1%BB%A7a-c%C3%A1c.jpg?s=612x612&w=0&k=20&c=SS5ZqUy6U04BSA6DmvMGA9Pdb-CRMFi4FQk2C_pWoxg=" 
                alt="My Library Logo" style="max-height: 60px; border-radius: 50%;">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item ms-3 me-5">
                        <router-link :to="{ name: 'home' }" class="nav-link">
                            Trang chủ
                        </router-link>
                    </li>
                    <li class="nav-item ms-3 me-5" v-if="userName">
                        <router-link :to="{ name: 'cartpage', params: { id: userId }, }" class="nav-link">
                            Giỏ hàng
                        </router-link>
                    </li>

                    <li class="nav-item ms-3 me-5" v-if="userName">
                        <router-link :to="{ name: 'orderpage', params: { id: userId }, }" class="nav-link">
                            Đơn hàng
                        </router-link>
                    </li>


                </ul>

                <form class="d-flex" role="search" @submit.prevent="search">
                    <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Tìm kiếm..."
                        aria-label="Search">

                    <button class="btn " type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>

                <ul class="navbar-nav">

                    <li class="nav-item dropdown" v-if="userName">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {{ userName }}
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <router-link :to="{ name: 'profile', params: { id: userId }, }" class="dropdown-item">
                                    <i class="fas fa-user"></i>
                                    <span> Hồ sơ</span>
                                </router-link>
                            </li>
                            
                            <li>
                                <router-link to="#" class="dropdown-item" @click="confirmLogout">
                                    <i class="fas fa-sign-out-alt"></i>
                                    <span> Đăng xuất</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item ms-3 me-5" v-if="userName">
                        <router-link :to="{ name: 'cartpage', params: { id: userId }, }" class="nav-link">
                            <!-- <i class="fas fa-shopping-cart"></i> -->
                        </router-link>
                    </li>


                    <li class="nav-item ms-3" v-if="!userName">
                        <router-link :to="{ name: 'login' }" class="nav-link">
                            <i class="fas fa-user"></i>
                        </router-link>
                    </li>
                    <li class="nav-item ms-3 me-5" v-if="!userName">
                        <router-link :to="{ name: 'login' }" class="nav-link">
                            <i class="fas fa-shopping-cart"></i>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            userName: '',
            userId: '',
            searchQuery: '',
        };
    },
    mounted() {
        this.getUserNameFromCookie();
    },
    methods: {
        getUserNameFromCookie() {
            const name = Cookies.get("userName");
            const id = Cookies.get('userId');
            if (name) {
                this.userId = id;
                this.userName = name;
            }
        },
        confirmLogout() {
            if (confirm("Bạn có chắc muốn đăng xuất không?")) {
                this.logout();
            }
        },
        logout() {
            Cookies.remove('userName');
            Cookies.remove('userId');
            this.userName = '';
            this.$router.push({ name: 'login' });
        },
        search() {
            if (this.searchQuery.trim() !== '') {
                this.$router.push({ name: 'search', params: { query: this.searchQuery } });
            }
        }
    }
};
</script>
