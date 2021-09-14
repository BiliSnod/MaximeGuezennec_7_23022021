<template>
    <div v-if="currentUser">
        <div class="side-title">
            <a href="/"><img src="../assets/icon/icon-left-font-monochrome-black.png" alt="Vue logo"/></a>
        </div>
        <section v-if="actualNote">
            <!-- Displaying this note -->
            <article>
                <h1 class="main-title">{{ actualNote.title }}</h1>
                <div class="single-note">
                    <div class="note-about">
                        <p class="note-about__user">Par {{ actualNote.firstname }} {{ actualNote.lastname }}.</p>
                        <p class="note-about__date">Le {{ actualNote.createdAt.split("T")[0] }}.</p>
                    </div>
                    <figure>
                        <img class="single-note__image" :src="actualNote.mediaUrl" :alt="'Image de la note ' + actualNote.id + ' par ' + actualNote.firstname" />
                        <figcaption class="single-note__content">{{ actualNote.content }}</figcaption>
                    </figure>
                </div>
                <div class="comment-list">
                    <h2 v-if="actualNote.comments.length === 0">Aucun commentaire</h2>
                    <h2 v-else>Commentaires de la note</h2>
                    <article v-for="(comment) in comments" :key="comment" class="list-comment">
                        <div class="comment-about">
                            <p class="comment-about__user">Par {{ comment.firstname }} {{ comment.lastname }}.</p>
                            <p class="comment-about__date">Le {{ comment.createdAt.split("T")[0] }}.</p>
                        </div>
                        <div>
                            <p class="list-comment__message">{{ comment.message }}</p>
                        </div>
                        <div>
                            <p v-if="currentAdmin" class="list-comment__view"><router-link :to="'/notes/comments/' + comment.id">Édition du commentaire</router-link></p>
                            <!--<button @click="deleteComment" class="note-actions__button note-actions__button--delete">Supprimer ce commentaire</button>-->
                        </div>
                    </article>
                </div>
            </article>
            <!-- Form to send a comment to this note -->
            <section class="object-submit">
                <div v-if="!submitted">
                    <form>
                        <div class="object-fields">                    
                            <div class="object-fields__content">
                                <label for="message">Message</label>
                                <textarea id="message" name="message" v-model="comment.message" placeholder="Entrez votre texte ici !" required />
                            </div>
                        </div>
                    </form>
                    <div class="object-button">
                        <p class="object-button__message">{{ alertComment }}</p>                    
                        <button @click="saveComment" class="comment-button__confirm">Envoyez le commentaire !</button>
                    </div>
                </div>
                <div v-else>
                    <div class="object-button">
                        <p class="object-button__message object-button__message--valid">Le commentaire a bien été envoyé !</p>
                        <p><router-link :to="'/notes/comments/' + comment.id">Voir le commentaire.</router-link></p>
                    </div>
                </div>
            </section>
            <!-- Admin panel to edit this note or delete it -->
            <section v-if="currentAdmin">
                <div class="note-modify">
                    <h2 class="default-subtitle">Éditer la note</h2>
                    <form class="modify-fields">
                        <div class="modify-fields__title">
                            <label for="title">Title</label>
                            <input type="text" id="title" name="title" v-model="actualNote.title" />
                        </div>
                        <div class="modify-fields__content">
                            <label for="content">Contenu</label>
                            <textarea type="text" id="content" name="content" v-model="actualNote.content" />
                        </div><!-- TODO
                        <div class="modify-fields__content">
                            <label for="media">Image</label>
                            <input @change="setMedia" type="file" id="ledia" name="content" accept=".jpg,.jpeg,.png,.gif" />
                        </div>-->
                    </form>
                </div>
                <div  class="note-actions">
                    <p>{{ alertEdit }}</p>
                    <button type="submit" @click="updateNote" class="note-actions__button">Mettre à jour la note</button>
                    <button @click="deleteNote" class="note-actions__button note-actions__button--delete">Supprimer la note</button>
                </div>
            </section>
        </section>
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
            alertEdit: "",

            comment: {  // new comment object structure
                message: "",
                noteId: "",
                userId: "",
                firstname: "",
                lastname: ""
            },
            submitted: false,
            alertComment: ""
        };
    },
    computed: {
        currentUser() {  // stating if the user is logged in
            return this.$store.state.auth.user;
        },
        currentAdmin() {  // stating if the user got an admin role
        if (this.currentUser && this.currentUser["roles"]) {
            return this.currentUser["roles"].includes("ROLE_ADMIN");
        }
        return false;
        }
    },
    methods: {
        getNote(id) {  // getting the note with the ID in parameter
            DataComment.getAll(id)  // using the route for note with comments display
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
                this.alertEdit = "La note a été modifiée.";

            })
            .catch(e => {
                console.log(e);
            });
        },
        deleteNote() {
            DataNote.delete(this.actualNote.id)
            .then(response => {

                console.log(response.data);
                this.$router.push({ name: "notes" });  // reloading page after deletion

            })
            .catch(e => {
                console.log(e);
            });
        },
        retrieveComments(id) {  // displaying comments from the note with comments route
            DataComment.getAll(id)
            .then(response => {

                this.comments = response.data.comments;  // getting the "comments" object from the note
                console.log("Response", response.data.comments);

            })
            .catch(e => {
                console.log(e);
            });
        },
        saveComment() {
            var data = {  // filling the comment object properties
                message: this.comment.message,
                noteId: this.actualNote.id,
                userId: this.currentUser.id,
                firstname: this.currentUser.firstname, 
                lastname: this.currentUser.lastname
            };
            DataComment.create(this.actualNote.id, data)
            .then(response => {

                this.comment.id = response.data.id;
                console.log(response.data);
                this.submitted = true;  // changing status to "submitted"
                
            })
            .catch(e => {
                console.log(e);
                this.alertComment = "Le message est vide !";  // displaying the alert if form field is empty
            });
        } 
        /*  
        newComment() {  // UNUSED
            this.submitted = false;
            this.comment = {};
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
        }
        */
    },
    mounted() {
        this.alertEdit = "";  // displaying an empty note edition alert on page load
        this.getNote(this.$route.params.id);  // executing the function on page load
        this.retrieveComments(this.$route.params.id);  // searching the parameter ID on page load
        this.alertComment = "";  // displaying an empty comment alert on page load
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

    &__image {
        border-radius: 10px;
        margin: 20px auto;
        max-width: 100%;

        @media screen and (min-width: 768px) {
        max-height: 800px;
        }
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
