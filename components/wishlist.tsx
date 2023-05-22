import IonIcon from 'react-native-vector-icons/Ionicons';

export default function Wishlist({ like = false, size }: { like: any, size: any }) {

    return (
        <>
            { like && <IonIcon name='heart' size={size} color="red" /> }
            { !like && <IonIcon name='heart-outline' size={size} color="black" />}
        </>
    );
}
