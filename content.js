jQuery.fn.matrixTabsMod = function(options) {
    return this.each(function() {
        var $ = jQuery;
        var select = $(this);
        var multiselect = select.attr('multiple');
        select.hide();

        var buttonsHtml = $('<div class="select2OptionPicker"></div>');
        var selectIndex = 0;
        var addOptGroup = function(optGroup) {
            if (optGroup.attr('label')) {
                buttonsHtml.append('<strong>' + optGroup.attr('label') + '</strong>');
            }
            var ulHtml = $('<ul class="select-buttons">');
            optGroup.children('option').each(function() {
                var img_src = $(this).data('img-src');
                var color = $(this).data('color');

                var liHtml = $('<li></li>');
                if ($(this).attr('disabled') || select.attr('disabled')) {
                    liHtml.addClass('disabled');
                    liHtml.append('<span>' + $(this).html() + '</span>');
                } else {
                    var className = $(this).html();
                    className = className.toLowerCase();
                    className = className.replace(' ', '-');
                    if (className == '------') {
                      className = 'divider';
                    }
                    if (color) {
                        liHtml.append('<a href="#" style="background-color:' + color + '" data-select-index="' + selectIndex + '">&nbsp;</a>');
                    } else if (img_src) {
                        liHtml.append('<a href="#" data-select-index="' + selectIndex + '"><img class="image_picker" src="' + img_src + '"></a>');
                    } else {
                        liHtml.append('<a href="#" data-select-index="' + selectIndex + '" class="' + className + '">' + $(this).html() + '</a></li>');
                    }
                    liHtml.addClass(className);
                }

                // Mark current selection as "picked"
                if ((!options || !options.noDefault) && $(this).attr('selected')) {
                    liHtml.children('a, span').addClass('picked');
                }
                ulHtml.append(liHtml);
                selectIndex++;
            });
            buttonsHtml.append('<div id="customTitle"></div>');
            buttonsHtml.append(ulHtml);
        }

        var optGroups = select.children('optgroup');
        if (optGroups.length == 0) {
            addOptGroup(select);
        } else {
            optGroups.each(function() {
                addOptGroup($(this));
            });
        }

        //select.after(buttonsHtml);

        jQuery('.sq-backend-main-header-wrapper').before(buttonsHtml);

        buttonsHtml.find('a').click(function(e) {
            e.preventDefault();
            var clickedOption = $(select.find('option')[$(this).attr('data-select-index')]);
            if (multiselect) {
                if (clickedOption.attr('selected')) {
                    $(this).removeClass('picked');
                    clickedOption.removeAttr('selected');
                } else {
                    $(this).addClass('picked');
                    clickedOption.attr('selected', 'selected');
                }
            } else {
                if ($(this).hasClass('picked')) {
                    $(this).removeClass('picked');
                    clickedOption.removeAttr('selected');
                } else {
                    buttonsHtml.find('a, span').removeClass('picked');
                    $(this).addClass('picked');
                    clickedOption.attr('selected', 'selected');
                }
            }
            select.trigger('change');
        });
    });
};

//custom
jQuery(document).ready(function() {
  function initEnhancements() {
    var assetIcon = jQuery('.sq-backend-heading-icon span').clone();
    var assetName = jQuery('.info_asset_finder .sq-tag-line').clone();
    var printBtn = jQuery('.sq-screen-menu span').clone();
    jQuery('.sq-backend-body-wrapper.header').css('background-color', '#666');
    jQuery('body.sq.main').css('background-color', '#e2e8e7');
    jQuery('body.sq').css('background-color', '#e2e8e7');
    jQuery('#asset_map_container').css('background-color', '#e2e8e7');
    jQuery('div.iframe-container.header').css('border-bottom', 'none');
    jQuery('div.iframe-container.header').css('background', 'none');
    jQuery('*[data-screen="metadata"]').css('background', '#FFBF47');
    jQuery('*[data-screen="lookupValues"]').css('background', '#FFBF47');
    jQuery('#asset_map_container .tree .assetName').css('font-size', '13px');
    jQuery('#screen_menu_go').hide();
    jQuery('#screen_menu').matrixTabsMod();
    jQuery('#screen_menu').change(function() {
      self.location = this.value;
    });
    jQuery('#customTitle').append(assetIcon);
    jQuery('#customTitle').append(assetName);
    jQuery('#customTitle').append(printBtn);
  }
  initEnhancements();
  jQuery('.main iframe').on('load', function() {
    jQuery('.select2OptionPicker .sq-info-asset-name').remove();
    jQuery('#screen_menu').matrixTabsMod();
    jQuery('#screen_menu').change(function() {
      self.location = this.value;
    });
    var assetIcon = jQuery('.sq-backend-heading-icon > span').clone();
    var assetName = jQuery('.info_asset_finder .sq-tag-line').clone();
    var printBtn = jQuery('.sq-screen-menu > span').clone();
    jQuery('#customTitle').append(assetIcon);
    jQuery('#customTitle').append(assetName);
    jQuery('#customTitle').append(printBtn);
  });
});
