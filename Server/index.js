 const express = require("express");
 const fs = require("node:fs");
 const path = require("node:path");
 require("dotenv").config();
 
 const app = express();
 const PORT = process.env.PORT || 5000;
 const STORE_PATH = path.join(__dirname, "store.json");

 function toId(value) {
   const n = Number(value);
   return Number.isFinite(n) ? n : null;
 }
 
 function readStore() {
   try {
     const raw = fs.readFileSync(STORE_PATH, "utf8");
     const parsed = JSON.parse(raw);
     return {
       likes: (Array.isArray(parsed.likes) ? parsed.likes : [])
         .map(toId)
         .filter((v) => v !== null),
       adoptions: (Array.isArray(parsed.adoptions) ? parsed.adoptions : [])
         .map(toId)
         .filter((v) => v !== null),
       aid: Array.isArray(parsed.aid) ? parsed.aid : [],
     };
   } catch {
     return { likes: [], adoptions: [], aid: [] };
   }
 }
 
 function writeStore(store) {
   fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
 }
 
 app.use(express.json());
 
 app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
   if (req.method === "OPTIONS") return res.sendStatus(204);
   next();
 });
 
 const pets = [
   // Dogs
   { id: 1, name: "Sheru", breed: "Indian Pariah", gender: "Male", age: "3 years", location: "Hingna Road", type: "dog", needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.0968, lng: 78.9814 },
   { id: 2, name: "Rex", breed: "Labrador", gender: "Male", age: "2 years", location: "Sadar", type: "dog", needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1456, lng: 79.0882 },
   { id: 3, name: "Luna", breed: "Golden Retriever", gender: "Female", age: "4 years", location: "Dharampeth", type: "dog", needsRescue: false, needsMedical: true, needsDonate: false, lat: 21.1523, lng: 79.0801 },
   { id: 4, name: "Max", breed: "German Shepherd", gender: "Male", age: "5 years", location: "Seminary Hills", type: "dog", needsRescue: true, needsMedical: false, needsDonate: true, lat: 21.1389, lng: 79.0654 },
   { id: 5, name: "Bella", breed: "Beagle", gender: "Female", age: "1 year", location: "Itwari", type: "dog", needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1623, lng: 79.0923 },
 
   // Cats
   { id: 6, name: "Mimi", breed: "Persian Mix", gender: "Female", age: "2 years", location: "Sadar", type: "cat", needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1456, lng: 79.0882 },
   { id: 7, name: "Whiskers", breed: "Siamese", gender: "Male", age: "3 years", location: "Futala", type: "cat", needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1289, lng: 79.0456 },
   { id: 8, name: "Shadow", breed: "Maine Coon", gender: "Male", age: "4 years", location: "Dharampeth", type: "cat", needsRescue: false, needsMedical: true, needsDonate: false, lat: 21.1523, lng: 79.0801 },
   { id: 9, name: "Lily", breed: "British Shorthair", gender: "Female", age: "1 year", location: "Hingna Road", type: "cat", needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.0968, lng: 78.9814 },
 
   // Squirrels
   { id: 10, name: "Chiku", breed: "Indian Palm Squirrel", gender: "Male", age: "6 months", location: "Seminary Hills", type: "squirrel", needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1389, lng: 79.0654 },
   { id: 11, name: "Nibbles", breed: "Three-striped Squirrel", gender: "Female", age: "8 months", location: "Futala", type: "squirrel", needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1289, lng: 79.0456 },
 
   // Goats
   { id: 12, name: "Balu", breed: "Desi Goat", gender: "Male", age: "2 years", location: "Itwari", type: "goat", needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1623, lng: 79.0923 },
   { id: 13, name: "Chhaya", breed: "Jamnapari", gender: "Female", age: "3 years", location: "Hingna Road", type: "goat", needsRescue: false, needsMedical: true, needsDonate: true, lat: 21.0968, lng: 78.9814 },
   { id: 14, name: "Ramu", breed: "Barbari", gender: "Male", age: "1 year", location: "Sadar", type: "goat", needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1456, lng: 79.0882 },
 
   // Horses
   { id: 15, name: "Badal", breed: "Pony", gender: "Male", age: "5 years", location: "Futala", type: "horse", needsRescue: false, needsMedical: true, needsDonate: false, lat: 21.1289, lng: 79.0456 },
   { id: 16, name: "Storm", breed: "Marwari", gender: "Male", age: "7 years", location: "Dharampeth", type: "horse", needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.1523, lng: 79.0801 },
   { id: 17, name: "Princess", breed: "Arabian", gender: "Female", age: "4 years", location: "Seminary Hills", type: "horse", needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1389, lng: 79.0654 },
 
   // Cows
   { id: 18, name: "Gauri", breed: "Desi Cow", gender: "Female", age: "6 years", location: "Dharampeth", type: "cow", needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.1523, lng: 79.0801 },
   { id: 19, name: "Kamdhenu", breed: "Gir", gender: "Female", age: "8 years", location: "Hingna Road", type: "cow", needsRescue: false, needsMedical: true, needsDonate: false, lat: 21.0968, lng: 78.9814 },
   { id: 20, name: "Lakshmi", breed: "Sahiwal", gender: "Female", age: "5 years", location: "Itwari", type: "cow", needsRescue: true, needsMedical: false, needsDonate: true, lat: 21.1623, lng: 79.0923 },
 
   // Buffalo
   { id: 21, name: "Mahadev", breed: "Murrah", gender: "Male", age: "4 years", location: "Sadar", type: "buffalo", needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1456, lng: 79.0882 },
   { id: 22, name: "Shakti", breed: "Nili-Ravi", gender: "Female", age: "6 years", location: "Futala", type: "buffalo", needsRescue: false, needsMedical: true, needsDonate: true, lat: 21.1289, lng: 79.0456 },
 
   // Ox
   { id: 23, name: "Bhim", breed: "Ongole", gender: "Male", age: "7 years", location: "Dharampeth", type: "ox", needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1523, lng: 79.0801 },
   { id: 24, name: "Balram", breed: "Gir", gender: "Male", age: "9 years", location: "Seminary Hills", type: "ox", needsRescue: true, needsMedical: true, needsDonate: false, lat: 21.1389, lng: 79.0654 },
 
   // Camel
   { id: 25, name: "Sahara", breed: "Bikaneri", gender: "Male", age: "10 years", location: "Hingna Road", type: "camel", needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.0968, lng: 78.9814 },
 
   // Desi Dogs
   { id: 26, name: "Kalu", breed: "Desi Dog", gender: "Male", age: "2 years", location: "Manewada", type: "dog", needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.0968, lng: 79.029 },
   { id: 27, name: "Gudiya", breed: "Desi Dog", gender: "Female", age: "1.5 years", location: "Bardi", type: "dog", needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.165, lng: 79.06 },
 
   // Desi Cats
   { id: 28, name: "Chutki", breed: "Desi Cat", gender: "Female", age: "1 year", location: "Jaripatka", type: "cat", needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.18, lng: 79.08 },
   { id: 29, name: "Motu", breed: "Desi Cat", gender: "Male", age: "3 years", location: "Dharampeth", type: "cat", needsRescue: true, needsMedical: true, needsDonate: false, lat: 21.1523, lng: 79.0801 },
 
   // Desi Cows & Buffalo/Sheep
   { id: 30, name: "Nandini", breed: "Desi Cow", gender: "Female", age: "7 years", location: "Mhalgi Nagar", type: "cow", needsRescue: false, needsMedical: true, needsDonate: true, lat: 21.1, lng: 79.08 },
   { id: 31, name: "Bhola", breed: "Desi Bull", gender: "Male", age: "6 years", location: "Hudkeshwar", type: "ox", needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.07, lng: 79.1 },
 
   // Pigs
   { id: 32, name: "Gulabo", breed: "Desi Pig", gender: "Female", age: "2 years", location: "Mankapur", type: "pig", needsRescue: false, needsMedical: false, needsDonate: true, lat: 21.19, lng: 79.1 },
   { id: 33, name: "Lallu", breed: "Desi Pig", gender: "Male", age: "3 years", location: "Sadar", type: "pig", needsRescue: true, needsMedical: false, needsDonate: false, lat: 21.1456, lng: 79.0882 },
 
   // Sheep
   { id: 34, name: "Dholu", breed: "Desi Sheep", gender: "Male", age: "2 years", location: "Futala", type: "sheep", needsRescue: false, needsMedical: false, needsDonate: false, lat: 21.1289, lng: 79.0456 },
   { id: 35, name: "Bhuri", breed: "Desi Sheep", gender: "Female", age: "1.5 years", location: "Itwari", type: "sheep", needsRescue: true, needsMedical: false, needsDonate: true, lat: 21.1623, lng: 79.0923 },
 ];
 
 app.get("/api/health", (req, res) => {
   res.json({ ok: true });
 });

 app.get("/api/state", (req, res) => {
   const store = readStore();
   res.json({
     likes: store.likes,
     adoptions: store.adoptions,
     aid: store.aid,
   });
 });
 
 app.get("/api/pets", (req, res) => {
   res.json(pets);
 });
 
 app.post("/api/adoptions", (req, res) => {
   const { petId } = req.body || {};
   const id = toId(petId);
   if (!id) return res.status(400).json({ ok: false, message: "petId required" });
   const store = readStore();
   if (!store.adoptions.includes(id)) {
     store.adoptions.push(id);
     writeStore(store);
   }
   return res.json({ ok: true, petId: id, state: store });
 });
 
 app.post("/api/likes", (req, res) => {
   const { petId } = req.body || {};
   const id = toId(petId);
   if (!id) return res.status(400).json({ ok: false, message: "petId required" });
   const store = readStore();
   if (store.likes.includes(id)) {
     store.likes = store.likes.filter((v) => v !== id);
   } else {
     store.likes.push(id);
   }
   writeStore(store);
   return res.json({ ok: true, petId: id, liked: store.likes.includes(id), state: store });
 });
 
 app.post("/api/aid", (req, res) => {
   const { petId, kind } = req.body || {};
   const id = toId(petId);
   if (!id || !kind) {
     return res.status(400).json({ ok: false, message: "petId and kind required" });
   }
   const store = readStore();
   const already = store.aid.some(
     (r) => toId(r?.petId) === id && String(r?.kind) === String(kind)
   );
   if (!already) {
     store.aid.push({ petId: id, kind, at: new Date().toISOString() });
     writeStore(store);
   }
   return res.json({ ok: true, petId: id, kind, already, state: store });
 });
 
 app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
 });
