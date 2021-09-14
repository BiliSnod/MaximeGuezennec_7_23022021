<template>
    <div v-if="currentUser">
        <div class="logo-nav">
            <a href="/"><img src="../assets/icon/icon-left-font-monochrome-black.png" alt="Groupomania logo"/></a>
        </div>
        <h1 class="main-title">Partagez une nouvelle note</h1>
        <section class="default-block">
            <!-- Diplay form to post a note -->
            <div v-if="!submitted">
                <form enctype="multipart/form-data">
                    <div class="entry-form">
                        <div class="entry-form__field">
                            <label for="title">Titre</label>
                            <input type="text" id="title" name="title" v-model="note.title" placeholder="Entrez votre titre ici !" required />                
                        </div>                    
                        <div class="entry-form__field">
                            <label for="content">Contenu</label>
                            <textarea id="content" name="content" v-model="note.content" placeholder="Entrez votre texte ici !" required />
                        </div>
                        <div class="entry-form__field">
                            <label for="media">Image [JPEG/PNG/GIF]</label>
                            <input @change="setMedia" type="file" id="media" name="media" placeholder="Insérez une image ici (JPEG, PNG, GIF)" accept=".jpg,.jpeg,.png,.gif" required />                
                        </div>
                    </div>
                </form>
                <div class="main-button">
                    <p class="main-button__message">{{ message }}</p>                    
                    <button @click="saveNote">Envoyez une nouvelle note !</button>
                </div>
            </div>
            <!-- Display confirmation when note has been submitted -->
            <div v-else>
                <div class="main-button">
                    <p class="main-button__message main-button__message--valid">La note a bien été envoyée !</p>
                    <p><router-link :to="'/notes/' + note.id">Afficher la note.</router-link></p>
                    <button @click="newNote">Envoyez une autre note</button>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import axios from "axios";  // importing Axios HTTP client to use promises
import authHeader from "../services/AuthHeader";  // calling authHeader function for token

export default {
    name: "new",
    data() {
        return {
            note: { // "note" object structure
                title: "",
                content: "",
                mediaUrl: "",
                userId: "",
                firstname: "",
                lastname: ""
            },
            submitted: false,  // default submission state
            message: ""  // empty message until submission problem 
        };
    },
    computed: {
        currentUser() {  // stating if the user is logged in
            return this.$store.state.auth.user;
        }
    },
    methods: {
        setMedia(event) {
            this.note.mediaUrl = event.target.files[0];  // getting the media file name to fill "mediaUrl"
        },
        saveNote() {            
            const formData = new FormData(); // creating a FormData, and appending all needed properties
            formData.append("title", this.note.title)
            formData.append("content", this.note.content);
            formData.append("media", this.note.mediaUrl);
            formData.append("userId", this.currentUser.id);
            formData.append("firstname", this.currentUser.firstname);
            formData.append("lastname", this.currentUser.lastname);
            axios.post("http://localhost:3000/api/notes", formData, {
                headers: {
                "Content-Type": "multipart/form-data",  // not necessary according to FormData MDN page ?
                "X-Access-Token": authHeader()  // adding the token with the request
                }
            })
            .then((response) => {

                console.log(response);      
                this.note.id = response.data.id;  // defining note ID for the confirmation link     
                this.submitted = true;  // displaying "submitted" HTML block

            })
            .catch(e => {
                console.log(e);
                this.message = "Il faut obligatoirement un titre et un contenu et une image !";
            });
        },
        newNote() {  // reinitializing form to send another note
            this.submitted = false;
            this.note = {};
        }
    },
    mounted() {
        this.message = "";  // defining the message as empty on page load
    }
};
</script>


<style lang="scss" scoped>
/* --- share stylesheet with UserLogin.vue --- */
</style>
