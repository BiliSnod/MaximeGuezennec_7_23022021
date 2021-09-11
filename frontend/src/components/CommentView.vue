<template>
    <div>
        <div class="side-title">
            <a href="/"><img src="../assets/icon/icon-left-font-monochrome-black.png" alt="Vue logo"/></a>
        </div>
        <div v-if="actualComment">
            <h1 class="main-title">Commentaire n°{{ actualComment.id }}</h1>
            <div class="single-comment">
                <p>(réponse à <router-link :to="'/notes/' + actualComment.noteId">la note n°{{ actualComment.noteId }}</router-link>)</p>
                <div class="comment-about">
                    <p class="comment-about__user">Par {{ actualComment.userId }}.</p>
                    <p class="comment-about__date">Le {{ actualComment.createdAt.split('T')[0] }}.</p>
                </div>
                <p class="single-comment__message">{{ actualComment.message }}</p>
            </div>
            <div v-if="currentAdmin" class="comment-actions">
                <button @click="deleteComment" class="comment-actions__button comment-actions__button--delete">Supprimer le commentaire</button>
            </div>
        </div>
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
        if (this.currentUser && this.currentUser['roles']) {
            return this.currentUser['roles'].includes('ROLE_ADMIN');
        }
        return false;
        }
    },
    methods: {
        getComment(id) {
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
        this.message = "";
        this.getComment(this.$route.params.id);
    }
};
</script>


<style lang="scss" scoped>
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

.comment-actions {
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
