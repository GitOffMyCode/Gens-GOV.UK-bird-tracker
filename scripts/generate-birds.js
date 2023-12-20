const fs = require("fs");
const path = require("path");
const faker = require("@faker-js/faker").faker;

// generate bird
const generateBird = () => {
  const bird = {
    id: "" + faker.number.int({ min: 123, max: 999 }),
    name: faker.person.firstName(),
    species: faker.animal.bird(),
    location: faker.location.country(),
  };

  bird.status = faker.helpers.arrayElement(["Red", "Yellow", "Green"]);

  bird.yearsTracked = "" + faker.number.int({ min: 0, max: 3 });

  return bird;
};

// push each bird onto array of birds
const generateBirds = () => {
  const birds = [];

  for (let i = 0; i < 100; i++) {
    birds.push(generateBird());
  }

  return birds;
};

// output a file of json data
const generateBirdsFile = (filePath) => {
  const birds = generateBirds();
  const filedata = JSON.stringify(birds, null, 2);
  fs.writeFile(filePath, filedata, (error) => {
    if (error) {
      console.log(error);
    }
    console.log("Birds generated: ${filePath}");
  });
};

// make the file available in the data folder
generateBirdsFile(path.join(__dirname, "../app/data/birds.json"));
