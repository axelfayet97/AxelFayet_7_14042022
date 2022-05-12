<template>
    <div class="form_wrapper">
        <div class="selection_buttons">
            <router-link to="/signup"
                         class="active"
                         id="signupbutton">Inscription</router-link>
            <router-link to="/login"
                         id="loginbutton">Connexion</router-link>
        </div>
        <div class="form_wrapper_background">

            <div class="welcome_message">
                <img src="/Groupomania_Logos/icon.png"
                     alt="Logo du site Groupomania" />
                <h1>Bienvenue sur <span class="span-h">Groupomania</span> !</h1>
                <p class="connection_text">Votre plateforme d’entreprise connectée à tous vos collaborateurs</p>
                <p class="connection_text">C’est la première fois que vous venez ? Inscrivez-vous !</p>
            </div>
            <form method="get"
                  class="connection_form"
                  @submit.prevent="signupFunction">
                <div class="form_wrapper__field firstname__field">
                    <label for="firstname">Votre prénom</label>
                    <input type="text"
                           id="firstname"
                           v-model="firstName"
                           placeholder="Votre prénom"
                           required />
                    <p v-if="fieldError == true">{{ errorMessage }}</p>
                </div>
                <div class="form_wrapper__field lastname__field">
                    <label for="name">Votre nom</label>
                    <input type="text"
                           id="lastname"
                           v-model="lastName"
                           placeholder="Votre nom"
                           required />
                    <p v-if="fieldError == true">{{ errorMessage }}</p>
                </div>
                <div class="form_wrapper__field email__field">
                    <label for="email">Votre adresse mail</label>
                    <input type="email"
                           id="email"
                           v-model="email"
                           placeholder="Votre adresse mail"
                           required />
                    <p v-if="fieldError == true">{{ errorMessage }}</p>
                </div>
                <div class="form_wrapper__field password__field">
                    <label for="password">Votre mot de passe</label>
                    <input type="password"
                           id="password"
                           v-model="password"
                           placeholder="Votre mot de passe"
                           required />
                    <p v-if="fieldError == true">{{ errorMessage }}</p>
                </div>
                <div class="form_wrapper__field password_confirmation__field">
                    <label for="password">Confirmez votre mot de passe</label>
                    <input type="password"
                           id="password-confirmation"
                           v-model="passwordConfig"
                           placeholder="Confirmez votre mot de passe"
                           required />
                    <p v-if="fieldError == true">{{ errorMessage }}</p>
                </div>
                <div class="form_wrapper__button submit__button">
                    <input type="submit"
                           id="submit"
                           value="C'est parti !" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Signup',
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    },
    methods: {
        async signupFunction() {
            await axios.post('auth/signup', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                passwordConfirm: this.passwordConfirm,
            })
            this.$router.push('/login')
        }
    }
}
</script>