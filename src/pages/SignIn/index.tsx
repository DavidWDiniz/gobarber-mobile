import React from "react";
import {Image, KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import logoImg from "../../assets/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText} from "./styles";

const SignIn: React.FC = () => {
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

                       <Input name="email" icon="mail" placeholder="E-mail" />
                       <Input name="password" icon="lock" placeholder="Senha" />
                       <Button onPress={() => {}}>Entrar</Button>

                       <ForgotPassword onPress={() => {}}>
                           <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                       </ForgotPassword>
                   </Container>
               </ScrollView>
            </KeyboardAvoidingView>

            <CreateAccountButton activeOpacity={1} onPress={() => {}}>
                    <Icon name="log-in" size={20} color="#FF9000" />
                    <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    );
}

export default SignIn;
