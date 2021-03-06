<template>
    <div v-if="currentUser">
        <div class="logo-nav">
            <a href="/"><img src="../assets/icon/icon-left-font-monochrome-black.png" alt="Groupomania logo"/></a>
        </div>
        <section v-if="actualNote">
            <!-- Displaying this note -->
            <article>
                <h1 class="main-title">{{ actualNote.title }}</h1>
                <div class="single-note">
                    <div class="object-about">
                        <p class="object-about__user">Par {{ actualNote.firstname }} {{ actualNote.lastname }}.</p>
                        <p class="object-about__date">Le {{ actualNote.createdAt.split("T")[0] }}.</p>
                    </div>
                    <figure>
                        <a :href="actualNote.mediaUrl"><img class="single-note__image" :src="actualNote.mediaUrl" :alt="'Image de la note ' + actualNote.id + ' par ' + actualNote.firstname" /></a>
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
                        </div>
                    </article>
                </div>
            </article>
            <!-- Form to send a comment to this note -->
            <section class="default-block">
                <div v-if="!submitted">
                    <form>
                        <div class="entry-form">                    
                            <div class="entry-form__field">
                                <label for="message">Message</label>
                                <textarea id="message" name="message" v-model="comment.message" placeholder="Entrez votre commentaire ici !" required />
                            </div>
                        </div>
                    </form>
                    <div class="main-button">
                        <p class="main-button__message">{{ alertComment }}</p>                    
                        <button @click="saveComment" class="comment-button__confirm">Envoyez le commentaire !</button>
                    </div>
                </div>
                <div v-else>
                    <div class="main-button">
                        <p class="main-button__message main-button__message--valid">Le commentaire a bien été envoyé !</p>
                        <p><router-link :to="'/notes/comments/' + comment.id">Voir le commentaire.</router-link></p>
                    </div>
                </div>
            </section>
            <!-- Admin panel to edit this note or delete it -->
            <section v-if="currentAdmin">
                <div class="default-block">
                    <h2 class="default-subtitle">Éditer la note</h2>
                    <form class="entry-form">
                        <div class="entry-form__field">
                            <label for="title">Title</label>
                            <input type="text" id="title" name="title" v-model="actualNote.title" />
                        </div>
                        <div class="entry-form__field">
                            <label for="content">Contenu</label>
                            <textarea type="text" id="content" name="content" v-model="actualNote.content" />
                        </div>
                    </form>
                </div>
                <div class="main-button">
                    <p>{{ alertEdit }}</p>
                    <button type="submit" @click="updateNote">Mettre à jour la note</button>
                    <button @click="deleteNote" class="note-actions__delete">Supprimer la note</button>
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
                console.log(response.data.comments);

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
    margin: 20px auto 60px auto;

    @media screen and (min-width: 640px) {
        width: 82%;
    }

    @media screen and (min-width: 1280px) {
        width: 75%;
    }

    &__image {
        border-radius: 10px;
        margin: 20px auto;
        max-width: 100%;

        @media screen and (min-width: 640px) {
        max-height: 800px;
        }
    }

    &__content {
        border-left: 20px solid #aaa;
        border-right: 20px solid #aaa;
        border-radius: 25px;
        font-size: 1.3rem;
        line-height: 1.5rem;
        margin-bottom: 80px;
        padding: 20px;
        text-align: left;

        @media screen and (min-width: 640px) {
            font-size: 1.7rem;
            line-height: 2rem;
        }

        @media screen and (min-width: 1024px) {
            font-size: 1.9rem;
            line-height: 2.2rem;
        }
    }
}

.list-comment {
    background-color: #ddd;
    border-radius: 25px;
    margin: 30px auto;
    padding: 3%;
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
    padding: 0 5%;
    justify-content: space-between;

    @media screen and (min-width: 640px) {
        display: flex;
    }

    &__user {
        font-weight: 600;
        padding: 0;
        text-align: left;
    }

    &__date {
        padding: 0;
        text-align: right;
    }
}

.note-actions {
    margin: 20px;
    text-align: center;

    &__delete {
        background-color: #333333;

        &:hover, &:focus {
            background-color: #0a0a0a;
        }
    }
}
</style>
