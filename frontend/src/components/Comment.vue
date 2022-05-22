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
                <div class="author-infos">
                    <!-- <p id="comment-author"> {{ user.firstName }} {{ user.lastName }}</p>
                    <p id="created-at">{{ comment.createdAt }}</p> -->
                </div>
                <div class="comment-container__body">
                    <p>{{ comment.content }}</p>
                    <!-- <p v-if="comment.imageUrl != null">{{ comment.imageUrl }}</p> -->
                </div>
                <div class="container__header__options">
                    <a href="#"
                       @click.prevent="toggleControls"
                       id="toggle-controls"><span>...</span>
                        <ul id="controls"
                            v-show="showOptions">
                            <li>Modifier</li>
                            <li @click="deleteComment(comment.id)">Supprimer</li>
                        </ul>
                    </a>
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

.comment-container__header__user-infos {
    display: flex;
    align-items: center;
    width: 100%
}

.comment-container #author-img img {
    width: 40px;
}

.comment-container__body {
    background-color: var(--gris-clair);
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.16);
    padding: 10px 20px;
    border-radius: 30px;
    width: 100%
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
            commentContent: '',
            displayMessage: ''
        }
    },
    async mounted() {
        console.log("Génération des comments");
        const response = await axios.get('comments')
        const comments = await response.data
        this.comments = comments
        console.log(response);
    },
    methods: {
        toggleControls() {
            this.showOptions = !this.showOptions
        },
        // async modifyComment() {
        //     const data = {
        //         content: this.content,
        //         imageUrl: this.imageUrl,
        //     }
        //     await axios.put(`comments/${this.id}`, data)
        //     this.$router.go()
        // },
        async deleteComment(commentId) {
            if (confirm('Voulez-vous vraiment supprimmer ce commentaire ?')) {
                await axios.delete(`comments/${commentId}`)
                //  {
                //     headers: {
                //         Authorization: localStorage.getItem('token')
                //     }
                // })
                this.$router.go()
            } else {
                return
            }
        }
    },
}
</script>