<template>
    <div v-if="currentUser">
        <div class="logo-nav">
            <a href="/"><img src="../assets/icon/icon-left-font-monochrome-black.png" alt="Groupomania logo"/></a>
        </div>
        <h1 class="main-title">Dernières notes envoyées</h1>
        <section class="note-list">
            <article v-for="(note) in notes" :key="note" class="single-note">
                <h2 class="single-note__title"><router-link :to="'/notes/' + note.id">{{ note.title }}</router-link></h2>
                <div class="object-about">
                    <p class="object-about__user">Par {{ note.firstname }} {{ note.lastname }}.</p>
                    <p class="object-about__date">Le {{ note.createdAt.split("T")[0] }}.</p>
                </div>
                <div class="single-note__content">
                    <img class="single-note__image" :src="note.mediaUrl" :alt="'Image de la note ' + note.id + ' par ' + note.firstname" />
                    <p>{{ note.content }}</p>
                </div>
                <p class="single-note__view"><router-link :to="'/notes/' + note.id">Voir la note</router-link></p>
            </article>
        </section>
    </div>
</template>


<script>
import DataNote from "../services/DataNote";

export default {
    name: "notes",
    data() {
        return {
            notes: []
        };
    },
    computed: {
        currentUser() {  // stating if the user is logged in
            return this.$store.state.auth.user;
        }
    },
    methods: {
        retrieveNotes() {
            DataNote.getAll()
            .then(response => {
                // const { notes } = response.data;  // when pagination active
                const notes = response.data;
                this.notes = notes.reverse();  // taking "notes" array in the object response, and reversing it
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
   },
   mounted() {
        this.retrieveNotes();
    }
};
</script>


<style lang="scss" scoped>
.note-list {
    background-color: #f5f5f5;
    border-radius: 10px;
    margin: 20px 5%;
    padding: 20px 0;
}

.single-note {
    margin: 20px auto 120px auto;
    width: 94%;

    @media screen and (min-width: 640px) {
        width: 82%;
    }

    @media screen and (min-width: 1280px) {
        width: 75%;
    }

    &__title {
        text-transform: uppercase;

        a {
            display: block;
            background-color: #333;
            border-radius: 10px;
            color: #fff;
            margin: 0 auto;
            padding: 10px;
            text-decoration: none;
            transition: all 100ms ease-in;
            width: 80%;

            &:hover, &:focus {
                background-color: #000;
            }
        }
    }

    &__content {
        background-color: #fff;
        border-left: 20px solid #fff;
        border-right: 20px solid #fff;
        border-radius: 25px;
        font-size: 1.3rem;
        line-height: 1.5rem;
        margin: 0 auto;

        @media screen and (min-width: 640px) {
            font-size: 1.7rem;
            line-height: 2rem;
        }

        @media screen and (min-width: 1024px) {
            display: flex;
            font-size: 1.9rem;
            // justify-content: space-between;
            line-height: 2.2rem;
        }

        img {
            border-radius: 10px;
            height: 200px;
            object-fit: cover;
            max-width: 100%;
            margin: 20px 2% 0 2%;

            @media screen and (min-width: 1024px) {
                max-width: 25%;
                margin: 5% 2%;
            }
        }

        p {
            padding: 40px 2%;
            text-align: left;

            @media screen and (min-width: 1024px) {
                margin: 5% 2%;
                padding: 0;
            }
        }
    }

    &__view {
        padding: 0 10px;
        margin-top: -20px;
        margin-right: 10%;
        text-align: right;

        a {
            background-color: #bbb;
            border-radius: 10px;
            color: #000;
            font-weight: 600;
            margin: 0 auto;
            padding: 20px;
            text-decoration: none;
            transition: all 100ms ease-in;

            &:hover, &:focus {
                background-color: #ccc;
            }
        }
    }
}
</style>