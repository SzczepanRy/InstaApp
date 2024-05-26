<script>
import { net } from "../net/net.js";
export default {
    data() {
        return {
            modalState: true,

            registerEmail: "",
            registerPassword: "",
            registerPassword2: "",
            firstname: "",
            lastname: "",

            loginEmail: "",
            loginPassword: "",

            loginErr: "",
            registerErr: "",

        };
    },
    methods: {
        login() {
            if (this.loginEmail != "" && this.loginPassword != "") {
                if (/.+@[a-zA-Z]+\.[a-zA-Z]+/.test(this.loginEmail)) {
                    (async () => {
                        const data = await net.login(this.loginEmail, this.loginPassword);
                        if (data.success) {
                            localStorage.setItem("token", datat)
                        }
                    })();
                } else {
                    this.loginErr = "invalid email";
                }
            } else {
                this.loginErr = "fill out all fealds";
            }
        },
        register() {
            if (
                this.registerEmail != "" &&
                this.registerPassword != "" &&
                this.registerPassword2 != "" &&
                this.firstname != "" &&
                this.lastname != ""
            ) {
                if (/.+@[a-zA-Z]+\.[a-zA-Z]+/.test(this.registerEmail)) {
                    if (this.registerPassword == this.registerPassword2) {
                        (async () => {
                            const data = await net.register(
                                this.registerEmail,
                                this.registerPassword,
                                this.lastname,
                                this.firstname
                            );
                            if (data.success) {

                                this.registerErr = "confirmatin email sent";
                                this.registerEmail = ""
                                this.registerPassword = ""
                                this.registerPassword2 = ""
                                this.firstname = ""
                                this.lastname = ""


                            } else {

                                this.registerErr = "email already registered";
                            }

                        })();
                    } else {
                        this.registerErr = "passwords do not match ";
                    }
                } else {
                    this.registerErr = "invalid email";
                }
            } else {
                this.registerErr = "fill out all fealds";
            }
        },
        handleInfoModal() {
            this.infoModalState = false;
            this.$router.push({ path: "/" });
        },
    },
};
</script>

<template>
    <div v-if="this.modalState" class="login">
        <div class="loginMain">
            <h1 class="title">intagram</h1>
            <h4>
                {{ this.loginErr != "" ? this.loginErr : "login to your account" }}
            </h4>
            <input @input="(e) => {
                this.loginEmail = e.target.value;
            }
                " type="texa" placeholder="email" class="loginInput" />
            <input @input="(e) => {
                this.loginPassword = e.target.value;
            }
                " type="text" placeholder="password" class="loginPasswordInput" />
            <button @click="this.login()" class="loginButton">login</button>

        </div>
        <div class="registerFooter">
            <a @click="() => {
                this.modalState = !this.modalState;
            }
                " href="#">Create a new account</a>
        </div>
    </div>

    <div v-if="!this.modalState" class="register">
        <div class="registerMain">
            <h1 class="titie">intagram</h1>
            <h4 class="desc">
                {{ this.registerErr != "" ? this.registerErr : "register to view pohots form your friends!" }}
            </h4>
            <input :value="this.registerEmail" @input="(e) => {
                this.registerEmail = e.target.value;
            }
                " type="texa" placeholder="email" class="registerInput" />
            <input :value="this.registerPassword" @input="(e) => {
                this.registerPassword = e.target.value;
            }
                " type=" text" placeholder="password" class="registerPasswordInput" />
            <input :value="this.registerPassword2" @input="(e) => {
                this.registerPassword2 = e.target.value;
            }
                " type=" text" placeholder="repeat password" class="registerPassworInput2" />
            <input :value="this.firstname" @input="(e) => {
                this.firstname = e.target.value;
            }
                " type=" text" placeholder="firstname" class="firstname" />
            <input :value="this.lastname" @input="(e) => {
                this.lastname = e.target.value;
            }
                " type=" text" placeholder="lastname" class="lastname" />

            <button @click="this.register()" class="registerButton">register</button>
        </div>
        <div class="loginFooter">
            <a @click="() => {
                this.modalState = !this.modalState;
            }
                " href="#">login</a>
        </div>
    </div>
</template>

<style lang="scss">
@import url("./login.scss");
</style>
