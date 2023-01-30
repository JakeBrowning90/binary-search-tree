// Node factory
class Node {
    constructor(value = null) {
        this.value = value;
        this.leftNode = null;
        this.rightNode = null;
    }
}

// Tree factory
class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    sortArray(a, b) {
        return a - b;
    }

    removeDuplicates(array) {
        return array.filter((item, index) => array.indexOf(item) === index);
    }

    buildTree(array) {
        // Sort the array
        let sortedArray = array.sort(this.sortArray);
        // Remove duplicates
        sortedArray = this.removeDuplicates(sortedArray);
        // Get length of array, needed to determine midpoint
        let l = sortedArray.length;
        // Set root and begin recursion
        let root = this.sortedArrayToBST(sortedArray, 0, l - 1);
        return root;
    }

    sortedArrayToBST(array, start, end) {
        // Base case: array "half" is now empty and can make no more Nodes
        if (start > end)
        {
            return null;
        }
        // Get the middle element of the array and set it as the root Node
        let mid = parseInt((start + end) / 2);
        var node = new Node(array[mid]);
        // Recursively construct the left branch
        node.leftNode = this.sortedArrayToBST(array, start, mid - 1);
         // Recursively construct the right branch
        node.rightNode = this.sortedArrayToBST(array, mid + 1, end);
        return node;
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

let sampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const testTree = new Tree(sampleArray);
console.log(testTree);

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightNode !== null) {
      prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftNode !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

prettyPrint(testTree.root);