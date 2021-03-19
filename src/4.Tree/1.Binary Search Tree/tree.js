class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = left;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  // ekleme - recursive
  insert(data) {
    const newNode = new Node(data);
    // Agac bos ise
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    const addSide = (str) => {
      if(!current[str]){
        current[str] = newNode;
        return this;
      }
      current = current[str];
    }

    while(true){
      if(data === current.value) return this;
      if(data < current.value) addSide("left"); 
      if(data > current.value) addSide("right");
    }
  }

  // en kucuk node bulma
  findMin(node = this.root){
    if(node){
      while(node && node.left !==null)
        node = node.left;
      return node.value;
    }
    return null;
  }

  // en buyuk node bulma
  findMax(node = this.root){
    if(node){
      while(node && node.right !== null)
        node = node.right;
      return node.value;
  }
  return null;
}

  // node bulma
  find(data){
    let current = this.root;
    while(current.value !== data){
      if(data < current.value)
        current = current.left;
      current = current.right;
    }
    return current;
  }

  // mevcut olup olmadigi
  isPresent(data){
    let current = this.root;
    while(current){
      if(data === current.value) 
        return true;
      if(data < current.data){
        current = current.left;
        return true;
      }else{
        current = current.right;
        return true;
      }
    }
    return false;
  }

  //silme
  /**
   * 1.Leaf(yaprak) silme islemi : burda en son eleman'in sag ve solunu kontrol eder
   * 2.Root(kok node) sime islemi : burda ya soldaki elemanin en "buyugu" yada sagdaki elemanin en "kucugunu" getirilmelidir.
   */
  remove(data){
    const removeNode = (node, data) => {
      // agac bos ise
      if(node === null)
        return null;

      // aradigimiz root ise
      else if(data === node.value){
        //dugumde cocuk yok
        if(node.left === null && node.right === null)
          return null;
        // root varsa ve sagda eleman varsa sag'dakilerin en kucugunu donder
        if(node.right !== null){
          node.value = this.findMin(node.right);
          node.right = removeNode(node.right, this.findMin(node.right));
          return node;
        }
        // root varsa ve sagda eleman varsa sol'dakilerin en buyugunu donder
        if(node.left !== null){
          node.value = this.findMax(node.left);
          node.left = removeNode(node.left, this.findMax(node.left));
          return node;
        }
      } 

      // aradigimiz deger root degilse sol'a bak
      else if(data < node.value){
        node.left = removeNode(node.left , data);
        return node;
      }

      // aradigimiz deger root degilse sag'a bak
      else{
        node.right = removeNode(node.right, data);
        return node;
      }
    }
    this.root = removeNode(this.root, data);
  }

  //okuma
  /**
   * 1.Infix(inOrder) : Left->Node->Right || Right->Node->Left
   * 2.Prefix(preOrder): Node->Left-Right || Node->Right->Left
   * 3.Postfix(postOrder): Left->Right->Node || Right->Left->Node
   */
  inOrder(){
    let arr = [];
    let current = this.root;
    
    let traverse = (node) =>{
      if(node.left) traverse(node.left);
      arr.push(node.value);
      if(node.right) traverse(node.right);
    }

    traverse(current);
    return arr;
  }

  postOrder(){
    let arr =  [];
    let current = this.root;

    let traverse = (node) =>{
      if(node.left) traverse(node.left);
      if(node.right) traverse(node.right);
      arr.push(node.value);
    }

    traverse(current);
    return arr;
  }

  preOrder(){
    let arr = [];
    let current = this.root;

    let traverse = (node) =>{
      arr.push(node.value);
      if(node.left) traverse(node.left);
      if(node.right) traverse(node.right);
    }

    traverse(current);
    return arr;
  }
}

let bst = new BST();

bst.insert(4);
bst.insert(32);
bst.insert(12);
bst.insert(11);
bst.insert(22);
bst.remove(4);
console.log(bst.inOrder());
console.log(bst.findMin());