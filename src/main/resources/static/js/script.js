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
        popup += '<button class="popup-link-delete">Delete</button>';
        popup += '<div id="delete_link_error" class="error"></div>'
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
        popup += '<button class="popup-tag-delete">Delete</button>';
        popup += '</div>';
        popup += '</div>';
        loadLinksForTag(id);
        $(this).append(popup);
    });

    $(document).on("click", ".popup-link-delete", function(e) {
        e.preventDefault();
        var initialContext = $(this);
        var id = $(this).parent().parent().parent().data("id");
        var name = $(this).parent().parent().parent().data("name");
        $.ajax({
            url: 'http://localhost:8080/link/' + id,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json",
            success: function(data) {
                loadAllLinks();
                //resetAddNewLink(initialContext);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#delete_link_error").html('<p>An error has ocurred.</p>');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

        return false;
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

    $(document).on("click", ".new_link", function(e) {
        if ($(this).hasClass("selected")) {
            return false;
        }

        $(this).addClass("selected");
        var innerHtml = '';
        innerHtml += '<div class="add_link_popup">';
        innerHtml += '<label>Url: </label>  <input name="url" id="url" type="text">';
        innerHtml += '<label>Description: </label>  <input name="description" id="description" type="text">';
        innerHtml += '<br>';
        innerHtml += '<button class="popup-new-link-close">Close</button>';
        innerHtml += '<button class="popup-new-link-add">Add</button>';
        innerHtml += '<div id="add_new_link_error" class="error"></div>'
        innerHtml += '</div>';
        $(this).html(innerHtml);

        return false;
    });

    $(document).on("click", ".popup-new-link-close", function(e) {
        resetAddNewLink($(this));
        return false;
    });

    $(document).on("click", ".popup-new-link-add", function(e) {
        var initialContext = $(this);
        var url = $("#url").val();
        var description = $("#description").val();
        if (url.length == 0) {
            $("#add_new_link_error").html('<p>Url cannot be empty!</p>');
            return false;
        }
        $.ajax({
            url: "http://localhost:8080/link",
            type: 'POST',
            data: JSON.stringify({"url": url, "description": description}),
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                loadAllLinks();
                resetAddNewLink(initialContext);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#add_new_link_error").html('<p>An error ocurred submitting data.</p>');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
        return false;
    });

    function resetAddNewLink(domElement) {
        var innerHtml = '';
        innerHtml += '<div class="new_link">';
        innerHtml += '<p>Add a new link.</p>';
        innerHtml += '</div>';
        domElement.parent().parent().removeClass("selected");
        domElement.parent().html(innerHtml);
    }

    $(document).on("click", ".new_tag", function(e) {
        if ($(this).hasClass("selected")) {
            return false;
        }

        $(this).addClass("selected");
        var innerHtml = '';
        innerHtml += '<div class="add_tag_popup">';
        innerHtml += '<label>Name: </label>  <input name="name" id="name" type="text">';
        innerHtml += '<br>';
        innerHtml += '<button class="popup-new-tag-close">Close</button>';
        innerHtml += '<button class="popup-new-tag-add">Add</button>';
        innerHtml += '<div id="add_new_tag_error" class="error"></div>'
        innerHtml += '</div>';
        $(this).html(innerHtml);

        return false;
    });

    $(document).on("click", ".popup-new-tag-close", function(e) {
        resetAddNewTag($(this));
        return false;
    });

    $(document).on("click", ".popup-new-tag-add", function(e) {
        var initialContext = $(this);
        var name = $("#name").val();
        if (name.length == 0) {
            $("#add_new_tag_error").html('<p>Name cannot be empty!</p>');
            return false;
        }
        $.ajax({
            url: "http://localhost:8080/tag",
            type: 'POST',
            data: JSON.stringify({"name": name}),
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                loadAllTags();
                resetAddNewTag(initialContext);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#add_new_tag_error").html('<p>An error ocurred submitting data.</p>');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
        return false;
    });

    function resetAddNewTag(domElement) {
        var innerHtml = '';
        innerHtml += '<div class="new_tag">';
        innerHtml += '<p>Add a new tag.</p>';
        innerHtml += '</div>';
        domElement.parent().parent().removeClass("selected");
        domElement.parent().html(innerHtml);
    }

    function loadAllLinks() {
        $.ajax({
            url: "http://localhost:8080/link/all",
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                computeAndAppendHtmlForLinks(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error.');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
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
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error.');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
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
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error.');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
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
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error.');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

});