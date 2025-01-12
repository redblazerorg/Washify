import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView
} from "react-native";
import { ItemProfileEnum } from "../../utils/enum";
import { useAuth, User } from "../../context/AuthContext";

const Profile = ({ navigation }: { navigation: any }) => {
  const width = Dimensions.get("window").width;
  const { user, logout, updateUser } = useAuth();
  const [openFloatingProfile, setOpenFloatingProfile] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const handleProfileSetting = () => {
    setOpenFloatingProfile(!openFloatingProfile);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData: Partial<User> = {};
      
      // Only include changed fields
      if (editedUser.name !== user?.name) {
        updatedData.name = editedUser.name;
      }
      if (editedUser.email !== user?.email) {
        updatedData.email = editedUser.email;
      }
      if (editedUser.password) {
        updatedData.password = editedUser.password;
      }

      const success = await updateUser(updatedData);
      if (success) {
        setIsEditing(false);
      } else {
        // Handle error
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  // Update editedUser when user data changes
  useEffect(() => {
    if (user) {
      setEditedUser(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  return (
    <ScrollView>
        <TouchableWithoutFeedback
        accessible={false}
        onPress={() => {
            if (openFloatingProfile) setOpenFloatingProfile(false);
        }}
        >
        <View style={styles.container}>
            <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
                <Ionicons name="person-circle" size={80} color="#007AFF" />
            </View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            </View>

            <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
                <Text style={styles.label}>Name</Text>
                {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={editedUser.name}
                    onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
                    placeholder="Enter name"
                />
                ) : (
                <Text style={styles.value}>{user?.name}</Text>
                )}
            </View>

            <View style={styles.infoItem}>
                <Text style={styles.label}>Email</Text>
                {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={editedUser.email}
                    onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                ) : (
                <Text style={styles.value}>{user?.email}</Text>
                )}
            </View>

            <View style={styles.infoItem}>
                <Text style={styles.label}>Password</Text>
                {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={editedUser.password}
                    onChangeText={(text) => setEditedUser({ ...editedUser, password: text })}
                    placeholder="Enter new password"
                    secureTextEntry
                />
                ) : (
                <Text style={styles.value}>••••••••</Text>
                )}
            </View>

            {isEditing && (
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            )}
            </View>

            <View style={styles.settingsButton}>
            <TouchableOpacity onPress={handleProfileSetting}>
                <Ionicons name="settings" size={30} color="#007AFF" />
            </TouchableOpacity>
            </View>

            {openFloatingProfile && (
            <View style={styles.floatingCard}>
                <View style={styles.menuContainer}>
                {Object.values(ItemProfileEnum).map((e, index) => (
                    <View key={index}>
                    {(() => {
                        switch (e) {
                        case ItemProfileEnum.Edit:
                            return (
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => {
                                setIsEditing(!isEditing);
                                setOpenFloatingProfile(false);
                                }}
                            >
                                <Ionicons
                                name="pencil-sharp"
                                size={24}
                                color="#007AFF"
                                />
                                <Text style={styles.menuText}>Edit</Text>
                            </TouchableOpacity>
                            );
                        case ItemProfileEnum.Logout:
                            return (
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={handleLogout}
                            >
                                <Ionicons
                                name="log-out"
                                size={24}
                                color="#007AFF"
                                />
                                <Text style={styles.menuText}>Logout</Text>
                            </TouchableOpacity>
                            );
                        default:
                            return null;
                        }
                    })()}
                    </View>
                ))}
                </View>
            </View>
            )}
        </View>
        </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
  },
  floatingCard: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(52, 52, 52, 0.01)",
  },
  menuContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: Dimensions.get("window").width * 0.35,
    alignSelf: "flex-end",
    backgroundColor: "white",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    paddingVertical: 10,
    alignItems: "center",
  },
  menuText: {
    marginTop: 4,
    color: '#333',
  },
});

export default Profile;