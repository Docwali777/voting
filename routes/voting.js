const express = require('express');
const app = express()
const route = express.Router({mergeParams: true})
const votingData = require('../models/votingSchema')

app.use((res, req, next)=>{
  // res.locals.votingApp = votingApp
  console.log(votingApp);
  next()
})

route.get('/', (req, res)=>{
  res.render('index', {
    svg: '',
    votingApp: []
  })
})


route.get('/voting', (req, res)=>{
  res.render('voting')
})

route.post('/voting', (req, res)=>{
votingData.create({
  title: req.body.title,
  one: [req.body.name1],
  two: [req.body.name2]
}, (err, votingApp)=>{
  if(err){console.log('Error create voting data')}
  else {
    votingData.find({}, (err, votingApp)=>{
      if(err){console.log(err);}
      else {
        let svg = (`<script>d3.select('#chart').append('p').html(3) </script>`)
        res.render('index', {
          votingApp,
          svg
        })
      }
    })
  }
})
})

route.get('/voting/:id', (req, res)=>{
  votingData.findById(req.params.id, (err, votingApp)=>{
    if(err){console.log(err);}
    else{
// console.log(votingApp);
// console.log(req.query.choice === votingApp.two[0]);
//       if(req.query.choice === votingApp.two[0]){
// console.log(req.query.choice);
//         votingApp.two.push(req.query.choice)
// votingApp.save()
//
//       } else if(req.query.choice === votingApp.one[0]){
//   votingApp.one.push(req.query.choice)
//     votingApp.save()
//       }
//         console.log(`One: ${votingApp.one.length}}, Two: ${votingApp.two.length}`);

// console.log(votingApp);
      res.render('show', {
        svg:  (`<script>

          let h = 200,
              w = 200,
              data = [${votingApp.one.length}-1, ${votingApp.two.length}-1]


          let svg = d3.select('#chart').append('svg').attr('height', h).attr('width', w)

          let rect = svg.selectAll('rect').data(data).enter().append('rect')
          var maxYValue = d3.max(data, function(d) {
             return d
           })

           var yScale = d3.scaleLinear()
             .domain([0, maxYValue])
             .range([h, 0])

           var xScale = d3.scaleLinear()
             .domain([0, data.length])
             .range([0, w])

             var xAxis = d3.scaleLinear()
                           .domain(['${votingApp.one.slice(0,1)}', '${votingApp.two.slice(0,1)}'])
                           .range([0, w])

var color = d3.scaleOrdinal(d3.schemeCategory10)

            rect.attr('height', (d, i)=>{
              return h - yScale(d)
            })
            .transition()
            .duration(1000)
            .delay(function (d, i) {
				return i * 50;
			})
            .attr('width', (d, i)=>{
              return 70
            })
            .attr('x', (d, i)=>{
              return xScale(i)
            })
            .attr('y', (d, i)=>{
              return h - d*10
            })
            .attr('fill', (d, i)=>{
            return color(i)
            })


        </script>`),
        votingApp
      })
    }
  })
})

route.post('/voting/:id', (req, res)=>{
votingData.findById(req.params.id, (err, votingApp)=>{
  if(err){console.log('error posting voting Data')}
  else {
    // console.log(req.query.choice);
    console.log("choice: ", req.body.choice.split(',')[0]);

    if(req.body.choice ===votingApp.two[0]){
    votingApp.two.push(req.body.choice)
    votingApp.save()
    console.log(votingApp.two.length-1);
  } else if(req.body.choice ===votingApp.one[0]){
  votingApp.one.push(req.body.choice)
  votingApp.save()
  console.log(votingApp.one.length-1)
}


  res.redirect(`/voting/${votingApp._id}`)
  }
})
})

module.exports = route
