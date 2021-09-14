<template>
    <div>
        <p><a href="/"><img alt="Vue logo side" src="../assets/icon/icon-left-font.png" class="loggedout-logo" /></a></p>
        <h1 class="main-title">Connectez-vous</h1>
        <section class="default-block">
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
                <!--<button :disabled="loading"><span v-show="loading"></span><span>Se connecter</span></button>-->
                    <button>Se connecter</button>
                </div>
                <!-- Displaying a message if the form is not filled well -->
                <div v-if="message">
                    {{ message }}
                </div>
            </Form>
        </section>
    </div>
</template>


<script>
import { Form, Field, ErrorMessage } from "vee-validate";  // using "vee-validate" package to check form data
import * as yup from "yup";  // importing "yup" data validation library

export default {
    name: "login",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({  // defining object schema
            email: yup.string().required("Vous devez entrer une adresse e-mail."),
            password: yup.string().required("Vous devez entrer un mot de passe.")
        });

        return {  // defaults
            loading: false,
            message: "",
            schema
        };
    },
    computed: {
        loggedIn() {  // checking if user is logged in from global store
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {  // at this cycle, if already logged in redirect to profile page
            this.$router.push("/profile");
        }
    },
    methods: {
        handleLogin(user) {

            // this.loading = true;  // when submitting form, setting to true

            this.$store.dispatch("auth/login", user)  // dispatching form data to global store
            .then(() => {

                this.$router.push("/notes");  // when logged in redirect to notes

            },
            (error) => {
                // this.loading = false;
                this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            });
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
