<template>
    <article class="comment-container"
             v-for="comment in comments"
             :key="comment.id"
             :id="comment.id">
        <div class="comment-container__header">
            <div class="comment-container__header__user-infos">
                <div id="author-img">
                    <img src="/Groupomania_Logos/Daco_1182050.png"
                         alt="Photo de profil">
                </div>
                <div class="comment-container__body">
                    <div class="author-infos">
                        <p id="comment-author"> {{ comment.user.firstName }} {{ comment.user.lastName }} <span class="span-time-comment"><time id="created-at"
                          :dateTime="comment.createdAt">{{ comment.createdAt }}</time></span> </p>
                    </div>
                    <p>{{ comment.content }}</p>
                    <div class="container__header__options"
                         @vnodeMounted="belongsToUser(comment.userId)"
                         v-if="displayOptions">
                        <a href="#"
                           @click.prevent="toggleControls"
                           id="toggle-controls"><i class="bi bi-gear"></i>
                            <ul id="controls"
                                v-show="showOptions">
                                <li><i @click.stop.prevent="editCommentControls"
                                       class="bi bi-pencil"></i></li>
                                <li @click="deleteComment(comment.id)"><i class="bi bi-trash3"></i></li>
                            </ul>
                        </a>
                    </div>
                    <form id="update-comment"
                          v-show="editComment"
                          @submit.prevent="updateComment(comment.id)">
                        <textarea v-model="updatedMessage">{{ comment.content }}</textarea>
                        <input type="submit"
                               value="Modifier">
                    </form>
                </div>
            </div>
        </div>
    </article>
</template>
<style scoped>
.comment-container {
    display: block;
    width: 100%;
    border-top: 1px solid var(--gris);
    padding: 20px;
}

.comment-container__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.container__header__options {
    position: absolute;
    right: 20px;
    top: 15px;
}

.comment-container__header__user-infos {
    display: flex;
    align-items: start;
    width: 100%
}

.comment-container #author-img img {
    width: 40px;
    margin-top: 10px;
    margin-right: 10px;
}

#comment-author {
    font-weight: 600;
}

.span-time-comment {
    font-weight: 300;
    font-size: 12px;
    color: var(--gris)
}

@media all and (max-width: 768px) {
    .span-time-comment {
        display: block;
    }
}

.comment-container .comment-container__body {
    margin: 0 20px;
}

.comment-container__body {
    background-color: var(--gris-clair);
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.16);
    padding: 10px 20px;
    border-radius: 30px;
    width: 100%
}

.comment-container__body .container__header__options a {
    font-size: 18px;
}

.comment-container__body .container__header__options a #controls {
    font-size: 15px;
    right: 30px;
}

.comment-container__body .container__header__options a #controls li {
    padding: 5px;
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
</style>

<script>
import axios from 'axios'

export default {
    name: 'Comment',
    data() {
        return {
            comments: [],
            showOptions: false,
            displayOptions: true,
            editComment: false,
            commentContent: '',
            displayMessage: '',
            updatedMessage: ''
        }
    },
    async mounted() {
        console.log("Génération des comments");
        const response = await axios.get('comments')
        const comments = await response.data
        this.comments = comments
    },
    methods: {
        toggleControls() {
            this.showOptions = !this.showOptions
        },
        editCommentControls() {
            this.editComment = !this.editComment
        },
        belongsToUser(userId) {
            userId == localStorage.getItem('userId') ? this.displayOptions = true : this.displayOptions = false
        },
        async updateComment(commentId) {
            await axios.put(`comments/${commentId}`, { content: this.updatedMessage, })
            this.$router.go(`/#${commentId}`)
        },
        async deleteComment(commentId) {
            if (confirm('Voulez-vous vraiment supprimmer ce commentaire ?')) {
                await axios.delete(`comments/${commentId}`)
                this.$router.go()
            } else {
                return
            }
        },
    },
}
</script>