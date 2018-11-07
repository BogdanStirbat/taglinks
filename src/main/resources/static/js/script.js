$(document).ready(function() {

    $.ajax({
        url: "http://localhost:8080/link/all",
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var linksHtml = '';
            data.forEach(function(link) {
                linksHtml += '<li class="li_item"' + 'data-id="' + link.id + '"data-url="' + link.url + '"data-description="' + link.description + '"> <a href="' + link.url + '">' + link.url + '</a></li>';
            });
            $('#list_links').html(linksHtml);
        },
        error: function() {
            console.log('Error.');
        }
    });

    $.ajax({
        url: 'http://localhost:8080/tag/all',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var urlsHtml = '';
            data.forEach(function(url) {
                urlsHtml += '<li class="li_url"' + 'data-id="' + url.id + '"data-name="' + url.name + '">' + url.name + '</li>';
            });
            $('#list_tags').html(urlsHtml);
        },
        error: function() {
            console.log('Error.');
        }
    });

    $(document).on("click", ".li_item", function(e) {
        e.preventDefault();
        var id = $(this).data("id");
        var url = $(this).data("url");
        var description = $(this).data("description");
        var popup = '';
        popup += '<div class="popup">';
        popup += '<div class="popup-content">';
        popup += '<p>' + url + '</p>'
        popup += '<p>' + description + '</p>'
        popup += '<button class="popup-close">Close</button>';
        popup += '</div>';
        popup += '</div>';
        $(this).append(popup);
    });

    $(document).on("click", ".li_url", function(e) {
        var id = $(this).data("id");
        var name = $(this).data("name");
        var popup = '';
        popup += '<div class="popup">';
        popup += '<div class="popup-content">';
        popup += '<p>' + name + '</p>'
        popup += '<button class="popup-close">Close</button>';
        popup += '</div>';
        popup += '</div>';
        $(this).append(popup);
    });

    $(document).on("click", ".popup-close", function(e) {
        e.preventDefault();
        $(this).parent().parent().remove();
        return false;
    });
});