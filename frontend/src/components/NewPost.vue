<template>
    <form class="connection_form"
          @submit.prevent="sendPost">
        <h2>Partagez vos humeurs !</h2>
        <div class="form_wrapper__field textarea_wrapper">
            <label for="textarea">Rédigez un post</label>
            <textarea name="textarea"
                      id="textarea"
                      cols="30"
                      rows="10"
                      placeholder="À quoi pensez-vous ?"
                      v-model="content" />
        </div>
        <div id="alert-message"
             class="error-message-light">{{ alertMessage }}</div>
        <div class="form_wrapper__button submit__button">
            <input type="submit"
                   id="submit"
                   value="Envoyer !" />
        </div>
    </form>
</template>
<style scoped>
#textarea {
    min-width: 100%;
    max-width: 300px;
    min-height: 100px;
    max-height: 10vh;
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
</style>
<script>
export default {
    name: 'NewPost',
    data() {
        return {
            alertMessage: '',
            content: null
        }
    },
    methods: {
        sendPost() {
            fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ content: this.content })
            }).then(promise => {
                if (promise.status == 400) {
                    const error = this.alertMessage = 'Veuillez vérifier le contenu de votre post !'
                    throw error
                } else {
                    return promise.json()
                }
            }).then(() => {
                if (this.content == null || '') {
                    document.getElementById('alert-message')
                    return this.alertMessage = 'Le contenu ne peut pas être vide !'
                } else {
                    this.$router.go()
                }
            }).catch(error => {
                document.getElementById('alert-message')
                return this.alertMessage = 'Une erreur s\'est produite ' + error
            })
        }
    }
}
</script>