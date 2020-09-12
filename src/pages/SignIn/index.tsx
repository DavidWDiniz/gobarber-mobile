import React, {useCallback, useRef} from "react";
import {Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {useNavigation} from "@react-navigation/native";
import {Form} from "@unform/mobile";
import {FormHandles} from "@unform/core";

import logoImg from "../../assets/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText} from "./styles";

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSubmit = useCallback((data: object) => {
        console.log(data);
    }, []);

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
                           <Title>Faça seu logon</Title>
                       </View>

                     <Form ref={formRef} onSubmit={handleSubmit}>
                         <Input
                             autoCorrect={false}
                             autoCapitalize="none"
                             keyboardType="email-address"
                             name="email"
                             icon="mail"
                             placeholder="E-mail"
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
                             onSubmitEditing={() => {
                                 formRef.current?.submitForm();
                             }}
                         />
                     </Form>
                       <Button onPress={() => {
                           formRef.current?.submitForm();
                       }}>Entrar</Button>

                       <ForgotPassword onPress={() => {}}>
                           <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                       </ForgotPassword>
                   </Container>
               </ScrollView>
            </KeyboardAvoidingView>

            <CreateAccountButton activeOpacity={1} onPress={() => navigation.navigate("SignUp")}>
                    <Icon name="log-in" size={20} color="#FF9000" />
                    <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    );
}

export default SignIn;
