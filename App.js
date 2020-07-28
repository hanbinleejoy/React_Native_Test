import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ToastAndroid, Button, ScrollView, Alert, NativeModules } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import AnimatedSplash from "react-native-animated-splash-screen";// AnimatedSplash Component
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AsyncStorage } from 'react-native';
import { Modify } from './Modify';
import { Detail } from './Detail';
import { CardPage } from './CardPage';
import { TablePage } from './TablePage';


let navigationForSend;
let calArr=[];
let cardRef;
let tableRef;
let w1= 1;//rankPer
let w2= 0;//rankPbr
let w3= 0;//rorankRoaa
let w4= 0;//rankRoe
let w5= 0;//rank_oper_profit_ratio
let w6= 0;//rank_debt_ratio
let w7= 0;//rank_reserve_ratio

const calculateData = (a,b) => {

        let totalA=  (w1*a.rankPer) + (w2*a.rankPbr) + (w3*a.rankRoa) + (w4*a.rankRoe) + (w5*a.rankOper) + (w6*a.rankDebtRatio) + (w7*a.rankReserveRatio)
        let totalB=  (w1*b.rankPer) + (w2*b.rankPbr) + (w3*b.rankRoa) + (w4*b.rankRoe) + (w5*b.rankOper) + (w6*b.rankDebtRatio) + (w7*b.rankReserveRatio)

        if(totalA == totalB){ 
            return 0
        } 
        return totalA > totalB ? 1 : -1; 


};




class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        navigationForSend=this.props.navigation;
        this.state = {
            isVisible: false,
            pageState: true
            

        }
    }
    setVisibleTrue = () => { this.setState({ isVisible: true }) };

    setVisibleFalse = () => { this.setState({ isVisible: false }) };

  
    render() {
        const state = this.state;
        const Tab = createMaterialTopTabNavigator();
        const styles = StyleSheet.create({
            container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', marginHorizontal: 10, alignContent: 'center' },
            header: { height: 50, backgroundColor: '#ffb81c' },
            text: { textAlign: 'center', fontWeight: '100' },
            discription: { textAlign: 'left', fontSize: 25, backgroundColor: '#5e514d', color: 'white', padding: 3, paddingHorizontal: 20, position: 'absolute', translateX: -20, translateY: 10 },
            dataWrapper: { marginTop: -1 },
            row: { height: 51.6, backgroundColor: '#ECF0F1' },
            semiheader: { flexDirection: 'row', flexWrap: 'wrap', padding: 15, borderBottomWidth: 3, borderBottomColor: 'gray', marginBottom: 5 },
            headtextmain: { flex: 1, textAlign: 'center', paddingRight: 15, borderBottomColor: '#ffb81c', borderBottomWidth: 0 },
            headtexttable: { flex: 1, textAlign: 'center', paddingLeft: 15, borderBottomColor: '#ffb81c', borderBottomWidth: 3 },
            modal: {
                // flex: 1,
                // alignItems: 'center',

                backgroundColor: '#ffffff',
                borderWidth: 5,
                borderColor: '#ffffff',//#8D9093
                padding: 20,
                paddingHorizontal: 10,
                borderStyle: 'solid',
                borderColor: '#ffb81c',
                overflow: 'visible'
            },
            test: { borderStyle: 'solid', borderWidth: 5, borderColor: 'white', padding: 0, marginHorizontal: 30, borderRadius: 2 }

        });

        
       
        return (
        <NavigationContainer>
        <Tab.Navigator
        tabBarOptions={{
            activeTintColor: '#ffb81c',
            inactiveTintColor :'black',
            labelStyle: { fontSize: 12 },
            indicatorStyle  :{borderColor:'#ffb81c', borderWidth:1}
          }} 
          >
              {/* { console.log('HomeScreen : '+JSON.stringify(this.props))} */}
            <Tab.Screen name="Card" component={CardScreen} />
            <Tab.Screen name="Table" component={TableScreen}  />
          </Tab.Navigator>
          </NavigationContainer>
       

          
        )


    }

}



class CardScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSet:[]
        }
        cardRef = React.createRef();
      
        cardRef.current={
            setDataset:(arr)=>{this.setState({dataSet:arr})}
        }
     
    }
   
 
    render(){
        console.log(JSON.stringify(this.state.dataSet))
        return(
            <CardPage navigation={navigationForSend} dataSet={this.state.dataSet}/>
        )
    }
}

class TableScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSet:[]
        }
       tableRef = React.createRef();
        JSON.stringify(this.state.dataSet)
        tableRef.current={
            setDataset:(arr)=>{this.setState({dataSet:arr})}
        }
     
    }
   
    

    render(){
        // console.log(navigationForSend)
        return(
           
            <TablePage navigation={navigationForSend} dataSet={this.state.dataSet}/>
        )
    }
}


class ModifyScreen extends React.Component {

    ModifyRef = React.createRef();
  
    render() {
    
        return (
            <Modify navigation={this.props.navigation} />
        );
    }


}

class DetailsScreen extends React.Component {



    render() {

        return (
            <Detail />

        );
    }


}





const AppNavigator = createStackNavigator(
    {

        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: "Main",
                headerTitleAlign: 'center'
            },
        },
        Modify: {
            screen: ModifyScreen,
            navigationOptions: {
                title: "Modify",
                headerTitleAlign: 'center',

            },
        },
        Details: {
            screen: DetailsScreen,
            navigationOptions: {
                title: "Details",
                headerTitleAlign: 'center',

            },
        },
       
    },
    {
        initialRouteName: "Home",
    }
)

