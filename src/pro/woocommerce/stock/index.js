/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

import { store as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit.js';

const { name } = metadata;

if ( Boolean( window.otterPro.hasWooCommerce ) ) {
	registerBlockType( name, {
		...metadata,
		title: __( 'Product Stock', 'otter-blocks' ),
		description: __( 'Display the stock of your WooCommerce product.', 'otter-blocks' ),
		icon,
		keywords: [
			'woocommerce',
			'products',
			'stock'
		],
		edit,
		save: () => null
	});
}