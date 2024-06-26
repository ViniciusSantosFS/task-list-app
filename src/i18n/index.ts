import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
    'pt-BR': {
        translation: {
            greetings: 'Olá mundo!',
            addbutton: 'Cadastar tarefa',
            taskForm: {
                register: 'Cadastrar tarefa',
                submit: 'Cadastrar',
                requiredField: 'Esse campo é obrigatório',
                title: 'Título',
                type: 'Tipo',
                ownerEmail: 'Email do Responsável',
                registerOwner: 'Cadastrar responsável',
                description: 'Descrição',
                beginDate: 'Data de início',
                endDate: 'Data de término',
                deliveryDate: 'Data de conclusão',
                isWeekendError:
                    'Não é possivel cadastrar tarefas para finais de semana',
                invalidEmail: 'Email inválido',
                registerUser: 'Cadastre um usuário',
                createUser: 'Cadastrar usuário',
                name: 'Nome do usuário',
                email: 'Email do usuário',
            },
        },
    },
}

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'pt-BR',
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
})

export default i18n
