<template>
    <form class="connection_form"
          @submit.prevent="sendPost">
        <div id="textarea"
             class="form_wrapper__field text_field">
            <label for="text">Rédigez un post</label>
            <input type="text"
                   name="text"
                   id="text"
                   placeholder="À quoi pensez vous ?"
                   v-model="content"
                   required />
        </div>
        <div id="textarea">
            <label for="file">Ajoutez une image</label>
            <input type="file"
                   name="image"
                   id="file"
                   v-on:change="imageUrl" />
        </div>
        <div class="form_wrapper__button submit__button">
            <input type="submit"
                   id="submit"
                   value="Envoyer !" />
        </div>
    </form>
</template>

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