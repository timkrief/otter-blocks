/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { receipt as icon } from '@wordpress/icons';
import edit from './edit.js';
import save from './save.js';

const { name } = metadata;

registerBlockType( name, {
	...metadata,
	title: __( 'Business Hours', 'otter-blocks' ),
	description: __( 'Display your business schedule on your website.', 'otter-blocks' ),
	icon,
	keywords: [
		'business',
		'schedule',
		'time'
	],
	styles: [
		{
			name: 'default',
			label: __( 'default', 'otter-blocks' ),
			isDefault: true
		},
		{
			name: 'black-white',
			label: __( 'Black & White', 'otter-blocks' )
		}
	],
	edit,
	save
});