console.log("Hello!")

// Node factory
class Node {
    constructor(value = null, leftNode = null, rightNode = null) {
        this.value = value;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}

// Tree factory
class Tree {
    constructor() {
        this.root = buildTree();
    }

    buildTree(array) {
        // Sort the array
        // Remove duplicates
        // Set node
        // Make left branch
        // Make right branch
    }

    //insert() {}
    //delete() {}
    //find() {}
    //levelOrder() {}
    //inorder() {}
    //preorder() {}
    //postorder() {}
    //height() {}
    //depth() {}
    //isBalanced() {}
    //rebalance() {}
}

const testTree = new Tree;