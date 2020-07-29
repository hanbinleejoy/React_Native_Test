import React, { Component, Children } from 'react';
import { StyleSheet, Text, View, Image, ToastAndroid, Button, ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Col, Cell, Cols } from 'react-native-table-component';// table Component
import AsyncStorage from '@react-native-community/async-storage';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';



  
const CellDesign = (text) => {
    // let [fontsLoaded] = useFonts({
    //     'Maplestory': require('./assets/fonts/Maplestory Bold.ttf'),
    //   });
 
    const styles = StyleSheet.create({
        textStyle:{backgroundColor:'#fffeb3',alignItems:'center',padding:10}
    });

    // if (!fontsLoaded) {
    //     return <AppLoading />;
    //   }else
    return (
        <View style={styles.textStyle }><Text>{text}</Text></View>
    );
}


export class TablePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableHead: {},
            widthArr: [40, 40, 40, 40, 40,40, 40, 40, 40,40,40],
            isVisible: false,
            pageState: true,
            dataSet: this.props.dataSet


        }

    }
    setVisibleTrue = () => { this.setState({ isVisible: true }) };

    setVisibleFalse = () => { this.setState({ isVisible: false }) };

    setTableData = (per, pbr, roa, roe) => {
        //  AsyncStorage
    }


    render() {
        const state = this.state;
        let tableData={};
        let tableScrollData = {};
        const asdf = () => {
            let nameData =["기업이름"];
            let codeData =["종목코드"];
            let perdata = ["PER"];
            let pbrdata = ["PBR"];
            let operatingdata = ["ROA"];
            let roadata = ["ROE"];
            let roedata = ["부채비율"];
            let reverseRatiodata = ["영업이익률"];
            let debtRatiodata = ["유보율"];

            this.props.dataSet.map((val, i) => {
                nameData.push(i%2==0?CellDesign(val.cmpName):val.cmpName);
                codeData.push(val.code);
                perdata.push(val.per);
                pbrdata.push(val.pbr);
                operatingdata.push(val.operatingProfitRatio);
                roadata.push(val.roa);
                roedata.push(val.roe);
                reverseRatiodata.push(val.reserveRatio);
                debtRatiodata.push(val.debtRatio);

            })
            tableData = [
                nameData,
                codeData
            ];

            tableScrollData = [
                perdata,
                pbrdata,
                operatingdata,
                roadata,
                roedata,
                reverseRatiodata,
                debtRatiodata
            ];

           
        }

        asdf();

        const styles = StyleSheet.create({
            container: { flex: 1, padding: 16, paddingTop: 13, backgroundColor: '#fff', marginHorizontal: 10, alignContent: 'center',paddingBottom:70 },
            tableContainer: { flex: 1,backgroundColor: '#fff', alignContent: 'center',flexDirection:'row'},
            scrollTable:{paddingRight:130},
            header: { height: 50, backgroundColor: '#ffb81c' },
            text: { textAlign: 'center', fontWeight: '100' },
            // discription: { textAlign: 'left', fontSize: 25, backgroundColor: '#5e514d', color: 'white', padding: 3, paddingHorizontal: 20, position: 'absolute', translateX: -20, translateY: 10 },
            dataWrapper: { marginTop: -1 },
            row: { height: 51.6, },
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

            <View style={styles.container}>
                 <View style={styles.tableContainer}>
          
            <Table borderStyle={{ borderBottomWidth: 3, borderBottomColor: '#C1C0B9' }}>
                    <TableWrapper>
                        <Cols
                            navigation={this.props.navigation}
                            data={tableData}
                            heightArr={state.widthArr}
                            widthArr={[68,59]}
                            style={[styles.row]}
                            textStyle={styles.text}
                        />

                    </TableWrapper>
                </Table>
                <View style={styles.scrollTable}>
                    <ScrollView horizontal={true} >
                <Table borderStyle={{borderBottomWidth: 1, borderBottomColor: '#C1C0B9' }}>
                    <TableWrapper>
                        <Cols
                            navigation={this.props.navigation}
                            data={tableScrollData}
                            heightArr={state.widthArr}
                            widthArr={[50,43,43,48,55,65,55]}
                            style={[styles.row, ]}
                            textStyle={styles.text}
                        />

                    </TableWrapper>
                </Table>
                </ScrollView>
                </View>
           
                </View>
                <Button
                    title='Submit'
                    onPress={() => this.props.navigation.navigate('Modify')} />
                  </View>
               
          
            

        )


    }

}



