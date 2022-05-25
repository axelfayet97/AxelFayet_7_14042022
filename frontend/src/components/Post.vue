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
                    <time id="created-at"
                          :dateTime="post.createdAt">{{ post.createdAt }}</time>
                </div>
            </div>
            <div class="container__header__options"
                 @vnodeMounted="belongsToUser(post.userId)"
                 v-if="displayOptions">
                <a href="#"
                   @click.prevent="toggleControls"
                   id="toggle-controls"><i class="bi bi-gear"></i>
                    <ul id="controls"
                        v-show="showOptions">
                        <li @click.stop.prevent="editPostControls"><i class="bi bi-pencil"></i></li>
                        <li @click.stop.prevent="deletePost(post.id)"><i class="bi bi-trash3"></i></li>
                    </ul>
                </a>
            </div>
        </div>
        <div class="post-container__body">
            <p>{{ post.content }}</p>
            <form id="update-post"
                  v-show="editPost"
                  @submit.prevent="updatePost(post.id)">
                <textarea v-model="updatedMessage">{{ post.id.content }}</textarea>
                <input type="submit"
                       value="Modifier">
            </form>
            <!-- <p v-if="post.imageUrl != null">{{ post.imageUrl }}</p> -->
        </div>
        <div class="container__controls">
            <div class="controls-buttons">
                <div id="comment-button">
                    <i class="bi bi-chat-left-text"></i>
                    {{ post.comments.length }}
                </div>
                <div id="like-post">
                    <a href="#"
                       @click.prevent="likePost(post.id)">
                        <!-- <i :class="{ userHasLiked: 'bi bi-hand-thumbs-up-fill', 'bi bi-hand-thumbs-up': !userHasLiked }" </i>-->
                        <i class="bi bi-hand-thumbs-up"></i>
                        {{ post.likes.length }}
                    </a>
                </div>
            </div>
            <div class="comments-wrapper">
                <Comment />
            </div>
            <div id="comment-post">
                <form @submit.prevent="commentPost(post.id)"
                      id="comments-form">
                    <!-- Commentaires -->
                    <div class="comment-input-wrapper">
                        <img src="/Groupomania_Logos/Daco_1182050.png">
                        <input type="text"
                               name="comment"
                               v-model="commentContent"
                               id="comment-text"
                               placeholder="Ajouter un commentaire" />
                    </div>
                    <div id="error-message">{{ this.errorMessage }}</div>
                    <input type="submit"
                           value="Commenter"
                           id="comment-submit" />
                </form>
            </div>
        </div>
    </article>
</template>

<style scoped>
/* POST CONTAINERA */
.post-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 40px;
    border-radius: 30px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
    background: #fff;
}

@media all and (max-width: 768px) {
    .post-container {
        max-width: 90%;
    }
}

#post-author {
    font-weight: 800;
}

.post-container #author-img img,
.post-container #comment-post img {
    max-width: 50px;
    margin-right: 20px;
}

.post-container__header__user-infos {
    display: flex;
}

/* BODY */
.post-container__body {
    padding: 20px;
    line-break: anywhere;
}

#update-post textarea {
    min-width: 100%;
    max-width: 100%;
    min-height: 100px;
    max-height: 250px;
    font-family: 'Raleway', sans-serif;
    padding: 10px;
}

#update-post input[type="submit"] {
    display: block;
    margin-left: auto;
    margin-top: 10px !important;
}

/* CONTROLS */

.container__controls .controls-buttons {
    display: flex;
    justify-content: flex-end;
    margin: 10px auto;
}

.container__controls .controls-buttons div {
    margin: 0 10px;
    font-size: 25px;
}

.container__controls .controls-buttons #comment-button {
    cursor: pointer;
    transition: all .2s linear;
}

.container__controls .controls-buttons #comment-button:hover,
.container__controls .controls-buttons #comment-button:focus,
.container__controls .controls-buttons #comment-button:active {
    color: var(--rouge)
}

.container__controls .controls-buttons img {
    width: 30px;
    vertical-align: middle;
}

.comment-input-wrapper {
    display: flex;
    width: 100%;
}

#comments-form {
    display: flex;
    width: 100%;
}

@media all and (max-width: 768px) {
    #comments-form {
        flex-direction: column;
    }

    #comments-form img {
        width: 40px;
        height: 40px;
    }
}

#comment-post input[type="text"] {
    font-family: 'Raleway', sans-serif;
    border: none;
    border-bottom: 1px solid var(--noir);
    background: transparent;
    text-align: center;
    padding: 10px;
    transition: all .2s linear;
    width: 100%;
    text-overflow: ellipsis;
}

#comment-post #comment-text {
    text-align: left;
    width: 100%;
}

#comment-post #comment-text::placeholder {
    font-family: "Raleway", sans-serif;
}

#comment-post #comment-text:hover,
#comment-post #comment-text:focus,
#comment-post #comment-text:active {
    border-color: var(--rouge);
}

#comment-post #comment-submit,
#update-post input[type="submit"] {
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

@media all and (max-width: 768px) {
    #comment-submit {
        margin: 20px 0 20px auto !important;
        max-width: 200px;
    }
}

#comment-post #comment-submit,
#update-post input[type="submit"] {
    margin: 0 0 0 20px;
    padding: 10px 20px;
    font-size: 14px;
}

#comment-post #comment-submit:hover,
#comment-post #comment-submit:focus,
#comment-post #comment-submit:active,
#update-post input[type="submit"]:hover,
#update-post input[type="submit"]:focus,
#update-post input[type="submit"]:active {
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
            displayOptions: true,
            editPost: false,
            isLiked: '',
            commentContent: '',
            errorMessage: '',
            updatedMessage: ''
        }
    },
    components: {
        Comment
    },
    async created() {
        const response = await axios.get('posts')
        const posts = await response.data
        this.posts = posts
    },
    methods: {
        toggleControls() {
            this.showOptions = !this.showOptions
        },
        editPostControls() {
            this.editPost = !this.editPost
        },
        belongsToUser(userId) {
            userId == localStorage.getItem('userId') ? this.displayOptions = true : this.displayOptions = false
        },
        async likePost(postId) {
            const response = await axios.post('likes', {
                postId,
                isLiked: 1
            })
            console.log(response);
            this.$router.go(`/#${postId}`)
        },
        async commentPost(postId) {
            await axios.post('comments', {
                postId: postId,
                content: this.commentContent
            })
            this.$router.go(`/#${postId}`)
        },
        async updatePost(postId) {
            await axios.put(`posts/${postId}`, { content: this.updatedMessage, })
            this.$router.go(`/#${postId}`)
        },
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