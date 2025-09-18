import { useState } from "react";

export default function ArtistForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);  // multiple photos
  const [videoFiles, setVideoFiles] = useState([]);  // multiple videos
  const [loading, setLoading] = useState(false);

  const uploadToCloudinary = async (file, resourceType = "image") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Indori Singers");
    formData.append("cloud_name", "dbwrqjkns");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dbwrqjkns/${resourceType}/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !imageFile) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);
    try {
      // Upload main profile image
      const imageUrl = await uploadToCloudinary(imageFile);

      // Upload photos
      const photoUrls = await Promise.all(
        photoFiles.map((file) => uploadToCloudinary(file, "image"))
      );

      // Upload videos
      const videoUrls = await Promise.all(
        videoFiles.map((file) => uploadToCloudinary(file, "video"))
      );

      // Build payload
      const artistData = {
        name,
        category,
        price,
        bio,
        image: imageUrl,
        photos: photoUrls,
        videos: videoUrls,
      };

      const res = await fetch("http://localhost:5000/api/artists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artistData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Artist added!");
        setName(""); setCategory(""); setPrice(""); setBio("");
        setImageFile(null); setPhotoFiles([]); setVideoFiles([]);
      } else {
        alert(`❌ Failed: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error adding artist");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Add Artist</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded"
          value={name} onChange={(e) => setName(e.target.value)} />

        <select className="w-full p-2 border rounded"
          value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="singer">Singer</option>
          <option value="dj">DJ</option>
          <option value="dancer">Dancer</option>
          <option value="band">Live Band</option>
          <option value="anchor">Anchor</option>
          <option value="sufi-band">Sufi Band</option>
        </select>

        <input type="number" placeholder="Price" className="w-full p-2 border rounded"
          value={price} onChange={(e) => setPrice(e.target.value)} />

        <textarea placeholder="Bio" className="w-full p-2 border rounded"
          value={bio} onChange={(e) => setBio(e.target.value)} />

        {/* Profile Image */}
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

        {/* Multiple Photos */}
        <input type="file" accept="image/*" multiple
          onChange={(e) => setPhotoFiles(Array.from(e.target.files))} />

        {/* Multiple Videos */}
        <input type="file" accept="video/*" multiple
          onChange={(e) => setVideoFiles(Array.from(e.target.files))} />

        <button type="submit" disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {loading ? "Saving..." : "Save Artist"}
        </button>
      </form>
    </div>
  );
}
