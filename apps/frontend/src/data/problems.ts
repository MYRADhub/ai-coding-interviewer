import type { Problem } from "../utils/types";

const pythonTwoSum = `from typing import List
import json
import sys

def two_sum(nums: List[int], target: int) -> list[int]:
    """
    Args:
        nums: The candidate numbers.
        target: Desired sum.
    Returns:
        A pair of indices [i, j] (i < j) such that nums[i] + nums[j] == target.
    """
    # TODO: Implement the optimal O(n) solution using a hash map.
    return []


if __name__ == "__main__":
    payload = json.loads(sys.stdin.read() or "{}")
    nums = payload.get("nums", [])
    target = payload.get("target", 0)
    answer = two_sum(nums, target)
    print(json.dumps(answer))
`;

const jsTwoSum = `const fs = require("fs");

function twoSum(nums, target) {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @returns {number[]} two indices whose values sum to target
   */
  // TODO: Implement an O(n) map-based solution.
  return [];
}

if (require.main === module) {
  const payload = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  const nums = payload.nums ?? [];
  const target = payload.target ?? 0;
  const answer = twoSum(nums, target);
  console.log(JSON.stringify(answer));
}
`;

const pythonLongestSubstring = `def length_of_longest_substring(s: str) -> int:
    """
    Sliding-window question:
    Args:
        s: Input string.
    Returns:
        Length of the longest substring without repeating characters.
    """
    # TODO: Implement sliding window with character counts.
    return 0


if __name__ == "__main__":
    import json, sys
    payload = json.loads(sys.stdin.read() or "{}")
    print(length_of_longest_substring(payload.get("s", "")))
`;

const jsLongestSubstring = `const fs = require("fs");

function lengthOfLongestSubstring(s) {
  /**
   * @param {string} s
   * @returns {number}
   */
  // TODO: Implement sliding window.
  return 0;
}

if (require.main === module) {
  const payload = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  console.log(lengthOfLongestSubstring(payload.s ?? ""));
}
`;

const pythonValidParentheses = `import json
import sys

def is_valid_parentheses(sequence: str) -> bool:
    """
    Args:
        sequence: A string containing (), {}, [] characters.
    Returns:
        True if the sequence is balanced; otherwise False.
    """
    # TODO: Use a stack to validate parentheses.
    return False


if __name__ == "__main__":
    payload = json.loads(sys.stdin.read() or "{}")
    print(str(is_valid_parentheses(payload.get("s", ""))).lower())
`;

const jsValidParentheses = `const fs = require("fs");

function isValidParentheses(sequence) {
  /**
   * @param {string} sequence
   * @returns {boolean}
   */
  // TODO: Implement stack-based validation.
  return false;
}

if (require.main === module) {
  const payload = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  console.log(isValidParentheses(payload.s ?? "") ? "true" : "false");
}
`;

const pythonMergeIntervals = `from typing import List
import json, sys

def merge(intervals: List[list[int]]) -> list[list[int]]:
    """
    Args:
        intervals: List of [start, end] pairs.
    Returns:
        Intervals merged so none overlap.
    """
    # TODO: Sort by start and merge greedily.
    return []


if __name__ == "__main__":
    payload = json.loads(sys.stdin.read() or "{}")
    merged = merge(payload.get("intervals", []))
    print(json.dumps(merged))
`;

const jsMergeIntervals = `const fs = require("fs");

function merge(intervals) {
  /**
   * @param {number[][]} intervals
   * @returns {number[][]}
   */
  // TODO: Sort intervals and merge.
  return [];
}

if (require.main === module) {
  const payload = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  console.log(JSON.stringify(merge(payload.intervals ?? [])));
}
`;

const pythonLevelOrder = `from collections import deque
import json, sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def build_tree(values):
    if not values:
        return None
    nodes = [TreeNode(v) if v is not None else None for v in values]
    kids = deque(nodes[1:])
    for node in nodes:
        if node:
            if kids:
                node.left = kids.popleft()
            if kids:
                node.right = kids.popleft()
    return nodes[0]


def level_order(root: TreeNode | None) -> list[list[int]]:
    """
    Returns:
        Level-order traversal values.
    """
    # TODO: BFS traversal using a queue.
    return []


if __name__ == "__main__":
    payload = json.loads(sys.stdin.read() or "{}")
    root = build_tree(payload.get("root", []))
    print(json.dumps(level_order(root)))
`;

const jsLevelOrder = `const fs = require("fs");

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(values) {
  if (!values || !values.length) return null;
  const nodes = values.map((val) => (val === null ? null : new TreeNode(val)));
  let childIndex = 1;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!node) continue;
    if (childIndex < nodes.length) node.left = nodes[childIndex++];
    if (childIndex < nodes.length) node.right = nodes[childIndex++];
  }
  return nodes[0];
}

function levelOrder(root) {
  /**
   * @param {TreeNode|null} root
   * @returns {number[][]}
   */
  // TODO: BFS traversal.
  return [];
}

if (require.main === module) {
  const payload = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  const root = buildTree(payload.root ?? []);
  console.log(JSON.stringify(levelOrder(root)));
}
`;

