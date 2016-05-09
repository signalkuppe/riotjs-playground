riot.tag2('ajax', '<div class="row"><div class="col-sm-12"><div class="page-header"><h1>Ajax get request</h1><small>http://jsonplaceholder.typicode.com/posts</small></div></div></div><div class="row"><div class="col-sm-12 text-center" if="{progress}"><i class="fa fa-lg fa-cog fa-spin"></i> Loading posts... </div></div><div class="row" if="{error}"><div class="col-sm-12 text-center"><div class="alert alert-danger"> An error occured, please try again </div></div></div><div class="row" if="{posts}" each="{posts}"><div class="col-sm-12"><h3>{title}</h3><p>{body}</p></div></div>', '', '', function(opts) {
        this.mixin('CONSTANTS');
        var tag = this;
        var request = $.ajax({
            url: 'http://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            dataType: 'json',
            beforeSend: function() {
                tag.progress = true;
            }
        });
        request.done(function(response) {
            if (response.length)
              tag.posts = response.splice(0, 10);
            riot.mount('alert',{type:'success',message: tag.messages.ajax_success })
        });
        request.fail(function(jqXHR, textStatus) {
            tag.error = true;
            riot.mount('alert',{type:'danger',message: tag.messages.ajax_error })
        });
        request.always(function(response) {
            tag.progress = false;
            tag.update();
        });
});
