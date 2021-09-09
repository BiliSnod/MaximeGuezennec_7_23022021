<template>
    <div>
        <div class="side-title">
            <img alt="Vue logo" src="../assets/icon/icon-left-font-monochrome-black.png" />
        </div>
        <div v-if="actualNote">
            <h1 class="main-title">{{ actualNote.title }}</h1>
            <div class="single-note">
                <p class="single-note__date">Le {{ actualNote.createdAt }}.</p>
                <p class="single-note__content">{{ actualNote.content }}</p>
            </div>

            <div class="note-modify">
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

            <div class="note-actions">
                <p>{{ message }}</p>
                <button type="submit" @click="updateNote" class="note-actions__button">Mettre à jour la note</button>
                <button @click="deleteNote" class="note-actions__button note-actions__button--delete">Supprimer la note</button>
            </div>
        </div>
    </div>
</template>

<script>
import NoteData from "../services/NoteData";

export default {
  name: "note",
  data() {
    return {
      actualNote: null,
      message: ""
    };
  },
  methods: {
    getNote(id) {
      NoteData.get(id)
        .then(response => {
          this.actualNote = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateNote() {
      NoteData.update(this.actualNote.id, this.actualNote)
        .then(response => {
          console.log(response.data);
          this.message = "La note a été modifiée.";
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteNote() {
      NoteData.delete(this.actualNote.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "notes" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = "";
    this.getNote(this.$route.params.id);
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
        padding: 20px;
        text-align: left;
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
