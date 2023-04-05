import { Toast, Box, Text } from "native-base";
import { StyleSheet, View, Dimensions } from 'react-native';

const win = Dimensions.get('window');

const GeneralService = {

    async toast({ title = null, description, placement = 'bottom', type = 'normal', duration = 3000 }: any) {

        const id = title ? title : description;

        if (Toast.isActive(title)) {
            return;
        }

        if (!type) { type = 'danger' } else {
            type = 'success'
        };

        Toast.show({
            id: id,
            duration: duration,
            placement: "top",
            render: () => {
                var bgcolor = '#000';

                if (type == 'danger') {
                    bgcolor = '#EA3C12';
                } else if (type == 'danger') {
                    bgcolor = '#EA3C12';
                }

                return <Box w={win.width - 20} bg={bgcolor} p={4} rounded="xl" m={10} mb={0} mt={0}>
                    {title && <Text>{title}</Text>}
                    <Text>{description}</Text>
                </Box>;
            }
        });
    }

}

export default GeneralService;
