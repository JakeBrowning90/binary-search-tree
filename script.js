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

    insert(value, root = this.root) {
        // Base case: if node is null, new node = value
        if (root == null) {
            root = new Node(value);
            return root;
        } else if (value == root.value) {
            console.log("Duplicate");
        }
        // compare value to root node
        // if value is less than node, recursion down leftNode
        if (value < root.value) {
            root.leftNode = this.insert(value, root.leftNode);
        } else if (value > root.value) {
        // if value is greater than node, recursion down rightNode
            root.rightNode = this.insert(value, root.rightNode);
        }
        return root;
    }
    
    delete(value, root = this.root) {
        // Base case: return null if value is not found
        if (root == null) {
            return root;
        }
        // Recursion until value is found
        if (value < root.value) {
            root.leftNode = this.delete(value, root.leftNode);
        } else if (value > root.value) {
            root.rightNode = this.delete(value, root.rightNode);
        // Else value matches root, then deletion depends on children
        } else {
            // If Node has 0 or 1 child, sets the parent's node to null or that child 
            if (root.leftNode == null) {
                return root.rightNode;
            } else if (root.rightNode == null) {
                return root.leftNode;
            }
            // If node has 2 children, replace its value with the next highest descendant (leftmost in right subtree)
            root.value = this.getMinValue(root.rightNode);
            // Delete next highest descendent whose value has been copied
            root.rightNode = this.delete(root.value, root.rightNode);
        }
        return root;
    }

    getMinValue(root) {
         // Gets the leftmost value in a tree, to replace a deleted node with 2 children
        let minValue = root.value;
        while (root.leftNode != null)
        {
            minValue = root.leftNode.value;
            root = root.leftNode;
        }
        return minValue;
    }

    find(value, root = this.root) {
         // Base case: return null if value is not found, or return node if found
         if (root == null) {
            return null;
        } else if (root.value == value) {
            return root;
        }
        // If value is less than node, recursion down leftNode
        if (value < root.value) {
            root = this.find(value, root.leftNode);
        } else if (value > root.value) {
        // If value is greater than node, recursion down rightNode
            root = this.find(value, root.rightNode);
        }
        return root;
    }

    levelOrder(callback) {
        let root = this.root;
        // Return if root is empty
        if (root == null) {
            return null;
        }
        let discoveredNodes = [];
        let returnedNodes = [];
        // Start queue with root node
        discoveredNodes.push(root);
        // Iterate while the queue isn't empty
        while (discoveredNodes.length > 0) {
            // Set the first node in the queue as current
            let current = discoveredNodes[0];
            // Add the current node's children to the queue
            if (current.leftNode) {
                discoveredNodes.push(current.leftNode)
            }
            if (current.rightNode) {
                discoveredNodes.push(current.rightNode)
            }
            // Call the passed function with the current node as parameter
            if (callback != undefined) {
                callback(current);
            } else {
            // Add the current node's value to array for return
                returnedNodes.push(current.value);
            }
            // Remove the current node, move down the queue
            discoveredNodes.shift();
        }
        // Return the level-ordered array if there is one (no callback)
        if (callback != null) {
            return "Callback complete";
        } else {
            return returnedNodes;
        }
    }

    inorder(callback, root = this.root, array = []) {
        //Base case
        if (root == null) {
            return null;
        } else {
            // Recurse down left subtree
            if (root.leftNode) {
                this.inorder(callback, root.leftNode, array);
            }
            //Pass the node into the callback, otherwise add value to array
            if (callback != undefined) {
                callback(root);
            } else {
                array.push(root.value);
            }
             // Recurse down right subtree
            if (root.rightNode) {
                this.inorder(callback, root.rightNode, array);
            }
            // Return array of values if no callback
            if (callback != undefined) {
                return "Callback complete";
            } else {
                return array;
            }
        }
    }

    preorder(callback, root = this.root, array = []) {
        //Base case
        if (root == null) {
            return null;
        } else {
            //Pass the node into the callback, otherwise add value to array
            if (callback != undefined) {
                callback(root);
            } else {
                array.push(root.value);
            }
            // Recurse down left and right subtrees
            if (root.leftNode) {
                this.preorder(callback, root.leftNode, array);
            }
            if (root.rightNode) {
                this.preorder(callback, root.rightNode, array);
            }

            if (callback != undefined) {
                return "Callback complete";
            } else {
                return array;
            }
        }
    }

    postorder(callback, root = this.root, array = []) {
        //Base case
        if (root == null) {
            return null;
        } else {
            // Recurse down left subtree
            if (root.leftNode) {
                this.postorder(callback, root.leftNode, array);
            }
             // Recurse down right subtree
            if (root.rightNode) {
                this.postorder(callback, root.rightNode, array);
            }
            //Pass the node into the callback, otherwise add value to array
            if (callback != undefined) {
                callback(root);
            } else {
                array.push(root.value);
            }
            if (callback != undefined) {
                return "Callback complete";
            } else {
                return array;
            }
        }
    }

    height(root) {
        // Base case: undo last count if root is null (edges# is -1 nodes#)
        if (root == null) {
            return -1;
        } else {
            // Recurse down branches
            let leftBranch = this.height(root.leftNode);
            let rightBranch = this.height(root.rightNode);
            // Return +1 for greater branch
            return Math.max(leftBranch, rightBranch) + 1;
        }
    }

    depth(target) {
        // Target depth = root's height - target's height
        return this.height(this.root) - this.height(target);
    }

    isBalanced(root = this.root) {
        // Base case: node had no child, this branch is done.
        if (root == null) {
            return true;
        }
        // Recurse for height of each branch
        let leftHeight = this.height(root.leftNode);
        let rightHeight = this.height(root.rightNode);
        // Tree is balanced if absolute value of all nodes' branch height diff is <= 1
        if (Math.abs(leftHeight - rightHeight) <= 1 &&
                this.isBalanced(root.leftNode) == true &&
                this.isBalanced(root.rightNode) == true) {
            return true;
        }
        return false;
    }

    rebalance() {
        // Get all node values from current tree
        let newArray = this.levelOrder();
        // Set new tree with collected values 
        this.root = this.buildTree(newArray)
        return;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightNode !== null) {
      prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftNode !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

let sampleArray = [4, 10, 12, 15, 18, 22, 24 , 25, 31, 35, 44, 50, 66, 70, 90];
const testTree = new Tree(sampleArray);
console.log(testTree);
testTree.insert(100);
testTree.delete(90);

// Test levelOrder()
// console.log(testTree.levelOrder());
// Test inorder()
//console.log(testTree.inorder());
// Test preorder()
console.log(testTree.preorder());
// Test postorder()
console.log(testTree.postorder());

console.log(testTree.height(testTree.root));
console.log(testTree.find(25));
console.log(testTree.find(66));
console.log(testTree.find(101));

let heightSample = testTree.find(70);
console.log(testTree.height(heightSample));
console.log(testTree.depth(heightSample));

// const prettyPrint = (node, prefix = '', isLeft = true) => {
//     if (node.rightNode !== null) {
//       prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
//     }
//     console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
//     if (node.leftNode !== null) {
//       prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
//     }
//   }

prettyPrint(testTree.root);

// Sample callback function for levelOrder(), inorder(), preorder(), and postorder()
function addTen(node) {
    console.log(node.value + 10);
}

// console.log(testTree.isBalanced());
// testTree.insert(110);
// testTree.insert(120);
// testTree.insert(130);
// testTree.insert(140);
// console.log(testTree.isBalanced());
// prettyPrint(testTree.root);
// testTree.rebalance();
// prettyPrint(testTree.root);