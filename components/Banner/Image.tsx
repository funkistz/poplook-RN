import React, { memo } from 'react';
import Image from 'react-native-scalable-image';

const Images = memo(function Greeting({ width, data }: any) {

    return (
        <Image
            width={width}
            source={{uri: 'https://api.poplook.com/' + data.href }}
        />
    );
})

export default Images;