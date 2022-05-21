import React,{ useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



export default function App() {
  const [data, setData] = useState({});
  const [msg,setMsg] = useState('');
  const [err,setErr] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [inputs, setInputs] = useState({warehouse: '', name:'', quantity: 0});
  
  const errStr = 'Request Didnt go through, check your input and try again'

  const handleInputChange = (e) => {
    const cpyInput = {...inputs };
    cpyInput[e.target.name] = e.target.value;
    setInputs(cpyInput);
    console.log(inputs)
  }

  const resetMsg = () => {
    setErr('');
    setMsg('');
  };


  const handleWarehouseSubmit = async() => {
    try {
      resetMsg();
      if (!inputs.warehouse) return;
      let {data, status} = await axios.post('/api/warehouse', {warehouse: inputs.warehouse} , {
        headers: {
          'Content-Type': 'application/json'
        }
      });
        setData(data.data);
        setMsg(data.msg);
    }
    catch (err) {
      setErr(errStr);
    }
  };

  const handleItemDelete = async(id,i) => {
    try {
      resetMsg();
      let res = await axios.delete(`/api/${warehouse}/${id}`);
      if (res.status === 201) {
       let cpyData = {...data};
       cpyData[warehouse].splice(i,1);
        setData(cpyData);
      }
    }
    catch(err){
      setErr(errStr);
    }
  }

  const handleAddItem = async() => {
    try {
      resetMsg();
      if (Number(quantity) < 1 || !inputs.name) return;
      let res = await axios.post('/api', {name: inputs.name, quantity: inputs.quantity, warehouse } , {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 200) {
        let cpyData = {...data};
        cpyData[warehouse].push(res.data.data)
        setData(cpyData);
        setMsg(res.data.msg);
      }
    }
    catch(err){
      setErr(errStr);
    }
  }

  const handleQuantityChange = async(id, quantity) => {
    try {
      resetMsg();
      if (typeof Number(quantity) !== 'number') return;
      let res = await axios.put('/api', {id, quantity, warehouse} , {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 204) {
        let cpyData = {...data};
        cpyData[warehouse] = cpyData[warehouse].map(item => {
          if (item.id === id) {
            item.quantity = quantity;
          }
          return item;
        });
        setData(cpyData);
        setMsg('Item Updated')
      }
    }
    catch(err) {
      setErr(errStr);
    }
  }

  useEffect(() => {
    const getData = async() => {
      let {data, status} = await axios.get('/api/warehouse');
      if (status === 200) {
        setData(data);
        const warehouse = Object.keys(data);
        if (warehouse) {
          setWarehouse(warehouse[0]);
        }
      } else {
        setErr(err);
      }
    }
    getData()
  }, []);
  

  return (
    <div>
      {msg? <h1>{msg}</h1> : <></>}
      {err? <h1>{err}</h1> : <></>}
      <h2>Inventory tracker</h2>
      <label htmlFor='warehouse'>Select a WareHouse</label>
      <select id='warehouse-list' onChange={(e) => setWarehouse(e.target.value)}>
        {Object.keys(data).map((key, i) =>
          <option key={key} value={key}>{key}</option>
        )}
      </select>
      <div className='inputs'>
        <label htmlFor='warehouse-input'>Warehouse Name</label>
        <input id='warehouse-input' type='input' name='warehouse' value={inputs.warehouse} onChange={e =>handleInputChange(e)}/>
        <button id='add-warehouse' onClick={e => handleWarehouseSubmit()}>Add WareHouse Location</button>
      </div>
      <div className='inputs'>
        <label htmlFor='inventory-input'>Item Name</label>
        <input id='inventory-input' type='input' name='name' value={inputs.name} onChange={e => handleInputChange(e)}/>
        <label htmlFor='inventory-input-quantity'>Item Quantity</label>
        <input id='inventory-input-quantity' type='number' name='quantity' min='1' value={inputs.quantity} onChange={e => handleInputChange(e)}/>
        <button id='add-inventory' onClick={() => handleAddItem ()}>Add Item</button>
      </div>
      <div id='inventory'>
        <h3 id='warehouse-location'>Please Select a Ware House</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Options</th>
            </tr>
            {warehouse? data[warehouse].map((item, i) => 
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td><input type='number' name='quantity' min='1' value={item.quantity} onChange={e => handleQuantityChange(item.id, e.target.value)}/></td>
                <td><button onClick={() => handleItemDelete(item.id, i)}>Delete</button></td>
              </tr>
            )
          :
          <></>
          }
          </thead>
        </table>
      </div>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById('app'));
