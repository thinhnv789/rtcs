function CropperEditor(config) {
    this.config = config;

    this.init = function() {
        /**
         * Selector input file
         */
        this.selector = document.getElementById(this.config.selector);
        /**
         * Init popup cropper editor
         */
        this.initImageCrop(this.selector);
    }

    /**
     * Function init popup
     */
    this.initImageCrop = function(selector) {
        if (selector) {
            selector.addEventListener('change', function(e) {
                this.readURL(e.target);
            }.bind(this));
        }
    }

    /**
     * Event on input change
     */
    this.readURL = function(input) {
       
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var bodyNode, popup, popupOverlay, popupWrap,
                    popupContainer, popupContent, imageCrop,
                    toolbar, loading, cropBtn, zoomInBtn, zoomOutBtn,
                    rotateLef, rotateRight, submitCrop;
                
                popup = document.createElement('div');
                popup.className = 'cropper-editor-popup';

                popupOverlay = document.createElement('div');
                popupOverlay.className = 'cropper-editor-popup-overlay';

                popupWrap = document.createElement('div');
                popupWrap.className = 'cropper-editor-popup-wrap';

                popupContainer = document.createElement('div');
                popupContainer.className = 'cropper-editor-popup-container';

                popupContent = document.createElement('div');
                popupContent.className = 'cropper-editor-popup-content';

                /**
                 * Toolbar buttons
                 */
                toolbar = document.createElement('div');
                toolbar.className = 'cropper-editor-toolbar';

                var toolbars = this.config.toolbars;
                if (toolbars) {
                    /**
                     * Button crop
                     */
                    if (toolbars.crop) {
                        var icon = document.createElement('i');
                        icon.className = 'fa fa-crop';

                        cropBtn = document.createElement('button');
                        cropBtn.id = 'crop';
                        cropBtn.className = 'toolbar-button';

                        cropBtn.appendChild(icon);
                        toolbar.appendChild(cropBtn);
                    }
                    /**
                     * Button zoomIn
                     */
                    if (toolbars.zoomIn) {
                        var icon = document.createElement('i');
                        icon.className = 'fa fa-search-plus';

                        zoomInBtn = document.createElement('button');
                        zoomInBtn.id = 'zoomIn';
                        zoomInBtn.className = 'toolbar-button';

                        zoomInBtn.appendChild(icon);
                        toolbar.appendChild(zoomInBtn);
                    }
                    /**
                     * Button zoomIn
                     */
                    if (toolbars.zoomOut) {
                        var icon = document.createElement('i');
                        icon.className = 'fa fa-search-minus';

                        zoomOutBtn = document.createElement('button');
                        zoomOutBtn.id = 'zoomOut';
                        zoomOutBtn.className = 'toolbar-button';

                        zoomOutBtn.appendChild(icon);
                        toolbar.appendChild(zoomOutBtn);
                    }
                }

                /**
                 * Button submit: always exist
                 */
                var icon = document.createElement('i');
                icon.className = 'fa fa-check';

                submitCrop = document.createElement('button');
                submitCrop.id = 'submitCrop';
                submitCrop.className = 'toolbar-button';
                submitCrop.onclick = function() {
                    this.submitCrop();
                }.bind(this);

                submitCrop.appendChild(icon);
                toolbar.appendChild(submitCrop);

                imageCrop = document.createElement('img');
                imageCrop.id = 'image-crop'
                imageCrop.src = e.target.result;

                /**
                 * Create loading 
                 */
                loading = document.createElement('div');
                loading.id = 'fountainG';
                loading.style.display = 'none';

                var loadingItem;
                loadingItem = document.createElement('div');
                loadingItem.id = 'fountainG_1';
                loadingItem.className = 'fountainG';
                loading.appendChild(loadingItem);

                loadingItem = document.createElement('div');
                loadingItem.id = 'fountainG_2';
                loadingItem.className = 'fountainG';
                loading.appendChild(loadingItem);
                
                loadingItem = document.createElement('div');
                loadingItem.id = 'fountainG_3';
                loadingItem.className = 'fountainG';
                loading.appendChild(loadingItem);

                loadingItem = document.createElement('div');
                loadingItem.id = 'fountainG_4';
                loadingItem.className = 'fountainG';
                loading.appendChild(loadingItem);

                loadingItem = document.createElement('div');
                loadingItem.id = 'fountainG_5';
                loadingItem.className = 'fountainG';
                loading.appendChild(loadingItem);

                loadingItem = document.createElement('div');
                loadingItem.id = 'fountainG_6';
                loadingItem.className = 'fountainG';
                loading.appendChild(loadingItem);

                loadingItem = document.createElement('div');
                loadingItem.id = 'fountainG_7';
                loadingItem.className = 'fountainG';
                loading.appendChild(loadingItem);

                loadingItem = document.createElement('div');
                loadingItem.id = 'fountainG_8';
                loadingItem.className = 'fountainG';
                loading.appendChild(loadingItem);

                /**
                 * 
                 */
                popup.appendChild(popupOverlay);
                popup.appendChild(popupWrap);
                popupWrap.appendChild(popupContainer);
                popupContainer.appendChild(popupContent);
                popupContent.appendChild(toolbar);
                popupContent.appendChild(loading);
                popupContent.appendChild(imageCrop);

                // parentEl = this.selector.parentNode;
                // parentEl.insertBefore(popup, this.selector);
                bodyNode = document.getElementsByTagName('body');
                bodyNode[0].appendChild(popup);
                // document.body.appendChild(popup);
            }.bind(this);
            reader.readAsDataURL(input.files[0]);
            /**
             * Init cropper
             */
            setTimeout(function() {
                this.initCropper(this.config.clientOptions);
            }.bind(this), 200);
        }
    }

    /**
     * Init cropper using cropperjs lib
     */
    this.initCropper = function(config) {
        var imageCrop = document.getElementById('image-crop');
        // Destroy cropper before init
        if (this.cropper) {
          this.cropper.destroy();
        }
        this.cropper = new Cropper(imageCrop, config);
    }.bind(this);

    /**
     * Get data cropped and submit to server store
     */
    this.submitCrop = function() {
        this.cropper.getCroppedCanvas().toBlob(function (blob) {
            /**
             * Show loading and hide toolbar
             */
            var loading = document.getElementById('fountainG');
            loading.style.display = 'block';

            var toolbar = document.getElementsByClassName('cropper-editor-toolbar');
            toolbar[0].style.display = 'none';

            var formData = new FormData();
            formData.append('croppedImage', blob);
            formData.append('uploadDir', config.uploadDir);
            formData.append('prefixFileName', config.prefixFileName);
            formData.append('thumbWidth', config.thumbWidth);
            formData.append('thumbHeight', config.thumbHeight);
           
            /**
             * Post data form to server using http
             */
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/media/upload-image', true);
            xhr.onload = function (response) {
                console.log('this', response);
                /**
                 * Function create image preview item
                 */
                function createPreviewImageItem(src, fileName, selector) {
                    var prvImg = document.createElement('div');
                    prvImg.className = 'image-preview-item';

                    var rmImg = document.createElement('span');
                    rmImg.className = 'btn btn-danger btn-xs remove-image';
                    rmImg.id = 'delete-' + fileName;
                    rmImg.onclick = function() {
                        /**
                         * Remove image
                         */
                        var imgDelete = document.getElementById('delete-' + fileName);
                        if (imgDelete) {
                            imgDelete.parentNode.remove();
                        }
                        /**
                         * Remove file name in input 
                         */
                        var inputEl = document.getElementById('cropper-editor-input-' + selector);
                        if (inputEl) {
                            var inputImgVal = inputEl.value;
                            inputImgVal = inputImgVal.replace(','+fileName, '');
                            inputImgVal = inputImgVal.replace(','+fileName + ',', '');
                            inputImgVal = inputImgVal.replace(fileName, '');
                            
                            if (inputImgVal == '') {
                                inputEl.remove();

                                /**
                                 * Enable input file
                                 */
                                var inputFile = document.getElementById(selector);
                                if (inputFile) {
                                    inputFile.disabled = false;
                                    inputFile.value='';
                                    inputFile.nextSibling.style.display = 'flex';
                                }
                            } else {
                                inputEl.value = inputImgVal;
                            }
                        }
                    }.bind(selector, fileName);

                    var rmImgIcon = document.createElement('i');
                    rmImgIcon.className = 'fa fa-trash';
                    rmImg.appendChild(rmImgIcon);
                    prvImg.appendChild(rmImg);

                    var img = document.createElement('img');
                    img.src = src;

                    prvImg.appendChild(img);

                    return prvImg;
                }
                /**
                 * Remove popup cropper editor
                 */
                var cropperPopup = document.getElementsByClassName('cropper-editor-popup');
                if (cropperPopup && cropperPopup[0]) {
                    cropperPopup[0].remove();
                }

                /**
                 * Disable input file
                 */
                if (!this.config.multiple) {
                    this.selector.disabled = true;
                    this.selector.nextSibling.style.display = 'none';
                }

                /**
                 * Handle response data and execute functions
                 */
                var data = JSON.parse(response.target.responseText);

                var imgPrvItem = createPreviewImageItem(data.path, data.fileName, this.config.selector);

                var imgsPreview = document.getElementById(this.config.selector + '-image-preview');
                if (imgsPreview) {
                    imgsPreview.appendChild(imgPrvItem);
                } else {
                    imgsPreview = document.createElement('div');
                    imgsPreview.id = this.config.selector + '-image-preview';
                    imgsPreview.className = 'image-preview';

                    /**
                     * Add image
                     */
                    imgsPreview.appendChild(imgPrvItem);

                    /**
                     * Insert image preview before input
                     */
                    this.selector.parentNode.insertBefore(imgsPreview, this.selector);
                }
                /**
                 * Create input
                 */
                var inputName = this.selector.getAttribute('name');
                var inputEl = document.getElementById('cropper-editor-input-' + this.config.selector);

                if (inputEl) {
                    if (inputEl.value == '') {
                        inputEl.value += data.fileName;
                    } else {
                        inputEl.value += ',' + data.fileName;
                    }
                } else {
                    var inputEl = document.createElement('input');
                    inputEl.id = 'cropper-editor-input-' + this.config.selector;
                    inputEl.name = inputName;
                    inputEl.value += data.fileName;
                    inputEl.type = 'hidden';
                    this.selector.parentNode.insertBefore(inputEl, this.selector);
                }

            }.bind(this);
            xhr.send(formData);
        }.bind(this));
    }


}