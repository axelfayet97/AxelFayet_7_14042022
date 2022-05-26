<template>
    <div id="alert-message">{{ alertMessage }}</div>
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
                <h1>Bienvenue sur <span class="span-h"><span class="nowrap">Groupomania</span> !</span></h1>
                <p class="connection_text">Votre plateforme d’entreprise connectée à tous vos collaborateurs</p>
                <p class="connection_text">C’est la première fois que vous venez ? <span class="nowrap">Inscrivez-vous
                        !</span></p>
            </div>
            <form method="get"
                  class="connection_form"
                  @submit.prevent="signupFunction">
                <div class="form_wrapper__field firstname__field">
                    <label for="firstname">Votre prénom</label>
                    <input type="text"
                           id="firstname"
                           v-model.trim="firstName"
                           placeholder="Votre prénom"
                           required />
                    <!-- <p class="field-alert"
                       v-if="!firstName">Ce champs est requis !</p> -->
                </div>
                <div class="form_wrapper__field lastname__field">
                    <label for="name">Votre nom</label>
                    <input type="text"
                           id="lastname"
                           v-model.trim="lastName"
                           placeholder="Votre nom"
                           required />
                    <!-- <p class="field-alert"
                       v-if="!lastName">Ce champs est requis !</p> -->
                </div>
                <div class="form_wrapper__field email__field">
                    <label for="email">Votre adresse mail</label>
                    <input type="email"
                           id="email"
                           v-model.trim="email"
                           placeholder="Votre adresse mail"
                           required />
                    <!-- <p class="field-alert"
                       v-if="!email">Ce champs est requis !</p> -->
                </div>
                <div class="form_wrapper__field password__field">
                    <label for="password">Votre mot de passe</label>
                    <input type="password"
                           id="password"
                           @keyup="checkPassword"
                           v-model="password"
                           placeholder="Votre mot de passe"
                           required />
                    <!-- <p class="field-alert"
                       v-if="!password">Ce champs est requis !</p> -->
                </div>
                <div class="form_wrapper__field password_confirmation__field">
                    <label for="password">Confirmez votre mot de passe</label>
                    <input type="password"
                           id="password-confirmation"
                           @keyup="checkPassword"
                           placeholder="Confirmez votre mot de passe"
                           required />
                    <p id="alert-password">{{ this.passwordMessage }}</p>
                    <!-- <p v-if="fieldError == true">{{ errorMessage }}</p> -->
                </div>
                <div class="form_wrapper__button submit__button">
                    <input type="submit"
                           id="submit"
                           value="C'est parti !" />
                </div>
            </form>
            <div id="to-login">
                <p>Vous avez déjà un compte ? <router-link to="/login"><span class="nowrap">Connectez-vous !</span>
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Signup',
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordMessage: '',
            alertMessage: ''
        }
    },
    methods: {
        signupFunction() {
            fetch(`http://localhost:3000/api/auth/signup`, {
                method: 'POST',
                body: JSON.stringify({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response);
                    if (response.status == 409) {
                        let error = this.alertMessage = 'Cette adresse mail existe déjà !'
                        throw error
                    } else if (response.status == 500) {
                        let error = this.alertMessage = 'Votre mot de passe est trop simple !'
                        throw error
                    } else {
                        return response.json()
                    }
                })
                .then(() => {
                    document.getElementById('alert-message').classList.add('successful-connection')
                    this.alertMessage = 'Votre compte à été créé ! Vous allez être redirigé vers la page de connexion'
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 1500);
                }
                )
                .catch(error => {
                    document.getElementById('alert-message').classList.add('error-message')
                    return this.alertMessage = 'Une erreur s\'est produite ' + error
                })
        },
        checkPassword() {
            const passwordField = document.getElementById('password').value
            const confirmPasswordField = document.getElementById('password-confirmation').value
            const confirmationMessage = document.getElementById('alert-password')
            const submitBtn = document.getElementById('submit')
            if (passwordField == confirmPasswordField) {
                confirmationMessage.style.color = 'green'
                submitBtn.removeAttribute('disabled')
                this.passwordMessage = 'Les mots de passent concordent !'
            } else {
                submitBtn.setAttribute('disabled', true)
                confirmationMessage.style.color = '#ff0000'
                this.passwordMessage = 'Les mots de passe sont différents !'
            }
        },
    }
}
</script>