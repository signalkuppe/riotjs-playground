<alert>
  <div class="{ classes() }" if={ !hidden }>
    <button if="{ opts.dismissable }" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
    { opts.message }
  </div>
  <style scoped>
    .alert {
      position: fixed;
      right: 20px;
      top: 20px;
      z-index: 10000;
    }
  </style>
  <script>
    this.mixin('SETTINGS')
    var tag = this;

    this.classes = function () {
      var class = 'alert ';
      if(opts.type === 'success')
       class +="alert-success";
      if(opts.type === 'danger')
        class +="alert-danger";
      if(opts.type === 'warning')
        class +="alert-warning";
      if(opts.dismissable)
        class +=" alert-dismissable";
      return class;
    }

    if(!opts.dismissable) {
      setTimeout(function(){
        tag.hidden = true;
        tag.update();
      },tag.settings.alert.timeout)
    }

  </script>
</alert>
