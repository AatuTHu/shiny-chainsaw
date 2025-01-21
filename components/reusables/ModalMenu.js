import React from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CustomFrequencyModal = ({
  visible,
  setVisible,
  setSelectedValue,
  title = 'Select Frequency',
}) => {
  const frequencies = [
    { name: 'Weekly', inNumber: 7 },        // Every 7 days
    { name: 'Bi-Weekly', inNumber: 14 },   // Every 14 days
    { name: 'Monthly', inNumber: 30 },     // Approximately every 30 days
    { name: 'Bi-Monthly', inNumber: 60 },  // Approximately every 60 days
    { name: 'Quarterly', inNumber: 90 },   // Approximately every 90 days
    { name: 'Semiannual', inNumber: 182 }, // Approximately every 182 days
    { name: 'Annual', inNumber: 365 }      // Once a year
  ];

  const handleSelectFrq = (item) => {
    setSelectedValue(prev => ({
        ...prev,
        ["frqType"]: item.name,
        ["frqAmount"]: item.inNumber,
    }));
}

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={frequencies}
            keyExtractor={(item, i) => i}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  handleSelectFrq(item);
                  setVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      modal: {
        backgroundColor: '#2a2a3d',
        padding: 20,
        borderRadius: 10,
        width: '80%',
      },
      modalTitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
      },
      modalItem: {
        paddingVertical: 10,
      },
      modalOptionText: {
        color: '#fff',
        fontSize: 16,
      },
      modalCloseButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ff6347',
        borderRadius: 5,
      },
      modalCloseText: {
        color: '#fff',
        textAlign: 'center',
      },
});

export default CustomFrequencyModal;
