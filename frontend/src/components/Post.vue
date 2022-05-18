<template>
    <article class="post-container"
             v-for="post in posts"
             :key="post.id">
        <div class="post-container__header">
            <div class="post-container__header__user-infos">
                <div id="author-img">
                    <img src="../../public/Groupomania_Logos/Daco_1182050.png"
                         alt="Photo de profil">
                </div>
                <div class="author-infos">
                    <p id="post-author"> {{ post.user.firstName }} {{ post.user.lastName }}</p>
                    <p id="created-at">{{ post.createdAt }}</p>
                </div>
            </div>
            <div class="post-container__header__options">...</div>
        </div>
        <div class="post-container__body">
            <p>{{ post.content }}</p>
            <p v-if="post.imageUrl != null">{{ post.imageUrl }}</p>
        </div>
        <div class="post-container__controls">
            <div id="like-post">
                <a href="#"
                   @click="likePost"><img src="../../public/noun-like-576529.svg"
                         id="like-button" />
                    {{ post.likes.length }}
                </a>
            </div>
            <div id="comment-post">
                <!-- Commentaires -->
                <img src="../../public/Groupomania_Logos/Daco_1182050.png">
                <input type="text"
                       name="comment"
                       id="comment-text"
                       placeholder="Ajouter un commentaire">
                <input type="submit"
                       value="Commenter"
                       id="comment-submit"
                       href="#"
                       @click="commentPost" />
            </div>
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
    async mounted() {
        const response = await axios.get('posts')
        const posts = await response.data
        this.posts = posts
    },
    methods: {
        async likePost() {
            // Récupérer l'id du post à liker
            const response = await axios.post('likes', {
                postId: this.posts,
                isLiked: 1
            })
            const likes = await response.data
            this.isLiked = likes
        }
    }
}
</script>