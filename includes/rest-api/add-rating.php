<?php

function up_rest_api_add_rating_handler($request){
    $response = ['status' => 1];
    $params = $request->get_json_params();

    if(!isset($params['rating'], $params['postID']) ||
        empty($params['rating']) || empty($params['postID'])
    ){
       return $response;
    }

    $rating = round(floatval($params['rating']), 1);
    $postID = absint( $params['postID'] );
    $userID = get_current_user_id();

    global $wpdb;

    // function to pass a query
    $wpdb->get_results($wpdb->prepare(
        // statement placeholder : 
        // %d : integer
        // %f : float(decimals)
        // %s : string
        // %b : boolean

        "SELECT * FROM {$wpdb->prefix}recipe_ratings WHERE post_id = %d AND user_id = %d",
        $postID, $userID
    ));

    if($wpdb->num_rows > 0){
        return $response;
    }

    // insert the recipe
    $wpdb->insert(
        "{$wpdb->prefix}recipe_ratings",
        [
            'post_id' => $postID,
            'user_id' => $userID,
            'rating' => $rating,
            //'date' => date('Y-m-d H:i:s')
        ],
        ['%d','%f','%d']
    );

    // it will end a query and return the calculation of a query
    $avgRating = round(wpdb->get_var($wpdb->prepare(
        "SELECT AVG(`rating`) FROM {$wpdb->prefix}recipe_ratings WHERE post_id = %d",
        $postID
    )), 1);

    // update post metadata
    upadte_post_meta($postID, 'recipe_rating', $avgRating);

    $response['status']= 2;
    $response['rating']= $avgRating;
    return $response;
}