
"use strict";
const path = require("path");


module.exports = {
    devServer: {
 
        proxy: {
            '/api': {
                target: 'http://49.232.145.124:8000',
                changeOrigin: true,
 
            },
        }
    }
}