var client_id = config.CLIENT_ID;
var verify_api_key_request = 'https://api.twitch.tv/kraken/users/44322889?client_id=' + client_id
var query_streams_request = 'https://api.twitch.tv/kraken/streams/?game=Super%20Smash%20Bros.%20Melee'

function addStreamToHTML(stream) {
    var new_node = document.createElement('div');

    var a = document.createElement('a');
    var link_text = document.createTextNode(stream.channel.name + '\n');
    a.append(link_text);
    a.href = stream.channel.url;

    var img = document.createElement('img');
    img.src = stream.preview.medium;

    new_node.appendChild(a);
    new_node.appendChild(img);

    var stream_list = document.getElementById("streams");
    stream_list.appendChild(new_node);
}

$.ajax({
    type: 'GET',
    url: query_streams_request,
    headers: {
        'Client-ID': client_id
    },
    success: function(data) {
        for (var i = 0 ; i < data.streams.length ; i++) {
            addStreamToHTML(data.streams[i]);
        }
    }
});
