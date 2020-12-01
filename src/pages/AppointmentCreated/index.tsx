import React, {useCallback, useMemo} from "react";
import Icon from "react-native-vector-icons/Feather";
import {Container, Title, Description, OkButton, OkButtonText} from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import {format} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface RouteParams {
    date: number;
}

const AppointmentCreated: React.FC = () => {
    const {reset} = useNavigation();
    const {params} = useRoute();

    const routParams = params as RouteParams;

    const handleOkPressed = useCallback(() => {
        reset({
            routes: [
                {
                    name: "Dashboard"
                }
            ],
            index: 0,
        })
    }, [reset]);

    const formattedDate = useMemo(() => {
        return format(
            routParams.date,
            "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
            {locale: ptBR}
            );
    }, [routParams.date]);

    return (
        <Container>
            <Icon name="check" size={80} color="#04D361" />
            <Title>Agendamento concluído</Title>
            <Description>{formattedDate}</Description>

            <OkButton onPress={handleOkPressed} >
                <OkButtonText>Ok</OkButtonText>
            </OkButton>
        </Container>
    );
}

export default AppointmentCreated;
