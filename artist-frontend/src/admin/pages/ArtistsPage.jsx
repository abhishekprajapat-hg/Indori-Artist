import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const token = localStorage.getItem("adminToken");

  // Fetch all artists
  const fetchArtists = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/artists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setArtists(data);
    } catch (err) {
      console.error("Error fetching artists:", err);
    }
  };

  // Save new order to backend
  const saveOrder = async (reorderedFiltered) => {
    try {
      const payload = reorderedFiltered.map((a, index) => ({
        id: a._id,
        order: index,
      }));

      console.log("Sending reorder payload:", payload);

      await fetch(`${import.meta.env.VITE_API_URL}/admin/artists/reorder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: selectedCategory,
          updates: payload,
        }),
      });
    } catch (err) {
      console.error("Error saving order:", err);
    }
  };

  // Handle drag end
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Only reorder artists inside selected category
    const filtered = artists.filter(
      (a) => selectedCategory === "all" || a.category === selectedCategory
    );

    const reordered = Array.from(filtered);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    // Update global artists list with new order
    const newArtists = artists.map((a) => {
      const found = reordered.find((r) => r._id === a._id);
      return found || a;
    });

    setArtists(newArtists);

    // Save to backend
    saveOrder(reordered);
  };

  // Update artist
  const updateArtist = async (id, artist) => {
    await fetch(`${import.meta.env.VITE_API_URL}/admin/artists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(artist),
    });
    fetchArtists();
  };

  // Delete artist
  const deleteArtist = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/admin/artists/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchArtists();
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Apply filters
  const filteredArtists = artists.filter((a) => {
    if (selectedCategory !== "all" && a.category !== selectedCategory)
      return false;

    if (timeFilter !== "all") {
      const createdAt = new Date(a.createdAt);
      const now = new Date();

      if (
        timeFilter === "today" &&
        createdAt.toDateString() !== now.toDateString()
      )
        return false;

      if (timeFilter === "week") {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return createdAt >= oneWeekAgo;
      }

      if (timeFilter === "month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return createdAt >= oneMonthAgo;
      }
    }
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Artists</h1>
        <Link
          to="/add-artist"
          className="px-4 py-2 rounded bg-indigo-600 text-white shadow hover:bg-indigo-700"
        >
          + Add Artist
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded bg-white dark:bg-gray-800"
        >
          <option value="all">All Categories</option>
          <option value="singer">Singer</option>
          <option value="dj">DJ</option>
          <option value="dancer">Dancer</option>
          <option value="band">Live Band</option>
          <option value="anchor">Anchor</option>
          <option value="sufi-band">Sufi Band</option>
        </select>

        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="border px-3 py-2 rounded bg-white dark:bg-gray-800"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Table with drag-and-drop */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="artists">
            {(provided) => (
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-w-full border-collapse"
              >
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Created</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArtists.map((a, index) => (
                    <Draggable key={a._id} draggableId={a._id} index={index}>
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border-t dark:border-gray-700"
                        >
                          <td className="px-6 py-3 cursor-move">☰</td>
                          <td className="px-6 py-3">{a.name}</td>
                          <td className="px-6 py-3">{a.category}</td>
                          <td className="px-6 py-3">₹{a.price}</td>
                          <td className="px-6 py-3">
                            {new Date(a.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-3 flex gap-2">
                            <button
                              onClick={() =>
                                updateArtist(a._id, {
                                  ...a,
                                  name: prompt("New name", a.name) || a.name,
                                })
                              }
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => deleteArtist(a._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
