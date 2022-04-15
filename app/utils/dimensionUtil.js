import { useCallback, useEffect, useState ,useRef} from 'react';
import { Dimensions, PixelRatio, useWindowDimensions } from 'react-native';
import {widthPercentageToDP as responsiveWidth,heightPercentageToDP as responsiveHeight} from 'react-native-responsive-screen'
const widthPercentageToDP = (screenWidth, widthPercent) => {
    const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = (screenHeight, heightPercent) => {
    const elemHeight =
        typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export function getPercentageWidth() {
    const [width, setWidth] = useState(Dimensions.get('window').width);
  const dimensions= useWindowDimensions()
   const mount = useRef(true)
    useEffect(() => {

        Dimensions.addEventListener('change', (newDimensions) => {

             if (mount.current) {
            screenWidth = newDimensions.window.width;
            setWidth(screenWidth);

      }
        });
        return () => {
            mount.current =false
            Dimensions.removeEventListener('change', () => { });
        }
    }, []);
    const wp = useCallback((value) => widthPercentageToDP(width, value), [width]);

    return isVertical(dimensions) ? wp:responsiveWidth;
}
export function getPercentageHeight() {
    const [height, setHeight] = useState(Dimensions.get('window').height);
   const dimensions= useWindowDimensions()
 const mount = useRef(true)

    useEffect(() => {
        Dimensions.addEventListener('change', (newDimensions) => {
            if (mount.current) {

                screenHeight = newDimensions.window.height;
                setHeight(screenHeight);
            } });
        return () => {
             mount.current = false

            Dimensions.removeEventListener('change', () => { })
        };
    }, []);
    const hp = useCallback((value) => heightPercentageToDP(height, value), [height]);

    return  isVertical(dimensions)?hp:responsiveHeight;
}

const isVertical = (dimensions) => {

    return dimensions.width >= 768
}