const jimp = require('jimp');
const getOptions = require('loader-utils').getOptions;
const validate = require('schema-utils');

const schema = require("./schema.json");

module.exports = function(source)
{
    const options = getOptions(this);
    // console.log(options);

    var cb = this.async();
    

    validate(schema, options);

    jimp.read(source)
    .then(image => {

        if(options.resize)
        {
            //console.log(options);
            image = resize(options.resize, image);
            image.getBuffer(jimp.AUTO, cb);
        }

        if(options.contain)
        {
            //console.log(options);
            image = contain(options.contain, image);
            image.getBuffer(jimp.AUTO, cb);
        }

        if(options.cover)
        {
            //console.log(options);
            image = cover(options.cover, image);
            image.getBuffer(jimp.AUTO, cb);
        }

        if(options.crop)
        {
            image = crop(options.crop, image);
            image.getBuffer(jimp.AUTO, cb);
        }

        if(options.opacity)
        {
            image = opacity(options.opacity, image);
            image.getBuffer(jimp.AUTO, cb);
        }

        if(options.fade)
        {
            image = fade(options.fade, image);
            image.getBuffer(jimp.AUTO, cb);
        }

        if(options.sepia)
        {
            image = sepia(image);
            image.getBuffer(jimp.AUTO, cb);
        }
    }).
    then(image => {

        //contain
        //if(options.contain.height && options.contain.width)

    })
    .catch(err => {
        console.log(err);
        return cb(err);
    });
    
}

module.exports.raw = true

function getDimensions(options)
{
    width = typeof options.width == "number" ? options.width : jimp.AUTO;
    height = typeof options.height == "number" ? options.height : jimp.AUTO;

    return {
        width: width,
        height:height
    }
}

function getResizeAlgorithm(options)
{
    mode = "";

    if(options.mode)
    {
        mode = jimp[options.mode.toUpperCase()];
    }

    return mode;
}

function getAlignment(options)
{
    valign = "";

    if(options.valign)
    {
        valign = jimp[options.valign.toUpperCase()];
    }

    halign = "";

    if(options.halign)
    {
        halign = jimp[options.halign.toUpperCase()];
    }

    return {
        valign: valign,
        halign: halign
    }
}

function resize(options, image)
{
    //resize
    if(options.height && options.width)
    {
        dimensions = getDimensions(options);

        mode = getResizeAlgorithm(options);

        image.resize(dimensions.width, dimensions.height, mode);

        return image;
    }
}

function contain(options, image)
{
    if(options.height && options.width)
    {
        dimensions = getDimensions(options);

        mode = getResizeAlgorithm(options);

        alignment = getAlignment(options);

        image.contain(dimensions.width, dimensions.height, alignment.halign  | alignment.valign, mode);

        return image;
    }
}

function cover(options, image)
{
    if(options.height && options.width)
    {
        dimensions = getDimensions(options);

        mode = getResizeAlgorithm(options);

        alignment = getAlignment(options);

        image.cover(dimensions.width, dimensions.height, alignment.halign  | alignment.valign, mode);

        return image;
    }
}

function crop(options, image)
{
    // console.log("cropping");
    if((options.x || options.x === 0) && (options.y || options.y === 0) && options.width && options.height)
    {
        if(options.alignment)
        {
            switch(options.alignment.vertical)
            {
                case 'top':
                default:
                    var y = 0;
                break;

                case 'middle':
                    var y = (image.bitmap.height/2) - (options.height/2);
                break;

                case 'bottom':
                    var y = image.bitmap.height - options.height;
                break;
            }

            switch(options.alignment.horizontal)
            {
                case 'left':
                default:
                    var x = 0;
                break;

                case 'center':
                    var x = (image.bitmap.width/2) - (options.width/2);
                break;
                
                case 'right':
                    var x = image.bitmap.width - options.width;
                break;
            }

            image.crop(x, y, options.width, options.height);
        }
        else
        {
            image.crop(options.x, options.y, options.width, options.height);
        }

        return image;
    }
}

function opacity(options, image)
{
    // console.log("transparency");
    if(options.opacity || options.opacity === 0)
    {
        image.opacity(options.opacity);

        return image;
    }
}

function fade(options, image)
{
    // console.log("fading");
    if(options.opacity || options.opacity === 0)
    {
        image.fade(options.opacity);

        return image;
    }
}

function sepia(image)
{
    console.log("sepia");
    
    image.sepia();

    return image;
}
