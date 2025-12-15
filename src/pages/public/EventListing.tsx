import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, SlidersHorizontal } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    date: "July 15, 2024",
    location: "Central Park, NY",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
    price: "From $49",
    slug: "summer-music-festival-2024",
    attendees: 450,
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    date: "August 20, 2024",
    location: "Convention Center, SF",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    price: "From $199",
    slug: "tech-conference-2024",
    attendees: 280,
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "September 5, 2024",
    location: "Downtown, LA",
    category: "Food & Drink",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    price: "From $35",
    slug: "food-wine-expo",
    attendees: 180,
  },
  {
    id: 4,
    title: "Art Gallery Opening",
    date: "October 10, 2024",
    location: "Museum District, Chicago",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400&h=300&fit=crop",
    price: "Free",
    slug: "art-gallery-opening",
    attendees: 120,
  },
  {
    id: 5,
    title: "Jazz Night Live",
    date: "November 12, 2024",
    location: "Blue Note, NYC",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop",
    price: "From $65",
    slug: "jazz-night-live",
    attendees: 95,
  },
  {
    id: 6,
    title: "Startup Pitch Competition",
    date: "December 1, 2024",
    location: "Tech Hub, Austin",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    price: "From $25",
    slug: "startup-pitch-competition",
    attendees: 200,
  },
];

const categories = ["All", "Music", "Business", "Food & Drink", "Community"];

export default function EventListing() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="gt-gradient-primary py-16">
        <div className="gt-container text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Browse Events
          </h1>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Discover amazing events happening near you
          </p>
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gt-input-search max-w-lg mx-auto"
          />
        </div>
      </div>

      <div className="gt-container py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-smooth ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <button className="gt-btn-ghost">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredEvents.length}
          </span>{" "}
          events
        </p>

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((event) => (
            <Link key={event.id} to={`/events/${event.slug}`}>
              <div className="gt-card overflow-hidden group h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="gt-badge bg-white/20 backdrop-blur-sm text-white">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/90 text-sm">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-border">
                    <span className="font-bold text-primary">
                      {event.price}
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      Get tickets →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <button className="gt-icon-btn" disabled>
            ←
          </button>
          <button className="w-10 h-10 rounded-xl bg-primary text-white font-medium">
            1
          </button>
          <button className="w-10 h-10 rounded-xl hover:bg-muted font-medium transition-smooth">
            2
          </button>
          <button className="w-10 h-10 rounded-xl hover:bg-muted font-medium transition-smooth">
            3
          </button>
          <button className="gt-icon-btn">→</button>
        </div>
      </div>
    </div>
  );
}
