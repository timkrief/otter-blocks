/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	ToggleControl
} from '@wordpress/components';

const Inspector = ({
	attributes,
	setAttributes
}) => {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'otter-blocks' ) }
			>
				<TextControl
					label={ __( 'Label', 'otter-blocks' ) }
					value={ attributes.label }
					onChange={ label => setAttributes({ label }) }
				/>

				<TextControl
					label={ __( 'Placeholder', 'otter-blocks' ) }
					value={ attributes.placeholder }
					onChange={ placeholder => setAttributes({ placeholder }) }
				/>

				<TextControl
					label={ __( 'Help Text', 'otter-blocks' ) }
					value={ attributes.helpText }
					onChange={ helpText => setAttributes({ helpText }) }
				/>

				<ToggleControl
					label={ __( 'Required', 'otter-blocks' ) }
					help={ __( 'If enabled, the input field must be filled out before submitting the form.', 'otter-blocks' ) }
					checked={ attributes.isRequired }
					onChange={ isRequired => setAttributes({ isRequired }) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
