<template>
    <Form @submit="submitRegister" :validation-schema="registerFormSchema" 
    class="login-form my-custom-form border border-gray-300 rounded-lg p-4 mt-12 " style="background-color: #73C6D9">
        <h4 class="text-center">Đăng ký</h4>
        <div class="form-group mt-3">
            
            <Field name="name" type="text" class="form-control" v-model="registerData.name" placeholder="Họ tên:" />
            <ErrorMessage name="name" class="error-feedback text-danger" />
        </div>
        <div class="form-group mt-3">
            
            <Field name="email" type="email" class="form-control" v-model="registerData.email" placeholder="Email:" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>
        <div class="form-group mt-3">
            
            <Field name="password" type="password" class="form-control" v-model="registerData.password" placeholder="Mật khẩu:" />
            <ErrorMessage name="password" class="error-feedback text-danger" />
        </div>
        <div class="form-group mt-3">
            
            <Field name="confirmPassword" type="password" class="form-control" v-model="registerData.confirmPassword" placeholder="Xác nhận mật khẩu:" />
            <ErrorMessage name="confirmPassword" class="error-feedback text-danger" />
        </div>
        <div class="form-group mt-3">
            
            <Field name="phone" type="tel" class="form-control" v-model="registerData.phone" placeholder="Số điện thoại:" />
            <ErrorMessage name="phone" class="error-feedback text-danger" />
        </div>
        <div class="text-center">
            <p>Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
        </div>
        <div class="form-group d-flex justify-content-center">
            <button class="btn btn-primary w-100" type="submit"> Đăng ký
            </button>
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
            registerData: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
            },
            registerFormSchema: yup.object().shape({
                name: yup.string().required("Vui lòng nhập họ tên."),
                email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập Email."),
                password: yup.string().required("Vui lòng nhập mật khẩu."),
                confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp."),
                phone: yup.string().required("Vui lòng nhập số điện thoại."),
            }),
        };
    },
    methods: {
        submitRegister() {
            this.$emit("submit:register", this.registerData);
        }
    },
};
</script>

<style scoped>
.register-form .form-group {
    margin-bottom: 20px;
}
</style>