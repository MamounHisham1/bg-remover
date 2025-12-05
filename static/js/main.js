$(document).ready(function() {
    let currentFilename = null;

    const $fileInput = $('#file-input');
    const $dropZone = $('#drop-zone');
    const $browseBtn = $('#browse-btn');
    
    // Verify elements exist
    if ($fileInput.length === 0 || $browseBtn.length === 0) {
        console.error('Required elements not found');
        return;
    }
    const $uploadSection = $('#upload-section');
    const $previewSection = $('#preview-section');
    const $errorSection = $('#error-section');
    const $originalPreview = $('#original-preview');
    const $resultPreview = $('#result-preview');
    const $resultPlaceholder = $('#result-placeholder');
    const $downloadBtn = $('#download-btn');
    const $newImageBtn = $('#new-image-btn');
    const $retryBtn = $('#retry-btn');
    const $errorMessage = $('#error-message');

    $browseBtn.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $fileInput.click();
    });

    $dropZone.on('click', function(e) {
        // Don't trigger if clicking the button
        if ($(e.target).is('#browse-btn') || $(e.target).closest('#browse-btn').length) {
            return;
        }
        e.preventDefault();
        $fileInput.click();
    });

    $dropZone.on('dragover', function(e) {
        e.preventDefault();
        $(this).addClass('border-primary bg-blue-50');
    });

    $dropZone.on('dragleave', function(e) {
        e.preventDefault();
        $(this).removeClass('border-primary bg-blue-50');
    });

    $dropZone.on('drop', function(e) {
        e.preventDefault();
        $(this).removeClass('border-primary bg-blue-50');
        
        const files = e.originalEvent.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    $fileInput.change(function() {
        if (this.files.length > 0) {
            handleFile(this.files[0]);
        }
    });

    $newImageBtn.click(function() {
        resetInterface();
    });

    $retryBtn.click(function() {
        resetInterface();
    });

    $downloadBtn.click(function() {
        if (currentFilename) {
            window.location.href = `/download/${currentFilename}`;
        }
    });

    function handleFile(file) {
        if (!validateFile(file)) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            $originalPreview.attr('src', e.target.result);
            showPreviewSection();
            uploadFile(file);
        };
        reader.readAsDataURL(file);
    }

    function validateFile(file) {
        const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp', 'image/webp'];
        
        if (!validTypes.includes(file.type)) {
            showError('Please select a valid image file (PNG, JPG, JPEG, GIF, BMP, WebP)');
            return false;
        }

        if (file.size > 16 * 1024 * 1024) {
            showError('File size must be less than 16MB');
            return false;
        }

        return true;
    }

    function showPreviewSection() {
        $uploadSection.hide();
        $errorSection.hide();
        $previewSection.show();
        $resultPreview.hide();
        $resultPlaceholder.show();
        $downloadBtn.prop('disabled', true);
    }

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success) {
                    currentFilename = response.filename;
                    showResult();
                } else {
                    showError(response.error || 'Upload failed');
                }
            },
            error: function(xhr) {
                const response = xhr.responseJSON;
                showError(response?.error || 'An error occurred during upload');
            }
        });
    }

    function showResult() {
        $resultPlaceholder.hide();
        $resultPreview.attr('src', `/preview/${currentFilename}`).show();
        $downloadBtn.prop('disabled', false);
        
        $resultPreview.on('load', function() {
            $(this).addClass('animate-pulse');
            setTimeout(() => {
                $(this).removeClass('animate-pulse');
            }, 1000);
        });
    }

    function showError(message) {
        $errorMessage.text(message);
        $uploadSection.hide();
        $previewSection.hide();
        $errorSection.show();
    }

    function resetInterface() {
        currentFilename = null;
        $fileInput.val('');
        $uploadSection.show();
        $previewSection.hide();
        $errorSection.hide();
        $originalPreview.attr('src', '');
        $resultPreview.attr('src', '').hide();
        $resultPlaceholder.show();
        $downloadBtn.prop('disabled', true);
    }

    $(document).on('paste', function(e) {
        const items = e.originalEvent.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                handleFile(file);
                break;
            }
        }
    });
}); 