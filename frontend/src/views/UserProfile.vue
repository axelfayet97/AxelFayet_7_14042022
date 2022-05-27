<template>
    <div id="alert-message">{{ alertMessage }}</div>
    <section id="section-user-account">
        <h1>Votre profil</h1>
        <div class="container-profil-infos">
            <div class="profile-picture-update">
                <img src="/Groupomania_Logos/Daco_1182050.png"
                     alt="Photo de profil" />
            </div>
            <div class="form-infos">
                <form class="form_wrapper"
                      @submit.prevent="updateUser">
                    <div class="form-input"
                         id="email-input">
                        <label for="email">Email</label>
                        <input type="email"
                               placeholder=""
                               disabled
                               v-model="email" />
                    </div>
                    <div class="form-input"
                         id="names-input">
                        <label for="firstNameInput">Prénom</label>
                        <input type="text"
                               placeholder=""
                               v-model="firstName">
                    </div>
                    <div class="form-input"
                         id="lastname-input">
                        <label for="lastNameInput">Nom</label>
                        <input type="text"
                               placeholder=""
                               v-model="lastName" />
                    </div>
                    <div class="form-input"
                         id="bio-input">
                        <label for="bio">À propos de vous :</label>
                        <textarea :placeholder="biography"
                                  v-model="biography" />
                    </div>
                    <input id="update-account"
                           type="submit"
                           value="Sauvegarder mes informations">
                </form>
            </div>
        </div>
        <button id="delete-account"
                href="#"
                @click.prevent="deleteUser">Supprimer mon compte</button>
    </section>
</template>

<style scoped>
section#section-user-account {
    padding: 50px 0;
}

.profile-picture-update {
    text-align: center;
}

.profile-picture-update img {
    max-width: 200px;
}

@media all and (max-width: 768px) {
    .profile-picture-update img {
        max-width: 100px;
    }
}

.container-profil-infos {
    display: flex;
    max-width: 1200px;
    margin: auto;
}

@media all and (max-width: 768px) {
    .container-profil-infos {
        flex-direction: column;
    }
}

.container-profil-infos div {
    width: 100%;
}

.profile-picture-update {
    width: 30%;
}

.form-infos {
    padding: 20px;
}

@media all and (max-width: 768px) {
    .form-infos form {
        text-align: center;
    }
}

.form-infos .form_wrapper {
    margin: 20px auto;
}

.form-infos .form-input label {
    display: block;
}

#bio-input {
    margin: 20px auto;
}

input,
textarea {
    margin: 10px 0;
    width: 100%;
    min-width: min-content;
    min-height: 20px;
    max-height: 200px;
}

textarea {
    border: 1px solid var(--noir);
    transition: all .2s linear;
    min-height: 100px;
    padding: 5px;
    font-family: 'Raleway', sans-serif;
}

textarea:hover,
textarea:focus,
textarea:active {
    border-color: var(--rouge);
}

#delete-account {
    display: block;
    margin: auto;
}
</style>

<script>
export default {
    name: 'UserProfile',
    data() {
        return {
            email: '',
            firstName: '',
            lastName: '',
            userId: '',
            biography: '',
            alertMessage: ''
        }
    },
    created() {
        const userId = localStorage.getItem('userId')
        this.userId = userId
    },
    beforeMount() {
        fetch(`http://localhost:3000/api/auth/${this.userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then(promise => {
            return promise.json()
        }).then(response => {
            this.email = response.email
            this.firstName = response.firstName
            this.lastName = response.lastName
            this.biography = response.bio
        }).catch(error => {
            document.getElementById('alert-message').classList.add('error-message')
            return this.alertMessage = 'Une erreur s\'est produite ' + error
        })
    },
    methods: {
        updateUser() {
            const data = {
                firstName: this.firstName,
                lastName: this.lastName,
                bio: this.biography
            }
            fetch(`http://localhost:3000/api/auth/${this.userId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            }).then(promise => {
                return promise.json()
            }).then(() => {
                this.$router.go()
            }).catch(error => {
                document.getElementById('alert-message').classList.add('error-message')
                return this.alertMessage = 'Une erreur s\'est produite ' + error
            })
        },
        deleteUser() {
            if (confirm('Cette action est irréversible, voulez vous vraiment supprimer votre compte ?')) {
                fetch(`http://localhost:3000/api/auth/${this.userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                }).then(promise => {
                    return promise.json()
                }).then(() => {
                    localStorage.removeItem('userId')
                    localStorage.removeItem('token')
                    this.$router.push('/signup')
                }).catch(error => {
                    document.getElementById('alert-message').classList.add('error-message')
                    return this.alertMessage = 'Une erreur s\'est produite ' + error
                })
            } else {
                return
            }
        }
    }
}
</script>