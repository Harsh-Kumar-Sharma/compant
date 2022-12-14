
import './App.css';
//import axios from 'axios';
import { useState,useEffect } from 'react';
// import axios from './promises';

function App() {
  const [products,setProducts]=useState([]);
//   function sets() {
//     axios.get("https://api.webroot.net.in/products.php").then((result) => {
//         // console.log(result);
//         // console.log(result.data);
//         setProducts(result.data);
//     })

// }
function sets(){
  fetch("http://localhost:3001/something",{method:"GET"}).then((resp)=>resp.json()).then((result=>{
   
  console.log(result);
  setProducts(result.data);
  }))
}
console.log(products)

useEffect(() => { sets(); }, []);
  return (
    <>
    <div className="App" style={{backgroundColor:"#191d28"}}>
      {/* <axios/> */}
      <div className=" row">
     <div className='col-lg-2'>
     <img src="https://hodlinfo.com/static/media/HODLINFO.8f78fc06.png" style={{padding:"10px"}} width="70%"/>

     </div>
      <div className='col-lg-6 right-header'>
      <div className="btn-group"><button type="button" aria-haspopup="true" aria-expanded="false" class="header-button dropdown-toggle btn btn-secondary">INR</button><div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu"><a value="INR" tabindex="0" role="menuitem" class="dropdown-item" href="/BTC-INR">INR</a></div></div>

      </div>
      <div className='col-lg-2'>
      <img src="https://hodlinfo.com/static/media/HODLINFO.8f78fc06.png" style={{padding:"10px"}} width="70%"/>

      </div>

      </div>
    
    </div>
  

<table className='table table-borderless text-center' style={{backgroundColor:"#191d28",color:"#fff"}}>
 <thead>
 <tr>
   <th className='table-text'>#</th>
   <th className='table-text'>Plateform</th>
   <th className='table-text'>Last Traded Price</th>
   <th className='table-text'>Buy/Sell Price</th>
   <th className='table-text'>Volume</th>
   <th className='table-text'>base_unit</th>
 </tr>
 </thead>
 <tbody >
 {products.map((r,index) =>
                <tr style={{ listStyle: "none" }}>
                    <td>{index+1}</td>
                    <td>{r.name}</td>
                    <td>{r.last}</td>
                    <td>{r.sell}/{r.buy}</td>
                    <td>{r.volume}</td>
                    <td>{r.base_unit}</td>
                </tr>
            )}
  

 </tbody>

</table>


    </>

  );
}

export default App;
