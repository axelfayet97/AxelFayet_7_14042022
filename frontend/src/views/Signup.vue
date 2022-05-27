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
                           @keyup="checkName()"
                           required />
                    <p class="field-alert">{{ alertName }}</p>
                </div>
                <div class="form_wrapper__field lastname__field">
                    <label for="name">Votre nom</label>
                    <input type="text"
                           id="lastname"
                           v-model.trim="lastName"
                           placeholder="Votre nom"
                           @keyup="checkLastName()"
                           required />
                    <p class="field-alert">{{ alertLastName }}</p>
                </div>
                <div class="form_wrapper__field email__field">
                    <label for="email">Votre adresse mail</label>
                    <input type="email"
                           id="email"
                           v-model.trim="email"
                           @keyup="checkEmail()"
                           placeholder="Votre adresse mail"
                           required />
                    <p class="field-alert">{{ alertEmail }}</p>
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
<style scoped>
.field-alert {
    color: var(--rouge)
}
</style>
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
            alertMessage: '',
            alertName: '',
            alertLastName: '',
            alertEmail: '',
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
            }).then(response => {
                if (response.status == 409) {
                    const error = this.alertMessage = 'Cette adresse mail existe déjà !'
                    throw error
                } else if (response.status == 400) {
                    const error = this.alertMessage = 'Veuillez vérifier vos entrées.'
                    throw error
                } else if (response.status == 500) {
                    const error = this.alertMessage = 'Un problème est survenu ! Veuillez réessayer'
                    throw error
                } else {
                    return response.json()
                }
            }).then(() => {
                document.getElementById('alert-message').classList.add('successful-connection')
                this.alertMessage = 'Votre compte à été créé ! Vous allez être redirigé vers la page de connexion'
                setTimeout(() => {
                    this.$router.push('/login')
                }, 1500);
            }).catch(error => {
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
                const error = this.passwordMessage = 'Le mot de passe doit contenir une majuscule, une minuscule et un caractère spécial. Au moins 8 caractères sont requis.'
                throw error
            }
        },
        checkName() {
            const nameRegexp = new RegExp(/^[A-Za-zÀ-Ÿá-ÿ][A-Za-zÀ-Ÿá-ÿ-' ]+$/);
            if (nameRegexp.test(this.firstName) == false) {
                this.alertName = 'Format du prénom invalide'
            } else {
                this.alertName = ''
            }
        },
        checkLastName() {
            const nameRegexp = new RegExp(/^[A-Za-zÀ-Ÿá-ÿ][A-Za-zÀ-Ÿá-ÿ-' ]+$/);
            if (nameRegexp.test(this.lastName) == false) {
                this.alertLastName = 'Format du nom invalide'
            } else {
                this.alertLastName = ''
            }
        },
        checkEmail() {
            const mailRegexp = new RegExp(/^([a-z0-9.-_]+)@([\da-z\.-]+)([a-z]{2,})$/)
            if (mailRegexp.test(this.email) == false) {
                this.alertEmail = 'Format de l\'email invalide'
            } else {
                this.alertEmail = ''
            }
        }
    }
}
</script>