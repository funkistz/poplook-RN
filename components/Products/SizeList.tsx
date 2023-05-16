import { Button, HStack, Spacer, Text, Flex } from "native-base";
import { StyleSheet, View, Dimensions } from 'react-native';

const win = Dimensions.get('window');

function SizeList({ attribute, setSizeSelected, sizeSelected }: any) {

    const getTextColor = (id_product_attribute: any) => {

        return (sizeSelected != id_product_attribute) ? '#000' : '#fff';
    }

    return (<>
        <Flex direction="row" flex={1} flexWrap="wrap" justifyContent="flex-start">
            {attribute && attribute.length > 0 && attribute.map((res: any, index: any) => {
                return <Button onPress={() => setSizeSelected(Number(res.id_product_attribute))} key={index} style={styles.chip} variant="outline" size='sm'
                    backgroundColor={(sizeSelected == res.id_product_attribute) ? '#000' : '#fff'}
                    borderColor={(sizeSelected == res.id_product_attribute) ? '#000' : '#ccc'}
                    width={(res.attribute_name.includes("Year") ? (win.width / 5) + 2 : (win.width / 6 - 2))}
                    _text={{ color: getTextColor(res.id_product_attribute), fontSize: 13 }}
                    isDisabled={res.quantity == 0 ? true : false}
                    >
                    {res.attribute_name}
                </Button>
            })}
        </Flex>
    </>);
}

export default SizeList;

const styles = StyleSheet.create({
    chip: {
        marginRight: 8,
        color: '#000',
        // width: (win.width / 5) + 2,
        // borderColor: '#ccc',
        borderRadius: 8,
        // height: 30,
        // padding: 0,
        marginBottom: 8,
    },
});