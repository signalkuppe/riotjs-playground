riot.tag2('post', '<div class="row"><div class="col-sm-12"><div class="page-header"><h1>{post.title}</h1></div></div></div><div class="row post-body"><div class="col-sm-12"> {post.body} </div></div><div class="row"><div class="col-sm-12"><a href="" class="btn btn-primary" onclick="{edit}">Edit post</a></div></div>', 'post .post-body,[riot-tag="post"] .post-body,[data-is="post"] .post-body{ margin-bottom: 40px; }', '', function(opts) {

        var tag = this;
            tag.id = this.opts.__proto__.id;

        db.get(tag.id).then(function (doc) {
          tag.post = doc;
          tag.update();
        }).catch(function (err) {
          console.log(err);
        });

        tag.edit = function () {
            riot.route('post/'+tag.id+'/edit')
        }

});
