<template>
    <div>
        <p><a href="/"><img src="../assets/icon/icon-left-font.png" class="logo-median" alt="Groupomania logo" /></a></p>
        <h1 class="main-title">Connectez-vous</h1>
        <section class="default-block">
            <Form @submit="handleLogin" :validation-schema="schema">
                <div class="entry-form">
                    <div class="entry-form__field">
                        <label for="email">E-mail</label>
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" />
                    </div>
                    <div class="entry-form__field">
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


<style lang="scss">
.entry-form {
    margin: 0 auto;
    width: 80%;

    @media screen and (min-width: 640px) {
        display: table;
        margin: 0 auto;
        width: 80%;
    }

    &__field {
        text-align: left;

        @media screen and (min-width: 640px) {
            display: table-row;
        }
    }

    & label {
        font-weight: 600;
        max-width: 10%;
        text-align: right;
        text-transform: uppercase;
        vertical-align: middle;

        @media screen and (min-width: 640px) {
            padding: 10px;
            display: table-cell;
        }
    }

    & input, textarea {
        background-color: #fff;
        border: none;
        border-radius: 10px;
        font-family: Sarala, Arial, sans-serif;
        font-size: 1.2em;
        margin: 10px;
        padding: 10px;
        width: 100%;

        @media screen and (min-width: 640px) {
            display: table-cell;
        }
    }    
}
</style>
