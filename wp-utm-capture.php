<?php
/*
Plugin Name:  UTM Capture for AppExchange Links
Plugin URI:   https://www.cyfunolabs.com
Description:  Captures any UTM Parameters as a cookie and appends them to any AppExchange links on the site.
Version:      1.0
Author:       Adam Erstelle
Author URI:   https://www.cyfunolabs.com
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  wp-utmcapture
Domain Path:  /languages
*/

function utmcapture_enqueue() {
    wp_enqueue_script('jquery-cookie', 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js', array('jquery'), '3.0.5', false);
    wp_enqueue_script('utmcapture-script', plugins_url('/js/script.js', __FILE__), array('jquery-cookie'), '1.0.0', false);
}

if( ! is_admin()) {
    add_action('wp_enqueue_scripts', 'utmcapture_enqueue');
}