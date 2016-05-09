// app constants shared across tags
riot.mixin('CONSTANTS', {
	strings: {
		appname: 'My Appname'
	},
	messages: {
    ajax_success: 'Ajax requested completed!',
    ajax_error: 'Ops, an error occurred',
    post_saved: 'Post saved!',
    post_updated: 'Post updated!',
    post_deleted: 'Post deleted!',
    posts_deleted: 'All posts were deleted',
    post_validation_error: 'Title and body are required'
	}
});

// settings shared across tags
riot.mixin('SETTINGS', {
  settings : {
    alert: {
      timeout: 2000
    }
  }
});

// filters shared across tags
riot.mixin('FILTERS', {
	truncate: function(input, limit) {
		return input.length > limit ? input.slice(0, limit) + ' ...' : input;
	}
});
