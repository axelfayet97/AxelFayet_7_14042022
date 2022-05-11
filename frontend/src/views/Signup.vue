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
                <p class="connexion_text">Votre plateforme d’entreprise connectée à tous vos collaborateurs</p>
                <p class="connexion_text">C’est la première fois que vous venez ? Inscrivez-vous !</p>
            </div>
            <form method="post"
                  action="../views/Home.vue">
                <div class="form_wrapper__field firstname__field">
                    <label for="firstname">Votre prénom</label>
                    <input type="text"
                           id="firstname"
                           placeholder="Votre prénom" />
                    <p v-if="fieldError == true">{{ errorMessage }}</p>
                </div>
                <div class="form_wrapper__field lastname__field">
                    <label for="name">Votre nom</label>
                    <input type="text"
                           id="lastname"
                           placeholder="Votre nom" />
                    <p v-if="fieldError == true">{{ errorMessage }}</p>
                </div>
                <div class="form_wrapper__field email__field">
                    <label for="email">Votre adresse mail</label>
                    <input type="email"
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
                <div class="form_wrapper__field password_confirmation__field">
                    <label for="password">Confirmez votre mot de passe</label>
                    <input type="password"
                           id="password-confirmation"
                           placeholder="Confirmez votre mot de passe" />
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