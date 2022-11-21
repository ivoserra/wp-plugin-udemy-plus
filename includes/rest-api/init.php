<?php

function up_rest_api_init(){
    // example.com/wp-json/up/v1/signup
    register_rest_route('up/v1', '/signup', [
        'methods' => WP_REST_SERVER::CREATABLE, 
        'callback' => 'up_rest_api_signup_handler',
        'permission_callback' => '__return_true'
    ]);

    register_rest_route('up/v1','/signin', [
        'methods' => WP_REST_SERVER::EDITABLE,
        'callback' => 'up_rest_api_signin_handler',
        'permission_callback' => '__return_true'
    ]
    );

    register_rest_route('up/v1', '/rate', [
        'methods' => WP_REST_SERVER::CREATABLE,
        'callback' => 'up_rest_api_add_rating_handler',
        'permission_callback' => 'is_user_logged_in'
    ]);
    
}