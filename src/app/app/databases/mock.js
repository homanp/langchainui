export const columns = [
  {
    id: "no",
    header: "No.",
  },
  {
    id: "first_name",
    header: "First name",
  },
  {
    id: "last_name",
    header: "Last name",
  },
  {
    id: "email",
    header: "Email",
  },
  {
    id: "gender",
    header: "Gender",
  },
  {
    id: "city",
    header: "City",
  },
  {
    id: "vector",  // New field: embedding vector
    header: "Vector",
  },
  {
    id: "distance",  // New field: distance
    header: "Distance",
  },
];
export const rows = [
  {
    no: 1,
    first_name: "Ricardo",
    last_name: "Algore",
    email: "ralgore0@github.com",
    gender: "Genderfluid",
    city: "Bledzew",
    vector: "[0.1, 0.2, 0.3]",  // Example embedding vector
    distance: 0.25,  // Example distance
  },
  {
    no: 2,
    first_name: "Corene",
    last_name: "Esherwood",
    email: "cesherwood1@delicious.com",
    gender: "Female",
    city: "Hongkou",
    vector: "[0.4, 0.5, 0.6]",  // Example embedding vector
    distance: 0.18,  // Example distance
  },
  {
    no: 3,
    first_name: "Decca",
    last_name: "Tubb",
    email: "dtubb2@oaic.gov.au",
    gender: "Male",
    city: "Polepy",
    vector: "[0.7, 0.8, 0.9]",  // Example embedding vector
    distance: 0.32,  // Example distance
  },
  
  {
    no: 4,
    first_name: "Jane",
    last_name: "Doe",
    email: "janedoe@example.com",
    gender: "Female",
    city: "New York",
    vector: "[0.2, 0.4, 0.6]",
    distance: 0.12,
  },
  {
    no: 5,
    first_name: "John",
    last_name: "Smith",
    email: "johnsmith@example.com",
    gender: "Male",
    city: "Los Angeles",
    vector: "[0.9, 0.7, 0.5]",
    distance: 0.08,
  },
  {
    no: 7,
    first_name: "Michael",
    last_name: "Brown",
    email: "michaelbrown@example.com",
    gender: "Male",
    city: "Houston",
    vector: "[0.6, 0.8, 0.4]",
    distance: 0.22,
  },
  {
    no: 8,
    first_name: "Emily",
    last_name: "Williams",
    email: "emilywilliams@example.com",
    gender: "Female",
    city: "Phoenix",
    vector: "[0.2, 0.5, 0.9]",
    distance: 0.31,
  },
  {
    no: 9,
    first_name: "Daniel",
    last_name: "Johnson",
    email: "danieljohnson@example.com",
    gender: "Male",
    city: "Philadelphia",
    vector: "[0.7, 0.3, 0.6]",
    distance: 0.17,
  },
  {
    no: 10,
    first_name: "Olivia",
    last_name: "Davis",
    email: "oliviadavis@example.com",
    gender: "Female",
    city: "San Antonio",
    vector: "[0.5, 0.7, 0.1]",
    distance: 0.28,
  },
  {
    no: 11,
    first_name: "David",
    last_name: "Martinez",
    email: "davidmartinez@example.com",
    gender: "Male",
    city: "San Diego",
    vector: "[0.4, 0.9, 0.2]",
    distance: 0.14,
  },
  {
    no: 12,
    first_name: "Sophia",
    last_name: "Anderson",
    email: "sophiaanderson@example.com",
    gender: "Female",
    city: "Dallas",
    vector: "[0.8, 0.2, 0.7]",
    distance: 0.19,
  },
  {
    no: 13,
    first_name: "Ethan",
    last_name: "Garcia",
    email: "ethangarcia@example.com",
    gender: "Male",
    city: "Miami",
    vector: "[0.6, 0.4, 0.8]",
    distance: 0.27,
  },
  {
    no: 14,
    first_name: "Ava",
    last_name: "Lopez",
    email: "avalopez@example.com",
    gender: "Female",
    city: "Orlando",
    vector: "[0.3, 0.7, 0.5]",
    distance: 0.23,
  },
  {
    no: 15,
    first_name: "Matthew",
    last_name: "Hernandez",
    email: "matthewhernandez@example.com",
    gender: "Male",
    city: "Tampa",
    vector: "[0.8, 0.1, 0.9]",
    distance: 0.33,
  },
  {
    no: 16,
    first_name: "Isabella",
    last_name: "Miller",
    email: "isabellamiller@example.com",
    gender: "Female",
    city: "Jacksonville",
    vector: "[0.5, 0.9, 0.2]",
    distance: 0.16,
  },
  {
    no: 17,
    first_name: "Alexander",
    last_name: "Jackson",
    email: "alexanderjackson@example.com",
    gender: "Male",
    city: "Denver",
    vector: "[0.7, 0.3, 0.8]",
    distance: 0.21,
  },
  {
    no: 18,
    first_name: "Mia",
    last_name: "Thompson",
    email: "miathompson@example.com",
    gender: "Female",
    city: "Seattle",
    vector: "[0.2, 0.6, 0.4]",
    distance: 0.29,
  },
  {
    no: 19,
    first_name: "James",
    last_name: "White",
    email: "jameswhite@example.com",
    gender: "Male",
    city: "Portland",
    vector: "[0.9, 0.5, 0.1]",
    distance: 0.07,
  },
  {
    no: 20,
    first_name: "Charlotte",
    last_name: "Davis",
    email: "charlottedavis@example.com",
    gender: "Female",
    city: "San Francisco",
    vector: "[0.4, 0.8, 0.6]",
    distance: 0.26,
  },
];

export const tree = [
  {
    key: "db1",
    label: "Database 1",
    descendants: [
      {
        key: "tbl1",
        label: "Table1",
        descendants: [
          {
            key: "tbl1.id",
            label: "id",
          },
          {
            key: "tbl1.city",
            label: "city",
          },
        ],
      },
      {
        key: "tbl2",
        label: "Table 2",
        descendants: [
          {
            key: "tbl1.id",
            label: "id",
          },
          {
            key: "tbl1.device_use",
            label: "device_use",
          },
          {
            key: "tbl1.external_id",
            label: "external_id",
          },
        ],
      },
      {
        key: "tbl3",
        label: "Table 3",
        descendants: [
          {
            key: "tbl3.id",
            label: "id",
          },
          {
            key: "tbl3.category",
            label: "category",
          },
        ],
      },
    ],
  },
];
