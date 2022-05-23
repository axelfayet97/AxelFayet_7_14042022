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
            <div class="container__header__options">
                <a href="#"
                   @click.prevent="toggleControls"
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
            <p @click="toggleControls">{{ post.content }}</p>
            <form @submit.prevent="updatePost(post.id)"
                  v-show="showOptions">
                <textarea id="update-message">{{ post.updatedMessage }}</textarea>
                <input type="submit"
                       value="Modifier">
            </form>
            <!-- <p v-if="post.imageUrl != null">{{ post.imageUrl }}</p> -->
        </div>
        <div class="container__controls">
            <div class="controls-buttons">
                <div id="comment-button">
                    <img src="../../public/noun-comment-1935575.svg"
                         alt="Bouton commentaire">
                    {{ post.comments.length }}
                </div>
                <div id="like-post">
                    <a href="#"
                       @click.prevent="likePost(post.id)">
                        <img src="/noun-like-576529.svg"
                             id="like-button"
                             alt="Bouton like" />
                        {{ post.likes.length }}
                    </a>
                </div>
            </div>
            <Comment />
            <div id="comment-post">
                <form @submit.prevent="commentPost(post.id)"
                      id="comments-form">
                    <!-- Commentaires -->
                    <img src="/Groupomania_Logos/Daco_1182050.png">
                    <input type="text"
                           name="comment"
                           v-model="commentContent[post.id]"
                           id="comment-text"
                           placeholder="Ajouter un commentaire">
                    <input type="submit"
                           value="Commenter"
                           id="comment-submit" />
                    <div id="error-message">{{ this.errorMessage }}</div>
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

/* HEADER */

.post-container__header {
    display: flex;
    justify-content: space-between;
}

.container__header__options a,
.container__header__options a:visited {
    cursor: pointer;
    position: relative;
    font-size: 30px;
    font-weight: bold;
    color: var(--gris);
}

.container__header__options a:hover,
.container__header__options a:focus,
.container__header__options a:active {
    color: var(--noir)
}

.container__header__options a #controls {
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    list-style-type: none;
    color: var(--noir);
    font-size: 16px;
    display: flex;
    align-items: center;
    transition: right .2s linear;
}

.container__header__options a #controls li {
    padding: 20px;
}

@media all and (max-width: 768px) {
    .container__header__options a #controls {
        display: block;
        right: 0;
        top: 70px;
        text-align: right;
    }

    .container__header__options a #controls li {
        padding: 10px;
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

/* CONTROLS */

.container__controls .controls-buttons {
    display: flex;
    justify-content: flex-end;
    margin: 10px auto;
}

.container__controls .controls-buttons div {
    margin: 0 10px;
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

#comments-form {
    display: flex;
    width: 100%;
}

@media all and (max-width: 768px) {
    #comments-form img {
        width: 40px;
        height: 40px;
    }
}
#comment-post input[type="text"] {
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

#comment-post #comment-submit {
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

#comment-post #comment-submit {
    margin: 0 0 0 20px;
    padding: 10px 20px;
    font-size: 14px;
}

#comment-post #comment-submit:hover,
#comment-post #comment-submit:focus,
#comment-post #comment-submit:active {
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
            errorMessage: '',
            updatedMessage: ''
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
            const likes = await response.data.data
            this.isLiked = likes
            // this.$router.go(`/#${postId}`)
        },
        async commentPost(postId) {
            const response = await axios.post('comments', {
                postId: postId,
                content: this.commentContent
            })
            console.log('Comment response = ', response, postId);
        },
        async updatePost(postId) {
            const data = {
                content: this.updatedMessage,
                // imageUrl: this.imageUrl,
            }
            await axios.put(`posts/${postId}`, data)
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