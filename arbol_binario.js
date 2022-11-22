class Nodo{
    constructor(valor){
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
    }
}

class ArbolBinario{
    constructor(){
        this.raiz = null;
        this.pre = "";
        this.post = "";
    }

    agregar(nuevo, izquierda, derecha){
        nuevo.izquierda = izquierda;
        nuevo.derecha = derecha;
        return true;
    }
    
    generarArbol(expresion){
        let arreglo = this.aArreglo(expresion);
        let nodo_izq = null;
        let nodo_der = null;
        let raiz = null;
        let i = 0;
        while(arreglo[i] != undefined){
            if(arreglo[i].valor == "*" || arreglo[i].valor == "/"){
                nodo_izq = arreglo[i-1];
                nodo_der = arreglo[i+1];
                raiz = arreglo[i];
                this.agregar(raiz, nodo_izq, nodo_der);
                arreglo[i-1] = raiz;
                for(let j = i; j < arreglo.length; j++){
                    arreglo[j] = arreglo[j+2];
                    if(arreglo[j+2] == undefined){
                        j = arreglo.length;
                    }
                }
                i--;
            }
            i++;
        }
        i = 0;
        while(arreglo[i] != undefined){
            if(arreglo[i].valor == "+" || arreglo[i].valor == "-"){
                nodo_izq = arreglo[i-1];
                nodo_der = arreglo[i+1];
                raiz = arreglo[i];
                this.agregar(raiz, nodo_izq, nodo_der);
                arreglo[i-1] = raiz;
                for(let j = i; j < arreglo.length; j++){
                    arreglo[j] = arreglo[j+2];
                    if(arreglo[j+2] == undefined){
                        j = arreglo.length;
                    }
                }
                i--;
            }
            i++;
        }
        this.raiz = arreglo[0];
        return [this.postOrder(),this.preOrder(), this.raiz];
    }
    
    aArreglo(cadena){
        let nodo = new Nodo();
        let arreglo = [];
        for(let i = 0; i < cadena.length; i++){
            nodo = new Nodo(cadena[i]);
            arreglo.push(nodo);
        }
        return arreglo;
    }

    inOrder(){
        if(this.raiz == null){
            return "";
        } else {
            this._inOrderRec(this.raiz);
        }
    }

    _inOrderRec(raiz){
        if(raiz.izquierda != null){
            this._inOrderRec(raiz.izquierda);
        } 
        console.log(raiz.numero);
        if(raiz.derecha != null){
            this._inOrderRec(raiz.derecha);
        }
    }

    preOrder(){
        this.pre = "";
        if(this.raiz == null){
            return "";
        } else {
        this._preOrderRec(this.raiz)
        }
        return this.pre;
    }

    _preOrderRec(raiz){
        this.pre += raiz.valor;
        if(raiz.izquierda != null){
            this._preOrderRec(raiz.izquierda);
        } 
        if(raiz.derecha != null){
            this._preOrderRec(raiz.derecha);
        }
    }

    postOrder(){
        this.post = "";
        if(this.raiz == null){
            return "";
        } else {
        this._postOrderRec(this.raiz)
        }
        return this.post;
    }

    _postOrderRec(raiz){
        if(raiz.izquierda != null){
            this._postOrderRec(raiz.izquierda);
        } 
        if(raiz.derecha != null){
            this._postOrderRec(raiz.derecha);
        }
        this.post += raiz.valor;
    }
}

class EvaluadorAritmetico{
    constructor(){
        this.numeros = [];
    }

    resultadoPre(preorder){
        this.numeros = [];
        let num_der = 0;
        let num_izq = 0;
        for(let i = preorder.length-1; i >= 0; i--){
            if(preorder[i] == "+" || preorder[i] == "-" || preorder[i] == "/" || preorder[i] == "*"){
                num_izq = Number(this.numeros.pop());
                num_der = Number(this.numeros.pop());
                switch(preorder[i]){
                    case "+":
                        this.numeros.push(num_izq + num_der);
                        break;
                    case "-":
                        this.numeros.push(num_izq - num_der);
                        break;
                    case "/":
                        this.numeros.push(num_izq / num_der);
                        break;
                    case "*":
                        this.numeros.push(num_izq * num_der);
                        break;
                } 
            } else{
                this.numeros.push(preorder[i]);
            }
        }
        return this.numeros[0];
    }

    resultadoPost(postorder){
        this.numeros = [];
        let num_der = 0;
        let num_izq = 0;
        for(let i = 0; i < postorder.length; i++){
            if(postorder[i] == "+" || postorder[i] == "-" || postorder[i] == "/" || postorder[i] == "*"){
                num_der = Number(this.numeros.pop());
                num_izq = Number(this.numeros.pop());
                switch(postorder[i]){
                    case "+":
                        this.numeros.push(num_izq + num_der);
                        break;
                    case "-":
                        this.numeros.push(num_izq - num_der);
                        break;
                    case "/":
                        this.numeros.push(num_izq / num_der);
                        break;
                    case "*":
                        this.numeros.push(num_izq * num_der);
                        break;
                } 
            } else{
                this.numeros.push(postorder[i]);
            }
        }
        return this.numeros[0];
    }
}
const arbol = new ArbolBinario();
const evaluador = new EvaluadorAritmetico();
let expresion = prompt("Ingrese la expresion: ");
let pre = "";
let post = "";
let raiz = null;
[post,pre,raiz] = arbol.generarArbol(expresion);
console.log(raiz);
console.log("El recorrido pre es: " + pre);
console.log("El recorrido post es: " + post);
console.log("Resultado con pre: " + evaluador.resultadoPre(pre));
console.log("Resultado con post: " + evaluador.resultadoPost(post));