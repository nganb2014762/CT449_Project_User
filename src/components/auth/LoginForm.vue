<template>
    <Form @submit="submitLogin" :validation-schema="loginFormSchema"
        class="login-form my-custom-form border border-gray-300 rounded-lg p-4 mt-12 "style="background-color: #73C6D9">
        <h4 class="text-center">Đăng nhập</h4>
        <div class="form-group">
            
            <Field name="email" type="email" class="form-control" v-model="loginData.email"  placeholder="Email của bạn:" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            
            <Field name="password" type="password" class="form-control" v-model="loginData.password" placeholder="Mật khẩu:"/>
            <ErrorMessage name="password" class="error-feedback text-danger" />
        </div>
        <div class="text-center">
            <p>Bạn chưa có tài khoản? <router-link to="/register">Đăng ký</router-link></p>
        </div>
        <div class="form-group">
            <button class="btn btn-primary w-100" type="submit">Đăng nhập</button>
        </div>
    </Form>

</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";


export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            loginData: {
                email: "",
                password: "",
            },
            loginFormSchema: yup.object().shape({
                email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập Email."),
                password: yup.string().required("Vui lòng nhập mật khẩu."),
            }),
        };
    },
    methods: {
        submitLogin() {
            this.$emit("submit:login", this.loginData);
        }
    },
};
</script>

<style scoped>
.login-form .form-group {
    margin-bottom: 20px;
}
</style>
