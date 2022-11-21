<?php
/**
 * Plugin Name:       Udemy Plus
 * Plugin URI:        https://workshopUdemy.com
 * Description:       A plugin to adding blocks to a theme.
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.2
 * Author:            workshop udemy
 * Author URI:        https://workshopUdemy.com/
 * Text Domain:       udemy-plus
 * Domain Path:       /languages
 */

 // it checks if the function exists in wordpress and 
 if(!function_exists('add_action')){
    echo 'hi there seems like you stumble here by accident ... 🥸!';
    exit;

 };

 // Setup
 define('UP_PLUGIN_DIR', plugin_dir_path(__FILE__));


 // Includes
 $rootFiles = glob(UP_PLUGIN_DIR . 'includes/*.php');
 $subdirectoryFiles = glob(UP_PLUGIN_DIR . 'includes/**/*.php');
 $allFiles = array_merge($rootFiles, $subdirectoryFiles);

 foreach($allFiles as $filename){
   include_once($filename);
 }

/*  include(UP_PLUGIN_DIR . 'includes/register-blocks.php');
 include(UP_PLUGIN_DIR . 'includes/blocks/search-form.php');
 include(UP_PLUGIN_DIR . 'includes/blocks/page-header.php'); */


 // Hooks
 register_activation_hook(__FILE__, 'up_activate_plugin');
 add_action('init', 'up_register_blocks');
 add_action('rest_api_init', 'up_rest_api_init');
 add_action('wp_enqueue_scripts', 'up_enqueue_scripts');
 add_action('init', 'up_recipe_post_type');
 add_action('cuisine_add_form_fields', 'up_cuisine_add_form_fields');
 add_action('create_cuisine', 'up_save_cuisine_meta');
 add_action('cuisine_edit_form_fields', 'up_cuisine_edit_form_fields');
 add_action('edited_cuisine', 'up_save_cuisine_meta');
 add_action('save_post_recipe', 'up_save_post_recipe');
 add_action('after_setup_theme', 'up_setup_theme');
 add_action('image_size_names_choose', 'up_custom_image_sizes');

