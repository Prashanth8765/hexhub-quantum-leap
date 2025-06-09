
export interface Algorithm {
  id: string;
  name: string;
  category: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  javaCode: string;
  pythonCode: string;
  explanation: string;
  keyPoints: string[];
}

export interface AlgorithmCategory {
  id: string;
  name: string;
  icon: string;
  algorithms: Algorithm[];
}

export const algorithmCategories: AlgorithmCategory[] = [
  {
    id: "arrays",
    name: "Arrays",
    icon: "📊",
    algorithms: [
      {
        id: "binary_search",
        name: "Binary Search",
        category: "arrays",
        description: "Search for an element in a sorted array using divide and conquer",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        javaCode: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1; // Element not found
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13};
        int target = 7;
        int result = binarySearch(arr, target);
        System.out.println("Element found at index: " + result);
    }
}`,
        pythonCode: `def binary_search(arr, target):
    """
    Perform binary search on a sorted array
    
    Args:
        arr: Sorted list of integers
        target: Element to search for
    
    Returns:
        Index of target element, -1 if not found
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Element not found

# Example usage
if __name__ == "__main__":
    arr = [1, 3, 5, 7, 9, 11, 13]
    target = 7
    result = binary_search(arr, target)
    print(f"Element found at index: {result}")`,
        explanation: "Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half and comparing the target value to the middle element.",
        keyPoints: [
          "Requires sorted array",
          "Divide and conquer approach",
          "Logarithmic time complexity",
          "More efficient than linear search for large datasets"
        ]
      },
      {
        id: "two_sum",
        name: "Two Sum",
        category: "arrays",
        description: "Find two numbers in an array that add up to a target sum",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        javaCode: `import java.util.*;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            
            map.put(nums[i], i);
        }
        
        return new int[]{}; // No solution found
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = twoSum(nums, target);
        System.out.println("Indices: " + Arrays.toString(result));
    }
}`,
        pythonCode: `def two_sum(nums, target):
    """
    Find two numbers that add up to target
    
    Args:
        nums: List of integers
        target: Target sum
    
    Returns:
        List of two indices that add up to target
    """
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []  # No solution found

# Example usage
if __name__ == "__main__":
    nums = [2, 7, 11, 15]
    target = 9
    result = two_sum(nums, target)
    print(f"Indices: {result}")`,
        explanation: "The Two Sum problem asks to find two numbers in an array that add up to a specific target. Using a hash map, we can solve this in linear time by storing complements.",
        keyPoints: [
          "Hash map for O(1) lookup",
          "Single pass through array",
          "Space-time tradeoff",
          "Common interview question"
        ]
      }
    ]
  },
  {
    id: "sorting",
    name: "Sorting",
    icon: "🔄",
    algorithms: [
      {
        id: "quick_sort",
        name: "Quick Sort",
        category: "sorting",
        description: "Efficient divide-and-conquer sorting algorithm",
        timeComplexity: "O(n log n) average, O(n²) worst",
        spaceComplexity: "O(log n)",
        javaCode: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        quickSort(arr, 0, arr.length - 1);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`,
        pythonCode: `def quick_sort(arr, low, high):
    """
    Sort array using quick sort algorithm
    
    Args:
        arr: List to be sorted
        low: Starting index
        high: Ending index
    """
    if low < high:
        pi = partition(arr, low, high)
        
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    """
    Partition function for quick sort
    """
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example usage
if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    quick_sort(arr, 0, len(arr) - 1)
    print(f"Sorted array: {arr}")`,
        explanation: "Quick Sort is a highly efficient sorting algorithm that uses a divide-and-conquer strategy. It picks an element as a pivot and partitions the array around the pivot.",
        keyPoints: [
          "Divide and conquer approach",
          "In-place sorting algorithm",
          "Average case is very efficient",
          "Worst case occurs with already sorted arrays"
        ]
      }
    ]
  },
  {
    id: "data_structures",
    name: "Data Structures",
    icon: "🏗️",
    algorithms: [
      {
        id: "stack",
        name: "Stack Implementation",
        category: "data_structures",
        description: "LIFO (Last In First Out) data structure implementation",
        timeComplexity: "O(1) for push, pop, peek",
        spaceComplexity: "O(n)",
        javaCode: `import java.util.*;

public class Stack<T> {
    private List<T> items;
    
    public Stack() {
        this.items = new ArrayList<>();
    }
    
    public void push(T item) {
        items.add(item);
    }
    
    public T pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return items.remove(items.size() - 1);
    }
    
    public T peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return items.get(items.size() - 1);
    }
    
    public boolean isEmpty() {
        return items.isEmpty();
    }
    
    public int size() {
        return items.size();
    }
    
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        
        System.out.println("Top element: " + stack.peek());
        System.out.println("Popped: " + stack.pop());
        System.out.println("Size: " + stack.size());
    }
}`,
        pythonCode: `class Stack:
    """
    Stack implementation using list
    LIFO (Last In First Out) data structure
    """
    
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add an item to the top of the stack"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return the top item from the stack"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()
    
    def peek(self):
        """Return the top item without removing it"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[-1]
    
    def is_empty(self):
        """Check if the stack is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Return the number of items in the stack"""
        return len(self.items)
    
    def __str__(self):
        return str(self.items)

# Example usage
if __name__ == "__main__":
    stack = Stack()
    stack.push(10)
    stack.push(20)
    stack.push(30)
    
    print(f"Top element: {stack.peek()}")
    print(f"Popped: {stack.pop()}")
    print(f"Size: {stack.size()}")
    print(f"Stack: {stack}")`,
        explanation: "A Stack is a linear data structure that follows the LIFO (Last In First Out) principle. Elements are added and removed from the same end, called the top of the stack.",
        keyPoints: [
          "LIFO principle",
          "All operations are O(1)",
          "Used in function calls, undo operations",
          "Can be implemented using arrays or linked lists"
        ]
      }
    ]
  }
];

export const getAllAlgorithms = (): Algorithm[] => {
  return algorithmCategories.flatMap(category => category.algorithms);
};

export const searchAlgorithms = (query: string): Algorithm[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllAlgorithms().filter(algorithm =>
    algorithm.name.toLowerCase().includes(lowercaseQuery) ||
    algorithm.description.toLowerCase().includes(lowercaseQuery) ||
    algorithm.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getAlgorithmById = (id: string): Algorithm | undefined => {
  return getAllAlgorithms().find(algorithm => algorithm.id === id);
};
