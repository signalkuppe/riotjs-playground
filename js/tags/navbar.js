
riot.tag2('navbar', '<nav class="navbar navbar-default navbar-static-top"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="#">{appname}</a></div><div id="navbar" class="navbar-collapse collapse"><ul class="nav navbar-nav"><li class="{active: opts.page===\'home\'}"><a href="#">Home</a></li><li class="{active: opts.page.indexOf(\'post\')!==-1}"><a href="#posts">Posts</a></li></ul><ul class="nav navbar-nav navbar-right"><li class="{active: opts.page===\'ajax\'}"><a href="#ajax">Ajax request</a></li></ul></div></div></nav>', '', '', function(opts) {
        this.mixin('CONSTANTS')
        this.appname = this.strings.appname;
});


