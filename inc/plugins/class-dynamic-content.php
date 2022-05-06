<?php
/**
 * Dynamic Content.
 *
 * @package ThemeIsle\GutenbergBlocks\Plugins
 */

namespace ThemeIsle\GutenbergBlocks\Plugins;

/**
 * Class Dynamic_Content
 */
class Dynamic_Content {

	/**
	 * The main instance var.
	 *
	 * @var Dynamic_Content
	 */
	protected static $instance = null;

	/**
	 * Initialize the class
	 */
	public function init() {
		add_action( 'the_content', array( $this, 'apply_dynamic_content' ) );
	}

	/**
	 * Filter post content.
	 *
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function apply_dynamic_content( $content ) { 
		if ( false === strpos( $content, '<o-dynamic' ) ) {
			return $content;
		}

		$re = '/<o-dynamic(?:\s+(?:data-type=["\'](?P<type>[^"\'<>]+)["\']|data-id=["\'](?P<id>[^"\'<>]+)["\']|data-before=["\'](?P<before>[^"\'<>]+)["\']|data-after=["\'](?P<after>[^"\'<>]+)["\']|data-length=["\'](?P<length>[^"\'<>]+)["\']|[a-zA-Z-]+=["\'][^"\'<>]+["\']))*\s*>(?<default>[^ $].*?)<\s*\/\s*o-dynamic>/';

		return preg_replace_callback( $re, array( $this, 'apply_data' ), $content );
	}

	/**
	 * Apply dynamic data.
	 *
	 * @param array $data Dynamic request.
	 *
	 * @return string
	 */
	public function apply_data( $data ) {
		$value = $this->get_data( $data );

		if ( isset( $data['before'] ) || isset( $data['after'] ) ) {
			return $this->apply_formatting( $value, $data );
		}

		return $value;
	}

	/**
	 * Apply formatting.
	 *
	 * @param string $value Dynamic value.
	 * @param array $data Dynamic request.
	 *
	 * @return string
	 */
	public function apply_formatting( $value, $data ) {
		if ( isset( $data['before'] ) ) {
			$value = esc_html( $data['before'] ) . $value;
		}

		if ( isset( $data['after'] ) ) {
			$value = $value . esc_html( $data['after'] );
		}

		return $value;
	}

	/**
	 * Get dynamic data.
	 *
	 * @param array $data Dynamic request.
	 *
	 * @return string
	 */
	public function get_data( $data ) {
		if ( ! isset( $data['type'] ) && isset( $data['default'] ) ) {
			return $data['default'];
		}

		if ( 'postID' === $data['type'] ) {
			return get_the_id();
		}

		if ( 'postTitle' === $data['type'] ) {
			return get_the_title();
		}

		if ( 'postExcerpt' === $data['type'] ) {
			$post    = get_post();
			$excerpt = $post->post_excerpt;

			if ( empty( $excerpt ) ) {
				return $data['default'];
			}

			if ( isset( $data['length'] ) && ! empty( $data['length'] ) ) {
				$excerpt = substr( $excerpt, 0, intval( $data['length'] ) ) . '…';
			}

			return sanitize_text_field( $excerpt );
		}

		return $data[0];
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @since 1.2.0
	 * @access public
	 * @return Dynamic_Content
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->init();
		}

		return self::$instance;
	}

	/**
	 * Throw error on object clone
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object therefore, we don't want the object to be cloned.
	 *
	 * @access public
	 * @since 1.2.0
	 * @return void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'otter-blocks' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @access public
	 * @since 1.2.0
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'otter-blocks' ), '1.0.0' );
	}
}
