# JIMP Loader
Very simple webpack loader for JIMP.

This is a WIP. Currently supports:

### Resize
For resize modes use constants at https://github.com/oliver-moran/jimp/tree/master/packages/jimp#resize-modes

    ...
    test: /\.jpg$/,
    use: {
        loader: 'jimp-loader',
        options: {
            resize: {
                width: 600,
                height: 400,
                mode: 'RESIZE_BILINEAR'
            }
        }
    }
    ...

### Contain
For horizontal and vertical alignment, use JIMP constants at https://github.com/oliver-moran/jimp/tree/master/packages/jimp#align-modes.

    ...
    test: /\.jpg$/,
    use: {
        loader: 'jimp-loader',
        options: {
            contain: {
                width: 600,
                height: 400,
                halign: 'HORIZONTAL_ALIGN_LEFT'
                valign: 'VERTICAL_ALIGN_TOP',
                mode: 'RESIZE_BILINEAR'
            }
        }
    }
    ...

### Cover

    ...
    test: /\.jpg$/,
    use: {
        loader: 'jimp-loader',
        options: {
            cover: {
                width: 600,
                height: 400,
                halign: 'HORIZONTAL_ALIGN_LEFT'
                valign: 'VERTICAL_ALIGN_TOP',
                mode: 'RESIZE_BILINEAR'
            }
        }
    }
    ...

### Crop

    ...
    test: /\.jpg$/,
    use: {
        loader: 'jimp-loader',
        options: {
            crop: {
                x: 0,
                y: 0,
                width: 300
                height: 200
            }
        }
    }
    ...

You can also align the crop:

    ...
    test: /\.jpg$/,
    use: {
        loader: 'jimp-loader',
        options: {
            crop: {
                x: 0,
                y: 0,
                width: 300
                height: 200,
                alignment: {
                    vertical: 'middle', // 'top','middle' or 'bottom'
                    horizontal: 'center' // 'left', 'center' or 'right'
                }
            }
        }
    }
    ...

### Opacity

    ...
    test: /\.jpg$/,
    use: {
        loader: 'jimp-loader',
        options: {
            opacity: {
                opacity: 0.5
            }
        }
    }
    ...

### Fade

    ...
    test: /\.jpg$/,
    use: {
        loader: 'jimp-loader',
        options: {
            fade: {
                opacity: 0.5
            }
        }
    }
    ...

### Sepia

    ...
    test: /\.jpg$/,
    use: {
        loader: 'jimp-loader',
        options: {
            sepia: true
        }
    }
    ...
