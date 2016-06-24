(function (d, w, dti, hljs, less) {
	$('#generator-form').on('submit', function (e) {
		e.preventDefault();
		
		// reform to dict for easier access
		var arrValues = $(this).serializeArray(),
			values = {};
		
		for (var i=0; i<arrValues.length; i++) {
			var item = arrValues[i];
			values[item['name']] = item['value'];
		}
		
		// prep highlight js urls
		var hlBaseUrl = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/' + values['option_highlightjs_version'],
			completeCount = 0,
			
			hlStyleId = 'highlightjs-style-insert',
			hlStyleUrl = hlBaseUrl + '/styles/' + values['option_highlightjs_style'] + '.min.css',
			hlLangId = 'highlightjs-language-insert',
			hlLangUrl = hlBaseUrl + '/languages/' + values['option_highlightjs_language'] + '.min.js',
			
			outputHtml = $('#output-html');
		
		// empty the output
		$(outputHtml).empty();
		$('#generator-view-image').attr('hidden', 'hidden');
		
		$('#' + hlStyleId).remove();
		$.get(hlStyleUrl, function (data) {
			$(d.createElement('style')).html(data)
				.attr('id', hlStyleId).appendTo(d.head);
			
			promiseCallback();
		});
		
		$('#' + hlLangId).remove();
		$(d.createElement('script')).attr({
			id: hlLangId,
			src: hlLangUrl,
		}).on('load', function () {
			promiseCallback();
		}).appendTo(d.body);
		
		// prep less
		less.render(values['option_customize_less']).then(function (output) {
			values['option_customize_less'] = output.css;
			promiseCallback();
		});
		
		function promiseCallback () {
			completeCount++;
			
			if (completeCount == 3) {
				var customCssId = 'customize-css-insert',
					outputHtmlCodeBlock;
				
				// prep the customized html and css
				$('#' + customCssId).remove();
				$(d.createElement('style')).html(values['option_customize_less'])
					.attr('id', customCssId).appendTo(d.head);
				
				$(outputHtml).html(values['option_customize_html']);
				outputHtmlCodeBlock = $(outputHtml).find('#output-code');
				
				$(outputHtml).find('#output-filename').text(values['option_input_filename']);
				$(outputHtmlCodeBlock).text(values['option_input_code'])
					.addClass(values['option_highlightjs_language']);
				
				// splash highlighter
				hljs.highlightBlock($(outputHtmlCodeBlock)[0]);
				
				// bind dti args
				$('#generator-html-to-image').data('dti-width', values['option_customize_width'])
					.data('dti-height', values['option_customize_height']);
				
				if ('option_customize_fakeantialias' in values) {
					$(outputHtml).find('div, span, code').each(function (index, item) {
						var rgb = $(item).css('color').replace(/[^0-9,]/g, '');
						
						$(item).css('text-shadow', '0 0 1px rgba(' + rgb + ',0.3)');
					});
				}
			}
		}
	});
	
	$('#generator-html-to-image').on('click', function () {
		var outputHtml = $('#output-html');
		
		if ($.trim($(outputHtml).html()) == '') {
			alert('HTML output appears to be empty.\nPlease generate the HTML preview first.');
		}
		else {
			var dtiArgs = {
				width: $(outputHtml).width(),
				height: $(outputHtml).height(),
			};
			
			if ($(this).data('dti-width')) {
				dtiArgs['width'] = $(this).data('dti-width');
			}
			if ($(this).data('dti-height')) {
				dtiArgs['height'] = $(this).data('dti-height');
			}
			
			dti.toPng($('#output-html')[0], dtiArgs).then(function (dataUrl) {
				$('#generator-view-image').attr('href', dataUrl).removeAttr('hidden');
			});
		}
	});
})(document, window, domtoimage, hljs, less);
