riot.tag2('post', '<div class="row"><div class="col-sm-12"><div class="page-header"><h1>{post.title}</h1></div></div></div><div class="row post-body"><div class="col-sm-12"> {post.body} </div></div><div class="row"><div class="col-sm-12"><a href="" class="btn btn-primary" onclick="{edit}">Edit post</a></div></div>', 'post .post-body,[riot-tag="post"] .post-body,[data-is="post"] .post-body{ margin-bottom: 40px; }', '', function(opts) {
        var self = this;
            self.id = this.opts.__proto__.id;

        db.get(self.id).then(function (doc) {
          self.post = doc;
          self.update();
        }).catch(function (err) {
          console.log(err);
        });

        self.edit = function () {
            riot.route('post/'+self.id+'/edit')
        }

});
