<template>
    <div class="container-xl px-4 mt-4">
        <div class="row">
            
            <div class="col-md-6 mx-auto">
                <div class="card mb-4">
                    
                    <div class="card-body " style="background-color: #73C6D9">
                        <Form @submit.prevent="submitContact" :validation-schema="contactFormSchema" class="my-form">
                            <div class="form-group mb-3">
                                <label for="email" class="font-weight-bold">E-mail:</label>
                                <Field name="email" type="email" class="form-control" v-model="contactLocal.email" />
                                <ErrorMessage name="email" class="error-feedback text-danger" />
                            </div>
                            <div class="row gx-3 mb-3">
                                <div class="form-group col-md-6">
                                    <label for="name">Tên người dùng:</label>
                                    <Field name="name" type="text" class="form-control" v-model="contactLocal.name" />
                                    <ErrorMessage name="name" class="error-feedback text-danger" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="gender">Giới tính:</label>
                                    <select v-model="contactLocal.gender" class="form-control">
                                        <option disabled value="">Giới tính</option>
                                        <option v-for="option in genderOption" :value="option.value"
                                            :key="option.value">{{ option.text }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="address">Địa chỉ:</label>
                                <Field name="address" type="text" class="form-control" v-model="contactLocal.address" />
                                <ErrorMessage name="address" class="error-feedback text-danger" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="phone">Điện thoại:</label>
                                <Field name="phone" type="tel" class="form-control" v-model="contactLocal.phone" />
                                <ErrorMessage name="phone" class="error-feedback text-danger" />
                            </div>
                            <button class="btn btn-primary " type="submit" @click="submitContact">Lưu</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            gender: yup.string().required("Giới tính không được để trống."),
        });
        return {
            contactLocal: this.contact,
            contactFormSchema,
            genderOption: [
                { value: 0, text: 'Nữ' },
                { value: 1, text: 'Nam' }
            ],
        };
    },
    
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
        }
    },
};
</script>
