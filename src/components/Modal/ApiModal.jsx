import React, {useState, useEffect, useContext} from 'react';
import {
 View,
 Text,
 Modal,
 TouchableOpacity,
 StyleSheet,
 AsyncStorage,
} from 'react-native';
import api from '../../utils/api';
import {SCREEN_NAMES} from '../../navigators/screenNames';
import TimeTable from '../../scenes/TimeTable';
import useAuth from '../../utils/useAuth';
const ApiModal = ({navigation}) => {
 const [modalData, setData] = useState([]);
 const [selectedItem, setSelectedItem] = useState('');
 const [modalVisible, setModalVisible] = useState(true);
 const {authenticated, userId} = useAuth();
 useEffect(() => {
  fetchData();
 }, []);
 const params = {
  userId: userId,
 };
 const fetchData = async () => {
  try {
   const response = await api.get('/get_course.php', {params});
   console.log(response.data.data);
   setData(response.data.data);
  } catch (error) {
   console.log('Error fetching data:', error);
  }
 };

 const handleSelectItem = async (itemValue) => {
  setSelectedItem(itemValue);
  const userCreds = await AsyncStorage.getItem('userCredentials');
  let parsedData = JSON.parse(userCreds);
  parsedData = parsedData[0];
  const newCred = {...parsedData, courseSelected: itemValue};
  await AsyncStorage.setItem('userCredentials', JSON.stringify(newCred));
  navigation.navigate('TimeTable');
 };

 const closeModal = () => {
  setModalVisible(false);
 };

 return (
  <Modal
   visible={modalVisible}
   animationType='slide'
   transparent={true}
   onRequestClose={closeModal}
   style={{width: 500}}
  >
   <View style={styles.modalContainer}>
    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
     <Text style={styles.closeButtonText}>Close</Text>
    </TouchableOpacity>

    <View style={styles.dropdownContainer}>
     <Text style={styles.dropdownLabel}>Select an item:</Text>
     <View style={styles.dropdown}>
      <TouchableOpacity
       style={styles.dropdownButton}
       onPress={() => handleSelectItem('')}
      >
       <Text style={styles.dropdownButtonText}>{selectedItem || 'Select'}</Text>
      </TouchableOpacity>

      {modalData?.map((item) => (
       <TouchableOpacity
        key={item.id}
        style={styles.dropdownButton}
        onPress={() => handleSelectItem(item.id)}
       >
        <Text style={styles.dropdownButtonText}>{item.course_name}</Text>
       </TouchableOpacity>
      ))}
     </View>
    </View>
   </View>
  </Modal>
 );
};

export default ApiModal;

const styles = StyleSheet.create({
 modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
 },
 closeButton: {
  position: 'absolute',
  top: 20,
  right: 20,
 },
 closeButtonText: {
  fontSize: 18,
  color: 'white',
 },
 dropdownContainer: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  width: '80%',
 },
 dropdownLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
 },
 dropdown: {
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
 },
 dropdownButton: {
  padding: 10,
 },
 dropdownButtonText: {
  fontSize: 16,
 },
});
