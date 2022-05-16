/**
 * WordPRess dependencies
 */
import { __ } from '@wordpress/i18n';

import { updateCategory } from '@wordpress/blocks';

import { Icon } from '@wordpress/components';

import { dispatch } from '@wordpress/data';

import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import {
	otterIcon,
	otterIconColored as icon
} from './helpers/icons.js';

updateCategory( 'themeisle-blocks', { icon });
updateCategory( 'themeisle-woocommerce-blocks', { icon });

const PoweredBy = () => {
	return (
		<div className="o-is-powered">{ __( 'Powered by Otter', 'otter-blocks' ) } { <Icon icon={ otterIcon } /> }</div>
	);
};

addFilter( 'otter.poweredBy', 'themeisle-gutenberg/powered-by-notice', PoweredBy );

if ( Boolean( window.themeisleGutenberg.should_show_upsell ) ) {
	const { createNotice } = dispatch( 'core/notices' );
	createNotice(
		'info',
		__( 'Enjoying Otter Blocks? Enhance your site building experience with Otter Pro.', 'otter-blocks' ),
		{
			isDismissible: true,
			onDismiss: async() => {
				let settings;
				let notificiations = {};

				await window.wp.api.loadPromise.then( () => {
					settings = new window.wp.api.models.Settings();
				});

				settings.fetch().then( response => {
					if ( 0 < response.themeisle_blocks_settings_notifications.length ) {
						notificiations = response.themeisle_blocks_settings_notifications;
					}
				});

				notificiations['editor_upsell'] = true;

				const model = new window.wp.api.models.Settings({
					// eslint-disable-next-line camelcase
					themeisle_blocks_settings_notifications: JSON.stringify( notificiations )
				});

				await model.save().then( () => {
					createNotice(
						'info',
						__( 'No problem! Enjoy using Otter!.', 'otter-blocks' ),
						{
							isDismissible: true,
							type: 'snackbar'
						}
					);
				});
			},
			actions: [
				{
					url: window.themeisleGutenberg.upgradeLink,
					label: __( 'Tell me more!', 'otter-blocks' )
				}
			]
		}
	);
}
