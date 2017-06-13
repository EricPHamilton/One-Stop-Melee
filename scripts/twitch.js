var client_id = config.CLIENT_ID;
var verify_api_key_request = 'https://api.twitch.tv/kraken/users/44322889?client_id=' + client_id
var query_streams_request = 'https://api.twitch.tv/kraken/streams/?game=Super%20Smash%20Bros.%20Melee'

window.addEventListener('click', function(e){
    console.log(e.target.href);
    if(e.target.href !== undefined){
        chrome.tabs.create({url : e.target.href})
    }
})

function openURL(url) {
    window.open(url);
}

function addStreamToHTML(stream) {
    var new_node = document.createElement('div');

    var link = document.createElement('a');
    var link_text = document.createTextNode(stream.channel.name + '\n');
    link.append(link_text);
    link.href = stream.channel.url;

    var img = document.createElement('img');
    img.src = stream.preview.medium;
    img.href = stream.channel.url;

    //img_container is created for the sole reason to have the cursor turn into the 'clickable' status.
    //The href bound to img_container does nothing.
    var img_container = document.createElement('a');
    img_container.href = stream.channel.name;
    img_container.appendChild(img);

    new_node.appendChild(link);
    new_node.appendChild(img_container);

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
