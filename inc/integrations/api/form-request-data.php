<?php
/**
 * Request Data Handling.
 *
 * @package ThemeIsle\GutenbergBlocks\Integration
 */

namespace ThemeIsle\GutenbergBlocks\Integration;

use ArrayAccess;

/**
 * Class Form_Data_Request
 */
class Form_Data_Request {

	/**
	 * Request Data.
	 *
	 * @var array
	 */
	protected $request_data = array();

	/**
	 * Integration Data.
	 *
	 * @var Form_Settings_Data
	 */
	protected $form_options = null;

	/**
	 * Constructor.
	 *
	 * @access  public
	 * @param array $request_data Request Data.
	 */
	public function __construct( $request_data ) {
		$this->request_data = $this->sanitize_request_data( $request_data );
        $this->form_options = new Form_Settings_Data( array() );
	}

    /**
     * @param Form_Settings_Data $form_options
     * @return void
     */
	public function set_form_options( $form_options) {
		$this->form_options = $form_options;
	}

	/**
	 * Get the value of the field.
	 *
	 * @param string $field_name The name of the field.
	 * @return mixed
	 */
	public function get( $field_name ) {
		return $this->is_set( $field_name ) ? $this->request_data[ $field_name ] : null;
	}

	public function get_payload_field($field_name ) {
		return $this->payload_has_field( $field_name ) ? $this->request_data['payload'][$field_name] : null;
	}

	public function payload_has_field($field_name ) {
		return $this->has_payload() && isset($this->request_data['payload'][$field_name]);
	}

	public function has_payload() {
		return isset($this->request_data['payload']);
	}

	/**
	 * Check if the value of the field is set.
	 *
	 * @param string $field_name The name of the field.
	 * @return boolean
	 */
	public function is_set( $field_name ) {
		// TODO: we can do a more refined verification like checking for empty strings or arrays.
		return isset( $this->request_data[ $field_name ] );
	}

	/**
	 * Check if the given fields are set.
	 *
	 * @param array $fields_name The name of the fields.
	 * @return boolean
	 */
	public function are_fields_set( $fields_name ) {
		return 0 < count(
			array_filter(
				array_map(
					function( $field_name ) {
						return $this->is_set( $field_name );
					},
					$fields_name
				),
				function( $is_set ) {
					return $is_set;
				}
			)
		);
	}

	/**
	 * Check if the given fields are set.
	 *
	 * @param array $fields_name The name of the fields.
	 * @return boolean
	 */
	public function are_payload_fields_set( $fields_name ) {
		return 0 < count(
				array_filter(
					array_map(
						function( $field_name ) {
							return $this->is_set( $field_name );
						},
						$fields_name
					),
					function( $is_set ) {
						return $is_set;
					}
				)
			);
	}

	public function payload_has_fields( $fields_name ) {
		foreach ($fields_name as $field_name) {
			if( !$this->payload_has_field($field_name) ) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Check if the field has one of the given values.
	 *
	 * @param string $field_name The name of the field.
	 * @param array  $values The desired values of the field.
	 * @return boolean
	 */
	public function field_has( $field_name, $values ) {
		return in_array( $this->get( $field_name ), $values, true );
	}

	public function payload_field_has( $field_name, $values ) {
		return in_array( $this->get_payload_field( $field_name ), $values, true );
	}

	/**
	 * Sanitize the request data.
	 *
	 * @param array $data The data from the request.
	 * @return array Sanitized field data.
	 */
	public static function sanitize_request_data( $data ) {
		return self::sanitize_array_map_deep($data);
	}

	public static function sanitize_array_map_deep($array)
	{
		$new = array();
		if (is_array($array) || $array instanceof ArrayAccess) {
			foreach ($array as $key => $val) {
				if (is_array($val)) {
					$new[$key] = self::sanitize_array_map_deep($val);
				} else {
					$new[$key] = sanitize_text_field($array[$key]);
				}
			}
		}
		else $new = sanitize_text_field($array);
		return $new;
	}

    /**
     * Get the form input data.
     * @return mixed Form input data.
     */
	public function get_form_inputs() {
		return $this->get_payload_field('formInputsData');
	}

    /**
     * @return Form_Settings_Data|null
     */
    public function get_form_options() {
        return $this->form_options;
    }
}
