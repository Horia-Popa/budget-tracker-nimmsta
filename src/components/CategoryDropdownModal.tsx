import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';

interface CategoryDropdownModalProps {
  label: string;
  value: string;
  onSelect: (value: string) => void;
}

const CategoryDropdownModal: React.FC<CategoryDropdownModalProps> = ({
  label,
  value,
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const categories = [
    'Salary',
    'Investments',
    'Gifts',
    'Groceries',
    'Dining Out',
    'Entertainment',
    'Housing',
    'Transportation',
    'Utilities',
    'Healthcare',
    'Education',
    'Shopping',
    'Other',
  ];

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Pressable
        style={styles.dropdownSelector}
        onPress={() => setModalVisible(true)}>
        <Text style={value ? styles.dropdownText : styles.placeholderText}>
          {value || 'Select category'}
        </Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <View style={styles.categoriesList}>
              {categories.map(category => (
                <Pressable
                  key={category}
                  style={styles.categoryItem}
                  onPress={() => {
                    onSelect(category);
                    setModalVisible(false);
                  }}>
                  <Text style={styles.categoryText}>{category}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  dropdownSelector: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
  placeholderText: {
    fontSize: 15,
    color: '#999',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoryItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CategoryDropdownModal;
