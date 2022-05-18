<template>
    <section>
        <h1>Votre profil</h1>
        <div class="container-profil-infos">
            <div class="profile-picture-update">
                <img src="../../public/Groupomania_Logos/Daco_1182050.png"
                     alt="Photo de profil" />
                <input type="file"
                       name="profilePicture"
                       id="profile-pic-input" />
            </div>
            <div class="form-infos">
                <form @submit.prevent="updateUser">
                    <div class="email-input">
                        <label for="email"></label>
                        <input type="email"
                               placeholder=""
                               disabled
                               v-model="email" />
                    </div>
                    <div class="names-input">
                        <label for="firstNameInput">Prénom</label>
                        <input type="text"
                               placeholder=""
                               v-model="firstName">
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
                    <input type="submit"
                           value="Sauvegarder mes informations">
                </form>
            </div>
            <a href="#"
               @click="deleteUser">Supprimmer mon compte</a>
        </div>
    </section>
</template>

<style scoped>
img {
    width: 200px;
}

.container-profil-infos {
    display: flex;
    justify-content: center;
}

.profile-picture-update {
    width: 30%;
}

.form-infos {
    width: auto;
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
            userId: ''
        }
    },
    created() {
        const userId = localStorage.getItem('userId')
        this.userId = userId
    },
    async beforeMount() {
        const response = await axios.get(`auth/${this.userId}`)
        console.log(response)
        this.email = response.data.email
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
    },
    methods: {
        async updateUser() {
            const data = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: 'a@a.fr'
            }
            await axios.put(`auth/${this.userId}`, data)
            this.$router.go()
        },
        async deleteUser() {
            if (confirm('Cette action est irréversible, voulez vous vraiment supprimer votre compte ?')) {
                await axios.delete(`auth/${this.userId}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log('true');
            } else {
                console.log("false");
                return
            }

        }
    }
}
</script>