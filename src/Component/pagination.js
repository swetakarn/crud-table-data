import React, { useEffect, useState } from "react";

const Pagination = () => {
  const [items, setItems] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({ title: "", completed: false });

  const itemperpage = 10;

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const newdata = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await newdata.json();
    console.log(data);
    setItems(data);
  };

  const starti = (currentpage - 1) * itemperpage;
  const endIndex = starti + itemperpage;

  const itemtoshow = items.slice(starti, endIndex);

  //TO CREATE

  const addnewItem = async () => {

    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      fetchdata();
      setFormData({ title: "", completed: false });
    }
    console.log(response)
  };
  return (
    <div>
      <h>API CALL</h>
      <div>
        <h>Add new Item</h>
        <input
          type="text"
          placeholder="Add title"
          value={formData.title}
          onChange={(e) => setFormData(e.target.value)}
        />
        <label>Completed</label>
        <input
          type="checkbox"
          checked={formData.completed}
          onChange={(e) => {
            setFormData({
              ...formData,
              completed: e.target.checked,
            });
          }}
        />
        <button onClick={addnewItem}>Add Item</button>
      </div>
      <table border={1}>
        <tr>
          <th>Id</th>
          <th>Completed</th>
          <th>User id </th>
          <th>Title</th>
        </tr>
        {itemtoshow.map((item) => {
          return (
            <>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.completed ? "yes" : "No"}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
              </tr>
            </>
          );
        })}
      </table>

      <div>
        <button
          onClick={() => setCurrentPage(currentpage - 1)}
          disabled={currentpage === 1}
        >
          pre page
        </button>
        <span> page {currentpage}</span>
        <button
          onClick={() => setCurrentPage(currentpage + 1)}
          disabled={endIndex >= indexedDB.length}
        >
          next page{" "}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
