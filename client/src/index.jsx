import React,{ useState } from 'react';
import ReactDOM from 'react-dom';




export default function App() {
  const [warehouses, setWarehouses] = useState([]);
  const [inventories, setInventories] = useState([{id: '12', name: 'key', quantity: 4} ]);



  return (
    <div>
      <h2>Inventory tracker</h2>
      <label htmlFor="warehouse">Select a WareHouse</label>
      <select id="warehouse-list">
      </select>
      <div className="inputs">
        <label htmlFor="warehouse-input">Warehouse Name</label>
        <input id="warehouse-input" type="input"></input>
        <button id="add-warehouse">Add WareHouse Location</button>
      </div>
      <div className="inputs">
        <label htmlFor="inventory-input">Item Name</label>
        <input id="inventory-input" type="input"></input>
        <label htmlFor="inventory-input-quantity">Item Quantity</label>
        <input id="inventory-input-quantity" type="number"></input>
        <button id="add-inventory">Add WareHouse Location</button>
      </div>
      <div id="inventory">
        <h3 id="warehouse-location">Please Select a Ware House</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
            {inventories.map((item, i) => 
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
              </tr>
            )}
          </thead>
        </table>
      </div>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById('app'));
