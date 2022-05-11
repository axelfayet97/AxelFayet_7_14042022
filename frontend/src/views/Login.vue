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
            <form method="post"
                  action="../views/Home.vue">
                <div class="form_wrapper__field email__field">
                    <label for="email">Votre adresse mail</label>
                    <input type="text"
                           id="email"
                           placeholder="Votre adresse mail" />
                    <p v-if="fieldError == true">{{ errorMessage }}</p>
                </div>
                <div class="form_wrapper__field password__field">
                    <label for="password">Votre mot de passe</label>
                    <input type="password"
                           id="password"
                           placeholder="Votre mot de passe" />
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
</script>