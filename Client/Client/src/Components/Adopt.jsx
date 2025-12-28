import { useEffect, useMemo, useState } from "react";
import "./Adopt.css";

function BasketIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 10L4 21H20L18 10H6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 10L12 3L15 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 22s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function HeartIcon({ className, filled }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21s-7-4.35-9.5-8.5C.4 9.2 2.1 5.8 5.7 5.2c1.9-.3 3.5.5 4.6 1.7 1.1-1.2 2.7-2 4.6-1.7 3.6.6 5.3 4 3.2 7.3C19 16.65 12 21 12 21Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AidIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 3h10a2 2 0 0 1 2 2v16H5V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 11h4M12 9v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DonateIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21s-7-4.35-9.5-8.5C.4 9.2 2.1 5.8 5.7 5.2c1.9-.3 3.5.5 4.6 1.7 1.1-1.2 2.7-2 4.6-1.7 3.6.6 5.3 4 3.2 7.3C19 16.65 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RescueIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2l8 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8l8-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 14h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const fallbackPets = [
  // Dogs
  {
    id: 1,
    name: "Sheru",
    breed: "Indian Pariah",
    gender: "Male",
    age: "3 years",
    location: "Hingna Road",
    type: "dog",
    needsRescue: false,
    needsMedical: false,
    needsDonate: false,
    lat: 21.0968,
    lng: 78.9814,
  },
  {
    id: 2,
    name: "Rex",
    breed: "Labrador",
    gender: "Male",
    age: "2 years",
    location: "Sadar",
    type: "dog",
    needsRescue: true,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1456,
    lng: 79.0882,
  },
  {
    id: 3,
    name: "Luna",
    breed: "Golden Retriever",
    gender: "Female",
    age: "4 years",
    location: "Dharampeth",
    type: "dog",
    needsRescue: false,
    needsMedical: true,
    needsDonate: false,
    lat: 21.1523,
    lng: 79.0801,
  },
  {
    id: 4,
    name: "Max",
    breed: "German Shepherd",
    gender: "Male",
    age: "5 years",
    location: "Seminary Hills",
    type: "dog",
    needsRescue: true,
    needsMedical: false,
    needsDonate: true,
    lat: 21.1389,
    lng: 79.0654,
  },
  {
    id: 5,
    name: "Bella",
    breed: "Beagle",
    gender: "Female",
    age: "1 year",
    location: "Itwari",
    type: "dog",
    needsRescue: false,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1623,
    lng: 79.0923,
  },

  // Cats
  {
    id: 6,
    name: "Mimi",
    breed: "Persian Mix",
    gender: "Female",
    age: "2 years",
    location: "Sadar",
    type: "cat",
    needsRescue: false,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1456,
    lng: 79.0882,
  },
  {
    id: 7,
    name: "Whiskers",
    breed: "Siamese",
    gender: "Male",
    age: "3 years",
    location: "Futala",
    type: "cat",
    needsRescue: true,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1289,
    lng: 79.0456,
  },
  {
    id: 8,
    name: "Shadow",
    breed: "Maine Coon",
    gender: "Male",
    age: "4 years",
    location: "Dharampeth",
    type: "cat",
    needsRescue: false,
    needsMedical: true,
    needsDonate: false,
    lat: 21.1523,
    lng: 79.0801,
  },
  {
    id: 9,
    name: "Lily",
    breed: "British Shorthair",
    gender: "Female",
    age: "1 year",
    location: "Hingna Road",
    type: "cat",
    needsRescue: false,
    needsMedical: false,
    needsDonate: true,
    lat: 21.0968,
    lng: 78.9814,
  },

  // Squirrels
  {
    id: 10,
    name: "Chiku",
    breed: "Indian Palm Squirrel",
    gender: "Male",
    age: "6 months",
    location: "Seminary Hills",
    type: "squirrel",
    needsRescue: true,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1389,
    lng: 79.0654,
  },
  {
    id: 11,
    name: "Nibbles",
    breed: "Three-striped Squirrel",
    gender: "Female",
    age: "8 months",
    location: "Futala",
    type: "squirrel",
    needsRescue: false,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1289,
    lng: 79.0456,
  },

  // Goats
  {
    id: 12,
    name: "Balu",
    breed: "Desi Goat",
    gender: "Male",
    age: "2 years",
    location: "Itwari",
    type: "goat",
    needsRescue: false,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1623,
    lng: 79.0923,
  },
  {
    id: 13,
    name: "Chhaya",
    breed: "Jamnapari",
    gender: "Female",
    age: "3 years",
    location: "Hingna Road",
    type: "goat",
    needsRescue: false,
    needsMedical: true,
    needsDonate: true,
    lat: 21.0968,
    lng: 78.9814,
  },
  {
    id: 14,
    name: "Ramu",
    breed: "Barbari",
    gender: "Male",
    age: "1 year",
    location: "Sadar",
    type: "goat",
    needsRescue: true,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1456,
    lng: 79.0882,
  },

  // Horses
  {
    id: 15,
    name: "Badal",
    breed: "Pony",
    gender: "Male",
    age: "5 years",
    location: "Futala",
    type: "horse",
    needsRescue: false,
    needsMedical: true,
    needsDonate: false,
    lat: 21.1289,
    lng: 79.0456,
  },
  {
    id: 16,
    name: "Storm",
    breed: "Marwari",
    gender: "Male",
    age: "7 years",
    location: "Dharampeth",
    type: "horse",
    needsRescue: false,
    needsMedical: false,
    needsDonate: true,
    lat: 21.1523,
    lng: 79.0801,
  },
  {
    id: 17,
    name: "Princess",
    breed: "Arabian",
    gender: "Female",
    age: "4 years",
    location: "Seminary Hills",
    type: "horse",
    needsRescue: true,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1389,
    lng: 79.0654,
  },

  // Cows
  {
    id: 18,
    name: "Gauri",
    breed: "Desi Cow",
    gender: "Female",
    age: "6 years",
    location: "Dharampeth",
    type: "cow",
    needsRescue: false,
    needsMedical: false,
    needsDonate: true,
    lat: 21.1523,
    lng: 79.0801,
  },
  {
    id: 19,
    name: "Kamdhenu",
    breed: "Gir",
    gender: "Female",
    age: "8 years",
    location: "Hingna Road",
    type: "cow",
    needsRescue: false,
    needsMedical: true,
    needsDonate: false,
    lat: 21.0968,
    lng: 78.9814,
  },
  {
    id: 20,
    name: "Lakshmi",
    breed: "Sahiwal",
    gender: "Female",
    age: "5 years",
    location: "Itwari",
    type: "cow",
    needsRescue: true,
    needsMedical: false,
    needsDonate: true,
    lat: 21.1623,
    lng: 79.0923,
  },

  // Buffalo
  {
    id: 21,
    name: "Mahadev",
    breed: "Murrah",
    gender: "Male",
    age: "4 years",
    location: "Sadar",
    type: "buffalo",
    needsRescue: false,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1456,
    lng: 79.0882,
  },
  {
    id: 22,
    name: "Shakti",
    breed: "Nili-Ravi",
    gender: "Female",
    age: "6 years",
    location: "Futala",
    type: "buffalo",
    needsRescue: false,
    needsMedical: true,
    needsDonate: true,
    lat: 21.1289,
    lng: 79.0456,
  },

  // Ox
  {
    id: 23,
    name: "Bhim",
    breed: "Ongole",
    gender: "Male",
    age: "7 years",
    location: "Dharampeth",
    type: "ox",
    needsRescue: false,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1523,
    lng: 79.0801,
  },
  {
    id: 24,
    name: "Balram",
    breed: "Gir",
    gender: "Male",
    age: "9 years",
    location: "Seminary Hills",
    type: "ox",
    needsRescue: true,
    needsMedical: true,
    needsDonate: false,
    lat: 21.1389,
    lng: 79.0654,
  },

  // Camel
  {
    id: 25,
    name: "Sahara",
    breed: "Bikaneri",
    gender: "Male",
    age: "10 years",
    location: "Hingna Road",
    type: "camel",
    needsRescue: false,
    needsMedical: false,
    needsDonate: true,
    lat: 21.0968,
    lng: 78.9814,
  },

  // Desi Dogs
  {
    id: 26,
    name: "Kalu",
    breed: "Desi Dog",
    gender: "Male",
    age: "2 years",
    location: "Manewada",
    type: "dog",
    needsRescue: false,
    needsMedical: false,
    needsDonate: false,
    lat: 21.0968,
    lng: 79.029,
  },
  {
    id: 27,
    name: "Gudiya",
    breed: "Desi Dog",
    gender: "Female",
    age: "1.5 years",
    location: "Bardi",
    type: "dog",
    needsRescue: true,
    needsMedical: false,
    needsDonate: false,
    lat: 21.165,
    lng: 79.06,
  },

  // Desi Cats
  {
    id: 28,
    name: "Chutki",
    breed: "Desi Cat",
    gender: "Female",
    age: "1 year",
    location: "Jaripatka",
    type: "cat",
    needsRescue: false,
    needsMedical: false,
    needsDonate: true,
    lat: 21.18,
    lng: 79.08,
  },
  {
    id: 29,
    name: "Motu",
    breed: "Desi Cat",
    gender: "Male",
    age: "3 years",
    location: "Dharampeth",
    type: "cat",
    needsRescue: true,
    needsMedical: true,
    needsDonate: false,
    lat: 21.1523,
    lng: 79.0801,
  },

  // Desi Cows & Buffalo/Sheep
  {
    id: 30,
    name: "Nandini",
    breed: "Desi Cow",
    gender: "Female",
    age: "7 years",
    location: "Mhalgi Nagar",
    type: "cow",
    needsRescue: false,
    needsMedical: true,
    needsDonate: true,
    lat: 21.1,
    lng: 79.08,
  },
  {
    id: 31,
    name: "Bhola",
    breed: "Desi Bull",
    gender: "Male",
    age: "6 years",
    location: "Hudkeshwar",
    type: "ox",
    needsRescue: true,
    needsMedical: false,
    needsDonate: false,
    lat: 21.07,
    lng: 79.1,
  },

  // Pigs
  {
    id: 32,
    name: "Gulabo",
    breed: "Desi Pig",
    gender: "Female",
    age: "2 years",
    location: "Mankapur",
    type: "pig",
    needsRescue: false,
    needsMedical: false,
    needsDonate: true,
    lat: 21.19,
    lng: 79.1,
  },
  {
    id: 33,
    name: "Lallu",
    breed: "Desi Pig",
    gender: "Male",
    age: "3 years",
    location: "Sadar",
    type: "pig",
    needsRescue: true,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1456,
    lng: 79.0882,
  },

  // Sheep
  {
    id: 34,
    name: "Dholu",
    breed: "Desi Sheep",
    gender: "Male",
    age: "2 years",
    location: "Futala",
    type: "sheep",
    needsRescue: false,
    needsMedical: false,
    needsDonate: false,
    lat: 21.1289,
    lng: 79.0456,
  },
  {
    id: 35,
    name: "Bhuri",
    breed: "Desi Sheep",
    gender: "Female",
    age: "1.5 years",
    location: "Itwari",
    type: "sheep",
    needsRescue: true,
    needsMedical: false,
    needsDonate: true,
    lat: 21.1623,
    lng: 79.0923,
  },
];

function getImageSrcForPet(petId) {
  const imageIndex = ((petId - 1) % 30) + 1;
  return new URL(`../assets/image${imageIndex}.png`, import.meta.url).href;
}

function placeholderDataUrl(petName, petType) {
  const cream = "#fdfaf7";
  const lightBrown = "#f4eddf";
  const darkBrown = "#4a2c1f";

  const safeName = String(petName || "Pet").replace(/</g, "&lt;");
  const safeType = String(petType || "").replace(/</g, "&lt;");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="${lightBrown}"/>
        <stop offset="1" stop-color="${cream}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#g)"/>
    <rect x="40" y="40" width="720" height="420" rx="26" fill="${cream}" stroke="${darkBrown}" stroke-opacity="0.18"/>
    <circle cx="400" cy="210" r="80" fill="${lightBrown}" stroke="${darkBrown}" stroke-opacity="0.25"/>
    <text x="400" y="335" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="800" fill="${darkBrown}">${safeName}</text>
    <text x="400" y="385" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="${darkBrown}" opacity="0.75">${safeType}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function aidKey(petId, kind) {
  return `${petId}:${kind}`;
}

function PetCarousel({ pet, images, activeIndex, setActiveIndex }) {
  const [drag, setDrag] = useState(null);

  const count = images.length;
  const index = Math.min(Math.max(activeIndex, 0), Math.max(count - 1, 0));

  function go(delta) {
    if (count <= 1) return;
    const next = (index + delta + count) % count;
    setActiveIndex(next);
  }

  function onStart(clientX) {
    setDrag({ x: clientX });
  }

  function onEnd(clientX) {
    if (!drag) return;
    const dx = clientX - drag.x;
    setDrag(null);
    if (Math.abs(dx) < 40) return;
    if (dx < 0) go(1);
    else go(-1);
  }

  return (
    <div
      className="petMedia"
      onTouchStart={(e) => onStart(e.touches?.[0]?.clientX ?? 0)}
      onTouchEnd={(e) => onEnd(e.changedTouches?.[0]?.clientX ?? 0)}
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseUp={(e) => onEnd(e.clientX)}
      onMouseLeave={() => setDrag(null)}
      role="group"
      aria-label={`${pet.name} photos`}
    >
      <div
        className="petMediaTrack"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="petMediaSlide">
            <img
              className="petImage"
              src={img.src}
              alt={img.alt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = placeholderDataUrl(pet.name, pet.type);
              }}
            />
          </div>
        ))}
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            className="petMediaNav prev"
            onClick={() => go(-1)}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            className="petMediaNav next"
            onClick={() => go(1)}
            aria-label="Next photo"
          >
            ›
          </button>
          <div className="petMediaDots" aria-hidden="true">
            {images.map((_, i) => (
              <span
                key={i}
                className={`petMediaDot ${i === index ? "active" : ""}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function Adopt() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(() => new Set());
  const [adopted, setAdopted] = useState(() => new Set());
  const [aidRequested, setAidRequested] = useState(() => new Set());
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(9);
  const [carouselIndexByPetId, setCarouselIndexByPetId] = useState(() => ({}));

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const [petsRes, stateRes] = await Promise.all([
          fetch("/api/pets"),
          fetch("/api/state"),
        ]);

        if (!petsRes.ok) throw new Error(`HTTP ${petsRes.status}`);

        const petsData = await petsRes.json();
        const stateData = stateRes.ok ? await stateRes.json() : null;

        if (!cancelled) {
          setPets(Array.isArray(petsData) ? petsData : fallbackPets);

          if (stateData && typeof stateData === "object") {
            setLiked(new Set(Array.isArray(stateData.likes) ? stateData.likes : []));
            setAdopted(
              new Set(
                Array.isArray(stateData.adoptions) ? stateData.adoptions : []
              )
            );

            const aidArr = Array.isArray(stateData.aid) ? stateData.aid : [];
            setAidRequested(
              new Set(
                aidArr
                  .filter((r) => r && r.petId && r.kind)
                  .map((r) => aidKey(r.petId, r.kind))
              )
            );
          }
        }
      } catch {
        if (!cancelled) {
          setPets(fallbackPets);
          setError("Backend not reachable, showing local data.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const types = useMemo(() => {
    const s = new Set(pets.map((p) => p.type));
    return ["all", ...Array.from(s)];
  }, [pets]);

  const filteredPets = useMemo(() => {
    if (filter === "all") return pets;
    return pets.filter((p) => p.type === filter);
  }, [pets, filter]);

  const rescuePets = useMemo(() => {
    return pets.filter((p) => p.needsRescue);
  }, [pets]);

  const visiblePets = useMemo(() => {
    return filteredPets.slice(0, visibleCount);
  }, [filteredPets, visibleCount]);

  function imagesForPet(pet) {
    const base = getImageSrcForPet(pet.id);
    const alt2 = getImageSrcForPet(pet.id + 1);
    const alt3 = getImageSrcForPet(pet.id + 2);
    return [
      { src: base, alt: `${pet.name} photo 1` },
      { src: alt2, alt: `${pet.name} photo 2` },
      { src: alt3, alt: `${pet.name} photo 3` },
    ];
  }

  function setCarouselIndex(petId, idx) {
    setCarouselIndexByPetId((prev) => ({ ...prev, [petId]: idx }));
  }

  function openLocation(pet) {
    const lat = Number(pet.lat);
    const lng = Number(pet.lng);
    const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);
    const url = hasCoords
      ? `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          String(pet.location || "")
        )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function handleAdopt(pet) {
    if (adopted.has(pet.id)) return;
    try {
      const res = await fetch("/api/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId: pet.id }),
      });
      if (!res.ok) throw new Error("adopt_failed");
      const data = await res.json();
      if (data?.state?.adoptions) setAdopted(new Set(data.state.adoptions));
      alert(`Adoption request submitted for ${pet.name}.`);
    } catch {
      alert(`Unable to submit adoption right now for ${pet.name}.`);
    }
  }

  async function handleToggleLike(pet) {
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId: pet.id }),
      });
      if (!res.ok) throw new Error("like_failed");
      const data = await res.json();
      if (data?.state?.likes) {
        setLiked(new Set(data.state.likes));
      } else {
        setLiked((prev) => {
          const next = new Set(prev);
          if (next.has(pet.id)) next.delete(pet.id);
          else next.add(pet.id);
          return next;
        });
      }
    } catch {
      setLiked((prev) => {
        const next = new Set(prev);
        if (next.has(pet.id)) next.delete(pet.id);
        else next.add(pet.id);
        return next;
      });
    }
  }

  async function handleAid(pet, kind) {
    if (aidRequested.has(aidKey(pet.id, kind))) return;
    try {
      const res = await fetch("/api/aid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId: pet.id, kind }),
      });
      if (!res.ok) throw new Error("aid_failed");
      const data = await res.json();
      if (data?.state?.aid && Array.isArray(data.state.aid)) {
        setAidRequested(
          new Set(
            data.state.aid
              .filter((r) => r && r.petId && r.kind)
              .map((r) => aidKey(r.petId, r.kind))
          )
        );
      } else {
        setAidRequested((prev) => new Set(prev).add(aidKey(pet.id, kind)));
      }
      alert(`${kind} request submitted for ${pet.name}.`);
    } catch {
      alert(`Unable to submit ${kind} request right now for ${pet.name}.`);
    }
  }

  return (
    <div className="adoptPage">
      <div className="adoptHeader">
        <h1 className="adoptTitle">Adopt a Pet</h1>
        <p className="adoptSubtitle">
          Find your new friend. Browse, like, adopt, and support animals in need.
        </p>

        {error ? <div className="adoptNotice">{error}</div> : null}

        <div className="adoptFilters" role="tablist" aria-label="Pet filters">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              className={`adoptChip ${filter === t ? "active" : ""}`}
              onClick={() => setFilter(t)}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </div>

      {rescuePets.length ? (
        <div className="rescueSection" aria-label="Rescue needed">
          <div className="rescueHead">
            <h2 className="rescueTitle">Rescue Needed</h2>
            <span className="rescueHint">Swipe to view</span>
          </div>
          <div className="rescueRow" role="list">
            {rescuePets.slice(0, 10).map((pet) => {
              const isAdopted = adopted.has(pet.id);
              const rescueKind = "Rescue";
              const rescueRequested = aidRequested.has(aidKey(pet.id, rescueKind));
              const imgs = imagesForPet(pet);
              const idx = carouselIndexByPetId[pet.id] ?? 0;
              return (
                <div key={pet.id} className="rescueCard" role="listitem">
                  <div className="rescueBadge">Rescue</div>
                  <div className="rescueMedia">
                    <PetCarousel
                      pet={pet}
                      images={imgs}
                      activeIndex={idx}
                      setActiveIndex={(n) => setCarouselIndex(pet.id, n)}
                    />
                  </div>
                  <div className="rescueBody">
                    <div className="rescueNameRow">
                      <div className="rescueName">{pet.name}</div>
                      <button
                        type="button"
                        className="locationPill"
                        onClick={() => openLocation(pet)}
                        aria-label={`Open location for ${pet.name}`}
                      >
                        <LocationIcon className="btnIcon" />
                        {pet.location}
                      </button>
                    </div>
                    <div className="rescueActions">
                      <button
                        type="button"
                        className="btnPrimary"
                        onClick={() => handleAdopt(pet)}
                        disabled={isAdopted}
                        aria-disabled={isAdopted}
                      >
                        <BasketIcon className="btnIcon" />
                        {isAdopted ? "Adopted" : "Adopt"}
                      </button>
                      <button
                        type="button"
                        className="btnAid btnRescue"
                        onClick={() => handleAid(pet, rescueKind)}
                        disabled={rescueRequested}
                        aria-disabled={rescueRequested}
                      >
                        <RescueIcon className="btnIcon" />
                        {rescueRequested ? "Requested" : "Rescue"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

    <div className="adoptGrid">
      {loading ? (
        <div className="adoptLoading">Loading pets...</div>
      ) : (
        visiblePets.map((pet) => {
          const isLiked = liked.has(pet.id);
          const isAdopted = adopted.has(pet.id);
          const medicalKind = "Medical AID";
          const donateKind = "Donation";
          const rescueKind = "Rescue";
          const medicalRequested = aidRequested.has(aidKey(pet.id, medicalKind));
          const donateRequested = aidRequested.has(aidKey(pet.id, donateKind));
          const rescueRequested = aidRequested.has(aidKey(pet.id, rescueKind));
          const imgs = imagesForPet(pet);
          const idx = carouselIndexByPetId[pet.id] ?? 0;
          return (
            <div key={pet.id} className="petCard">
              <div className="petImageWrap">
                <PetCarousel
                  pet={pet}
                  images={imgs}
                  activeIndex={idx}
                  setActiveIndex={(n) => setCarouselIndex(pet.id, n)}
                />
              </div>

              <div className="petBody">
                <div className="petTop">
                  <h3 className="petName">{pet.name}</h3>
                  <span className="petType">{pet.type}</span>
                </div>

                <button
                  type="button"
                  className="locationPill"
                  onClick={() => openLocation(pet)}
                  aria-label={`Open location for ${pet.name}`}
                >
                  <LocationIcon className="btnIcon" />
                  {pet.location}
                </button>

                <div className="petMeta">
                  <div className="petMetaRow">
                    <span className="petMetaLabel">Breed</span>
                    <span className="petMetaValue">{pet.breed}</span>
                  </div>
                  <div className="petMetaRow">
                    <span className="petMetaLabel">Gender</span>
                    <span className="petMetaValue">{pet.gender}</span>
                  </div>
                  <div className="petMetaRow">
                    <span className="petMetaLabel">Age</span>
                    <span className="petMetaValue">{pet.age}</span>
                  </div>
                </div>

                <div className="petActions">
                  <button
                    type="button"
                    className="btnPrimary"
                    onClick={() => handleAdopt(pet)}
                    disabled={isAdopted}
                    aria-disabled={isAdopted}
                  >
                    <BasketIcon className="btnIcon" />
                    {isAdopted ? "Adopted" : "Adopt"}
                  </button>

                  <button
                    type="button"
                    className={`btnSecondary ${isLiked ? "liked" : ""}`}
                    onClick={() => handleToggleLike(pet)}
                    aria-pressed={isLiked}
                  >
                    <HeartIcon className="btnIcon" filled={isLiked} />
                    Like
                  </button>
                </div>

                {(pet.needsMedical || pet.needsDonate || pet.needsRescue) && (
                  <div className="petAid">
                    {pet.needsMedical && (
                      <button
                        type="button"
                        className="btnAid btnMedical"
                        onClick={() => handleAid(pet, medicalKind)}
                        disabled={medicalRequested}
                        aria-disabled={medicalRequested}
                      >
                        <AidIcon className="btnIcon" />
                        {medicalRequested ? "Requested" : "Medical Help"}
                      </button>
                    )}

                    {pet.needsDonate && (
                      <button
                        type="button"
                        className="btnAid btnDonate"
                        onClick={() => handleAid(pet, donateKind)}
                        disabled={donateRequested}
                        aria-disabled={donateRequested}
                      >
                        <DonateIcon className="btnIcon" />
                        {donateRequested ? "Requested" : "Donate Now"}
                      </button>
                    )}

                    {pet.needsRescue && (
                      <button
                        type="button"
                        className="btnAid btnRescue"
                        onClick={() => handleAid(pet, rescueKind)}
                        disabled={rescueRequested}
                        aria-disabled={rescueRequested}
                      >
                        <RescueIcon className="btnIcon" />
                        {rescueRequested ? "Requested" : rescueKind}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>

    {!loading && filteredPets.length > visibleCount ? (
      <div className="viewMoreWrap">
        <button
          type="button"
          className="viewMoreBtn"
          onClick={() => setVisibleCount((c) => c + 9)}
        >
          View more
        </button>
      </div>
    ) : null}
  </div>
  );
};

export default Adopt;