export const problems: Problem[] = [
  {
    id: "0001",
    title: "Two Sum",
    description: "Return the indices of the two numbers in nums that add up to target.",
    difficulty: "Easy",
    topics: ["Hash Map", "Array"],
    defaultLanguage: "python",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "2 + 7 = 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    sampleTests: [
      { label: "Example 1", input: '{"nums":[2,7,11,15],"target":9}', expected: "[0,1]" },
      { label: "Example 2", input: '{"nums":[3,2,4],"target":6}', expected: "[1,2]" },
      { label: "No solution", input: '{"nums":[1,2,3],"target":7}', expected: "[]" },
    ],
    starterCode: {
      python: pythonTwoSum,
      javascript: jsTwoSum,
    },
    details: {
      markdown: `
### Additional Context
- Exactly one valid answer exists.
- Return the indices (0-based) in increasing order.
- Prefer O(n) solutions using auxiliary space rather than O(n²) brute force.
`,
      constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i], target ≤ 10⁹"],
      followUps: ["What changes if multiple answers can exist?", "Can you solve it in-place?"],
    },
  },
  {
    id: "0002",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeated characters.",
    difficulty: "Medium",
    topics: ["Sliding Window", "Hash Map", "String"],
    defaultLanguage: "python",
    examples: [
      { input: 's = "abcabcbb"', output: "3 (abc)" },
      { input: 's = "bbbbb"', output: "1 (b)" },
    ],
    sampleTests: [
      { label: "Example 1", input: '{"s":"abcabcbb"}', expected: "3" },
      { label: "Example 2", input: '{"s":"bbbbb"}', expected: "1" },
      { label: "Mixed", input: '{"s":"pwwkew"}', expected: "3" },
    ],
    starterCode: {
      python: pythonLongestSubstring,
      javascript: jsLongestSubstring,
    },
    details: {
      markdown: `
### Notes
- Use a sliding window and remember the last seen index of each character.
- When you encounter a duplicate, shrink the window from the left.
`,
      constraints: ["1 ≤ |s| ≤ 5 * 10⁴", "s consists of ASCII characters."],
      hints: ["Maintain a dictionary mapping character -> last seen index."],
    },
  },
  {
    id: "0003",
    title: "Valid Parentheses",
    description: "Determine if the parentheses string is well-formed.",
    difficulty: "Easy",
    topics: ["Stack", "String"],
    defaultLanguage: "python",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    sampleTests: [
      { label: "Example 1", input: '{"s":"()[]{}"}', expected: "true" },
      { label: "Example 2", input: '{"s":"(]"}', expected: "false" },
      { label: "Nested", input: '{"s":"{[]}"}', expected: "true" },
    ],
    starterCode: {
      python: pythonValidParentheses,
      javascript: jsValidParentheses,
    },
    details: {
      markdown: `
### Tips
- Push opening brackets onto a stack.
- Pop only if the current closing bracket matches the stack top.
`,
      constraints: ["1 ≤ |s| ≤ 10⁴"],
    },
  },
  {
    id: "0004",
    title: "Merge Intervals",
    description: "Merge all overlapping intervals and return the condensed list.",
    difficulty: "Medium",
    topics: ["Sorting", "Intervals"],
    defaultLanguage: "python",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
    ],
    sampleTests: [
      {
        label: "Overlap",
        input: '{"intervals":[[1,3],[2,6],[8,10],[15,18]]}',
        expected: "[[1,6],[8,10],[15,18]]",
      },
      {
        label: "Touching",
        input: '{"intervals":[[1,4],[4,5]]}',
        expected: "[[1,5]]",
      },
      {
        label: "Single",
        input: '{"intervals":[[1,4]]}',
        expected: "[[1,4]]",
      },
    ],
    starterCode: {
      python: pythonMergeIntervals,
      javascript: jsMergeIntervals,
    },
    details: {
      markdown: `
### Approach
1. Sort intervals by starting coordinate.
2. Iterate and merge when the current start is ≤ previous end.
`,
      followUps: ["How would you merge in-place with O(1) extra space?"],
    },
  },
  {
    id: "0005",
    title: "Binary Tree Level Order Traversal",
    description: "Return the node values level by level from a binary tree.",
    difficulty: "Medium",
    topics: ["Tree", "BFS"],
    defaultLanguage: "python",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = [1]", output: "[[1]]" },
    ],
    sampleTests: [
      {
        label: "Example 1",
        input: '{"root":[3,9,20,null,null,15,7]}',
        expected: "[[3],[9,20],[15,7]]",
      },
      { label: "Single", input: '{"root":[1]}', expected: "[[1]]" },
      { label: "Empty", input: '{"root":[]}', expected: "[]" },
    ],
    starterCode: {
      python: pythonLevelOrder,
      javascript: jsLevelOrder,
    },
    details: {
      markdown: `
### Implementation Notes
- A normal BFS queue works.
- Remember to separate each level's nodes before continuing.
`,
      constraints: ["0 ≤ nodes ≤ 10⁴"],
    },
  },
];

export const defaultProblem = problems[0];
