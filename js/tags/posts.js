riot.tag2('posts', '<div class="row"><div class="col-sm-12"><div class="page-header"><h1>Posts <ul class="list-unstyled list-inline pull-right"><li><a if="{posts.length > 0}" href="" class="btn btn-danger pull-right" onclick="{delete}">Delete all posts</a></li><li><a if="{posts.length > 0}" href="#posts/new" class="btn btn-primary pull-right">New post</a></li></ul></h1></div></div></div><div class="row" if="{posts.length === 0}"><div class="col-sm-12"> No posts found. <a href="#posts/new">create one?</a></div></div><div class="row" each="{posts}" if="{posts.length > 0}"><div class="col-sm-12"><h3><a href="#post/{_id}">{title}</a></h3><p>{truncate(body,250)}</p></div></div>', '', '', function(opts) {
        this.mixin('FILTERS')
        var tag = this;
        tag.posts = [];

        db.allDocs({
          include_docs: true,
          attachments: true
        }).then(function (result) {
          tag.posts = result.rows.map(function(r){ return r.doc;});
          tag.update();
        }).catch(function (err) {
          console.log(err);
        });

        tag.delete = function () {
            if(confirm('Are you sure ?')) {
                db.allDocs().then(function (result) {
                  return Promise.all(result.rows.map(function (row) {
                    return db.remove(row.id, row.value.rev);
                  }));
                }).then(function () {
                  tag.posts = [];
                  tag.update();
                }).catch(function (err) {
                  console.log(error)
                });
            }
            return false;
        }
});
