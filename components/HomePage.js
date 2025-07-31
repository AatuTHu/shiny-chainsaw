import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '../services/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@expo/vector-icons/Ionicons';
import styles from '../styles/summary';

export default function HomePage() {
  const [userData, setUserData] = useState(null);
  const { setNavigate } = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('USERINFO');
        if (storedData) {
          setUserData(JSON.parse(storedData));
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Failed to load user data');
      }
    };

    fetchData();
  }, []);


  const DataSection = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${title}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemAmount}>${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No user data found. Please add your information.</Text>
        <TouchableOpacity onPress={() => setNavigate('StartPage')}>
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>Go to Edit Page</Text>
        </TouchableOpacity>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <View style={styles.balanceHolder}>
          <TouchableOpacity onPress={() => setNavigate('EditPage')}>
            <Icon name="create-outline" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.balanceText}>Balance: ${userData.balance}</Text>
          <Text style={styles.balanceText}>Salary: ${userData.salary}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Balance</Text>
      <View style={styles.item}>
          <Text style={styles.itemName}>Balance: </Text>
          <Text style={styles.itemAmount}>${userData.balance}</Text>
      </View>

      <Text style={styles.sectionTitle}>Salary</Text>
      <View style={styles.item}>
          <Text style={styles.itemName}>Salary:</Text>
          <Text style={styles.itemAmount}>${userData.salary}</Text>
      </View>

      
      <DataSection title="Expenses" data={userData.expenses} />
      <DataSection title="Debts" data={userData.debts} />
      <DataSection title="Bills" data={userData.bills} />
      <DataSection title="Other Expenses" data={userData.otherExpenses} />
      <DataSection title="Other Incomes" data={userData.otherIncomes} />
      <DataSection title="Saving Goals" data={userData.savingGoal} />
    </View>
  );
}
