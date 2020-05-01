require("../config/db");

const Books = require("../models/books");

const SeedBooks = () => {
  const bookList = [
    {
      title: "Sapiens: A Brief History of Humankind",
      description:
        "Sapiens tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language",
      author: "Stephen Hawking",
      borrowers: [
        { name: "viv", available: true },
        { name: "dany", available: true },
        { name: "viv", available: true }
      ]
    },
    {
      title: "The Black Holes",
      description:
        "It is said that fact is sometimes stranger than fiction, and nowhere is that more true than in the case of black holes. Black holes are stranger than anything dreamed up by science fiction writers.",
      author: "Stephen Hawking",
      borrowers: [
        { name: "viv", available: true },
        { name: "dany", available: true },
        { name: "viv", available: true }
      ]
    },
    {
      title: "A Brief History Of Time",
      description:
        "Was there a beginning of time? Could time run backwards? Is the universe infinite or does it have boundaries?",
      author: "Stephen Hawking",
      borrowers: [
        { name: "viv", available: true },
        { name: "dany", available: true },
        { name: "viv", available: true }
      ]
    },
    {
      title: "Dark Matter and Dark Energy",
      description:
        "All the matter and light we can see in the universe makes up a trivial 5 per cent of everything. The rest is hidden. This could be the biggest puzzle that science has ever faced.",
      author: "Stephen Hawking",
      borrowers: [
        { name: "viv", available: true },
        { name: "dany", available: true },
        { name: "viv", available: true }
      ]
    },
    {
      title: "Pablo Picasso",
      description:
        "A Life from Beginning to End (Biographies of Painters Book 5) Kindle Edition",
      author: "Pablo Picasso",
      borrowers: [
        { name: "viv", available: true },
        { name: "dany", available: true },
        { name: "viv", available: true }
      ]
    },

    {
      title: "Nikola Tesla: Lectures and Patents",
      description:
        "Nikola Tesla: Lectures and Patents is one of the first reference works to come out of Belgrade following the arrival of Tesla's inheritance in 1952. Here is a wealth of information in the form of documents drawn from the Nikola Tesla Museum archive, compiled into a single large volume.",
      author: "Nikola Tesla",
      borrowers: [
        { name: "viv", available: true },
        { name: "dany", available: true },
        { name: "viv", available: true }
      ]
    },
    {
      title: "The Wright Brothers: The Dramatic Story-Behind-the-Story",
      description:
        "The incredible true story of the origin of human flight, by the Pulitzer Prize-winning author David McCullough.n",
      author: "David McCullough",
      borrowers: [
        { name: "viv", available: true },
        { name: "dany", available: true },
        { name: "viv", available: true }
      ]
    },
    {
      title: "ELECTRICITY AND MATTER",
      description:
        "Sir Joseph John J. J. Thomson, 1856 – 1940 was an English physicist. In 1897, Thomson showed that cathode rays were composed of a previously unknown negatively charged particle",
      author: " J.J. THOMSON",
      borrowers: [
        { name: "viv", available: true },
        { name: "dany", available: true },
        { name: "viv", available: true }
      ]
    }
  ];

  bookList.forEach(item => {
    const book = new Books({
      title: item.title,
      description: item.description,
      author: item.author,
      borrowers: item.borrowers
    });

    book
      .save()
      .then(console.log)
      .catch(console.error);
  });
};

SeedBooks();

const clearBooks = () => {
  Books.remove({})
    .then(console.log)
    .catch(console.error);
};

//clearBooks();
