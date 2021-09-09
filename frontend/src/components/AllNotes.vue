<template>
    <div>
        <div class="side-title">
            <img alt="Vue logo" src="../assets/icon/icon-left-font-monochrome-black.png" />
        </div>
        <h1 class="main-title">Dernières notes envoyées</h1>
        <div class="note-list">
            <div v-for="(note) in notes" :key="note" class="single-note">
                <h2 class="single-note__title"><router-link :to="'/notes/' + note.id">{{ note.title }}</router-link></h2>
                <div class="note-about">
                    <p class="note-about__user">Par {{ note.userId }}.</p>
                    <p class="note-about__date">Le {{ note.createdAt }}.</p>
                </div>
                <!--<p>{{ UserData }}</p>-->
                <p class="single-note__content">{{ note.content }}</p>
                <p class="single-note__view"><router-link :to="'/notes/' + note.id">Voir les commentaires</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import NoteData from "../services/NoteData";

export default {
  name: "notes",
  data() {
        return {
            notes: []
        };
  },
  methods: {
        retrieveNotes() {
            NoteData.getAll()
            .then(response => {
                this.notes = response.data.notes.reverse();  // taking "notes" array in the object response, and reversing it
                console.log("Response", response.data);
                console.log("Response", response.data.notes);
            })
            .catch(e => {
                console.log(e);
            });
        },
        /*
        retrieveAuthors() {
            UserData.getAll()
            .then(response => {
                this.users = response.data;
            })
            .catch(e => {
                console.log(e);
            });
        },
        displayAuthor() {
            const noteUserId = this.notes.userId;
            usersData = this.users;
            this.user = usersData.find(element => element.userId === noteUserId);
            return author = this.user.firstname + this.user.lastname;
        }
         */
  },
  mounted() {
    this.retrieveNotes();
    // this.retrieveUsers();
    // this.displayAuthor();
  }
};
</script>

<style lang="scss" scoped>
.note-list {
    background-color: #f5f5f5;
    border-radius: 10px;
    margin: 20px 36px;
    padding: 20px 0;
}

.single-note {
    margin: 20px auto 120px auto;
    width: 60%;

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
        font-size: 1.8rem;
        margin: 0 auto;
        padding: 20px;
        text-align: left;
    }

    &__view {
        padding: 0 10px;
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

.note-about {
    display: flex;
    font-style: italic;
    justify-content: space-between;

    &__user {
        font-weight: 600;
        padding: 0 50px;
    }

    &__date {
        padding: 0 50px;
        text-align: right;
    }
}
</style>