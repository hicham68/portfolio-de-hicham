let emailValidation = {
  nom:false,
  email:false,
  projet: false,
  message: false,
  hello: 'hello'
}

console.log("Chargé");

// Fonction qui 
// permet de rajouter une balise après une autre
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function sendEmailConfirm(email){
  console.log('ENVOI REQUETTE EMAIL');
  const user = {
          email: email.email,
          firstName: email.nom,
          message: email.message,
          sujet: email.projet
      };
  const options = {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
              'Content-Type': 'application/json'
          }
      }
  fetch('/email/', options)      
  .then(data => {
      // function (response) {
      console.log('response de requette :'+ data.ok)
      if(data.ok) {
      //On supprime le mot de passe du tableau
          console.log('message de confirmation envoyé');
      } 
  }) 
  .catch(function(error) {
  console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  })
  .finally(() => {
          
          // this.$refs.popupNotification.validNotification(titre,message);// Lance une methode du meme nom sur un composant enfant !
          console.log(' l\'email t de '+ user.firstName + ' a bien été envoyé ! ')
    //       setLoading(false);
    // notify(firstName,email);

      });
}


const submitHandler = () =>{

    let contactMessage = {
      nom: document.getElementById('contact__nom').value,
      email: document.getElementById('contact__email').value,
      projet: document.getElementById('contact__projet').value,
      message: document.getElementById('contact__message').value
    }

    console.log(contactMessage);

    ///// VERIFICATION NOM :

    let namRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/

    if( contactMessage.nom === ""  && 
        !document.getElementById("contact__nom__error") ||
        namRegex.test(contactMessage.nom)
        && 
        !document.getElementById("contact__nom__error")
        ){
      var divError = document.createElement("div"); // creer une 
      divError.setAttribute("id","contact__nom__error"); // on ajoute un id sur la div
      divError.innerHTML = ` <p type="text" name="name"  class="error__form" > <i class="fas fa-exclamation-triangle"></i> Votre nom n'est pas valide </p>`;
      var divInput = document.getElementById("div__contact__nom");
      emailValidation.nom = false
      insertAfter(divInput, divError);
      
    }
    else if(contactMessage.nom !== "" && document.getElementById("contact__nom__error") ){
      var divError = document.getElementById("contact__nom__error")
      divError.parentNode.removeChild(divError)
      emailValidation.nom = true
      // divError.remove()
    } 

    ///// VERIFICATION EMAIL :

    let emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( 
      contactMessage.email.length <5 && 
      emailRe.test(contactMessage.email) === false &&
      !document.getElementById("contact__email__error") ||
      contactMessage.email.length > 5 && 
      emailRe.test(contactMessage.email) === false &&
      !document.getElementById("contact__email__error") 
      ){
      var divError = document.createElement("div"); // creer une 
      divError.setAttribute("id","contact__email__error"); // on ajoute un id sur la div
      divError.innerHTML = ` <p type="text" name="name"  class="error__form" > <i class="fas fa-exclamation-triangle"></i> Votre email n'est pas valide </p>`;
      var divInput = document.getElementById("div__contact__email");
      insertAfter(divInput, divError);
      emailValidation.email = false
    }
    else if(document.getElementById("contact__email__error") &&
    contactMessage.email.length >5 && 
    emailRe.test(contactMessage.email) === true &&
    document.getElementById("contact__email__error")
    ){
      let divError = document.getElementById("contact__email__error")
      divError.parentNode.removeChild(divError)
      emailValidation.email = true
      // divError.remove()
    } 

    //// VERIFICATION PROJET :
    if(contactMessage.projet ==="" && !document.getElementById("contact__projet__error")){
      var divError = document.createElement("div"); // creer une 
      divError.setAttribute("id","contact__projet__error"); // on ajoute un id sur la div
      divError.innerHTML = ` <p type="text" name="name"  class="error__form" > <i class="fas fa-exclamation-triangle"></i> Votre projet n'est pas valide </p>`;
      var divInput = document.getElementById("div__contact__projet");
      insertAfter(divInput, divError);
      emailValidation.projet = false
    }
    else if(document.getElementById("contact__projet__error") && contactMessage.projet !=="") {
      let divError = document.getElementById("contact__projet__error")
      divError.parentNode.removeChild(divError)
      emailValidation.projet = true
    } 

    //// VERIFICATION MESSAGE :

    if( contactMessage.message.length < 50 && !document.getElementById("contact__message__error") 
    ){
      var divError = document.createElement("div"); // creer une 
      divError.setAttribute("id","contact__message__error"); // on ajoute un id sur la div
      divError.innerHTML = ` <p type="text" name="name"  class="error__form" > <i class="fas fa-exclamation-triangle"></i> Votre message n'est pas valide, il doit faire plus de 50 caractères </p>`;
      var divInput = document.getElementById("div__contact__message");
      insertAfter(divInput, divError);
      emailValidation.message = false
    }
    else if(document.getElementById("contact__message__error") && contactMessage.message !=="" && contactMessage.message.length > 50 ) {
      let divError = document.getElementById("contact__message__error")
      divError.parentNode.removeChild(divError)
      emailValidation.message = true
      
    } 
    console.log(emailValidation);

    if( 
      emailValidation.nom === true &&
      emailValidation.email === true &&
      emailValidation.projet ===  true &&
      emailValidation.message ===  true
    ){
      sendEmailConfirm(contactMessage)
    }


  }



  