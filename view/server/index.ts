import 'ignore-styles'
require('@babel/register')({
    ignore:[/(node_module)/],
    presets:['@babel/preset-env','@babel/preset-react','@babel/typescript']
})
import './server'