<template>
    <div>
        <p><a href="/"><img alt="Vue logo side" src="../assets/icon/icon-left-font.png" class="loggedout-logo" /></a></p>
        <h1 class="main-title">Connectez-vous</h1>
        <div class="default-block">
            <Form @submit="handleLogin" :validation-schema="schema">
                <div class="login-fields">
                    <div class="login-fields__email">
                        <label for="email">E-mail</label>
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" />
                    </div>
                    <div class="login-fields__password">
                        <label for="password">Password</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" />
                    </div>
                </div>

                <div class="main-button">
                    <button :disabled="loading"><span v-show="loading"></span><span>Se connecter</span></button>
                </div>

                <div>
                    <div v-if="message" role="alert">
                        {{ message }}
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    name: "Login",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            email: yup.string().required("Vous devez entrer une adresse e-mail."),
            password: yup.string().required("Vous devez entrer un mot de passe.")
        });

        return {
            loading: false,
            message: "",
            schema
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    },
    methods: {
        handleLogin(user) {
            this.loading = true;

            this.$store.dispatch("auth/login", user)
            .then(() => {
                this.$router.push("/notes");
                },
                (error) => {

                    this.loading = false;
                    this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                }
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.login-fields {
    display: table;
    margin: 0 auto;
    width: 80%;

    &__email, &__password {
        display: table-row;
        text-align: left;
    }

    & label {
        display: table-cell;
        font-weight: 600;
        max-width: 10%;
        padding: 10px;
        text-align: right;
        text-transform: uppercase;
        vertical-align: middle;
    }

    & input, textarea {
        background-color: #fff;
        border: none;
        border-radius: 10px;
        display: table-cell;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 1.2em;
        margin: 10px;
        padding: 10px;
        width: 100%;
    }    
}
</style>
