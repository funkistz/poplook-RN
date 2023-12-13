import React, { memo, useState, useEffect} from 'react';
import { Dimensions, View, useWindowDimensions } from 'react-native'
import { Image } from 'react-native'
import AutoImage from 'react-native-scalable-image';

const Images = memo(function Greeting({ data, column }: any) {

    const [imageHeights, setImageHeights] = useState<any>([])
    const layout = useWindowDimensions();

    const url = 'https://api.poplook.com/' + data.href;

    useEffect(() => {

        Image.getSize(url, (width: any, height: any) => {

            let dimension = 0;

            if (column) {
                dimension = height * (layout.width / width/column);
            } else {
                dimension = height * layout.width / width;
            }

            setImageHeights(dimension);

        });

    }, [imageHeights])

    return (
        <>
        <View>
            <AutoImage source={{ uri: url }} height={imageHeights}></AutoImage>
        </View>
        </>
    );
})

export default Images;