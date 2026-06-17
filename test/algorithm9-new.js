function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const level = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

function invertTree(root) {
  if (!root) return null;

  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;

  return root;
}

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

module.exports = { levelOrder, invertTree, maxDepth };
