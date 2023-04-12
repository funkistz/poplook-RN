
import { useState, useEffect } from "react";
import { Image, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";

const win = Dimensions.get('window');

function AutoImage({ imageUri, width, height, style }: any) {

    const [aheight, setAheight] = useState(0);
    const [awidth, setAwidth] = useState(0);

    useEffect(() => {

        Image.getSize(imageUri, (iwidth, iheight) => {

            if (width) {

                setAwidth(width);
                setAheight(iheight * width / iwidth);

            } else {

                setAheight(height);
                setAheight(iwidth * height / iheight);

            }

        });

    }, [])


    return (
        <FastImage resizeMode={FastImage.resizeMode.contain} style={{ ...style, width: awidth, height: aheight }} source={{
            uri: imageUri
        }} />
    );
}

export default AutoImage;