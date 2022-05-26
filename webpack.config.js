const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const { VueLoaderPlugin } = require('vue-loader')


const getAllEntries = function (dirPath, entriesObjects, ENTRY_REGEXP) {
    excludeDir = ['env', 'node_modules', '__pycache__']
    dirPath = dirPath || path.resolve(__dirname);
    entriesObjects = entriesObjects || {};
    ENTRY_REGEXP = ENTRY_REGEXP || /entry.*\.js/i;

    files = fs.readdirSync(dirPath)

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (!excludeDir.includes(file)) {
                // console.log(file)
                entriesObjects = getAllEntries(dirPath + "/" + file, entriesObjects, ENTRY_REGEXP);
            }
        } else {
            if (ENTRY_REGEXP.test(file)
                && !dirPath.includes('bundle')
                && dirPath.includes('static')) {

                let commonPath = dirPath.replace(__dirname, '');
                let inFile = '.' + path.join(commonPath, "/", file);
                let outFile = '.' + path.join(
                    commonPath,
                    "/bundle/",
                    file.replace('.js', '_bundle.js'));

                entriesObjects[inFile] = {
                    import: inFile,
                    filename: outFile
                }
            }
        }
    })
    return entriesObjects
}

module.exports = {
    entry: getAllEntries(),
    output: {
        path: path.resolve(__dirname)
    },
    plugins: [
        new VueLoaderPlugin()
        // new HTMLWebpackPlugin({
        //   template: './demidov_webpack/main/templates/main/index.html'
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            // {
            //   test: /\.(ttf|woff|woff2|eot)$/,
            //   use: [{
            //     loader: 'file-loader',
            //     options: {
            //       name: '[name].[ext]',
            //       outputPath: function (url, resourcePath, context) {
            //         pathToFont = path.dirname(resourcePath);
            //         pathToFont = pathToFont.replace(context, '').replace('/', '');
            //         console.log(`${pathToFont}/${url}`);
            //         return `${pathToFont}/${url}`
            //       },
            //       emitFile: false,

            //     }
            //   }
            //   ]
            // }
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ],
    },
}