const Container = createAppContainer(AppNavigator)


class App extends React.Component {
    state = {
        isLoaded: false,
        loadingText: '반갑습니다',
        calArr:[]
    }



    async componentDidMount() {
        let todayDate= new Date().toDateString()
        const keys = await AsyncStorage.getAllKeys();
        let f = true;
        for(var i in keys) {
            if('updated_cd_date' == keys[i]) {
                f = false;
                break
            }
        }
        const getCompanyDetailApiAsync = async ( url,setLoadingText = (text) => { this.setState({ loadingText: text }) },setLoaded=(loadbool)=>{this.setState({ cdIsLoaded: loadbool })}) => {
            try {
                let response = await fetch(
                    'http://ec2-15-164-117-230.ap-northeast-2.compute.amazonaws.com:8080/companies'
                );
                let json = await response.json();
                const companyDetailData = json;
                let update_companyDetailData = async (companyDetailData, setLoadingText, setLoaded) => {
                    setLoadingText("기업 세부 정보 업데이트 중입니다.");
                     await AsyncStorage.setItem('updated_cd_date', new Date().toDateString())
                     await companyDetailData.map(async (value, index) => {
                        AsyncStorage.setItem(value.cmpName+'Info',JSON.stringify(value));
                    });
                }
                await update_companyDetailData(companyDetailData, setLoadingText);
            } catch(e){
                console.log(e);
            };
        }
        if(f==true) {
            await getCompanyDetailApiAsync();
        }


        const getCompanyApiAsync = async ( url,setLoadingText = (text) => { this.setState({ loadingText: text }) },setLoaded=(loadbool)=>{this.setState({ isLoaded: loadbool })}) => {
            try {

                let response = await fetch(
                    'http://ec2-15-164-117-230.ap-northeast-2.compute.amazonaws.com:8080/quantdata/rank'
                );
                let json = await response.json();
                const companyData = json;
                
               
                let update_companyData = async (companyData,setLoadingText,setLoaded) => {
                   
               
                    setLoadingText("기업 정보 업데이트 중입니다.")
                  
                  
                     await AsyncStorage.setItem('updated_date', new Date().toDateString())
    
                     await companyData.map(async (value, index) => {
                       
                            AsyncStorage.setItem(value.cmpName,JSON.stringify(value));
                        
                      
                    });
                  

               
             
                }

            
                update_companyData(companyData,setLoadingText);

                setTimeout(() => {
                    setLoadingText("Do IT Quant");
                    AsyncStorage.getItem('삼성전자').then(function (data) {
                        // console.log('삼성전자:' + data);
                    })
                setTimeout(() => {
                    setLoadingText('');
                    setLoaded(true);
                     }, 1000);
                 }, 1000);
        
                  
                    

            } catch (error) {
                console.error(error);
            }
        };
    

    let mergeArr=[];


   
      const setCalArr = () => AsyncStorage.getAllKeys().then((keys,setDataset =() =>{this.setState({dataSet:arr})} , setTestArray = (arr) => {return Promise.resolve(arr)}) =>{
            AsyncStorage.multiGet(keys).then((data)=>{
                let parseString;
                let parseData;
                let jsonArr;
           
                    data.map((value,index)=>{
                      
                        
                        
                        if(value[0]!="updated_date"&&value[0]!="updated_cd_date"&&value[0]!="updated_data"&&(value[0].substring(value[0].length-4,value[0].length)!="Info")){
                           
                            parseString= value[1];
                            parseData=JSON.parse(parseString);
                            jsonArr =[parseData];
                            mergeArr=mergeArr.concat(jsonArr);
                 
                       
             
                       
                  
                       if(mergeArr.length==2353){
                        setTestArray(mergeArr).then((arr)=>{

                            console.log(mergeArr.length)
                            calArr =calArr.concat(arr);
                            calArr.sort(calculateData);
                            calArr= calArr.slice(0,10);
                            cardRef.current.setDataset(calArr);
                            tableRef.current.setDataset(calArr);
                        });
                       }

                        }
                        
                         })
                      
                
            })
        }) 
       
        
  
      AsyncStorage.getItem('updated_date').then((date,setLoadingText = (text) => { this.setState({ loadingText: text }) },
      setLoaded = (bool) => { this.setState({ isLoaded:bool }) })=>{
        console.log('date:'+date);
        console.log('todayDate:'+todayDate);
       
       if(date==todayDate){
        setCalArr().then(()=>{
            setLoadingText('');
            setLoaded(true);
        })
       }
       else{
        getCompanyApiAsync().then(()=>{
            setCalArr().then(()=>{
                setLoadingText('');
                setLoaded(true);
            })
        });
       }
     
      })
     
      
      
    }

    render() {

       

        return (
            <AnimatedSplash
                translucent={true}
                isLoaded={this.state.isLoaded}
                logoImage={require("./assets/KBDataSystems_CI_eng.jpg")}
                backgroundColor={"#ffcc22"}
                logoHeight={150}
                logoWidht={150}
                loadingText={this.state.loadingText}
           
            >
                {console.disableYellowBox = true}
                <Container />

            </AnimatedSplash>
        )
    }
}


export default App