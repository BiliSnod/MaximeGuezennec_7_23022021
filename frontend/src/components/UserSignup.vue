<template>
    <div>
        <p><a href="/"><img alt="Vue logo side" src="../assets/icon/icon-left-font.png" class="loggedout-logo" /></a></p>
        <h1 v-if="!successful" class="main-title">Inscrivez-vous</h1>
        <div class="default-block">
            <Form @submit="handleSignup" :validation-schema="schema">
                <div v-if="!successful" class="signup-fields">
                    <div class="signup-fields__firstname">
                        <label for="firstname">Prénom</label>
                        <Field name="firstname" type="text" />
                        <ErrorMessage name="firstname" />
                    </div>
                    <div class="signup-fields__lastname">
                        <label for="lastname">Nom</label>
                        <Field name="lastname" type="text" />
                        <ErrorMessage name="lastname" />
                    </div>
                    <div class="signup-fields__email">
                        <label for="email">E-mail</label>
                        <Field name="email" type="email" />
                        <ErrorMessage name="email" />
                    </div>
                    <div class="signup-fields__password">
                        <label for="password">Mot de passe</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" />
                    </div>
                </div>

                <div class="main-button" v-if="!successful">
                    <button :disabled="loading"><span v-show="loading"></span><span>S'inscrire</span></button>
                </div>
                
                <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                    <p class="bold">{{ message }}</p>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    name: "Signup",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            firstname: yup.string().required("Veuillez entrer un prénom !").min(3, "Minimum 3 caractères").max(20, "Maximum 20 caractères."),
            lastname: yup.string().required("Veuillez entrer un nom !").min(3, "Minimum 3 caractères.").max(20, "Maximum 20 caractères"),
            email: yup.string().required("Veuillez entrer une adresse e-mail !").email("Cette adresse e-mail n'est pas valide !").max(80, "Maximum 80 caractères."),
            password: yup.string().required("Veuillez entrer un mot de passe !").min(8, "Minimum 8 caractères.").max(40, "Minimum 40 caractères.")
        });

        return {
            successful: false,
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
    mounted() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    },
    methods: {
        handleSignup(user) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            this.$store.dispatch("auth/signup", user)
            .then((data) => {

                this.message = data.message;
                this.successful = true;
                this.loading = false;

            },
            (error) => {

                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.successful = false;
                this.loading = false;

            });
        },
    },
};
</script>

<style lang="scss" scoped>
.signup-fields {
    display: table;
    margin: 0 auto;
    width: 80%;

    &__firstname, &__lastname, &__email, &__password {
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

.bold {
    font-weight: 600;
}
</style>
