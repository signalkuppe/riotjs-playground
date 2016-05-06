<form-post>
    <div class="row">
        <div class="col-sm-12">
            <div class="page-header">
                <h1>
                    <span if="{ id }">{ post.title }</span>
                    <span if="{ !id }">Create a new post</span>
                </h1>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <form class="form-horizontal" onsubmit="{ newPost }">
                <div class="form-group">
                    <label for="title" class="col-md-1 control-label">Title *</label>
                    <div class="col-md-10">
                        <input
                            type="text"
                            class="form-control"
                            id="title"
                            name="title"
                            value="{ post.title }"
                            placeholder="Choose a title for your post">
                    </div>
                </div>
                <div class="form-group">
                    <label for="body" class="col-md-1 control-label">Body *</label>
                    <div class="col-md-10">
                        <textarea
                            class="form-control"
                            id="body"
                            name="body"
                            value="{ post.body }"
                            cols="30"
                            rows="10"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-offset-1 col-md-2">
                        <button type="submit" class="btn btn-primary">Save</button>
                        <button if="{ id }" class="btn btn-danger" onclick="{ delete }">Delete</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="row" if="{error}">
        <div class="col-md-offset-1 col-md-10">
            <div class="alert alert-danger">Title and body are required</div>
        </div>
    </div>
    <script>
        var self = this;
        self.error = false;
        self.id = this.opts.__proto__.id; // better way the get option passed with mount?
        // edit, update the values
        if (self.id) {
            // get the post
            db.get(self.id).then(function(doc) {
                self.post = doc;
                self.update();
            }).catch(function(err) {
                console.log(err);
            });
        }
        // save
        self.newPost = function() {
                var title = self.title.value,
                    body = self.body.value;

                // validation
                if (title === '' || body === '') {
                    self.error = true;
                    return;
                }

                var post = {
                        _id: new Date().valueOf().toString(),
                        title: title,
                        body: body
                }

                //edit
                if (self.id) {
                    db.get(self.id).then(function(doc) {
                        return db.put({
                            _id: self.id,
                            _rev: doc._rev,
                            title: self.title.value,
                            body: self.body.value
                        });
                    }).then(function(response) {
                        riot.route('post/' + self.id)
                    }).catch(function(err) {
                        console.log(err);
                    });
                }

                // save new
                else {
                    db.put(post).then(function(response) {
                        riot.route('post/' + post._id)
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
            }

            // delete
            self.delete = function() {
                if (confirm('Are you sure ?')) {
                    // delete the post
                    db.get(self.id).then(function(doc) {
                        return db.remove(doc);
                    }).then(function(result) {
                        riot.route('posts')
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
                return false;
            }
    </script>
</form-post>
