import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

// let app = Vue.createApp({
    // data: function () {
        // return {
            // message: 'Hello Vue!',
        // }
    // },
    // methods: {
    // }
// })
// app.component('header', {
    // template: `
    // 
    // <div class="header__wrapper__col">
        // <a href="#">
            // <img src="./icons/icon-left-font.jpeg" />
        // </a>
    // </div>
// `,
    // data() {
        // return {
            // title: 'Header'
        // }
    // }
// });
// app.component('login-form', {
    // template: `
    //    <form class="form_wrapper" method="post" action="../views/Home.vue">
    // <div class="form_wrapper__field email__field">
    //   <label for="email">Votre adresse mail</label>
    //   <input type="text" id="email" placeholder="Votre adresse mail" />
    //   <p v-if="fieldError == true">{{ errorMessage }}</p>
    // </div>
    // <div class="form_wrapper__field password__field">
    //   <label for="password">Votre mot de passe</label>
    //   <input type="password" id="password" placeholder="Votre mot de passe" />
    //   <p v-if="fieldError == true">{{ errorMessage }}</p>
    // </div>
    // <div class="form_wrapper__button submit__button">
    //   <input type="submit" id="submit" value="C'est parti !"  />
    // </div>
//   </form>
    //   `,
    // data() {
        // return {
            // title: 'Login Form'
        // }
    // }
// })
// app.component('footer', {
    // template: `
        // <ul>
            // <li>© 2022</li>
            // <li>Groupomania</li>
            // <li>Tous droits réservés</li>
            // <li><a href="#">Politique de confidentialité</a></li>
            // <li><a href="#">Mentions légales</a></li>
        // </ul> 
// `,
    // data() {
        // return {
            // title: 'Footer'
        // }
    // }
// });