<template>
    <div>
        <div class="side-title">
            <img alt="Vue logo" src="../assets/icon/icon-left-font-monochrome-black.png" />
        </div>
        <h1 class="main-title">Partagez une nouvelle note</h1>
        <div class="note-submit">
            <div v-if="!submitted">
                <form>
                    <div class="note-fields">
                        <div class="note-fields__title">
                            <label for="title">Titre</label>
                            <input type="text" id="title" name="title" class="form-control" v-model="note.title" placeholder="Entrez votre titre ici !" required />                
                        </div>
                    
                        <div class="note-fields__content">
                            <label for="content">Contenu</label>
                            <textarea id="content" name="content" v-model="note.content" class="form-control" placeholder="Entrez votre texte ici !" required />
                        </div>
                    </div>
                </form>
                <div class="note-button">
                    <p>{{ message }}</p>                    
                    <button @click="saveNote" class="note-button__confirm">Envoyez une nouvelle note !</button>
                </div>
            </div>
            <div v-else>
                <div class="note-button">
                    <p>La note a bien été envoyée !</p>
                    <p><router-link :to="'/notes/' + note.id">Afficher la note.</router-link></p>
                    <button class="btn btn-success" @click="newNote">Envoyez une autre note</button>
                </div>
            </div>
        </div>
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


<style lang="scss" scoped>
.note-submit {
    background-color: #f5f5f5;
    border-radius: 10px;
    margin: 20px 36px;
    padding: 20px;
}

.note-fields {
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

.note-button {
    text-align: center;

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
