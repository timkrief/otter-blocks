import { BlockProps, InspectorProps } from '../../helpers/blocks'

type Attributes = {
	id: string
	subject: string
	emailTo: string
	optionName: string
	hasCaptcha: boolean
	provider: string
	listId: string
	action: string
	submitLabel: string
	sendUserEmail: boolean
	redirectLink: string
	inputPadding: {
		top: string
		right: string
		bottom: string
		left: string
	}
	labelColor: string
	helpLabelColor: string
	labelFontSize: number
	inputBorderRadius: number
	inputBorderColor: string
	inputBorderWidth: number
	inputWidth: number
	inputRequiredColor: string
	submitMessage: string
	submitMessageColor: string
	submitMessageErrorColor: string
	submitBackgroundColor: string
	submitBackgroundColorHover: string
	submitFontSize: number
	submitColor: string
	inputGap: number
	inputsGap: number
	submitStyle: string
	fromName: string
}

export type FormProps = BlockProps<Attributes>
export interface FormInspectorProps extends InspectorProps<Attributes> {}
