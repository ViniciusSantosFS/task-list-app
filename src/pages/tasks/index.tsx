import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import AddButton from 'src/components/add-button'
import Task from 'src/components/task'

function Tasks() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <>
            <h1>{t('greetings')}</h1>
            <AddButton
                title={t('addbutton')}
                onClick={() => navigate('/tasks/register')}
            />
            <Task
                title={'TESTE 01'}
                description={'Essa é uma task teste'}
                owner={'Lucas'}
                onChangeCheckBox={function (): void {
                    throw new Error('Function not implemented.')
                }}
                onClickEdit={function (): void {
                    throw new Error('Function not implemented.')
                }}
                onClickDelete={function (): void {
                    throw new Error('Function not implemented.')
                }}
            />
        </>
    )
}

export default Tasks
