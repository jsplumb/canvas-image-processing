const g = require('./gatlight')

const fp = require("../release-pkg.json"),
    p = require("../package.json")

fp.version = p.version


g.write("./dist/package.json", JSON.stringify(fp, 4, 4))

