import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
    'pt-BR': {
        translation: {
            tasksTitle: 'LISTA DE TAREFAS',
            addbutton: 'Cadastar tarefa',
            filterByDate: 'Filtrar por data',
            delivery: 'Prazo',
            warning: 'ATENÇÃO',
            defaultErrorMessage:
                'Opss algo não saiu como o esperado, caso o erro persista entre em contato com o nosso suporte',
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
            createTask: {
                errors: {
                    invalidDates:
                        'Data de inicio não pode ser menor que data de término ou data de conclusão',
                    dateConflict:
                        'Esse usuáiro já está com uma tarefa cadastrada para essas datas',
                },
            },
            createUser: {
                errors: {
                    emailAlreadyRegistered: 'Esse email já foi registrado',
                },
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
