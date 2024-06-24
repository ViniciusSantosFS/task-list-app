import { useTranslation } from 'react-i18next'
import AddButton from 'src/components/add-button'

function RegisterUsers() {
    const { t } = useTranslation()

    return (
        <>
            <h1>{t('greetings')}</h1>
            <AddButton title={t('addbutton')} />
        </>
    )
}

export default RegisterUsers
