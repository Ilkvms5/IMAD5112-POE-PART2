import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View, FlatList, ScrollView, TextInput,Image } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker"; // Import Picker

// Your initial menuItems array remains here
const initialMenuItems = [
  {
    name: "Bruschetta",
    description: "Grilled bread topped with fresh tomatoes, garlic, and basil.",
    price: 6.99,
    courseType: "starter"
  },
  {
    name: "Stuffed Mushrooms",
    description: "Mushrooms filled with cheese and herbs, baked to perfection.",
    price: 7.99,
    courseType: "starter"
  },
  {
    name: "Grilled Salmon",
    description: "Salmon fillet grilled and served with lemon butter sauce.",
    price: 18.99,
    courseType: "main"
  },
  {
    name: "Chicken Alfredo",
    description: "Fettuccine pasta served with creamy Alfredo sauce and grilled chicken.",
    price: 15.99,
    courseType: "main"
  },
  {
    name: "Chocolate Lava Cake",
    description: "A warm chocolate cake with a gooey molten center.",
    price: 8.99,
    courseType: "dessert"
  },
  {
    name: "Cheesecake",
    description: "Classic New York-style cheesecake with a graham cracker crust.",
    price: 7.99,
    courseType: "dessert"
  }
];

const HomeScreen = () => {
  // State to hold menu items
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  // State to hold new item inputs
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    courseType: "starter" // Default courseType value
  });

  // Filter menu items into different categories
  const starters = menuItems.filter((item) => item.courseType === "starter");
  const mains = menuItems.filter((item) => item.courseType === "main");
  const desserts = menuItems.filter((item) => item.courseType === "dessert");

  // Handle input change
  const handleInputChange = (name: string, value: string) => {
    setNewItem({ ...newItem, [name]: value });
  };

  // Handle adding a new item to the menu
  const handleAddItem = () => {
    if (!newItem.name || !newItem.description || !newItem.price || !newItem.courseType) {
      alert("Please fill all fields");
      return;
    }

    setMenuItems([
      ...menuItems,
      {
        name: newItem.name,
        description: newItem.description,
        price: parseFloat(newItem.price),
        courseType: newItem.courseType.toLowerCase() // Ensure lowercase courseType
      }
    ]);

    setNewItem({
      name: "",
      description: "",
      price: "",
      courseType: "starter" // Reset to default value
    });
  };

  const renderMenuSection = (title: string, data: any[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Price: R{item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>

        <Image source={require('../assets/chief.jpg')}/>
        
      <Text>Welcome to the Menu</Text>

      

      <ScrollView style={styles.scrollView}>
        {renderMenuSection("Starters", starters)}
        {renderMenuSection("Mains", mains)}
        {renderMenuSection("Desserts", desserts)}

        {/* Add Item Form (Now inside the ScrollView, below the menu) */}
        <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>Add New Menu Item</Text>

          {/* Picker for course type */}
          <Picker
            selectedValue={newItem.courseType}
            onValueChange={(value) => handleInputChange("courseType", value)}
            style={styles.picker}
          >
            <Picker.Item label="Starter" value="starter" />
            <Picker.Item label="Main" value="main" />
            <Picker.Item label="Dessert" value="dessert" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={newItem.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Description"
            value={newItem.description}
            onChangeText={(value) => handleInputChange("description", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Price"
            value={newItem.price}
            onChangeText={(value) => handleInputChange("price", value)}
            keyboardType="numeric"
          />
          <Pressable
            style={{ padding: 20, backgroundColor: 'green', marginTop: 20 }}
            onPress={handleAddItem}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Add Item</Text>
          </Pressable>
        </View>

        {/* Display total number of menu items */}
        <Text style={styles.itemCountText}>Total Items in Menu: {menuItems.length}</Text>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    width: '100%',
    marginBottom: 20, // Add some margin for spacing
  },
  section: {
    marginVertical: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  menuItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemCountText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
  },
});
