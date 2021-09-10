<template>
    <div>
        <div class="side-title">
            <img alt="Vue logo" src="../assets/icon/icon-left-font-monochrome-black.png" />
        </div>
        <h1 class="main-title">Dernières notes envoyées</h1>
        <div class="page-change">
            <p class="page-change__text">Changer de page :</p>                
            <select v-model="page" @change="handlePageNumber($event)" class="page-change__selection">
                <option v-for="page in allPages" :key="page" :value="page">{{ page }}</option>
            </select>
        </div>
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
        <div class="page-change">
            <p class="page-change__text">Changer de page :</p>                
            <select v-model="page" @change="handlePageNumber($event)" class="page-change__selection">
                <option v-for="page in allPages" :key="page" :value="page">{{ page }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import DataNote from "../services/DataNote";

export default {
    name: "notes",
    data() {
        return {
            notes: [],
            currenNote: null,
            currentIndex: -1,
            allPages: "",

            page: 2,
            pageSize: 5
        };
    },
    methods: {
        getRequestParams(page, pageSize) {
            let params = {};

            if (page) {
                params["page"] = page - 1;
            }

            if (pageSize) {
                params["size"] = pageSize;
            }

            return params;
        },
        retrieveNotes() {
            const params = this.getRequestParams(
                this.page,
                this.pageSize
            );
            DataNote.getAll(params)
            .then(response => {
                const { notes } = response.data;
                this.notes = notes.reverse();  // taking "notes" array in the object response, and reversing it
                console.log("Notes data", response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
        retrievePages() {
            DataNote.getAll()
            .then(response => {
                this.allPages = response.data.allPages;
                console.log("Pages data", response.data.allPages);
            })
            .catch(e => {
                console.log(e);
            });
        },
        handlePageNumber(event) {
            this.pageSize = 5;
            this.page = event.target.value;
            this.retrieveNotes();
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
        this.retrievePages();
        // this.retrieveUsers();
        // this.displayAuthor();
    }
};
</script>

<style lang="scss" scoped>
.page-change {
    display: flex;
    font-style: italic;
    justify-content: center;

    &__text {
        margin-right: 20px;
        text-transform: full-width;
    }

    &__selection {
        background-color: #e52901;
        border: none;
        border-radius: 25px;
        color: #fff;
        font-weight: 600;
        padding: 5px;
        text-transform: full-width;
    }
}

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