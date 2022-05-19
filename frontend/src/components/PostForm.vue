<template>
    <form class="connection_form"
          @submit.prevent="sendPost">
        <div class="form_wrapper__field textarea_wrapper">
            <label for="textarea">Rédigez un post</label>
            <textarea name="textarea"
                      id="textarea"
                      cols="30"
                      rows="10"
                      placeholder="À quoi pensez-vous ?"
                      v-model="content"
                      required />
        </div>
        <div class="form_wrapper__field file-upload_wrapper">
            <label for="file">Ajoutez une image</label>
            <input type="file"
                   name="image"
                   id="file-upload"
                   v-on:change="imageUrl" />
        </div>
        <div class="form_wrapper__button submit__button">
            <input type="submit"
                   id="submit"
                   value="Envoyer !" />
        </div>
    </form>
</template>

<style scoped>
#textarea {
    min-width: 80%;
    max-width: 80%;
    min-height: 100px;
    max-height: 20vh;
    border: none;
    border-bottom: 1px solid var(--noir);
    font-family: 'Raleway', sans-serif;
    font-size: 14px;
    transition: all .2s linear;
}

#textarea:hover,
#textarea:focus,
#textarea:active {
    border-color: var(--rouge);
}

#file-upload {
    font-family: 'Raleway', sans-serif;
    border: none;
}
</style>
<script>
import axios from 'axios'

export default {
    name: 'PostForm',
    data() {
        return {
            content: '',
            imageUrl: '',
        }
    },
    methods: {
        async sendPost() {
            await axios.post('posts', {
                content: this.content,
                imageUrl: this.imageUrl
            })
            this.$router.go()
        }
    }
}
</script>