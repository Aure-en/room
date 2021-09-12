# Room

[Room - View site](https://room-f191c.web.app/)

## Description

Room is a furniture e-commerce website, made with React and Firebase, as an expansion of the [Room Homepage Front End Mentors' project](https://www.frontendmentor.io/challenges/room-homepage-BtdBY_ENq). It allows the user to shop or save items as a guest or as a regular member.

## Features implemented

- Routing with React Router
- Mobile responsive
- User settings
  * Users can add and modify his personal informations (name, email, password)
  * They can also add, modify and delete saved addresses and payment cards for faster check-out.
- User profiles
  * Both anonymous and signed in users can add items to their list of favorites and access it from the navigation bar.
  * Both anonymous and signed in users can add items to their carts and check out.
- Shopping Experience
  * Users can filter the items by colors, dimensions, materials, price, and number of seats (when the products list includes sofas, benches, dining tables...)
  * Users can sort items by alphabetical order, price, or date.
  * When available, users can choose different colors or options for some products (ex: some sofas might be available as 2-seater or 3-seater models: in that case, users will be able to choose which item they'll add to their cart).
  * Users can zoom on preview pictures of the products, and a carousel allow them to switch among several preview pictures.
  * A recommendations carousel displays similar items to the product the user is currently viewing.
  * Users can visit "Featured Designs" page where a picture of an interior and its associated items are displayed.

## Screenshots

![Room1](https://user-images.githubusercontent.com/68861848/112833388-f089f800-9096-11eb-914c-5bb4073a261b.png)

![Room2](https://user-images.githubusercontent.com/68861848/112833393-f253bb80-9096-11eb-866e-2156f07bceb1.png)

![Room3](https://user-images.githubusercontent.com/68861848/112833397-f384e880-9096-11eb-81ed-1d004fc640fc.png)

![Room4](https://user-images.githubusercontent.com/68861848/112833399-f4b61580-9096-11eb-8d97-85f4334223b7.png)

## Reflection

For this project, I tried creating an e-commerce website with design elements that could catch the shopper's eyes and let them see products in the best light. Hence, I created "Featured Designs" pages that regrouped a whole design and its associated products, and a "Recommendations" carousel displayed under each product's details.

Since I wanted the shoppers to be able to thoroughly inspect the product before buying it, I built a carousel on the product's page which allowed the user to zoom on every single picture. Every product's page also has an "additional details" dropdown where the user can see the type of material that was used, the dimensions, etc...

As it was my first time using Firebase, using some of their functionalities was quite a challenge at first. I had most troubles using Firestore, as I did not plan properly how to structure my collections and documents to allow the users to select a specific item colors or dimensions before adding it to their cart. Nonetheless, Firebase was extremely useful in providing a database and a way for users to keep their saved items, carts, and profile informations between each shopping session.

Unfortunately, I have not implemented a search feature yet, as Cloud Firestore doesn't support search for text fields in documents. Although the Firebase team recommends using a third-party search service with Cloud Functions, this service was not  available in my pricing plan (Spark). I hope to be able to change this once I am able to create my own backend.
