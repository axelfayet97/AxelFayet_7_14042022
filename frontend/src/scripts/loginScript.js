function checkFormInformations() {
    // Regexp
    let mailRegexp = new RegExp(/^([a-z0-9.-_]+)@([\da-z\.-]+)([a-z]{2,})$/);
    
    // Email
    let emailInput = document.getElementById("email");
    emailInput.addEventListener("change", (e) => {
        if (mailRegexp.test(e.target.value)) {
            document.getElementById("emailErrorMsg").innerText = "";
            // buttonIsDisabled(false);
        } else {
            document.getElementById("emailErrorMsg").innerText = "Veuillez vérifier le format de l'adresse e-mail.";
            // buttonIsDisabled(true);
        };
    });
};
// Fonction permettant de désactiver le bouton "Commander" si un champs est incorrect
// function buttonIsDisabled(disabled) {
    //     let orderInput = document.getElementById("order");
    //     if (disabled) {
        //         orderInput.setAttribute("disabled", true);
        //     } else {
            //         orderInput.removeAttribute("disabled");
            //     };
            // };
            
            // Fonction permettant de récupérer et d'envoyer les données à l'API
            function sendFormInformations() {
                // Déclaration des variables nécéssaires au traitement de la requete post
                let emailInput = document.getElementById("email").value;
                let passwordInput = document.getElementById("password").value;
                
                // Stockage des informations de contact dans un objet
                let user = {
                    email: emailInput,
                    password: passwordInput
                };
                
                // On regroupe les informations de contact et le tableau contenant les ID dans data
                data = { user };
                
                // Fetch de la commande  dans l'API en POST
                fetch(`http://localhost:3000/api/auth/login`, {
                    method: "POST",
                    cors: "cors",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    // Corps de la requête
                    body: JSON.stringify(data)
                })
                .then(res => {
                    // Redirection vers la home
                    window.location = `../components/Home.vue`;
                    return res.json();
                })
                .catch(error => {
                    // Si une erreur survient
                    res.status(500).send(error)
                });
            };
            
            // Á l'envoi du formulaire on déclenche la fonction permettant d'envoyer les informations à l'API
            // document.getElementById("submit").addEventListener("submit", (e) => {
                //     console.log("bonjour");
                //     // Prévention du comportement par défaut du bouton
                //     e.preventDefault();
                //     sendFormInformations();
                // });
                console.log('import');
                export default function sum(a, b) {
                    return a + b;
                }