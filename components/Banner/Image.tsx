import React, { memo, useState, useEffect} from 'react';
import { useWindowDimensions } from 'react-native'
import { Image } from 'react-native'
import AutoImage from 'react-native-scalable-image';

const Images = memo(function Greeting({ data, column, width, height }: any) {

    const [imageHeights, setImageHeights] = useState<any>([])
    const layout = useWindowDimensions();

    const url = data.href.includes('https') ? data.href : 'https://api.poplook.com/' + data.href;

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
        <AutoImage source={{ uri: url }} height={height ? height : imageHeights} width={width ? width : ''}></AutoImage>
    );
})

export default Images;