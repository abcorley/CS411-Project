import { StyleSheet } from 'react-native';

const CalorieTrackerStyleSheet = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'medium',
  },
  inCircleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  circle: {
    marginTop: 20,
    marginLeft: 40,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 20,
    borderColor: '#2485F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupOverlay: {
    backgroundColor: 'white',
    marginTop: 110,
    flex: 1,
  },
  modal: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseButton: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2485F8',
  },
  modalOpenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#2485F8',
    color: 'white',
    width: 150,
    height: 30,
    borderRadius: 12,
    padding: 1,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  text: {
    color: 'white',
  },
});

export default CalorieTrackerStyleSheet;
