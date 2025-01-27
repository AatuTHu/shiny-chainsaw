import { StyleSheet } from "react-native";

export default StyleSheet.create({
summaryContainer:{
flex: 1,
justifyContent: 'center',
alignItems: 'center',
padding: 30,
},
textInputWithIcon:{

flexDirection: "row"
},
dataContainer: {
backgroundColor: '#1E1E1E',
padding: 15,
borderRadius: 10,
},
labelText: {
color: '#A5A5A5',
fontSize: 20,
marginBottom: 5,
},
text: {
color: '#FFFFFF',
fontSize: 18,
marginBottom: 10,
},
signOutButton: {
backgroundColor: '#E53935',
paddingVertical: 12,
paddingHorizontal: 20,
borderRadius: 10,
alignItems: 'center',
marginTop: 20,
},
signOutButtonText: {
color: '#FFFFFF',
fontSize: 16,
fontWeight: 'bold',
},
balanceHolder: {
flexDirection: 'row',
justifyContent: "space-evenly",
alignItems: "center",
marginVertical: 10,
},
balanceContent: {
flexDirection: 'column',
justifyContent: "center",
alignItems: "center",
marginHorizontal: 20,
},
balanceText: {
fontSize: 18,
color: "#32CD32",
textAlign: "center",
},
labelText: {
color: "#A5A5A5",
fontSize: 14,
marginBottom: 5,
},
minusButton: {
backgroundColor: "#FF6347",
borderRadius: 50,
justifyContent: "center",
alignItems: "center",
width: 40,
height: 40,
},
plusButton: {
backgroundColor: "#32CD32",
borderRadius: 50,
justifyContent: "center",
alignItems: "center",
width: 40,
height: 40,
},
icon: {
textAlign: 'center',
alignSelf: 'center', 
},
summaryTitle: {
fontSize: 24,
fontWeight: 'bold',
color: '#fff',
marginBottom: 20,
textAlign: 'center',
},
});