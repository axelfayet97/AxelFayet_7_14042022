<template>
    <article class="post-container"
             v-for="post in posts"
             :key="post.id"
             :id="post.id">
        <div class="post-container__header">
            <div class="post-container__header__user-infos">
                <div id="author-img">
                    <img src="/Groupomania_Logos/Daco_1182050.png"
                         alt="Photo de profil">
                </div>
                <div class="author-infos">
                    <p id="post-author"> {{ post.user.firstName }} {{ post.user.lastName }}</p>
                    <p id="created-at">{{ post.createdAt }}</p>
                </div>
            </div>
            <div class="container__header__options">
                <a href="#"
                   @click="toggleControls"
                   id="toggle-controls"><span>...</span>
                    <ul id="controls"
                        v-show="showOptions">
                        <li>Modifier</li>
                        <li @click="deletePost(post.id)">Supprimer</li>
                    </ul>
                </a>
            </div>
        </div>
        <div class="post-container__body">
            <p>{{ post.content }}</p>
            <p v-if="post.imageUrl != null">{{ post.imageUrl }}</p>
        </div>
        <div class="container__controls">
            <div id="like-post">
                <a href="#"
                   @click.prevent="likePost(post.id)">
                    <img src="/noun-like-576529.svg"
                         id="like-button" />
                    {{ post.likes.length }}
                </a>
            </div>
            <Comment />
            <div id="comment-post">
                <form @submit.prevent="commentPost(post.id)"
                      id="comments-form">
                    <!-- Commentaires -->
                    <img src="/Groupomania_Logos/Daco_1182050.png">
                    <input type="text"
                           name="comment"
                           v-model="commentContent"
                           id="comment-text"
                           placeholder="Ajouter un commentaire">
                    <input type="submit"
                           value="Commenter"
                           id="comment-submit" />
                    <div id="display-message">{{ this.displayMessage }}</div>
                </form>
            </div>
        </div>
    </article>
</template>

<style scoped>
#comments-form {
    display: flex;
    width: 100%;
}

.post-container #comment-post input[type="text"] {
    border: none;
    border-bottom: 1px solid var(--noir);
    background: transparent;
    text-align: center;
    padding: 10px;
    transition: all .2s linear;
    width: 100%;
    text-overflow: ellipsis;
}

.post-container #comment-post #comment-text {
    text-align: left;
    width: 100%;
}

.post-container #comment-post #comment-text::placeholder {
    font-family: "Raleway", sans-serif;
}

.post-container #comment-post #comment-text:hover,
.post-container #comment-post #comment-text:focus,
.post-container #comment-post #comment-text:active {
    border-color: var(--rouge);
}

.post-container #comment-post #comment-submit {
    background: #FF0000;
    border-radius: 40px;
    border: 2px solid transparent;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    font-size: 16px;
    text-transform: uppercase;
    color: #FFFFFF;
    transition: all .2s linear;
}

.post-container #comment-post #comment-submit {
    margin: 0 0 0 20px;
    padding: 10px 20px;
    font-size: 14px;
}

.post-container #comment-post #comment-submit:hover,
.post-container #comment-post #comment-submit:focus,
.post-container #comment-post #comment-submit:active {
    background-color: #fff;
    color: var(--rouge);
    border: 2px solid var(--rouge);
    cursor: pointer;
}
</style>

<script>
import Comment from '@/components/Comment.vue';
import axios from 'axios'

export default {
    name: 'Post',
    data() {
        return {
            posts: [],
            showOptions: false,
            isLiked: 0,
            commentContent: '',
            displayMessage: ''
        }
    },
    components: {
        Comment
    },
    async mounted() {
        console.log("Génération des posts");
        const response = await axios.get('posts')
        const posts = await response.data
        this.posts = posts
    },
    methods: {
        toggleControls() {
            this.showOptions = !this.showOptions
        },
        async likePost(postId) {
            const response = await axios.post('likes', {
                postId,
                isLiked: 1
            })
            const likes = await response.data
            this.isLiked = likes
            this.$router.go(`/${postId}`)
        },
        commentPost(postId) {
            axios.post('comments', {
                postId,
                content: this.commentContent
            }).then(response => {
                console.log(response);
                document.getElementById('display-message').classList.add('successful-connection')
                this.$router.go(`/${postId}`)
            })
                .catch(error => {
                    return this.displayMessage = 'Une erreur s\'est produite ' + error
                })
            // console.log(response);
        },
        // async modifyPost() {
        //     const data = {
        //         content: this.content,
        //         imageUrl: this.imageUrl,
        //     }
        //     await axios.put(`posts/${this.id}`, data)
        //     this.$router.go()
        // },
        async deletePost(postId) {
            if (confirm('Voulez-vous vraiment supprimmer ce post ?')) {
                await axios.delete(`posts/${postId}`)
                this.$router.go()
            } else {
                return
            }
        }
    },
}
</script>