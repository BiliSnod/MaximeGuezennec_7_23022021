<template>
    <div class="note-submit">
        <div v-if="!submitted">
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

            <div class="note-button">
                <button @click="saveNote" class="note-button__confirm">Envoyez une nouvelle note !</button>                
            </div>
        </div>

        <div v-else>
            <p>La note a bien été envoyée !</p>
            <button class="btn btn-success" @click="newNote">Add</button>
        </div>
    </div>
</template>


<script>
import NoteData from "../services/NoteData";

export default {
    name: "new-note",
    data() {
        return {
            note: {
                title: "",
                content: ""
            },
            submitted: false
        };
    },
    methods: {
        saveNote() {
            var data = {
                title: this.note.title,
                content: this.note.content
            };

            NoteData.create(data)
            .then(response => {
                this.note.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
            })
            .catch(e => {
                console.log(e);
            });
        },    
        newNote() {
            this.submitted = false;
            this.note = {};
        }
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
        margin: 20px;
        text-align: center;

        & button {
            background-color: #e52901;
            border: none;
            border-radius: 10px;
            color: #fff;
            cursor: pointer;
            font-size: 1.2em;
            font-weight: 600;
            padding: 20px;
            transition: all 100ms;

            &:hover, &:focus {
                background-color: #ad1f01;
            }
        }
    }
</style>
