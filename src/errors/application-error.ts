import i18n from 'src/i18n'

export class ApplicationError {
    public message: string

    constructor(message: string) {
        this.message = i18n.t(message)
    }
}
