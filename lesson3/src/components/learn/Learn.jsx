import React, { useState, useEffect } from "react";

const Learn = () => {
  const [count, setCount] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const handleGetImage = async () => {
      const { url } = await fetch("https://picsum.photos/200/300");
      setImage(url);
    };
    handleGetImage();
    console.log('lan',count);
  }, [count]);
  useEffect(() => {
    let timeId = setTimeout(() => {
      setCount(count + 2);
    }, 2000);
    if (count === 10) {
    return ()=> clearTimeout(timeId);
    }
  }, [count]);
  return (
    <div>
      <img src={image} alt="" />
      <button onClick={() => setCount(count + 1)}>Count + </button>
    </div>
  );
};

export default Learn;
