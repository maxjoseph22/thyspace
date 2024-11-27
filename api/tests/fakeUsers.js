const fakeUserOne = {
    createdAt: new Date("2024-01-15T12:34:56Z"),
    username: "user_one",
    email: "user_one@example.com",
    password: "Password123!",
    location: "New York, USA",
    firstname: "John",
    lastname: "Doe",
    profilePicture: "https://example.com/images/user_one.jpg",
    friends: [],
    posts: []
}

const fakeUserTwo = {
    createdAt: new Date("2024-02-12T08:20:45Z"),
    username: "jane_doe",
    email: "jane.doe@example.com",
    password: "SecurePass1!",
    location: "London, UK",
    firstname: "Jane",
    lastname: "Doe",
    profilePicture: "https://example.com/images/jane_doe.jpg",
    friends: [],
    posts: []
}

const fakeUserThree = {
    createdAt: new Date("2024-03-01T15:00:00Z"),
    username: "max_power",
    email: "max.power@example.com",
    password: "StrongP@ssw0rd!",
    location: "Los Angeles, USA",
    firstname: "Max",
    lastname: "Power",
    profilePicture: "",
    friends: [],
    posts: []
}

const fakeUsers = [
    {
      createdAt: new Date("2024-01-15T12:34:56Z"),
      username: "user_one",
      email: "user_one@example.com",
      password: "Password123!",
      location: "New York, USA",
      firstname: "John",
      lastname: "Doe",
      profilePicture: "https://example.com/images/user_one.jpg",
      friends: [],
      posts: []
    },
    {
      createdAt: new Date("2024-02-12T08:20:45Z"),
      username: "jane_doe",
      email: "jane.doe@example.com",
      password: "SecurePass1!",
      location: "London, UK",
      firstname: "Jane",
      lastname: "Doe",
      profilePicture: "https://example.com/images/jane_doe.jpg",
      friends: [],
      posts: []
    },
    {
      createdAt: new Date("2024-03-01T15:00:00Z"),
      username: "max_power",
      email: "max.power@example.com",
      password: "StrongP@ssw0rd!",
      location: "Los Angeles, USA",
      firstname: "Max",
      lastname: "Power",
      profilePicture: "",
      friends: [],
      posts: []
    },
    {
      createdAt: new Date("2024-04-10T09:45:30Z"),
      username: "sarah_connor",
      email: "sarah.connor@example.com",
      password: "Term1nator!",
      location: "San Francisco, USA",
      firstname: "Sarah",
      lastname: "Connor",
      profilePicture: "",
      friends: [],
      posts: []
    },
    {
      createdAt: new Date("2024-05-05T17:30:00Z"),
      username: "hacker42",
      email: "hacker42@example.com",
      password: "H@ckThePlanet!",
      location: "Berlin, Germany",
      firstname: "Alice",
      lastname: "Smith",
      profilePicture: "https://example.com/images/hacker42.jpg",
      friends: [],
      posts: []
    },
    {
      createdAt: new Date("2024-06-20T14:15:00Z"),
      username: "coder_guy",
      email: "coder.guy@example.com",
      password: "C0d3rPass!",
      location: "Tokyo, Japan",
      firstname: "Tom",
      lastname: "Nakamura",
      profilePicture: "",
      friends: [],
      posts: []
    },
    {
      createdAt: new Date("2024-07-07T11:00:00Z"),
      username: "fitness_fan",
      email: "fitness_fan@example.com",
      password: "FitP@ss123!",
      location: "Sydney, Australia",
      firstname: "Emma",
      lastname: "Brown",
      profilePicture: "https://example.com/images/fitness_fan.jpg",
      friends: [],
      posts: []
    },
    {
      createdAt: new Date("2024-08-15T10:10:10Z"),
      username: "foodie_lover",
      email: "foodie_lover@example.com",
      password: "T@styP@ss!",
      location: "Paris, France",
      firstname: "Claire",
      lastname: "Dubois",
      profilePicture: "https://example.com/images/foodie_lover.jpg",
      friends: [],
      posts: []
    },
    {
      createdAt: new Date("2024-09-30T21:30:00Z"),
      username: "music_geek",
      email: "music_geek@example.com",
      password: "Muz1cF@n!",
      location: "Nashville, USA",
      firstname: "Leo",
      lastname: "Johnson",
      profilePicture: "",
      friends: [],
      posts: []
    },
    {
      createdAt: new Date("2024-10-25T08:00:00Z"),
      username: "travel_bug",
      email: "travel_bug@example.com",
      password: "Tr@velL0ve!",
      location: "Cape Town, South Africa",
      firstname: "Sophia",
      lastname: "Nguyen",
      profilePicture: "",
      friends: [],
      posts: []
    }
  ];

  module.exports = {fakeUserOne, fakeUserTwo, fakeUserThree, fakeUsers}