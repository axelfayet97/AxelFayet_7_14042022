<template>
    <article class="post-container">
        <div class="post-container__header">
            <div class="post-container__header__user-infos">
                <img src="" alt="" id="author-img">
                <p id="post-author"></p>
            </div>
            <div class="post-container__header__options"></div>
        </div>
        <div class="post-container__body">
            <p>Bonjour</p>
        </div>
        <div class="post-container__controls">
            <span id="like-post"></span>
        </div>
    </article>
</template>

<script>

export default {
    props: ['post'],
   
}
</script>