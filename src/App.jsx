import React, { useState } from "react";
import "./App.css";

export default function App() {
  const list1 = [];

  const list2 = [];

  const [listData1, setListData1] = useState(list1);
  const [listData2, setListData2] = useState(list2);
  const [dragItem, setDragItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [data, setData] = useState();

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleAddData = () => {
    const newData = {
      id: generateRandomId(),
      name: data,
      color: generateRandomColor(),
    };
    setListData1((prev) => [...prev, newData]);
    setData("");
  };

  console.log("listData1", listData1);

  const handleDragStart = (e, index, listName) => {
    const draggedItem =
      listName === "list1" ? listData1[index] : listData2[index];
    setDragItem(draggedItem);
    setDragSource(listName);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropItem = (e, index, listName) => {
    e.preventDefault();

    let newListData1 = [...listData1];
    let newListData2 = [...listData2];

    // Remove item from source list
    if (dragSource === "list1") {
      newListData1 = newListData1.filter((item) => item.id !== dragItem.id);
      setListData1(newListData1);
    } else {
      newListData2 = newListData2.filter((item) => item.id !== dragItem.id);
      setListData2(newListData2);
    }

    // Add item to target list
    if (listName === "list1") {
      newListData1.splice(index, 0, dragItem);
      setListData1(newListData1);
    } else {
      newListData2.splice(index, 0, dragItem);
      setListData2(newListData2);
    }

    setDragItem(null);
    setDragSource(null);
  };

  const handleDragEnd = () => {
    setDragItem(null);
    setDragSource(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "5px",
        }}
      >
        <input
          style={{
            width: "50%",
            outline: "none",
            borderRadius: "4px",
            display: "block",
            border: "1px solid #ccc",
          }}
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        &nbsp;
        <button
          onClick={handleAddData}
          style={{
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#79a8f2",
          }}
        >
          Add Item
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {/* First list */}
        <div
          style={{
            border: "1px solid grey",
            width: "200px",
            justifyContent: "center",
            minHeight: "200px",
          }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropItem(e, listData1.length, "list1")}
        >
          {listData1.map((item, index) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, index, "list1")}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropItem(e, index, "list1")}
              onDragEnd={handleDragEnd}
              key={item.id}
              style={{
                textAlign: "center",
                backgroundColor: item.color,
                padding: "10px",
                cursor: "pointer",
                margin: "5px",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Second list (initially empty) */}
        <div
          style={{
            border: "1px solid grey",
            width: "200px",
            justifyContent: "center",
            minHeight: "200px",
          }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropItem(e, listData2.length, "list2")}
        >
          {listData2.map((item, index) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, index, "list2")}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropItem(e, index, "list2")}
              onDragEnd={handleDragEnd}
              key={item.id}
              style={{
                textAlign: "center",
                backgroundColor: item.color,
                padding: "10px",
                cursor: "pointer",
                margin: "5px",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
