<template>
    <article class="post-container"
             v-for="post in posts"
             :key="post.id">
        <div class="post-container__header">
            <div class="post-container__header__user-infos">
                <img src=""
                     alt="Photo de profil"
                     id="author-img">
                <p id="post-author"> {{ post.firstName }} {{ post.lastName }}</p>
                <p id="created-at">{{ post.createdAt }}</p>
            </div>
            <div class="post-container__header__options">...</div>
        </div>
        <div class="post-container__body">
            <p>{{ post.content }}</p>
            <p v-if="post.imageUrl != null">{{ post.imageUrl }}</p>
        </div>
        <div class="post-container__controls">
            <span id="like-post"><a href="#"
                   id="like-button"
                   @click="likePost">Add Like</a> {{ post.likes.length }}</span>
        </div>
    </article>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PostTemplate',
    data() {
        return {
            posts: [],
            isLiked: 0
        }
    },
    async beforeMount() {
        const response = await axios.get('posts')
        const posts = await response.data
        console.log(posts);
        this.posts = posts
    },
    methods: {
        async likePost() {
            // Récupérer l'id du post à liker
            const response = await axios.post('likes')
            const likes = await response.data
            console.log(likes)
            this.isLiked = likes
        }
    }
}
</script>