<?php
/*
 Plugin Name: Pugpig - <%= publicationCapitalized %> Extension
 Plugin URI: http://www.kaldorgroup.com
 Description: Custom extensions for Pugpig for <%= publicationCapitalized %>
 Version: 0.0.0
 Author: Jon Marks
 Author URI: http://www.kaldorgroup.com
*/

add_filter('pugpig_feed_post_categories', '<%= publicationLowercase %>_pugpig_feed_post_categories', 10, 2);
function <%= publicationLowercase %>_pugpig_feed_post_categories($category, $post) {
  $section = get_post_meta($post->ID, '<%= publicationLowercase %>_section');
  if (!empty($section)) {
        $section = $section[0];
        $section = ucfirst($section);
        return array($section);
  }

  // Return an empty section as this is needed to hide
  // ads from the ToC (the app isn't checking only the section scheme)
  return array("");

}

/* Include main images in the manifests */
add_filter('pugpig_extra_manifest_items', '<%= publicationLowercase %>_pugpig_extra_manifest_items',10,2);
function <%= publicationLowercase %>_pugpig_extra_manifest_items($output, $post) {

   $output .= pugpig_get_custom_field_manifest_item($post, '<%= publicationLowercase %>_image');
   $output .= pugpig_get_custom_field_manifest_item($post, '<%= publicationLowercase %>_tap_image');
   $output .= pugpig_get_custom_field_manifest_item($post, '<%= publicationLowercase %>_editor_image');
   return $output;
}


function add_links_to_inline_images($content)
{
  global $post;

  $content = preg_replace('/(<figure>\s*)(<img\s+(.*?)alt\s*=\s*([\'"]))([^\'"]+)([\'"])(.*?)(\s*<\/figure>)/', '<a href="$5"><figure data-image-nozoom>$2$5$6$7</figure></a>', $content);

  return $content;
}
add_filter('the_content', 'add_links_to_inline_images', 99999);

?>