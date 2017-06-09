const bar = 2

let createSVG =() =>{
return  `<script>d3.select('#chart').append('p').html(${bar})</script>`
}

module.exports = createSVG()
