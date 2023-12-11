import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        // flex:1,
        // marginBottom:20
    },
    // back:{
    //     // position: 'absolute',
       
        

    //     width: "100%",
    //     height: 110,
    //     // padding: 20,
    //     // paddingVertical: 40,
    //     position: 'absolute',
    //     bottom:0

    // },

    logo:{
        width: 300,
        height: 100,

    },
    topContainer:{
        alignItems:'center',
        marginTop:60,
        marginBottom:40
        
    },
    title:{
        color:'white',
        fontSize:18,
        fontWeight:'bold',
        marginBottom:20
    },
    
    titlewelcome:{
        color:COLORS.primary,
        fontSize:28,
        fontWeight:'bold'

    },
    subtitle:{
        color: COLORS.primary,
        fontSize:18,
        
    },
    dataContainer:{
        marginTop:50,
        marginHorizontal:30
    },
    
     overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
    }, 
    textInput:{
        position: "relative",
        color: COLORS.gray,
        fontSize:SIZES.h3,
        borderBottomColor:COLORS.lightgray,
        borderBottomWidth:1,
        paddingVertical:10,

    },
    btnContainer:{
        marginTop:  10,
    },

    button1:{
        backgroundColor: COLORS.primary,
        padding: 15,
        marginHorizontal: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText:{
        color:COLORS.white,
        fontWeight:'bold',
        fontSize:SIZES.h4,
    },
    button2:{
        flexDirection:'row',
        backgroundColor:'#ddedf7',
        padding:15,
        marginHorizontal:30,
        marginVertical:10,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        width:60,
        height:60
        
    },
    text1:{
        color:COLORS.primary,
        fontSize: SIZES.h5,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom: 20,
        alignSelf:'flex-end'

    },
    text2:{
        fontSize: SIZES.h4,
        fontWeight:'bold',
        marginTop: 10,
        color:'#1d1a1a'

    },
    btmContainer:{
        marginTop: 50,
    },
    btnSignout:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    }

   
})

export default styles;