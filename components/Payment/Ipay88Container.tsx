// import IPay88, { Pay } from "react-native-ipay88-integration";
import IPay88, { Pay } from "ipay88-sdk";
import { Platform, Alert } from "react-native";
import GeneralService from "../../Services/GeneralService";
import { useNavigation } from '@react-navigation/native';


function Ipay88Container() {

    const navigation: any = useNavigation();

    const successNotify = (data: any) => {
        const {
            transactionId,
            referenceNo,
            amount,
            remark,
            authorizationCode
        } = data;

        GeneralService.toast({
            title: 'Message',
            description: `Payment authcode is ${authorizationCode}`
        });

        // const param = {
        //     id: data.id_order
        // };

        navigation.navigate('OrderSuccessPage', { screen: 'OrderSuccessPage' })

        console.log(' Payment authcode is', authorizationCode);

    };

    const cancelNotify = (data: any) => {
        const { transactionId, referenceNo, amount, remark, error } = data;

        GeneralService.toast({
            title: "Message",
            description: `${error}`
        });
        navigation.navigate('OrderHistoryListPage', { screen: 'OrderHistoryListPage' })
        console.log('error', error);
    };

    const failedNotify = (data: any) => {
        const { transactionId, referenceNo, amount, remark, error } = data;

        GeneralService.toast({
            title: "Message",
            description: `${error}`
        });
        navigation.navigate('OrderHistoryListPage', { screen: 'OrderHistoryListPage' })
        console.log('error', error);
    };

    return <>
        <IPay88
            successNotify={successNotify}
            failedNotify={failedNotify}
            cancelNotify={cancelNotify}
        />
    </>;
}

export default Ipay88Container;