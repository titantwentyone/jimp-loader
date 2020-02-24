const jimp = require('jimp');
const getOptions = require('loader-utils').getOptions;
const validate = require('schema-utils');

const schema = require("./schema.json");

module.exports = function(source)
{
    const options = getOptions(this);

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
    }).
    then(image => {

        //contain
        //if(options.contain.height && options.contain.width)

    })
    .catch(err => {
        console.log(err);
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