import IPay88, { Pay } from "react-native-ipay88-integration";
import { Platform, Alert } from "react-native";
import GeneralService from "../../Services/GeneralService";


function Ipay88Container() {

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
        console.log(' Payment authcode is', authorizationCode);

    };

    const cancelNotify = (data: any) => {
        const { transactionId, referenceNo, amount, remark, error } = data;

        GeneralService.toast({
            title: "Message",
            description: `${error}`
        });
        console.log('error', error);
    };

    const failedNotify = (data: any) => {
        const { transactionId, referenceNo, amount, remark, error } = data;

        GeneralService.toast({
            title: "Message",
            description: `${error}`
        });
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