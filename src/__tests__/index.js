global.fetch = global.fetch || require('node-fetch')

require('../service/api-tfl/__tests__')
require('../service/mesh/__tests__/buildGraph.spec')
require('../service/mesh/__tests__/flattenGraph.spec')
require('../service/mesh/__tests__/findLongestLine.spec')
