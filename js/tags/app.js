riot.tag2('app', '<navbar page="{page}"></navbar><div class="container"><div class="row"><div class="col-md-12"><div id="view"></div></div></div></div>', '', '', function(opts) {

        var tag = this;

        riot.route.start(stop);
        riot.route.start(true);

        riot.route(function (collection, id, action) {

            var page = collection === '' ? 'home' : collection;

            tag.page = page;
            tag.update();

            if(page === 'home')
                riot.mount('#view','home');

            if(page === 'posts') {
                if(!id)
                    riot.mount('#view','posts');
                else
                    riot.mount('#view','form-post');
            }

            if(page === 'post') {
                if(!action)
                    riot.mount('#view','post',{id:id});
                else
                    riot.mount('#view','form-post',{id:id});
            }

            if(page === 'ajax')
                riot.mount('#view','ajax');
        })
});
