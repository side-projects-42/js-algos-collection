import mod from "../../src/data-structures/red-black-tree.js";
const Vertex = mod.Node;
const RBTree = mod.RBTree;
const Colors = mod.Colors;

describe("Node", () => {
  "use strict";

  it("should be a constructor function", () => {
    expect(typeof Vertex).toBe("function");
  });

  it("should set all properties via the constructor", () => {
    const node = new Vertex("key", "value", 1, 2, Colors.RED);
    expect(node.getKey()).toBe("key");
    expect(node.getLeft()).toBe(1);
    expect(node.getRight()).toBe(2);
    expect(node.getValue()).toBe("value");
    expect(node.isRed()).toBeTruthy();
  });

  describe("Node flipColor", () => {
    it("should has method flipColor", () => {
      const node = new Vertex();
      expect(typeof node.flipColor).toBe("function");
    });
    it("should work properly", () => {
      const node = new Vertex();
      expect(node.isRed()).toBe(false);
      node.flipColor();
      expect(node.isRed()).toBe(true);
      node.flipColor();
      expect(node.isRed()).toBe(false);
    });
  });
});

describe("RBTree", () => {
  "use strict";

  it("should be a constructor function", () => {
    expect(typeof RBTree).toBe("function");
  });
  it("should initialize root to null by default", () => {
    expect(new RBTree()._root).toBeNull();
  });

  describe("node insertion", () => {
    it("should be able to insert a node in empty tree", () => {
      const tree = new RBTree();
      tree.put("foo", "bar");
      expect(tree._root.getKey()).toBe("foo");
      expect(tree._root.getValue()).toBe("bar");
    });

    it("should be able to insert a node in 1 level tree", () => {
      let tree = new RBTree();
      tree.put(1, "bar");
      tree.put(0, "baz");
      expect(tree._root.getLeft()).not.toBeNull();
      expect(tree._root.getLeft().isRed()).toBeTruthy();
      tree.put(2, "baz");
      expect(tree._root.getRight()).not.toBeNull();
      expect(tree._root.getRight().isRed()).toBeFalsy();

      tree = new RBTree();
      tree.put(1, "bar");
      tree.put(2, "foo");
      tree.put(3, "baz");
      expect(tree._root.getRight()).not.toBeNull();
      expect(tree._root.getLeft()).not.toBeNull();
      expect(tree._root.isRed()).toBeFalsy();
      expect(tree._root.getRight().isRed()).toBeFalsy();
      expect(tree._root.getLeft().isRed()).toBeFalsy();
      tree.put(4, "foobar");
      tree.put(5, "foobar");
      expect(tree._root.getRight().getRight()).not.toBeNull();
      expect(tree._root.getRight().getRight().isRed()).toBeFalsy();
    });
  });

  describe("get method", () => {
    it("should be able to find value by given key", () => {
      const tree = new RBTree();
      expect(tree.get(1)).toBeUndefined();
      tree.put(1, "baz");
      expect(tree.get(1)).toBe("baz");
      tree.put(2, "foo");
      expect(tree.get(2)).toBe("foo");
      tree.put(3, "bar");
      expect(tree.get(3)).toBe("bar");
      expect(tree.get(4)).toBeUndefined();
      tree.put(5, "foobar");
      expect(tree.get(5)).toBe("foobar");
      tree.put(5, "foobar1");
      expect(tree.get(5)).toBe("foobar1");
    });
  });

  describe("levelOrderTraversal method", () => {
    it("should be able to traverse tree in level order", () => {
      const tree = new RBTree();
      expect(tree.levelOrderTraversal()).toBe(
        "Level Order Traversal -: Tree is empty"
      );
      tree.put(10);
      tree.put(20);
      expect(tree.levelOrderTraversal()).toBe("Level Order Traversal -: 20 10");
      tree.put(30);
      expect(tree.levelOrderTraversal()).toBe(
        "Level Order Traversal -: 20 10 30"
      );
      tree.put(45);
      expect(tree.levelOrderTraversal()).toBe(
        "Level Order Traversal -: 20 10 45 30"
      );
      tree.put(5);
      expect(tree.levelOrderTraversal()).toBe(
        "Level Order Traversal -: 20 10 45 5 30"
      );
    });
  });
});
