<template>
    <div>
        <div class="side-title">
            <a href="/"><img src="../assets/icon/icon-left-font-monochrome-black.png" alt="Vue logo"/></a>
        </div>
        <h1 class="main-title">Partagez une nouvelle note</h1>
        <section class="object-submit">
            <div v-if="!submitted">
                <form>
                    <div class="object-fields">
                        <div class="object-fields__title">
                            <label for="title">Titre</label>
                            <input type="text" id="title" name="title" v-model="note.title" placeholder="Entrez votre titre ici !" required />                
                        </div>
                    
                        <div class="object-fields__content">
                            <label for="content">Contenu</label>
                            <textarea id="content" name="content" v-model="note.content" placeholder="Entrez votre texte ici !" required />
                        </div>
                    </div>
                </form>
                <div class="object-button">
                    <p class="object-button__message">{{ message }}</p>                    
                    <button @click="saveNote">Envoyez une nouvelle note !</button>
                </div>
            </div>
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
import DataNote from "../services/DataNote";

export default {
    name: "new",
    data() {
        return {
            note: {
                title: "",
                content: "",
                userId: "",
                firstname: "",
                lastname: ""
            },
            submitted: false,
            message: ""
        };
    },
    computed: {
        currentUser() {  // stating if the user is logged in
            return this.$store.state.auth.user;
        }
    },
    methods: {
        saveNote() {
            var data = {
                title: this.note.title,
                content: this.note.content,
                userId: this.currentUser.id,
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
        newNote() {
            this.submitted = false;
            this.note = {};
        }
    },
    mounted() {
        this.message = "";
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

    &__title, &__content {
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
