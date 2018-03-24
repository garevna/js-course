var mkdirp = require('mkdirp')
mkdirp( 'test_mkdir', function (err) {
    if (err) console.error(err)
    else console.log('Directory created!')
})
