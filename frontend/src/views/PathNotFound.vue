<template>
    <div id="page-not-found">
        <h1>Erreur 404 !</h1>
        <h2>La page que vous avez demandée n'existe pas !</h2>
        <router-link id="go-back"
                     to="/">Retour à l'accueil</router-link>
    </div>
</template> 
<style scoped>
#page-not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    text-align: center;
    height: 90vh;
}

#page-not-found h1 {
    font-size: 50px;
    color: var(--rouge);
}

#page-not-found h2 {
    font-size: 20px;
    margin: 20px;
}

#go-back {
    display: inline-block;
    width: auto;
    background: var(--rouge);
    padding: 15px 20px;
    color: #fff;
    border-radius: 30px;
    border: 2px solid transparent;
    font-weight: 600;
    text-transform: uppercase;
    transition: all .2s linear;
}

#go-back:hover,
#go-back:focus,
#go-back:active {
    background-color: #fff;
    color: var(--rouge);
    border: 2px solid var(--rouge);
}
</style>
<script>
export default {
    name: 'PathNotFound',
    components: {
    }
}
</script>