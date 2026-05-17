const produitsDiv = document.getElementById("produits");

const contenuPanier = document.getElementById("contenu-panier");

const nombrePanier = document.getElementById("nombre-panier");

const prixTotal = document.getElementById("prix-total");

let panier = JSON.parse(localStorage.getItem("panier")) || [];


// API FakeStore
fetch("https://fakestoreapi.com/products")
.then(response => response.json())
.then(data => {

  const produits = [

    {
      id:1,
      nom:"Ensemble",
      prix:12000,
      image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000",
      description:"Ensemble élégant et moderne."
    },

    {
      id:2,
      nom:"Robe Chic",
      prix:5000,
      image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000",
      description:"Robe confortable et tendance."
    },

    {
      id:3,
      nom:"Tenu Chic",
      prix:13000,
      image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
      description:"Tenu très élégant."
    },

    {
      id:4,
      nom:"Chemise Noir",
      prix:3000,
      image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000",
      description:"Une chemise chic."
    }

  ];

  afficherProduits(produits);

});


// Afficher produits
function afficherProduits(produits){

  produitsDiv.innerHTML = "";

  produits.forEach((produit)=>{

    const carte = document.createElement("div");

    carte.classList.add("carte");

    carte.innerHTML = `

      <img src="${produit.image}" alt="${produit.nom}">

      <div class="contenu">

        <h3>${produit.nom}</h3>

        <p>${produit.description}</p>

        <p class="prix">
          ${produit.prix} FCFA
        </p>

        <button class="ajouter">
          Ajouter au panier
        </button>

      </div>

    `;

    const bouton = carte.querySelector(".ajouter");

    bouton.addEventListener("click", ()=>{

      ajouterAuPanier(produit);

    });

    produitsDiv.appendChild(carte);

  });

}


// Ajouter au panier
function ajouterAuPanier(produit){

  panier.push(produit);

  sauvegarderPanier();

  afficherPanier();

}


// Afficher panier
function afficherPanier(){

  contenuPanier.innerHTML = "";

  let total = 0;

  panier.forEach((article,index)=>{

    total += article.prix;

    const div = document.createElement("div");

    div.classList.add("article-panier");

    div.innerHTML = `

      <span>
        ${article.nom}
      </span>

      <strong>
        ${article.prix} FCFA
      </strong>

      <button class="supprimer">
        Supprimer
      </button>

    `;

    const boutonSupprimer = div.querySelector(".supprimer");

    boutonSupprimer.addEventListener("click", ()=>{

      supprimerProduit(index);

    });

    contenuPanier.appendChild(div);

  });

  nombrePanier.textContent = panier.length;

  prixTotal.textContent = total;

}


// Supprimer produit
function supprimerProduit(index){

  panier.splice(index,1);

  sauvegarderPanier();

  afficherPanier();

}


// Sauvegarder LocalStorage
function sauvegarderPanier(){

  localStorage.setItem("panier", JSON.stringify(panier));

}


afficherPanier();