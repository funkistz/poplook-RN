import { ActivityIndicator } from "react-native";
import { StyleSheet } from 'react-native';

export default function Spinner({ spin = true }: { spin: any}) {

    return (
        <>
        {spin && <ActivityIndicator style={styles.loading} size='small' color='#16a34a'></ActivityIndicator>}
        </>
    );
}

const styles = StyleSheet.create({
    loading: {
        marginTop: 20,
        marginBottom: 70
    },
})