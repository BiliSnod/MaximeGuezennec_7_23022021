<template>
    <div>
        <p><a href="/"><img src="../assets/icon/icon-left-font.png" class="logo-median" alt="Groupomania logo" /></a></p>
        <h1 v-if="!successful" class="main-title">Inscrivez-vous</h1>
        <div class="default-block">
            <Form @submit="handleSignup" :validation-schema="schema">
                <div v-if="!successful" class="entry-form">
                    <div class="entry-form__field">
                        <label for="firstname">Prénom</label>
                        <Field name="firstname" type="text" />
                        <ErrorMessage name="firstname" />
                    </div>
                    <div class="entry-form__field">
                        <label for="lastname">Nom</label>
                        <Field name="lastname" type="text" />
                        <ErrorMessage name="lastname" />
                    </div>
                    <div class="entry-form__field">
                        <label for="email">E-mail</label>
                        <Field name="email" type="email" />
                        <ErrorMessage name="email" />
                    </div>
                    <div class="entry-form__field">
                        <label for="password">Mot de passe</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" />
                    </div>
                </div>
                <div class="main-button" v-if="!successful">
                    <button>S'inscrire</button>
                </div>                
                <!-- Displaying a message if the form is not filled well -->
                <div v-if="message">
                    {{ message }}
                </div>
            </Form>
        </div>
    </div>
</template>


<script>
import { Form, Field, ErrorMessage } from "vee-validate";  // using "vee-validate" package to check form data
import * as yup from "yup";  // importing "yup" data validation library

export default {
    name: "signup",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({  // defining object schema
            firstname: yup.string().required("Veuillez entrer un prénom !").min(3, "Minimum 3 caractères").max(20, "Maximum 20 caractères."),
            lastname: yup.string().required("Veuillez entrer un nom !").min(3, "Minimum 3 caractères.").max(20, "Maximum 20 caractères"),
            email: yup.string().required("Veuillez entrer une adresse e-mail !").email("Cette adresse e-mail n'est pas valide !").max(80, "Maximum 80 caractères."),
            password: yup.string().required("Veuillez entrer un mot de passe !").min(8, "Minimum 8 caractères.").max(40, "Maximum 40 caractères.")
        });

        return {
            successful: false,
            message: "",
            schema
        };
    },
    computed: {
        loggedIn() {  // checking if user is logged in from global store
            return this.$store.state.auth.status.loggedIn;
        },
    },
    methods: {
        handleSignup(user) {
            this.message = "";
            this.successful = false;

            this.$store.dispatch("auth/signup", user)
            .then((data) => {

                this.message = data.message;
                this.successful = true;

            },
            (error) => {

                this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.successful = false;

            });
        }
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    }
};
</script>


<style lang="scss" scoped>
/* --- share stylesheet with UserLogin.vue --- */
</style>
