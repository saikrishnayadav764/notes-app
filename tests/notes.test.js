const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Note = require("../models/Note");
const dbURI = process.env.DB_URI;

// Sample note data for testing
const sampleNote = {
  title: "Test Note",
  content: "This is a test note for Jest testing",
};

let authToken; // Variable to store the authentication token

beforeAll(async () => {
  // Connecting to a test database
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Performing authentication to get the token
  const loginResponse = await request(app)
    .post("/api/login")
    .send({ username: "user1", password: "password1" });

  authToken = loginResponse.body.token; // Storing the token for further use
});

afterAll(async () => {
  // Closing the mongoose connection after all tests
  await mongoose.connection.close();
});

describe("Notes API endpoints", () => {
  let savedNote;

  it("should create a new note", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${authToken}`)
      .send(sampleNote)
      .expect(201);

    savedNote = response.body; // Storing the created note for further tests
    expect(savedNote.title).toBe(sampleNote.title);
    expect(savedNote.content).toBe(sampleNote.content);
  });

  it("should get all notes", async () => {
    const response = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a specific note by ID", async () => {
    const response = await request(app)
      .get(`/api/notes/${savedNote._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);
    expect(response.body.title).toBe(sampleNote.title);
    expect(response.body.content).toBe(sampleNote.content);
  });

  it("should update a note by ID", async () => {
    const updatedNote = {
      title: "Updated Test Note",
      content: "This is an updated test note",
    };
    const response = await request(app)
      .put(`/api/notes/${savedNote._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updatedNote)
      .expect(200);

    expect(response.body.title).toBe(updatedNote.title);
    expect(response.body.content).toBe(updatedNote.content);
  });

  it("should delete a note by ID", async () => {
    await request(app)
      .delete(`/api/notes/${savedNote._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);
    const deletedNote = await Note.findById(savedNote._id);
    expect(deletedNote).toBeNull();
  });
});
