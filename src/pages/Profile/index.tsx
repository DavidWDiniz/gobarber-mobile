import React, {useCallback, useRef} from "react";
import {Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, View} from "react-native";

import {useNavigation} from "@react-navigation/native";
import {Form} from "@unform/mobile";
import {FormHandles} from "@unform/core";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Feather";

import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../services/api";
import {Container, Title, UserAvatar, UserAvatarButton, BackButton} from "./styles";
import {useAuth} from "../../hooks/auth";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const Profile: React.FC = () => {
    const {user} = useAuth();

    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const oldPasswordInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required("Nome obrigatório"),
                email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail válido"),
                password: Yup.string().min(6, "No mínimo 6 dígitos"),
            });
            await schema.validate(data, {abortEarly: false});

            await api.post("/users", data);
            Alert.alert("Cadastro realizado com sucesso!", "Voçê já pode realizar login na aplicação.");
            navigation.goBack();

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }
            Alert.alert("Erro no cadastro","Ocorreu um erro ao fazer cadastro, tente novamente.");
        }
    },[navigation]);

    const handleGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{flex: 1}}
                >
                    <Container>
                        <BackButton onPress={handleGoBack}>
                            <Icon name="chevron-left" size={24} color="#999591" />
                        </BackButton>

                        <UserAvatarButton onPress={() => {}}>
                            <UserAvatar source={{uri: user.avatar_url}} />
                        </UserAvatarButton>
                        <View>
                            <Title>Meu perfil</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={emailInputRef}
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => {
                                    oldPasswordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={oldPasswordInputRef}
                                name="old_password"
                                icon="lock"
                                placeholder="Senha atual"
                                textContentType="newPassword"
                                secureTextEntry
                                returnKeyType="next"
                                containerStyle={{marginTop: 16}}
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Nova senha"
                                textContentType="newPassword"
                                secureTextEntry
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    confirmPasswordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password_confirmation"
                                icon="lock"
                                placeholder="Confirmar senha"
                                textContentType="newPassword"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                        </Form>
                        <Button onPress={() => {
                            formRef.current?.submitForm();
                        }}>Confirmar mudanças</Button>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

        </>
    );
}

export default Profile;
