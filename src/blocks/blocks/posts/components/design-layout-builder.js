/**
 * External dependencies
 */
import arrayMove from 'array-move';

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	Button,
	ExternalLink
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { SortableItem, SortableList } from './sortable.js';
import Notice from '../../../components/notice/index.js';

const ProFeatures = () => {
	return (
		<Fragment>
			<Button
				variant="secondary"
				isSecondary
				className="o-conditions__add"
				disabled={ true }
				onClick={ () => {} }
			>
				{ __( 'Add Meta Field', 'otter-blocks' ) }
			</Button>

			<br />

			<Notice
				notice={ <ExternalLink href={ window.themeisleGutenberg.upgradeLink }>{ __( 'Get more options with Otter Pro. ', 'otter-blocks' ) }</ExternalLink> }
				variant="upsell"
			/>
		</Fragment>
	);
};

const LayoutBuilder = ({
	attributes,
	setAttributes
}) => {
	const onSortEnd = ({ oldIndex, newIndex }) => {
		const template = arrayMove( attributes.template, oldIndex, newIndex );
		setAttributes({ template });
	};
	return (
		<Fragment>
			<div
				className={ classnames(
					'o-sortable',
					attributes.style
				) }
			>
				<SortableItem
					attributes={ attributes }
					setAttributes={ setAttributes }
					template={ 'image' }
					disabled={ true }
				/>

				<SortableList
					attributes={ attributes }
					setAttributes={ setAttributes }
					onSortEnd={ onSortEnd }
					useDragHandle
					axis="y"
					lockAxis="y"
				/>

				{ applyFilters( 'otter.postsBlock.sortableContainer', <ProFeatures />, attributes, setAttributes ) }
			</div>
		</Fragment>
	);
};

export default LayoutBuilder;
