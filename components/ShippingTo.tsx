import React, { useEffect, useState } from 'react';
import { Box, HStack, IconButton, Icon, Spacer, Text, CheckIcon, VStack } from 'native-base';
import { countrySelector, getCountries } from '../Redux/Slices/Infos';
import { logout, userSelector } from '../Redux/Slices/Sessions';
import { useDispatch, useSelector } from 'react-redux';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { changeCountry } from '../Redux/Slices/Sessions';
import { clearCart } from '../Redux/Slices/Cart';
import { getWishList } from '../Redux/Slices/Wishlist';
import { clearCheckout } from '../Redux/Slices/Checkout';
import { clearAddress } from '../Redux/Slices/Address';
import { useNavigation } from '@react-navigation/native';
import { persistor } from '../Redux/app';
import { Alert } from 'react-native';

export default function ShippingTo() {

    const dispatch = useDispatch()
    const countries = useSelector((storeState: any) => storeState.infos.countries);
    const session = useSelector((storeState: any) => storeState.session);
    const [countryList, setCountryList] = useState([]);
    const { user, country } = useSelector(
        userSelector
    );
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const navigation: any = useNavigation();

    useEffect(() => {
        dispatch(getCountries());
    }, [])

    useEffect(() => {
        const temp = countries.map((country: any) => {
            return {
                label: country.country_name,
                value: country.country_name,
            }
        })
        setCountryList(temp);

    }, [countries])

    useEffect(() => {

        console.log('value', value);
        console.log('country', country.country_name);
        if (value) {
            let selectedCountry = countries.find((o: any) => o.country_name === value);
            console.log('selectedCountry', selectedCountry);
            dispatch(changeCountry(selectedCountry));

            if(session.user != null) {
                alert()
            }
        }

    }, [value])

    const alert = () => {
        Alert.alert('You will be log out from you current store', '', [
            {
                text: 'OK',
                onPress: () => logout_()
            },
        ]);
    }

    const logout_ = () => {
        persistor.purge().then(() => {
            if(user != null) {
                dispatch(logout())
                dispatch(getWishList())
                dispatch(clearCart())
                dispatch(clearCheckout())
                dispatch(clearAddress())
            }
        });
    }

    return (
        <>
            <VStack>
                <Text color='#000' fontSize={16} mb={2}>Shipping to:</Text>
                <Spacer />
                <DropDownPicker
                    placeholder="Select a country"
                    open={open}
                    value={country ? country.country_name : null}
                    items={countryList}
                    setOpen={setOpen}
                    setValue={setValue}
                    onChangeValue={(value: any) => {

                    }}
                    onSelectItem={(item) => {

                    }}
                    searchable={true}
                    listMode="MODAL"
                    modalProps={{
                        animationType: "slide"
                    }}
                    modalTitle="Select shipping country"
                    customItemLabelStyle={{
                        fontStyle: "italic"
                    }}
                    itemSeparatorStyle={{
                        backgroundColor: "#000"
                    }}
                    searchContainerStyle={{
                        borderBottomColor: "#dfdfdf",
                        // padding: 2,
                    }}
                    searchTextInputStyle={{
                        // color: "#dafdsd",
                        padding: 10,
                    }}
                    containerStyle={{
                        // width: (Dimensions.get('window').width / 2),
                    }}
                    style={{
                        minHeight: 40,
                        paddingVertical: 3,
                        borderColor: "#ccc"
                    }}

                />
            </VStack>

        </>
    );
}