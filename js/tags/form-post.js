riot.tag2('form-post', '<div class="row"><div class="col-sm-12"><div class="page-header"><h1><span if="{id}">{post.title}</span><span if="{!id}">Create a new post</span></h1></div></div></div><div class="row"><div class="col-md-12"><form class="form-horizontal" onsubmit="{newPost}"><div class="form-group"><label for="title" class="col-md-1 control-label">Title *</label><div class="col-md-10"><input type="text" class="form-control" id="title" name="title" value="{post.title}" placeholder="Choose a title for your post"></div></div><div class="form-group"><label for="body" class="col-md-1 control-label">Body *</label><div class="col-md-10"><textarea class="form-control" id="body" name="body" value="{post.body}" cols="30" rows="10"></textarea></div></div><div class="form-group"><div class="col-md-offset-1 col-md-2"><ul class="list-unstyled list-inline"><li><button type="submit" class="btn btn-primary">Save</button></li><li><button if="{id}" class="btn btn-danger" onclick="{delete}">Delete</button></li></ul></div></div></form></div></div>', '', '', function(opts) {
        this.mixin('CONSTANTS');
        var tag = this;
        tag.error = false;
        tag.id = this.opts.__proto__.id;

        if (tag.id) {

            db.get(tag.id).then(function(doc) {
                tag.post = doc;
                tag.update();
            }).catch(function(err) {
                console.log(err);
            });
        }

        tag.newPost = function() {
                var title = tag.title.value,
                    body = tag.body.value;

                if (title === '' || body === '') {
                    riot.mount('alert',{type:'danger',message: tag.messages.post_validation_error })
                    return;
                }

                var post = {
                        _id: new Date().valueOf().toString(),
                        title: title,
                        body: body
                }

                if (tag.id) {
                    db.get(tag.id).then(function(doc) {
                        return db.put({
                            _id: tag.id,
                            _rev: doc._rev,
                            title: tag.title.value,
                            body: tag.body.value
                        });
                    }).then(function(response) {
                        riot.route('post/' + tag.id)
                        riot.mount('alert',{type:'success',message: tag.messages.post_updated })
                    }).catch(function(err) {
                        console.log(err);
                    });
                }

                else {
                    db.put(post).then(function(response) {
                        riot.route('post/' + post._id)
                        riot.mount('alert',{type:'success',message: tag.messages.post_saved })
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
            }

            tag.delete = function() {
                if (confirm('Are you sure ?')) {

                    db.get(tag.id).then(function(doc) {
                        return db.remove(doc);
                    }).then(function(result) {
                        riot.route('posts')
                        riot.mount('alert',{type:'success',message: tag.messages.post_deleted })
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
                return false;
            }
});
