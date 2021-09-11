<template>
    <div>
        <div class="side-title">
            <img alt="Vue logo" src="../assets/icon/icon-left-font-monochrome-black.png" />
        </div>
        <div v-if="actualNote">
            <h1 class="main-title">{{ actualNote.title }}</h1>
            <div class="single-note">
                <div class="note-about">
                    <p class="note-about__user">Par {{ actualNote.userId }}.</p>
                    <p class="note-about__date">Le {{ actualNote.createdAt.split('T')[0] }}.</p>
                </div>
                <p class="single-note__content">{{ actualNote.content }}</p>
            </div>
            <div class="comment-list">
                <h2 v-if="actualNote.comments.length === 0">Aucun commentaire</h2>
                <h2 v-else>Commentaires de la note</h2>
                <div v-for="(comment) in comments" :key="comment" class="list-comment">
                    <div class="comment-about">
                        <p class="comment-about__user">Par {{ comment.userId }}.</p>
                        <p class="comment-about__date">Le {{ comment.createdAt.split('T')[0] }}.</p>
                    </div>
                    <p class="list-comment__message">{{ comment.message }}</p>
                    <div>
                        <p v-if="currentAdmin" class="list-comment__view"><router-link :to="'/notes/comments/' + comment.id">Édition du commentaire</router-link></p>
                        <!--<button @click="deleteComment" class="note-actions__button note-actions__button--delete">Supprimer ce commentaire</button>-->
                    </div>
                </div>
            </div>
            <div v-if="currentAdmin" class="note-modify">
                <h2 class="default-subtitle">Éditer la note</h2>
                <form class="modify-fields">
                    <div class="modify-fields__title">
                        <label for="title">Title</label>
                        <input type="text" id="title" name="title" v-model="actualNote.title" />
                    </div>
                    <div class="modify-fields__content">
                        <label for="content">Contenu</label>
                        <textarea type="text" id="content" name="content" v-model="actualNote.content" />
                    </div>
                </form>
            </div>
            <div v-if="currentAdmin"  class="note-actions">
                <p>{{ message }}</p>
                <button type="submit" @click="updateNote" class="note-actions__button">Mettre à jour la note</button>
                <button @click="deleteNote" class="note-actions__button note-actions__button--delete">Supprimer la note</button>
            </div>
        </div>
    </div>
</template>

<script>
import DataNote from "../services/DataNote";
import DataComment from "../services/DataComment";

export default {
    name: "note",
    data() {
        return {
            actualNote: null,
            comments: [],
            message: ""
        };
    },
    computed: {
        currentUser() {  // stating if the user is logged in
            return this.$store.state.auth.user;
        },
        currentAdmin() {  // stating if the user got an admin role
        if (this.currentUser && this.currentUser['roles']) {
            return this.currentUser['roles'].includes('ROLE_ADMIN');
        }
        return false;
        }
    },
    methods: {
        getNote(id) {
            DataComment.getAll(id)
            .then(response => {

                this.actualNote = response.data;
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });
        },
        updateNote() {
            DataNote.update(this.actualNote.id, this.actualNote)
            .then(response => {

                console.log(response.data);
                this.message = "La note a été modifiée.";

            })
            .catch(e => {
                console.log(e);
            });
        },
        deleteNote() {
            DataNote.delete(this.actualNote.id)
            .then(response => {

                console.log(response.data);
                this.$router.push({ name: "notes" });  // reload page

            })
            .catch(e => {
                console.log(e);
            });
        },
        retrieveComments(id) {
            DataComment.getAll(id)
            .then(response => {

                this.comments = response.data.comments;
                console.log("Response", response.data.comments);

            })
            .catch(e => {
                console.log(e);
            });
        /*
        },
        deleteComment(id) {
            DataComment.getAll(id)
            .then(response => {

                this.comments = response.data.comments;
                console.log("DEL",response.data.id);
                
                DataComment.delete(this.comments.id)
                .then(response => {
                    
                console.log(response.data);
                this.$router.push({ name: "notes" });

            })
            .catch(e => {
                console.log(e);
            });

            })
            .catch(e => {
                console.log(e);
            });
        */
        }
    },
    mounted() {
        this.message = "";
        this.getNote(this.$route.params.id);
        this.retrieveComments(this.$route.params.id);
    }
};
</script>

<style lang="scss" scoped>
.single-note {
    margin: 0 auto;
    width: 60%;

    &__date {
        font-style: italic;
        font-weight: 600;
        padding: 0 50px;
        text-align: right;
    }

    &__content {
        border-left: 20px solid #aaa;
        border-right: 20px solid #aaa;
        border-radius: 25px;
        font-size: 1.8em;
        margin-bottom: 80px;
        padding: 20px;
        text-align: left;
    }
}

.note-about {
    display: flex;
    justify-content: space-between;

    &__user {
        font-weight: 600;
        padding: 0 50px;
    }

    &__date {
        font-style: italic;
        padding: 0 50px;
        text-align: right;
    }
}

.list-comment {
    background-color: #ddd;
    border-radius: 25px;
    margin: 30px auto;
    padding: 20px;
    width: 60%;

    &__message {
        font-size: 1.2rem;
        text-align: left;
        text-indent: 5%;
    }

    &__view {
    
        a {
            background-color: #b9e9ff;
            border-radius: 10px;
            color: #312C50;
            font-weight: bold;
            padding: 10px;
            text-decoration: none;

            &:hover, &:focus {
                background-color: #85d8ff;
            }
        }
    }
}

.comment-about {
    background-color: #666;
    border-radius: 10px;
    color: #fff;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;

    &__user {
        font-weight: 600;
    }

    &__date {
        text-align: right;
        font-style: italic;
    }
}

.note-modify {
    background-color: #f5f5f5;
    border-radius: 10px;
    margin: 20px 36px;
    padding: 20px;
}

.modify-fields {
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

.note-actions {
    margin: 20px;
    text-align: center;

    &__button {
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

        &--delete {
            background-color: #333333;

            &:hover, &:focus {
                background-color: #0a0a0a;
            }
        }
    }
}
</style>
