import { StyleSheet } from "react-native";

export default StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#171717',
paddingHorizontal:15,
},
dataContainer: {
backgroundColor: '#171717',
padding: 10,
borderRadius: 10,
marginTop: 20,
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
marginTop: 30,
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
fontSize: 18,
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
row: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'baseline',
marginBottom: 10,
},
section: {
marginBottom: 5,
marginHorizontal: 15,
paddingVertical: 5,
borderBottomWidth: 1, 
borderColor: '#ccc',
},
section: {
marginTop: 20,
},
sectionTitle: {
fontSize: 20,
fontWeight: '700',
marginBottom: 8,
color: '#fff',
},
item: {
flexDirection: 'row',
justifyContent: 'space-between',
paddingVertical: 8,
borderBottomColor: '#ddd',
borderBottomWidth: 1,
},
itemName: {
fontSize: 16,
color: '#555',
},
itemAmount: {
fontSize: 16,
fontWeight: '600',
color: '#2e7d32',
},
emptyText: {
marginTop: 50,
fontSize: 18,
textAlign: 'center',
color: '#999',
},
balanceText: {
color: '#fff',
fontSize: 16,
marginTop: 8,
},

});