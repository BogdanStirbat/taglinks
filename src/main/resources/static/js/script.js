$(document).ready(function() {

    loadAllLinks();

    loadAllTags();

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
        popup += '<button class="popup-close" data-type="link">Close</button>';
        popup += '</div>';
        popup += '</div>';
        loadTagsForLink(id);
        $(this).append(popup);
    });

    $(document).on("click", ".li_tag", function(e) {
        var id = $(this).data("id");
        var name = $(this).data("name");
        var popup = '';
        popup += '<div class="popup">';
        popup += '<div class="popup-content">';
        popup += '<p>' + name + '</p>'
        popup += '<button class="popup-close" data-type="tag">Close</button>';
        popup += '</div>';
        popup += '</div>';
        loadLinksForTag(id);
        $(this).append(popup);
    });

    $(document).on("click", ".popup-close", function(e) {
        e.preventDefault();
        var type = $(this).data("type");
        if (type == 'link') {
            loadAllTags();
        }
        if (type == 'tag') {
            loadAllLinks();
        }
        $(this).parent().parent().remove();
        return false;
    });

    function loadAllLinks() {
        $.ajax({
            url: "http://localhost:8080/link/all",
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                computeAndAppendHtmlForLinks(data);
            },
            error: function() {
                console.log('Error.');
            }
        });
    }

    function loadAllTags() {
        $.ajax({
            url: 'http://localhost:8080/tag/all',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                computeAndAppendHtmlForTags(data);
            },
            error: function() {
                console.log('Error.');
            }
        });
    }

    function computeAndAppendHtmlForLinks(links) {
        var linksHtml = '';
        links.forEach(function(link) {
            linksHtml += '<li class="li_item"' + 'data-id="' + link.id + '"data-url="' + link.url + '"data-description="' + link.description + '"> <a href="' + link.url + '">' + link.url + '</a></li>';
        });
        $('#list_links').html(linksHtml);
    }

    function computeAndAppendHtmlForTags(tags) {
        var urlsHtml = '';
        tags.forEach(function(tag) {
            urlsHtml += '<li class="li_tag"' + 'data-id="' + tag.id + '"data-name="' + tag.name + '">' + tag.name + '</li>';
        });
        $('#list_tags').html(urlsHtml);
    }

    function loadTagsForLink(link_id) {
        $.ajax({
            url: 'http://localhost:8080/linktag/all/link/' + link_id,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                computeAndAppendHtmlForTags(data);
            },
            error: function() {
                console.log('Error.');
            }
        });
    }

    function loadLinksForTag(tag_id) {
        $.ajax({
            url: 'http://localhost:8080/linktag/all/tag/' + tag_id,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                computeAndAppendHtmlForLinks(data);
            },
            error: function() {
                console.log('Error.');
            }
        });
    }
});