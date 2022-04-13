<?php
/**
 * Css handling logic for blocks.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

use ThemeIsle\GutenbergBlocks\CSS\CSS_Utility;

/**
 * Class Form_Textarea_CSS
 */
class Form_Textarea_CSS extends Base_CSS {
/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'form-textarea';

	/**
	 * Generate Accordion CSS
	 *
	 * @param mixed $block Block data.
	 * @return string
	 * @since   1.3.0
	 * @access  public
	 */
	public function render_css( $block ) {
		$css = new CSS_Utility( $block );

		$css->add_item(
			array(
				'properties' => array(
					array(
						'property' => '--labelColor',
						'value'    => 'labelColor',
					),
					array(
						'property' => '--inputWidth',
						'value'    => 'inputWidth',
					)
				),
			)
		);

		$style = $css->generate();

		return $style;
	}

}