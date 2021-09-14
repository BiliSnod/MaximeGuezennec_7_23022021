<template>
    <div v-if="currentUser">
        <div class="logo-nav">
            <a href="/"><img src="../assets/icon/icon-left-font-monochrome-black.png" alt="Groupomania logo"/></a>
        </div>
        <!-- Displaying this comment -->
        <section v-if="actualComment">
            <h1 class="main-title">Commentaire n°{{ actualComment.id }}</h1>
            <div class="single-comment">
                <p>(réponse à <router-link :to="'/notes/' + actualComment.noteId">la note n°{{ actualComment.noteId }}</router-link>)</p>
                <div class="object-about">
                    <p class="object-about__user">Par {{ actualComment.firstname }} {{ actualComment.lastname }}.</p>
                    <p class="object-about__date">Le {{ actualComment.createdAt.split("T")[0] }}.</p>
                </div>
                <p class="single-comment__message">{{ actualComment.message }}</p>
            </div>
            <!-- Displaying the button to delete this comment for admin -->
            <div v-if="currentAdmin" class="main-button">
                <button @click="deleteComment" class="comment-actions__delete">Supprimer le commentaire</button>
            </div>
        </section>
    </div>
</template>


<script>
import DataComment from "../services/DataComment";

export default {
    name: "comment",
    data() {
        return {
            actualComment: null
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
        getComment(id) {  // getting the comment with the ID in parameter
            DataComment.get(id)
            .then(response => {

                this.actualComment = response.data;
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });
        },
        deleteComment() {
            DataComment.delete(this.actualComment.id)
            .then(response => {

                console.log(response.data);
                this.$router.push({ name: "notes" });  // going back to notes list after deletion

            })
            .catch(e => {
                console.log(e);
            });
        }
    },
    mounted() {
        this.message = "";  // message is empty on page load
        this.getComment(this.$route.params.id);  // searching the parameter ID on page load
    }
};
</script>


<style lang="scss" scoped>
.single-comment {
    margin: 20px auto 60px auto;

    @media screen and (min-width: 640px) {
        width: 82%;
    }

    @media screen and (min-width: 1280px) {
        width: 75%;
    }

    &__message {
        border-left: 20px solid #aaa;
        border-right: 20px solid #aaa;
        border-radius: 25px;
        font-size: 1.3rem;
        line-height: 1.5rem;
        margin: 0 10% 60px 10%;
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

/*
.single-comment {
    margin: 0 auto;
    width: 60%;

    &__message {
        border-left: 20px solid #aaa;
        border-right: 20px solid #aaa;
        border-radius: 25px;
        font-size: 1.8em;
        margin-bottom: 80px;
        padding: 20px;
        text-align: left;
    }
}

.comment-about {
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
*/

.comment-actions {
    margin: 20px;
    text-align: center;

    &__delete {
        background-color: #333333;

        &:hover, &:focus {
            background-color: #0a0a0a;
        }
    }
    /*
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
    */
}
</style>
