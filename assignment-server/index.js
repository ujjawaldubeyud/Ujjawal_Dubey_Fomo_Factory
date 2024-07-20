const express = require('express')
const axios = require('axios')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
const port = 3005;
app.use(cors());
app.use(express.json())
const uri = "mongodb+srv://ujjawaldubeyud2012:Ud123456@my-cluster.pjtr7ho.mongodb.net/?retryWrites=true&w=majority&appName=my-cluster"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const tokenSchema = new mongoose.Schema({
  BTC: Object,
  DOGE: Object,
  USDT: Object,
  SOL: Object,
  fetchedAt: { type: Date, default: Date.now }
});

const Token = mongoose.model('Token', tokenSchema);

const getRealTimeTokenData = async () => {
	try {
		const response = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,DOGE,USDT,SOL&tsyms=INR', {
			headers: {
				'Authorization': "5ba92f6255142bdf89f611601917639ef0106e8fd675230f1deaf6706e08a724"
			}
		})
        const tokenData = response.data;
        const newTokenData = new Token({
          BTC: tokenData.RAW.BTC,
          DOGE: tokenData.RAW.DOGE,
          USDT: tokenData.RAW.USDT,
          SOL: tokenData.RAW.SOL,
          fetchedAt: new Date()
        });
         await newTokenData.save();
	} catch (error) {
		console.log(error, "Failed to fetch token data")
	}
}


app.get('/get/token/data', (req, res) => {
	try {
		getRealTimeTokenData()
        res.send("Data Sent To MongoDB Successfully")
	} catch (error) {
		res.status(500).send("Internal Error Occured")
	}
})

app.get('/get/token/mongo', async(req, res) => {
	try {
        const tokens = await Token.find().sort({ fetchedAt: -1 }).limit(20); 
        res.send(tokens);
	} catch (error) {
		res.status(500).send("Internal Error Occured")
	}
})

app.listen(port, () => {
	console.log(`Service running on port: ${port}`)
})