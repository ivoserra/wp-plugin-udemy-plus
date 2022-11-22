<?php


function up_activate_plugin(){

    // activates the route and the plugin

    if(version_compare(get_bloginfo('version'), '5.9', '<')){
        wp_die(__('You must update WordPress to use this plugin', 'udemy-plus'));
    }

    up_recipe_post_type();
    flush_rewrite_rules();

    // query for table we created in admirer wp data base

    global $wpdb;
    $tableName = "{$wpdb->prefix}recipe_rating";
    $charsetCollate = $wpdb->get_charset_collate();

    $sql = " CREATE TABLE {$tableName} (
        ID bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        post_id bigint(20) unsigned NOT NULL,
        user_id bigint(20) unsigned NOT NULL,
        rating float(3,2) unsigned NOT NULL
      ) ENGINE='InnoDB' {$charsetCollate};";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    // executes the plugin for modify the table
    dbDelta($sql);
}