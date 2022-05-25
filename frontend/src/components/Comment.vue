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
                        <p id="comment-author"> {{ comment.user.firstName }} {{ comment.user.lastName }} <span
                                  class="span-time-comment"><time id="created-at"
                                      :dateTime="comment.createdAt">{{ comment.createdAt }}</time></span> </p>
                    </div>
                    <p>{{ comment.content }}</p>
                    <div class="container__header__options"
                         @vnodeMounted="belongsToUser(comment.userId)"
                         v-if="displayOptions">
                        <a href="#"
                           @click.prevent="toggleControls(comment.id)"
                           id="toggle-controls"><i class="bi bi-gear"></i>
                            <ul id="controls"
                                v-show="showOptions">
                                <li><i @click.stop.prevent="editCommentControls(comment.id)"
                                       class="bi bi-pencil"></i></li>
                                <li @click="deleteComment(comment.id)"><i class="bi bi-trash3"></i></li>
                            </ul>
                        </a>
                    </div>
                    <form id="update-comment"
                          v-show="editComment == comment.id"
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
    width: 100%;
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

#update-comment textarea {
    min-width: 100%;
    max-width: 100%;
    min-height: 60px;
    max-height: 60px;
    font-family: 'Raleway', sans-serif;
}

#update-comment input[type="submit"] {
    display: block;
    margin-left: auto;
    margin-top: 10px !important;
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
    #update-comment input[type="submit"] {
        margin: 20px 0 20px auto !important;
        max-width: 200px;
    }
}

#update-comment input[type="submit"] {
    margin: 0 0 0 20px;
    padding: 10px 20px;
    font-size: 14px;
}

#update-comment input[type="submit"]:hover,
#update-comment input[type="submit"]:focus,
#update-comment input[type="submit"]:active {
    background-color: #fff;
    color: var(--rouge);
    border: 2px solid var(--rouge);
    cursor: pointer;
}
</style>

<script>

export default {
    name: 'Comment',
    props: ['comments'],
    data() {
        return {
            showOptions: '',
            displayOptions: true,
            editComment: '',
            commentContent: '',
            displayMessage: '',
            updatedMessage: ''
        }
    },
    mounted() {
        fetch(`http://localhost:3000/api/comments`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then(promise => {
            return promise.json()
        })
            .then(comments => {
                console.log(comments);
            })
            .catch(error => {
                console.log(error)
            })
    },
    methods: {
        toggleControls(commentId) {
            if (this.showOptions == commentId) {
                this.showOptions = null
            } else {
                this.showOptions = commentId
            }
        },
        editCommentControls(commentId) {
            if (this.editComment == commentId) {
                this.editComment = null
            } else {
                this.editComment = commentId
            }
        },
        belongsToUser(userId) {
            userId == localStorage.getItem('userId') ? this.displayOptions = true : this.displayOptions = false
        },
        updateComment(commentId) {
            fetch(`http://localhost:3000/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ content: this.updatedMessage })
            }).then(promise => {
                return promise.json()
            }).then(() => {
                this.$router.go()
            }).catch(error => {
                console.log(error);
            })
        },
        deleteComment(commentId) {
            if (confirm('Voulez-vous vraiment supprimmer ce commentaire ?')) {
                fetch(`http://localhost:3000/api/comments/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(promise => {
                    return promise.json()
                }).then(() => {
                    this.$router.go()
                }).catch(error => {
                    console.log(error);
                })
            } else {
                return
            }
        },
    },
}
</script>