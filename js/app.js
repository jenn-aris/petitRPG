var app = {
  //position initial du joueur
    player: {
      x: 0,
      y: 0,
      direction: 'right'
    },
    //position de l'objectif a atteindre
    targetCell: {
      x: 5,
      y: 3,
    },
    //je défini la taille de la grille
    board: {
      height: 4,
      width: 6
    },
  init: function () {
    console.log('init !');
    //je défini une nouvelle propriété 
    app.board.element = document.getElementById('board');
    //j'execute le dessin de la grille
    app.drawBoard()
    },
  //méthode qui a la responsabilité de dessiner la grille
  drawBoard : function () {
    //on creer une boucle dans une boucle
    for ( var rowCounter = 0 ; rowCounter < app.board.height ; rowCounter++) {    
      // dans un premier temps j'ai mis : console.log('je creer une ligne - ligne numéro ' + rowCounter );
      //a présent c'est une vrai methode que je vais exécuter.
      var newRowElement = app.createLine();

      for ( var cellCounter = 0 ; cellCounter < app.board.width ; cellCounter++ ) {
      //dans un premier temps j'ai mis : console.log('je creer une case - case numéro ' + cellCounter );
      //a présent c'est une vrai methode que je vais éxécuter.
       var currentCell = app.createCell(newRowElement);
       // ici on a la cellule courante, celle qui viens d'être créer.
       // je pose un debugger pour verifier ce que je fais localement et globalement.
       //debugger;
       //j'obtiens ses propriétés et les coordonées de la case courante (colonne et ligne). 
     
       //je vais cibler la case d'arrivée pour la coloré.
       //ici on a une comparaison avec une opération logique qui nous donne un resultat booléen
        if (cellCounter === app.targetCell.x && rowCounter === app.targetCell.y ) {
         //alors on ajoute la classe CSS targetCell à la case
         currentCell.classList.add('cell--target');
        }
        if (cellCounter === app.player.x && rowCounter === app.player.y ) {
           //on va ajouter une div dans la currentCell
           //on transmet en argument currentCell a la fonction addPlayer
           app.addPlayer(currentCell);
         }
      }
    }
  },
  //méthode qui a la responsabilité de creer le joueur
  //addPlayer recupère en paramètre la valeur de currentCell
  addPlayer : function (parentCellElement) {
    // creer une div
    var playerElement = document.createElement('div');
    //lui ajouter la class 'player'
    playerElement.className = 'player ' + app.player.direction;
    //cibler le parent et on lui insuffle player dedans
    parentCellElement.appendChild(playerElement);
  },
  createLine : function() {
   //je vais créer un élément div pour le document
   var rowElement = document.createElement('div');
   //je lui donne une class
   rowElement.className = 'row' ;
   // on cible le parent et on l'insufler dans le DOM
   app.board.element.appendChild(rowElement);
   //retourner cette ligne nouvellement créer.
   return rowElement;
  },

  createCell : function(parentRowElement) {
    //contrairement a createLine, createCell a besoin d'un paramètre
    // afin de savoir de combien de cellules on aura besoin.
    //on applique la même recette que pour createLine
    //je créer un élément div pour le document
    var cellElement = document.createElement('div');
    //je lui donne une class
    cellElement.className = 'cell';
    //on cible le parent pour lui insufler son enfant.
    parentRowElement.appendChild(cellElement);
    //retourner cette colonne nouvellement créer.
    return cellElement;
  },
  clearBoard : function () {
   app.board.element.innerHTML = '';
  },
  redrawBoard : function () {
    //je vait appeller la methode qui peux effacer la grille, puis celle qui dessine la grille
    app.clearBoard();
    app.drawBoard();
  },
  turnLeft : function() {
    //tourner à gauche c'est changer la direction du joueur.
   
    switch(app.player.direction){
    //si on regarde en haut
     case "up" :
        //alors on regarde à gauche
        app.player.direction = 'left';
      break;
    //si on regarde à gauche
      case 'left':
        //alors on regarde vers le bas
        app.player.direction = 'down';
      break;
    //si on regarde en bas
      case 'down':
        //alors on regarde à droite
        app.player.direction = 'right';
      break
    //si on  regarde vers le haut
      default :
       'up';
    }
    app.redrawBoard();
  },
  turnRight : function() {
    //tourner à droite c'est changer la direction du joueur.
    //si on regarde en haut
      if (app.player.direction === 'up') {
        //alors on regarde à droite
        app.player.direction = 'right';
      }
    //sinon on regarde à gauche
      else if (app.player.direction === 'left') {
        //alors on regarde vers le haut
        app.player.direction = 'up';
      }
    //si on regarde en bas
      else if (app.player.direction === 'down') {
        //alors on regarde à gauche
        app.player.direction = 'left';
      }
    //sinon
      else { 
        //si on  regarde vers le bas
        app.player.direction = 'down';
      }
    app.redrawBoard();
  },
  moveFoward : function () {
    //attention ! Le joueur ne doit pas sortir de la grille
    switch (app.player.direction) {
      //soit la direction est right
      case 'right':
        // alors j'augmente X de 1
        app.player.x++;
        break;
        //soit la direction est left
      case 'left':
        //alors je diminu X de 1
        app.player.x--;
        break;
        //soit la direction est up
      case 'up':
        //alors je diminue Y de 1
        app.player.y--;
        break;
        //soit la direction est down 
      default:
        //alors j'augmente Y de 1 
        app.player.y++;
    }
    // j'ai modifié la position, maintenant je peux redessiner la grille
    app.redrawBoard();
  },
}
document.addEventListener('DOMContentLoaded', app.init);




