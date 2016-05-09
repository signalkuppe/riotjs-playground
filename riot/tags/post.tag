<post>
    <div class="row">
        <div class="col-sm-12">
            <div class="page-header">
                <h1>{ post.title }</h1> </div>
        </div>
    </div>
    <div class="row post-body">
        <div class="col-sm-12">
            { post.body }
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <a href="" class="btn btn-primary" onclick="{ edit }">Edit post</a>
        </div>
    </div>
    <!-- no posts -->
    <style scoped>
        .post-body {
            margin-bottom: 40px;
        }
    </style>
    <script>

        var tag = this;
            tag.id = this.opts.__proto__.id; // better way the get option passed with mount?

        // get the post
        db.get(tag.id).then(function (doc) {
          tag.post = doc;
          tag.update();
        }).catch(function (err) {
          console.log(err);
        });

        // edit
        tag.edit = function () {
            riot.route('post/'+tag.id+'/edit')
        }

    </script>
</post>
