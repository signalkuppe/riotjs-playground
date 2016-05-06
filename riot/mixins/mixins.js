// app constants shared across tags
riot.mixin('CONSTANTS', {
    strings: {
        appname: 'My Appname'
    }
});

// filters shared across tags
riot.mixin('FILTERS', {
    truncate: function (input,limit) {
        return input.length > limit ? input.slice(0,limit)+' ...' : input;
    }
});

