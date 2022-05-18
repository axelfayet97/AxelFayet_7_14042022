<template>
    <div class="form_wrapper">
        <div class="selection_buttons">
            <router-link to="/signup"
                         id="signupbutton">Inscription</router-link>
            <router-link to="/login"
                         class="active"
                         id="loginbutton">Connexion</router-link>
        </div>
        <div class="form_wrapper_background">
            <div class="welcome_message">
                <img src="/Groupomania_Logos/icon.png"
                     alt="Logo du site Groupomania" />
                <h1>Bienvenue sur <span class="span-h">Groupomania</span> !</h1>
                <p class="connexion_text">Votre plateforme d’entreprise connectée à tous vos collaborateurs</p>
                <p class="connexion_text">Vous avez déjà un compte ? Connectez-vous !</p>
            </div>
            <form method="get"
                  class="connection_form"
                  @submit.prevent="loginFunction">
                <div class="form_wrapper__field email__field">
                    <label for="email">Votre adresse mail</label>
                    <input type="text"
                           id="email"
                           v-model.trim="email"
                           placeholder="Votre adresse mail"
                           required />
                    <p>{{ errorMessage }}</p>
                </div>
                <div class="form_wrapper__field password__field">
                    <label for="password">Votre mot de passe</label>
                    <input type="password"
                           id="password"
                           v-model.trim="password"
                           placeholder="Votre mot de passe"
                           required />
                    <p>{{ errorMessage }}</p>
                </div>
                <div class="form_wrapper__button submit__button">
                    <input type="submit"
                           id="submit"
                           value="C'est parti !" />
                </div>
            </form>
            <div id="to-signup">
                <p>C'est votre première visite ? <router-link to="/signup">Inscrivez-vous !</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            auth: false,
        }
    },
    methods: {
        async loginFunction() {
            const response = await axios.post(`auth/login`, {
                email: this.email,
                password: this.password,
                auth: true
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.userId)
            this.$router.push('/')
        }
    }
}
</script>