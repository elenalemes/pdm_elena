import React, {useContext} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Avatar, useTheme } from 'react-native-paper';
import { UserContext } from '../context/UserProvider';

export default function Professor() {
    const {user} = useContext(UserContext);
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Avatar.Icon
            size={80}
            icon="account-circle"
            style={[styles.avatar, {backgroundColor: theme.colors.primary}]}
            />
            <Text style={styles.title} variant="headlineSmall">
                    Bem-vindo, {user && user.nome ? user.nome : 'Professor'}!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
    },
});
