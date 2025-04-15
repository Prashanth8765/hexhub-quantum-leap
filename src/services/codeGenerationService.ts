
// This is a mock service for code generation
// In a real application, this would call an AI API like OpenAI or a custom backend

const mockJavaScriptResponses = [
  {
    description: "Sort array of objects by property",
    code: `/**
 * Sorts an array of objects by a specified property
 * @param {Array} array - The array of objects to sort
 * @param {string} property - The property to sort by
 * @param {boolean} ascending - Sort in ascending order if true, descending if false
 * @returns {Array} - The sorted array
 */
function sortByProperty(array, property, ascending = true) {
  return [...array].sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];
    
    // Handle different data types
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return ascending 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    return ascending 
      ? valueA - valueB 
      : valueB - valueA;
  });
}`
  },
  {
    description: "Example usage",
    code: `// Example usage
const users = [
  { id: 3, name: 'Alice', age: 25 },
  { id: 1, name: 'Bob', age: 30 },
  { id: 2, name: 'Charlie', age: 22 }
];

// Sort by name (alphabetically)
const sortedByName = sortByProperty(users, 'name');
console.log(sortedByName);

// Sort by age (descending)
const sortedByAge = sortByProperty(users, 'age', false);
console.log(sortedByAge);`
  }
];

const mockPythonResponses = [
  {
    description: "Sort list of dictionaries by key",
    code: `def sort_by_property(data_list, property_name, ascending=True):
    """
    Sorts a list of dictionaries by a specified property
    
    Args:
        data_list (list): The list of dictionaries to sort
        property_name (str): The property to sort by
        ascending (bool, optional): Sort in ascending order if True, descending if False
        
    Returns:
        list: The sorted list
    """
    return sorted(
        data_list,
        key=lambda x: x[property_name],
        reverse=not ascending
    )`
  },
  {
    description: "Example usage",
    code: `# Example usage
users = [
    {"id": 3, "name": "Alice", "age": 25},
    {"id": 1, "name": "Bob", "age": 30},
    {"id": 2, "name": "Charlie", "age": 22}
]

# Sort by name (alphabetically)
sorted_by_name = sort_by_property(users, "name")
print(sorted_by_name)

# Sort by age (descending)
sorted_by_age = sort_by_property(users, "age", False)
print(sorted_by_age)`
  }
];

const mockJavaResponses = [
  {
    description: "Sort list of objects by property",
    code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Utility class for sorting a list of objects by a property
 */
public class ObjectSorter {
    
    /**
     * Sorts a list of objects by a specified property using a comparator
     * 
     * @param <T> the type of objects in the list
     * @param list the list to be sorted
     * @param comparator the comparator defining the sort order
     * @return the sorted list
     */
    public static <T> List<T> sortByProperty(List<T> list, Comparator<T> comparator, boolean ascending) {
        List<T> sortedList = new ArrayList<>(list);
        if (ascending) {
            Collections.sort(sortedList, comparator);
        } else {
            Collections.sort(sortedList, comparator.reversed());
        }
        return sortedList;
    }
}`
  },
  {
    description: "Example usage with a User class",
    code: `// Example usage with a User class
class User {
    private int id;
    private String name;
    private int age;
    
    public User(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    
    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    
    @Override
    public String toString() {
        return "User{id=" + id + ", name='" + name + "', age=" + age + "}";
    }
}

// In main method or another class
List<User> users = new ArrayList<>();
users.add(new User(3, "Alice", 25));
users.add(new User(1, "Bob", 30));
users.add(new User(2, "Charlie", 22));

// Sort by name (alphabetically)
List<User> sortedByName = ObjectSorter.sortByProperty(
    users, 
    Comparator.comparing(User::getName),
    true
);
System.out.println(sortedByName);

// Sort by age (descending)
List<User> sortedByAge = ObjectSorter.sortByProperty(
    users, 
    Comparator.comparing(User::getAge),
    false
);
System.out.println(sortedByAge);`
  }
];

const mockCppResponses = [
  {
    description: "Sort vector of objects by property",
    code: `#include <algorithm>
#include <functional>
#include <vector>
#include <string>

/**
 * Sorts a vector of objects by a specified property
 * 
 * @tparam T the type of objects in the vector
 * @tparam Comparator the type of the comparator function
 * @param vec the vector to be sorted
 * @param comparator the comparator function to use for sorting
 * @param ascending true for ascending sort, false for descending
 * @return the sorted vector
 */
template <typename T, typename Comparator>
std::vector<T> sortByProperty(const std::vector<T>& vec, 
                             Comparator comparator,
                             bool ascending = true) {
    std::vector<T> sortedVec = vec;
    
    if (ascending) {
        std::sort(sortedVec.begin(), sortedVec.end(), comparator);
    } else {
        std::sort(sortedVec.begin(), sortedVec.end(), 
                [&comparator](const T& a, const T& b) {
                    return !comparator(a, b);
                });
    }
    
    return sortedVec;
}`
  },
  {
    description: "Example usage with a User struct",
    code: `// Example usage with a User struct
#include <iostream>

struct User {
    int id;
    std::string name;
    int age;
    
    // Constructor
    User(int i, const std::string& n, int a) 
        : id(i), name(n), age(a) {}
    
    // For easy printing
    friend std::ostream& operator<<(std::ostream& os, const User& user) {
        os << "User{id=" << user.id << ", name='" << user.name 
           << "', age=" << user.age << "}";
        return os;
    }
};

int main() {
    std::vector<User> users = {
        {3, "Alice", 25},
        {1, "Bob", 30},
        {2, "Charlie", 22}
    };
    
    // Sort by name (alphabetically)
    auto sortedByName = sortByProperty(users, 
        [](const User& a, const User& b) {
            return a.name < b.name;
        });
    
    // Print sorted by name
    std::cout << "Sorted by name:" << std::endl;
    for (const auto& user : sortedByName) {
        std::cout << user << std::endl;
    }
    
    // Sort by age (descending)
    auto sortedByAge = sortByProperty(users, 
        [](const User& a, const User& b) {
            return a.age < b.age;
        }, false);
    
    // Print sorted by age (descending)
    std::cout << "Sorted by age (descending):" << std::endl;
    for (const auto& user : sortedByAge) {
        std::cout << user << std::endl;
    }
    
    return 0;
}`
  }
];

// Mock function to simulate API call delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateCode(prompt: string, language: string): Promise<Array<{ code: string; description: string }>> {
  // Simulate API call delay
  await delay(1500);
  
  // Return mock responses based on language
  switch (language) {
    case "python":
      return mockPythonResponses;
    case "java":
      return mockJavaResponses;
    case "cpp":
      return mockCppResponses;
    case "javascript":
    default:
      return mockJavaScriptResponses;
  }
}
