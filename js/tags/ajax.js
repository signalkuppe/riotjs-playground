riot.tag2('ajax', '<div class="row"><div class="col-sm-12"><div class="page-header"><h1>Ajax get request</h1><small>http://jsonplaceholder.typicode.com/posts</small></div></div></div><div class="row"><div class="col-sm-12 text-center" if="{progress}"><i class="fa fa-lg fa-cog fa-spin"></i> Loading posts... </div></div><div class="row" if="{error}"><div class="col-sm-12 text-center"><div class="alert alert-danger"> An error occured, please try again </div></div></div><div class="row" if="{posts}" each="{posts}"><div class="col-sm-12"><h3>{title}</h3><p>{body}</p></div></div>', '', '', function(opts) {
        var self = this;
        var request = $.ajax({
            url: 'http://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            dataType: 'json',
            beforeSend: function() {
                self.progress = true;
            }
        });
        request.done(function(response) {
            if (response.length) self.posts = response.splice(0, 10);
        });
        request.fail(function(jqXHR, textStatus) {
            self.error = true;
        });
        request.always(function(response) {
            self.progress = false;
            self.update();
        });
});
