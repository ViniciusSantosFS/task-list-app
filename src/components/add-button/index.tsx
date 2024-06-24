import Button, { ButtonProps } from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

interface Props extends ButtonProps {
    title: string
}

const AddButton = ({ title, ...rest }: Props) => {
    return (
        <Button variant="contained" startIcon={<AddIcon />} {...rest}>
            {title}
        </Button>
    )
}

export default AddButton
