import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

// export const categories = [
//   {
//     _id: uuid(),
//     categoryName: "fiction",
//     description:
//       "literature in the form of prose, especially novels, that describes imaginary events and people",
//   },
//   {
//     _id: uuid(),
//     categoryName: "non-fiction",
//     description:
//       "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
//   },
//   {
//     _id: uuid(),
//     categoryName: "horror",
//     description:
//       "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
//   },
// ];

export const categories = [
  {
    _id: uuid(),
    img: "https://res.cloudinary.com/dlni6frrw/image/upload/v1684242926/Shoes/running_shoes_yjcpp2.jpg",
    categoryName: "Sports",
  },
  {
    _id: uuid(),
    img: "https://res.cloudinary.com/dlni6frrw/image/upload/v1684250073/Shoes/sneaker2_imgoza.jpg",
    categoryName: "Sneakers",
  },
  {
    _id: uuid(),
    img: "https://res.cloudinary.com/dlni6frrw/image/upload/v1684244015/Shoes/Loafers-Shoes-Source-7_xqgxbb.png",
    categoryName: "Loafers",
  },
];
