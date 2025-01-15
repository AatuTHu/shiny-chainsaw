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
  data,
  selectedValue,
  setSelectedValue,
  title = 'Select Frequency',
}) => {
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
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedValue(item);
                  setVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{item}</Text>
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
