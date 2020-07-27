import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ToastAndroid, Button, ScrollView, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AnimatedSplash from "react-native-animated-splash-screen";// AnimatedSplash Component
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';// table Component
import ViewPager from '@react-native-community/viewpager';
import { Modal } from 'react-native-paper';
import { Card } from "@paraboly/react-native-card";
import Modify from './Modify';
import Detail from './Detail';







class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: [Hello('기업이름'), Hello('상품코드'), Hello('PER'), Hello('PBR'), Hello('ROA'), Hello('ROE'), Hello('Head7'), Hello('Head8'), Hello('Head9')],
            widthArr: [81, 81, 55, 55, 55, 55, 55, 55, 55],
            setData: (num) => this.widthArr[0] = num,
            isVisible: false
        }
    }
    setVisibleTrue = () => { this.setState({ isVisible: true }) };

    setVisibleFalse = () => { this.setState({ isVisible: false }) };



    render() {
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < 20; i += 1) {
            const rowData = [];
            for (let j = 0; j < 9; j += 1) {
                rowData.push(`${i}${j}`);

            }
            tableData.push(rowData);
        }

        const styles = StyleSheet.create({
            container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
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


            <View style={styles.container}>

                <View style={StyleSheet.create({
                    container: { flex: 1, paddingTop: 10, backgroundColor: '#fff' }
                }).container}>


                    <ViewPager style={styles.container} initialPage={0} orientation='horizontal' transitionStyle='curl'>
                        <View key="1">
                            <View style={styles.semiheader}>
                                <Text style={styles.headtextmain}>main</Text>
                                <Text style={styles.headtexttable}>Table</Text>
                            </View>
                            <ScrollView Virtical={true} horizontal={true}>
                                <View>
                                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                        <Row header={true} setVisibleTrue={this.setVisibleTrue} data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text} />
                                    </Table>
                                    <ScrollView style={styles.dataWrapper} onMoveShouldSetResponder={false}>
                                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }} heightArr={[30]}>

                                            {
                                                tableData.map((rowData, index) => (

                                                    <Row
                                                        navigation={this.props.navigation}
                                                        rowKey={index}
                                                        data={rowData}
                                                        widthArr={state.widthArr}
                                                        style={[styles.row, index % 2 && { backgroundColor: '#F7F9F9' }]}
                                                        textStyle={styles.text}
                                                    />
                                                ))
                                            }

                                        </Table>
                                    </ScrollView>

                                </View>
                            </ScrollView>
                        </View>
                        <View key="2">
                           
                                    <Card
                                        title="Title"
                                        iconName="home"
                                        defaultTitle=""
                                        iconType="Entypo"
                                        defaultContent=""
                                        onPress={() => { }}
                                        topRightText="50/301"
                                        bottomRightText="30 km"
                                        content="Lorem ipsum dolor sit."
                                    />
                        </View>
                    </ViewPager>

                    <Button

                        color='#89734c'
                        title='수치 설정하기'
                        onPress={() => this.props.navigation.navigate('Modify')} />

                </View>
                <Modal animationType={"slide"} transparent={false} onDismiss={this.setVisibleFalse}
                    visible={this.state.isVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    <View style={styles.test}>

                        <View style={styles.modal}>
                            <Text style={styles.discription} onPress={
                                this.setVisibleFalse
                            }>PER 이란?</Text>
                            <View>
                                <Text></Text>
                                <Text></Text>
                                <Text>description1</Text>
                                <Text>description2</Text>
                                <Text>description3</Text>
                                <Text>description4</Text>
                                <Text>description5</Text>
                                <Text>description6</Text>
                                <Text>description7</Text>
                                <Text>description8</Text>
                            </View>




                        </View>
                    </View>
                </Modal>
            </View>
        )


    }

}

const Hello = (name) => {
    return (
        <View><Text>Hello {name}</Text></View>
    );
}


class ModifyScreen extends React.Component {


    render() {

        return (
            <Modify />
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
                title: "Table",
                headerTitleAlign: 'center'
            },
        },
        Modify: {
            screen: ModifyScreen,
            navigationOptions: {
                title: "Modify",
                headerTitleAlign: 'center',
                animationEnabled: false
            },
        },
        Details: {
            screen: DetailsScreen,
            navigationOptions: {
                title: "Details",
                animationEnabled: false,
                headerTitleAlign: 'center'
            },
        }

    },
    {
        initialRouteName: "Home",
    }
)

const Container = createAppContainer(AppNavigator)


class App extends React.Component {
    state = {
        isLoaded: false,
    }


    async componentDidMount() {
        await setTimeout(() => {
            this.setState({ isLoaded: true });
        }, 2000);

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

            >
                {console.disableYellowBox = true}
                <Container />

            </AnimatedSplash>
        )
    }
}


export default App