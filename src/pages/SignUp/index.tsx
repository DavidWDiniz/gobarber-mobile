import React, {useRef} from "react";
import {Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {useNavigation} from "@react-navigation/native";
import {Form} from "@unform/mobile";
import {FormHandles} from "@unform/core";

import logoImg from "../../assets/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Container, Title, BackToSignIn, BackToSignText} from "./styles";

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();
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
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form ref={formRef} onSubmit={(data) => {
                            console.log(data);
                        }}>
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
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
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
                        }}>Cadastrar</Button>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSignIn activeOpacity={1} onPress={() => {navigation.goBack()}}>
                <Icon name="arrow-left" size={20} color="#FFF" />
                <BackToSignText>Voltar para logon</BackToSignText>
            </BackToSignIn>
        </>
    );
}

export default SignUp;
