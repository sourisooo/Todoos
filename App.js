const addForm = document.querySelector('.add');
const search = document.querySelector('.search input');
const list = document.querySelector('.todos');

const generateTemplate = todo => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += html;
};

// méthode retourne un résultat sous la forme d'un code html,
//prend le code html existant et l'ajoute au précedent code html. La méthode prend
// l'argument todo en entrée. La création de code html ce fait en dur et non
// par l'intermédiaire de la méthode createelement implémentée dans javascript.


const filterTodos = term => {

  // add filtered class
  Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));

  // remove filtered class
  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));

};

//méthode retourne une liste d'objet (ici node liste ou liste de puce html) sur laquelle est appliquée
// deux méthodes successives filtre et foreach. Cette méthode va permettre lors 
// de la recherche de todos (en conjonction avec l'evèmenent key up) d'afficher ou masquer
// les résultats de recherches. La méthode filter ne garde en liste que les éléments
// équivalents entre ceux de la liste et celui de la variable todo (lui meme définit par term) 
// La méthode foreach applique dans un second temps une modification du code html ajoutant ou
// supprimant le tag filtered sur le nom de la class de la pastille html. Ce tag est important
// du fait de la stylisation CSS qui applique sur les class filtered une stylisation spécifique
// , ici de ne pas les afficher sur la page html. La partie affichage est nécessaire pour 
// réafficher un résultat de recherche précédent qui aurait été masqué (ex: recherche successive des mots
// "mario" puis "luigi"). La méthode prend pour argument term en entrée.


// add todos event
addForm.addEventListener('submit', e => {
  
  e.preventDefault();
  const todo = addForm.add.value.trim();

  if(todo.length){
    generateTemplate(todo);
    addForm.reset();
  }

});

//addForm fait référence à une partie spécifique de la page html, celle contenant formclass=add ligne 37
// cad la partie de la page html servant à saisir un nouveau todoos. La méthode addEventlistener est une 
// méthode implémentée par javascript prend deux arguments: le premier correspond à lévènement auxquel
// le programme doit etre reactif (ici appuyer sur submit), le deuxième retourne le résultat de l'application
//d'une fonction représentant
// l'application de la méthode generateTemplate sur l'objet todo, todo étant la valeur du champs saisie
// dans la page hmtl contenant formclass=add. La méthode implémentée Javascipt lenght est une astuce
// pour empecher le programme la saisie de todos sans aucun charactère.


// delete todos event
list.addEventListener('click', e => {

  if(e.target.classList.contains('delete')){
    e.target.parentElement.remove();
  }

});

// list fait référence à une partie spécifique de la page html, celle contenant formclass=list ligne 22 à 34
// cad la partie de la page html affichant tous les todos. La méthode addEventlistener réagit à l'évèmenent
//click de souris et retourne le résultat de l'application d'une fonction qui modifie le code de la page html
// en supprimant ceux contenant dans le nom de leur classList "delete", cad l'icone et son parent cad le todoos
// associé à l'icone.


// filter todos event
search.addEventListener('keyup', () => {

  const term = search.value.trim().toLowerCase();
  filterTodos(term);

});

//search fait référence à une partie spécifique de la page html, celle contenant formclass=search ligne 17
// cad la partie de la page html servant à chercher un todoos. La valeur saisie dans ce champs est stockée
// dans la variable term puis on va lui appliquer la méthode filterTodos.