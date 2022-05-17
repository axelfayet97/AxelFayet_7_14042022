<template>
    <article class="post-container" v-for="(post, i) in posts"
          :key="i">
        <div class="post-container__header">
            <div class="post-container__header__user-infos">
                <img src=""
                     alt="Photo de profil"
                     id="author-img">
                <p id="post-author"> {{ posts[i].content }} {{ posts.lastName }}</p>
                <p id="created-at">{{ posts.createdAt }}</p>
            </div>
            <div class="post-container__header__options">...</div>
        </div>
        <div class="post-container__body">
            <p>{{ posts.content }}</p>
            <p v-if="posts.imageUrl != null">{{ posts.imageUrl }}</p>
        </div>
        <div class="post-container__controls">
            <span id="like-post">{{ posts.likes }}</span>
        </div>
    </article>
</template>

<script>

export default {
    name: 'PostTemplate',
    data() {
        return {
            posts: []
        }
    }
}
</script>