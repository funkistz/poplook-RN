import React, { useEffect, useState } from 'react';
import { Box, HStack, IconButton, Icon, Spacer, Text, CheckIcon, VStack } from 'native-base';
import { countrySelector, getCountries } from '../Redux/Slices/Infos';
import { userSelector } from '../Redux/Slices/Sessions';
import { useDispatch, useSelector } from 'react-redux';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { changeCountry } from '../Redux/Slices/Sessions';

export default function ShippingTo({ navigation }: any) {

    const dispatch = useDispatch()
    const countries = useSelector((storeState: any) => storeState.infos.countries);
    const [countryList, setCountryList] = useState([]);
    const { user, country } = useSelector(
        userSelector
    );
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);

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
        if (value) {
            let selectedCountry = countries.find((o: any) => o.country_name === value);
            console.log('selectedCountry', selectedCountry);
            dispatch(changeCountry(selectedCountry))
        }

    }, [value])

    const setCountry = (prop: any) => {
        console.log('prop', prop);

    }

    return (
        <>

            {/* <SearchableDropdown
                onItemSelect={(item: any) => {
                    //   const items = this.state.selectedItems;
                    //   items.push(item)
                    //   this.setState({ selectedItems: items });
                }}
                containerStyle={{ padding: 5 }}
                onRemoveItem={(item: any, index: any) => {
                    //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                    //   this.setState({ selectedItems: items });
                }}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={countryList}
                defaultIndex={2}
                resetValue={false}
                textInputProps={
                    {
                        placeholder: "placeholder",
                        underlineColorAndroid: "transparent",
                        style: {
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                        },
                        onTextChange: (text: any) => alert(text)
                    }
                }
                listProps={
                    {
                        nestedScrollEnabled: true,
                    }
                }
            /> */}
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
                        color: "#dafdsd",
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