<template>
    <div id="display-message">{{ this.displayMessage }}</div>
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
                <h1>Bienvenue sur <span class="span-h"><span class="nowrap">Groupomania</span> !</span></h1>
                <p class="connexion_text">Votre plateforme d’entreprise connectée à tous vos collaborateurs</p>
                <p class="connexion_text">Vous avez déjà un compte ? <span class="nowrap">Connectez-vous !</span></p>
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
                    <!-- <p>{{ errorMessage }}</p> -->
                </div>
                <div class="form_wrapper__field password__field">
                    <label for="password">Votre mot de passe</label>
                    <input type="password"
                           id="password"
                           v-model.trim="password"
                           placeholder="Votre mot de passe"
                           required />
                    <!-- <p>{{ errorMessage }}</p> -->
                </div>
                <div class="form_wrapper__button submit__button">
                    <input type="submit"
                           id="submit"
                           value="C'est parti !" />
                </div>
            </form>
            <div id="to-signup">
                <p>C'est votre première visite ? <router-link to="/signup"><span class="nowrap">Inscrivez-vous !</span>
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            displayMessage: '',
        }
    },
    methods: {
        loginFunction() {
            fetch(`http://localhost:3000/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            }).then(promise => {
                return promise.json()
            })
                .then((response) => {
                    if (response.error) {
                        throw new Error('Veuillez vérifier vos informations.');
                    }
                    document.getElementById('display-message').classList.add('successful-connection')
                    this.displayMessage = 'Connexion réussie ! Vous allez être redirigé...'
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('userId', response.userId)
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1500);
                })
                .catch(error => {
                    document.getElementById('display-message').classList.add('error-message')
                    return this.displayMessage = error
                })
        }
    },
}
</script>