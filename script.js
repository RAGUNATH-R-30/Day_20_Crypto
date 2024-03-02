let div_margin = document.createElement("div")
div_margin.className="margin"

let row =document.createElement("div")
row.className = "row modified d-flex justify-content-between"

let left_div = document.createElement("div")
left_div.id = "left-div"
left_div.className = "col-sm-12 col-md-12 col-lg-3"

let right_div = document.createElement("div")
right_div.id = "right-div"
right_div.className ="col col-sm-12 col-md-12 col-lg-8"

div_margin.append(row)
row.append(left_div,right_div)
document.body.append(div_margin)


global_data();
currency_data();

//This function is used to fetch and display the Global cryptocoins data.
async function global_data(){
    let global_api_data =await fetch("https://api.coinlore.net/api/global/")
    let response =await global_api_data.json();

    let h2 = document.createElement("h2")
    h2.innerText ="Global Data"

    let global_div = document.createElement("div")
    global_div.append(h2)
    global_div.innerHTML=`<div class="card bg-light mb-3" id ="left-card" style="max-width: 18rem;">
    <div class="card-header"><h2>Global Data</h2></div>
    <div class="card-body">
    <p><b>Coins Count:</b>${response[0].coins_count}.</p>
    <p><b>Bitcoin Domination:</b>${response[0].btc_d}%.</p>
    <p><b>Ethereum Domination:</b>${response[0].eth_d}%.</p>
    <p><b>Total Marketcap:</b>${response[0].total_mcap}.</p>
    <p><b>Total Volume:</b>${response[0].total_volume}.</p>
    <p><b>Volume Change:</b>${response[0].volume_change}%.</p>
    <p><b>Marketcap Change:</b>${response[0].mcap_change}%.</p>
    <p><b>Average Change:</b>${response[0].avg_change_percent}%.</p>
    <p><b>Active Markets:</b>${response[0].active_markets}.</p>
    </div>
  </div>`

    left_div.append(global_div)
}

//This function is used to fetch and display the 100 cryptocoins data.
async function currency_data(){
    let currency_data_api =await fetch("https://api.coinlore.net/api/tickers/?start=1&limit=100")
    let response = await currency_data_api.json()
    var rightdiv = document.getElementById("right-div")

    var coins_data_div = document.createElement("div")
    coins_data_div.className="coins-data-div"
    coins_data_div.innerHTML = "<h2>Coins Informations</h2>"
    right_div.append(coins_data_div)

    for(let i =0;i<response.data.length;i++){
        var currency_card = document.createElement("div")
        currency_card.className="currency-card"
        currency_card.innerHTML =`<div class="card">
        <h5 class="card-header">${response.data[i].name}-${response.data[i].symbol}.</h5>
        <div class="card-body">
          <p>Price to usd: ${response.data[i].price_usd}.</p>
          <p>Percent Change 24h: ${response.data[i].percent_change_24h}%.</p>
          <p>Percent Change 1h: ${response.data[i].percent_change_1h}%.</p>
          <p>Percent Change 7d: ${response.data[i].percent_change_7d}%.</p>
          <p>Market Cap Usd: ${response.data[i].market_cap_usd}.</p>
          <p>Volume 24h: ${response.data[i].volume24}.</p>
          <p>Circulating Supply: ${response.data[i].csupply}.</p>
          <p>Total Supply: ${response.data[i].tsupply}.</p>
        </div>
      </div>`
      rightdiv.append(currency_card)
    }
}
