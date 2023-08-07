const express = require('express');
const https = require('https');
const http = require('http');
const app = express();
const port = 3000;
const ejs = require('ejs');
const { log } = require('console');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.render('index')
});

const dateOptions = {
  day: "numeric",
  month: "short",
  year: "numeric"
}


app.post('/desco', (req, res) => {

  const meterNumber = req.body.meterNo;
  const accountNumber = req.body.accountNo;
  const endDate = req.body.endDate;
  
  let date = new Date(req.body.startDate)
  console.log(date.toLocaleDateString("en-US", dateOptions));

  const url = 'http://prepaid.desco.org.bd/api/tkdes/customer/getCustomerDailyConsumption?accountNo=' + accountNumber + '&meterNo=' + meterNumber + '&dateFrom=2023-08-01&dateTo=' + endDate;

  fetch(url)
    .then((response) => response.json())
    .then((desco) => {
      const dailyInfo = desco.data;
      res.render('desco', { dailyData: dailyInfo })
    }).catch((err) => {
      console.log(err.message);
    })

});


// let options = {
//   day: "numeric",
//   month: "short",
//   year: "numeric"
// }
// let today = new Date();
// console.log(today.toLocaleDateString("en-US", options));

app.listen(port , function(){
  console.log('Apps is listening on the port : ' + port);
});

