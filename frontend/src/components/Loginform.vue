<template>
<form class="form_wrapper" method="post" action="../views/Home.vue">
    <div class="form_wrapper__field email__field">
        <label for="email">Votre adresse mail</label>
        <input type="text" placeholder="Votre adresse mail">
        <p v-if="fieldError == true">{{ errorMessage }}</p>
    </div>
    <div class="form_wrapper__field password__field">
        <label for="password">Votre mot de passe</label>
        <input type="password" placeholder="Votre mot de passe">
        <p v-if="fieldError == true">{{ errorMessage }}</p>
    </div>
    <div class="form_wrapper__button submit__button">
        <input type="submit" value="C'est parti !" >
    </div>
</form>
</template>

<script>

</script>

<style>

</style>