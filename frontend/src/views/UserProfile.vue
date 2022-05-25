<template>
    <section id="section-user-account">
        <h1>Votre profil</h1>
        <div class="container-profil-infos">
            <div class="profile-picture-update">
                <img src="/Groupomania_Logos/Daco_1182050.png"
                     alt="Photo de profil" />
                <!-- <input type="file"
                       name="profilePicture"
                       id="profile-pic-input" /> -->
            </div>
            <div class="form-infos">
                <form class="form_wrapper" @submit.prevent="updateUser">
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
                    <!-- <div class="password-input">
                        <label for="password">Mot de passe</label>
                        <input type="password"
                               value=""
                               placeholder="">
                        <label for="confirmPassword">Confirmez le mot de passe</label>
                        <input type="password"
                               v-bind="password"
                               placeholder="">
                    </div> -->
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

.container-profil-infos div {
    width: 100%;
}

.profile-picture-update {
    width: 30%;
}


.form-infos .form-input input,
.form-infos .form-input textarea {
    margin: 10px 0;
    width: 100%;
    max-width: 300px;
    min-width: min-content;
    min-height: 25px;
    max-height: 200px;
}

.form-infos .form-input label {
    display: block;
}

#delete-account {
    display: block;
    margin: auto;
}
</style>

<script>
import axios from 'axios'

export default {
    name: 'UserProfile',
    data() {
        return {
            email: '',
            firstName: '',
            lastName: '',
            userId: '',
            biography: '',
        }
    },
    created() {
        const userId = localStorage.getItem('userId')
        this.userId = userId
    },
    async beforeMount() {
        const response = await axios.get(`auth/${this.userId}`)
        this.email = response.data.email
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        this.biography = response.data.bio
    },
    methods: {
        async updateUser() {
            const data = {
                firstName: this.firstName,
                lastName: this.lastName,
                bio: this.biography
            }
            await axios.put(`auth/${this.userId}`, data)
            this.$router.go()
        },
        async deleteUser() {
            if (confirm('Cette action est irréversible, voulez vous vraiment supprimer votre compte ?')) {
                await axios.delete(`auth/${this.userId}`)
                //  {
                //     headers: {
                //         Authorization: localStorage.getItem('token')
                //     }
                // })
                // this.$router.push('/signup')
            } else {
                return
            }

        }
    }
}
</script>