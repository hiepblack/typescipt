

export const Upload = async (files: any) => {
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    data.append("file", file);
    data.append("upload_preset", "eb6jpxn6");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbhyz5cgb/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const fileurl = await res.json();
    return fileurl
  }
};