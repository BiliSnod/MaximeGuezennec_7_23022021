<template>
    <div>
        <div class="side-title">
            <a href="/"><img src="../assets/icon/icon-left-font-monochrome-black.png" alt="Vue logo"/></a>
        </div>
        <h1 class="main-title">Partagez une nouvelle note</h1>
        <section class="object-submit">
            <!-- Diplay form to post a note -->
            <div v-if="!submitted">
                <form enctype="multipart/form-data">
                    <div class="object-fields">
                        <div class="object-fields__title">
                            <label for="title">Titre</label>
                            <input type="text" id="title" name="title" v-model="note.title" placeholder="Entrez votre titre ici !" required />                
                        </div>                    
                        <div class="object-fields__content">
                            <label for="content">Contenu</label>
                            <textarea id="content" name="content" v-model="note.content" placeholder="Entrez votre texte ici !" required />
                        </div>
                        <div class="object-fields__media">
                            <label for="media">Fichier (image)</label>
                            <input @change="setMedia" type="file" id="media" name="media" placeholder="Insérez une image ici (JPEG, PNG, GIF)" accept=".jpg,.jpeg,.png,.gif" required />                
                        </div>
                    </div>
                </form>
                <div class="object-button">
                    <p class="object-button__message">{{ message }}</p>                    
                    <button @click="saveNote">Envoyez une nouvelle note !</button>
                </div>
            </div>
            <!-- Display confirmation when note has been submitted -->
            <div v-else>
                <div class="object-button">
                    <p class="object-button__message object-button__message--valid">La note a bien été envoyée !</p>
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
// import DataNote from "../services/DataNote";

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
            // this.mediaUrl = this.$refs.media.medias[0];
            this.note.mediaUrl = event.target.files[0];
            // console.log("ETF", event.target.media[0])
        },
        saveNote() {            
            const formData = new FormData(); // creating a FormData
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
        /*
        saveNote() {
            let formData = new FormData();
            formData.append("mediaUrl", this.mediaUrl);

            let data = {
                title: this.note.title,
                content: this.note.content,
                userId: this.currentUser.id,
                mediaUrl: this.mediaUrl,
                firstname: this.currentUser.firstname, 
                lastname: this.currentUser.lastname
            };
            DataNote.create(data)
            .then(response => {

                this.note.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
                
            })
            .catch(e => {
                console.log(e);
                this.message = "Il faut obligatoirement un titre et un contenu !";
            });
        },
        */  
        newNote() {
            this.submitted = false;
            this.note = {};
        }
    },
    mounted() {
        this.message = "";  // defining the message as empty on page load
    }
};
</script>


<style lang="scss">
.object-submit {
    background-color: #f5f5f5;
    border-radius: 10px;
    margin: 20px 36px;
    padding: 20px;
}

.object-fields {
    display: table;
    margin: 0 auto;
    width: 80%;

    &__title, &__content, &__media {
        display: table-row;
        text-align: left;
    }

    & label {
        display: table-cell;
        font-weight: 600;
        max-width: 32px;
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

.object-button {

    &__message {
        font-size: 1.4rem;
        font-weight: 600;
        margin: 0 auto;

        &--valid {
        background-color: #9fffcf;
        border-radius: 10px;
        padding: 10px;
        width: 40%;
        }
    }

    a {
        background-color: #fcfcfc;
        border: 3px solid #eee;
        border-radius: 15px;
        color: #312c50;
        cursor: pointer;
        display: block;
        font-weight: bold;
        margin: 0 auto;
        padding: 10px;
        text-decoration: none;
        transition: all 200ms ease-out;
        width: 40%;
    }

    & button {
        background-color: #e52901;
        border: none;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
        font-size: 1.2em;
        font-weight: 600;
        margin: 20px;
        padding: 20px;
        transition: all 100ms;

        &:hover, &:focus {
            background-color: #ad1f01;
        }
    }
}
</style>
