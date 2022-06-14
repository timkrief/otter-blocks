/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

const deprecated = [ {
	attributes: {
		id: {
			type: 'string'
		},
		type: {
			type: 'string',
			default: 'text'
		},
		label: {
			'type': 'string'
		},
		placeholder: {
			'type': 'string'
		},
		isRequired: {
			'type': 'boolean'
		},
		mappedName: {
			'type': 'string'
		}
	},

	supports: {
		align: [ 'wide', 'full' ]
	},

	save: ({
		attributes
	}) => {
		const blockProps = useBlockProps.save();

		return (
			<div { ...blockProps }>
				<label
					htmlFor={ attributes.id }
					className="otter-form-textarea-label"
				>
					<RichText.Content
						value={ attributes.label }
						className="otter-form-textarea-label__label"
						tagName="span"
					/>

					{ attributes.isRequired && (
						<span className="required">{ __( '(required)', 'otter-blocks' ) }</span>
					) }
				</label>

				<textarea
					name={ attributes.mappedName }
					id={ attributes.id }
					required={ attributes.isRequired }
					placeholder={ attributes.placeholder }
					rows={ 10 }
					className="otter-form-textarea-input"
				>
				</textarea>
			</div>
		);
	}
} ];

export default deprecated;
