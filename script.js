

// ===== Calculatrice interactive =====

const ecran = document.getElementById('ecran');
const clavier = document.querySelector('.clavier');

let expression = '';        // ce que l'utilisateur est en train de taper
let resultatAffiche = false; // true juste après un "="
let enErreur = false;        // true si on affiche "Erreur"

const OPERATEURS = ['+', '-', 'x', '/'];

// --- Affichage ---
function majEcran() {
    ecran.value = expression === '' ? '0' : expression;
}

// --- Calcul (sans eval, avec priorité de x et / sur + et -) ---
function evaluer(expr) {
    const jetons = expr.replace(/,/g, '.').match(/\d+\.?\d*|\.\d+|e|[+\-x\/%]/g);
    if (!jetons) throw new Error('vide');
    let i = 0;

    function primaire() {
        const jeton = jetons[i++];
        if (jeton === undefined) throw new Error('incomplet');
        if (jeton === '-') return -primaire();
        let valeur = jeton === 'e' ? Math.E : parseFloat(jeton);
        if (isNaN(valeur)) throw new Error('invalide');
        while (jetons[i] === '%') { valeur /= 100; i++; }
        return valeur;
    }

    function terme() {
        let valeur = primaire();
        while (jetons[i] === 'x' || jetons[i] === '/') {
            const op = jetons[i++];
            const suivant = primaire();
            if (op === 'x') {
                valeur *= suivant;
            } else {
                if (suivant === 0) throw new Error('division par zero');
                valeur /= suivant;
            }
        }
        return valeur;
    }

    function somme() {
        let valeur = terme();
        while (jetons[i] === '+' || jetons[i] === '-') {
            const op = jetons[i++];
            const suivant = terme();
            valeur = op === '+' ? valeur + suivant : valeur - suivant;
        }
        return valeur;
    }

    const resultat = somme();
    if (i < jetons.length) throw new Error('invalide');
    return resultat;
}

function formater(nombre) {
    // on arrondit pour éviter 0.1 + 0.2 = 0.30000000000000004
    return String(parseFloat(nombre.toFixed(10))).replace('.', ',');
}

// --- Actions ---
function calculer() {
    if (expression === '') return;
    // on enlève un opérateur oublié à la fin (ex: "5+")
    let expr = expression;
    while (expr !== '' && OPERATEURS.includes(expr.slice(-1))) {
        expr = expr.slice(0, -1);
    }
    if (expr === '') return;
    try {
        expression = formater(evaluer(expr));
        resultatAffiche = true;
    } catch (e) {
        expression = 'Erreur';
        enErreur = true;
    }
    majEcran();
}

function toutEffacer() {
    expression = '';
    resultatAffiche = false;
    enErreur = false;
    majEcran();
}

function retourArriere() {
    if (enErreur || resultatAffiche) {
        toutEffacer();
        return;
    }
    expression = expression.slice(0, -1);
    majEcran();
}

function ajouterChiffre(valeur) {
    if (enErreur || resultatAffiche) toutEffacer();
    // pas de chiffre collé juste après "e" ou "%"
    const dernier = expression.slice(-1);
    if (dernier === 'e' || dernier === '%') return;
    // évite les zéros inutiles au début d'un nombre (007)
    const dernierNombre = expression.split(/[+\-x\/]/).pop();
    if (dernierNombre === '0' && valeur === '0') return;
    if (dernierNombre === '0' && valeur !== '0') {
        expression = expression.slice(0, -1);
    }
    expression += valeur;
    majEcran();
}

function ajouterVirgule() {
    if (enErreur || resultatAffiche) toutEffacer();
    const dernier = expression.slice(-1);
    if (dernier === 'e' || dernier === '%') return;
    const dernierNombre = expression.split(/[+\-x\/]/).pop();
    if (dernierNombre.includes(',')) return; // une seule virgule par nombre
    expression += dernierNombre === '' ? '0,' : ',';
    majEcran();
}

function ajouterE() {
    if (enErreur || resultatAffiche) toutEffacer();
    const dernier = expression.slice(-1);
    // "e" seulement au début ou après un opérateur
    if (expression === '' || OPERATEURS.includes(dernier)) {
        expression += 'e';
        majEcran();
    }
}

function ajouterOperateur(op) {
    if (enErreur) toutEffacer();
    resultatAffiche = false; // on continue avec le résultat précédent
    if (expression === '') {
        if (op === '-') { expression = '-'; majEcran(); }
        return;
    }
    const dernier = expression.slice(-1);
    if (OPERATEURS.includes(dernier)) {
        // si on a déjà un opérateur, on le remplace
        if (expression.length === 1) return; // juste "-" au début
        expression = expression.slice(0, -1) + op;
    } else {
        expression += op;
    }
    majEcran();
}

function ajouterPourcent() {
    if (enErreur) return;
    resultatAffiche = false;
    const dernier = expression.slice(-1);
    if (/[0-9e%]/.test(dernier)) {
        expression += '%';
        majEcran();
    }
}

// --- Un seul écouteur pour tous les boutons ---
clavier.addEventListener('click', function (event) {
    const bouton = event.target.closest('button');
    if (!bouton) return;
    const valeur = bouton.textContent.trim();

    if (valeur >= '0' && valeur <= '9' && valeur.length === 1) {
        ajouterChiffre(valeur);
    } else if (valeur === ',') {
        ajouterVirgule();
    } else if (valeur === 'e') {
        ajouterE();
    } else if (OPERATEURS.includes(valeur)) {
        ajouterOperateur(valeur);
    } else if (valeur === '%') {
        ajouterPourcent();
    } else if (valeur === 'C') {
        toutEffacer();
    } else if (valeur === 'back') {
        retourArriere();
    } else if (valeur === '=') {
        calculer();
    }
});

majEcran();