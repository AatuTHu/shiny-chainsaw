import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        padding: 20,
        justifyContent: 'center',
      },
      pwContainer:{
        height: '40%',	
        justifyContent: 'space-evenly',
        padding: 20,
      },
      title: {
        fontFamily: 'Pacifico-Regular',
        fontSize: 80,
        color: '#fff',
        marginBottom: 40,
        textAlign: 'center',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#424242',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      icon: {
        marginRight: 10,
      },
      input: {
        flex: 1,
        color: '#fff',
        height: 50,
      },
      forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30,
      },
      forgotPasswordText: {
        color: '#fff',
        fontSize: 18,
        marginRight: 10,
      },
      gradientButton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
      },
      signInButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
      },
      dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#444',
      },
      orText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
      },
      anonButton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
      },
      anonButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
      },
      signUpText: {
        color: '#fff',
        fontSize: 20,
      },
      signUpButtonText: {
        color: '#3282b8',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
      },
      loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      loaderText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
      },
      blur:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1, // Ensure blur view is on top of other content
      },
      forgotPwHelper:{
        alignSelf: 'flex-end',
        margin: 20,
      },
      pwTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
      },
      title2: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
      },
    });